import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { VitePWA } from "vite-plugin-pwa";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["images/bliss.jpg", "xp-icon-192.svg", "xp-icon-512.svg"],
      manifest: {
        name: "Nallukumar R - XP Portfolio",
        short_name: "XP Portfolio",
        description: "A Windows XP-style interactive developer portfolio.",
        start_url: ".",
        scope: ".",
        display: "standalone",
        background_color: "#e5f0ff",
        theme_color: "#3a6ea5",
        icons: [
          {
            src: "/xp-icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          {
            src: "/xp-icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => url.origin === self.location.origin && request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "xp-documents",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: ({ request, url }) => url.origin === self.location.origin && ["style", "script", "image", "font"].includes(request.destination),
            handler: "CacheFirst",
            options: {
              cacheName: "xp-assets",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 3e3
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
