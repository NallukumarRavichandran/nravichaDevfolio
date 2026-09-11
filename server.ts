import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing if needed
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Real Web Browser Proxy Endpoint
  const handleProxy = async (req: express.Request, res: express.Response) => {
    let targetUrl = (req.query.url as string) || '';

    if (!targetUrl) {
      return res.status(400).send('Missing url parameter');
    }

    // Clean and normalize target URL
    targetUrl = targetUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Automatically optimize DuckDuckGo search to use the HTML engine for zero-restriction rendering
    if (targetUrl.includes('duckduckgo.com')) {
      if (targetUrl.includes('q=')) {
        try {
          const parsedUrl = new URL(targetUrl);
          const query = parsedUrl.searchParams.get('q') || '';
          targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
        } catch {
          // Keep targetUrl
        }
      } else if (
        targetUrl === 'https://duckduckgo.com' ||
        targetUrl === 'https://duckduckgo.com/' ||
        targetUrl === 'http://duckduckgo.com'
      ) {
        targetUrl = 'https://html.duckduckgo.com/html/';
      }
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const headers: Record<string, string> = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      };

      const fetchOptions: RequestInit = {
        method: req.method === 'POST' ? 'POST' : 'GET',
        headers,
        signal: controller.signal,
        redirect: 'follow',
      };

      // Forward form body on POST if searching
      if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
        const formParams = new URLSearchParams();
        for (const key of Object.keys(req.body)) {
          formParams.append(key, req.body[key]);
        }
        fetchOptions.body = formParams.toString();
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      const response = await fetch(targetUrl, fetchOptions);
      clearTimeout(timeoutId);

      const finalUrl = response.url || targetUrl;
      const contentType = response.headers.get('content-type') || 'text/html';

      // Set permissive framing headers to allow display inside the Internet Explorer OS window
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.removeHeader('X-Frame-Options');
      res.removeHeader('Content-Security-Policy');
      res.removeHeader('Content-Security-Policy-Report-Only');
      res.removeHeader('Cross-Origin-Opener-Policy');
      res.removeHeader('Cross-Origin-Embedder-Policy');
      res.removeHeader('Cross-Origin-Resource-Policy');

      if (contentType.includes('text/html')) {
        let html = await response.text();

        // Decode DuckDuckGo redirect links (//duckduckgo.com/l/?uddg=https%3A...) so clicks go straight to the destination
        html = html.replace(
          /href=["'](?:(?:https?:)?\/\/duckduckgo\.com)?\/l\/\?uddg=([^&"'\s]+)[^"']*["']/gi,
          (match, encodedUrl) => {
            try {
              return `href="${decodeURIComponent(encodedUrl)}"`;
            } catch {
              return match;
            }
          }
        );

        // Inject Base URL so relative stylesheets, images, and links resolve correctly
        const baseTag = `<base href="${finalUrl}">`;

        // Client-side script injected to intercept navigation & report active page details to the OS
        const injectedScript = `
<script>
(function() {
  try {
    // Notify parent Internet Explorer window of the loaded URL and page title
    window.parent.postMessage({
      type: 'IE_PAGE_LOADED',
      url: ${JSON.stringify(finalUrl)},
      title: document.title || ${JSON.stringify(finalUrl)}
    }, '*');
  } catch (err) {}

  // Intercept all link clicks so navigation stays within the OS browser
  document.addEventListener('click', function(e) {
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    if (target && target.href && !target.href.startsWith('javascript:') && !target.href.startsWith('#')) {
      e.preventDefault();
      try {
        window.parent.postMessage({
          type: 'IE_NAVIGATE',
          url: target.href
        }, '*');
      } catch (err) {
        window.location.href = '/api/proxy?url=' + encodeURIComponent(target.href);
      }
    }
  }, true);

  // Intercept form submissions (e.g. search boxes)
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form && form.tagName === 'FORM') {
      var method = (form.method || 'GET').toUpperCase();
      if (method === 'GET') {
        e.preventDefault();
        var formData = new FormData(form);
        var params = new URLSearchParams();
        formData.forEach(function(value, key) {
          params.append(key, value);
        });
        var action = form.action || ${JSON.stringify(finalUrl)};
        var delim = action.indexOf('?') !== -1 ? '&' : '?';
        var destinationUrl = action + delim + params.toString();
        window.parent.postMessage({
          type: 'IE_NAVIGATE',
          url: destinationUrl
        }, '*');
      } else if (method === 'POST') {
        var qInput = form.querySelector('input[name="q"]');
        var query = qInput ? qInput.value : '';
        if (query) {
          e.preventDefault();
          var destinationUrl = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query);
          window.parent.postMessage({
            type: 'IE_NAVIGATE',
            url: destinationUrl
          }, '*');
        }
      }
    }
  }, true);
})();
</script>
`;

        // Insert base tag and injected script
        if (html.includes('<head>')) {
          html = html.replace('<head>', `<head>${baseTag}${injectedScript}`);
        } else if (html.includes('<html>')) {
          html = html.replace('<html>', `<html><head>${baseTag}${injectedScript}</head>`);
        } else {
          html = `${baseTag}${injectedScript}${html}`;
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
      } else {
        // Non-HTML content (images, styles, fonts, JSON)
        res.setHeader('Content-Type', contentType);
        const buffer = await response.arrayBuffer();
        return res.send(Buffer.from(buffer));
      }
    } catch (error: any) {
      console.error('Proxy error fetching:', targetUrl, error?.message);
      // Return authentic Internet Explorer Error Page
      const errorHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Internet Explorer - The page cannot be displayed</title>
  <style>
    body { font-family: Tahoma, Arial, sans-serif; background: #ffffff; color: #000000; margin: 24px 32px; font-size: 12px; }
    h1 { font-size: 16px; font-weight: bold; color: #003399; margin: 0 0 12px 0; }
    p { margin: 8px 0; line-height: 1.5; }
    ul { margin: 8px 0 16px 20px; }
    li { margin-bottom: 4px; }
    .hr { height: 1px; background: #cccccc; margin: 16px 0; }
    .btn { display: inline-block; padding: 4px 12px; background: #ece9d8; border: 1px solid #7f9db9; border-radius: 3px; font-size: 11px; font-weight: bold; color: #000; cursor: pointer; text-decoration: none; margin-right: 8px; }
    .btn:hover { background: #e0dcc9; }
    .btn-primary { background: #0058e6; color: #fff; border-color: #003399; }
    .btn-primary:hover { background: #0047b8; }
    .box { background: #f7f7f7; border: 1px solid #e0e0e0; padding: 12px; border-radius: 4px; margin-top: 12px; font-family: monospace; font-size: 11px; color: #666; }
  </style>
</head>
<body>
  <h1>The page cannot be displayed</h1>
  <p>The page you are looking for is currently unavailable. The website might be experiencing technical difficulties, or you may need to adjust your browser settings.</p>
  
  <div class="hr"></div>
  
  <p><strong>Please try the following:</strong></p>
  <ul>
    <li>Click the <a href="javascript:location.reload()">Refresh</a> button, or try again later.</li>
    <li>If you typed the page address in the Address bar, make sure that it is spelled correctly.</li>
    <li>To check your connection settings, try searching for the topic on <a href="/api/proxy?url=https%3A%2F%2Fhtml.duckduckgo.com%2Fhtml%2F%3Fq%3D${encodeURIComponent(targetUrl)}">DuckDuckGo Search</a>.</li>
  </ul>

  <div style="margin-top: 16px;">
    <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open in External Real Browser Tab ↗</a>
    <a href="/api/proxy?url=https%3A%2F%2Fhtml.duckduckgo.com%2Fhtml%2F%3Fq%3D${encodeURIComponent(targetUrl)}" class="btn">Search DuckDuckGo</a>
    <a href="javascript:history.back()" class="btn">Go Back</a>
  </div>

  <div class="box">
    Diagnostic error: ${error?.message || 'Connection failed or timed out.'}<br>
    Requested destination: ${targetUrl}
  </div>
</body>
</html>
`;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(errorHtml);
    }
  };

  app.get('/api/proxy', handleProxy);
  app.post('/api/proxy', handleProxy);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
