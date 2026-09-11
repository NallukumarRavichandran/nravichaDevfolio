import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Brush, Eraser, Minus, Square, Download, Trash2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PALETTE_COLORS = [
  '#000000', '#787878', '#790300', '#757a01', '#007902', '#007778', '#010078', '#7b0077',
  '#ffffff', '#b8b8b8', '#ff0000', '#ffff00', '#00ff01', '#00ffff', '#0000ff', '#ff00fe',
  '#ff9900', '#990066', '#339966', '#0066cc', '#663399', '#cc6600', '#996633', '#333333'
];

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser' | 'line' | 'rect'>('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [savedImageData, setSavedImageData] = useState<ImageData | null>(null);

  // Initialize white canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'line' || tool === 'rect') {
      setSavedImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 3 : tool === 'brush' ? lineWidth * 2 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (startPos && savedImageData) {
      // Restore previous image for drag preview
      ctx.putImageData(savedImageData, 0, 0);
      ctx.beginPath();

      if (tool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (tool === 'rect') {
        const w = coords.x - startPos.x;
        const h = coords.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, w, h);
      }
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
    setStartPos(null);
    setSavedImageData(null);
  };

  const handleClear = () => {
    sounds.playRecycle();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'nalluos_paint_artwork.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f0e8] text-xs font-sans select-none">
      {/* Menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-zinc-300 bg-[#eaeae2] text-zinc-700">
        <button onClick={handleSave} className="hover:underline flex items-center gap-1 cursor-pointer">
          <Download className="w-3 h-3 text-blue-600" />
          <span>Save PNG</span>
        </button>
        <button onClick={handleClear} className="hover:underline flex items-center gap-1 cursor-pointer">
          <Trash2 className="w-3 h-3 text-red-600" />
          <span>Clear Canvas</span>
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex min-h-0">
        {/* Left Toolbar */}
        <div className="w-14 bg-[#e4e4dc] border-r border-zinc-300 p-1.5 flex flex-col gap-1 items-center">
          <button
            onClick={() => { sounds.playClick(); setTool('pencil'); }}
            className={`w-9 h-9 flex items-center justify-center rounded border ${
              tool === 'pencil' ? 'bg-zinc-300 border-zinc-600 shadow-inner' : 'bg-white hover:bg-zinc-100 border-zinc-400'
            }`}
            title="Pencil"
          >
            <Pencil className="w-4 h-4 text-zinc-800" />
          </button>

          <button
            onClick={() => { sounds.playClick(); setTool('brush'); }}
            className={`w-9 h-9 flex items-center justify-center rounded border ${
              tool === 'brush' ? 'bg-zinc-300 border-zinc-600 shadow-inner' : 'bg-white hover:bg-zinc-100 border-zinc-400'
            }`}
            title="Brush"
          >
            <Brush className="w-4 h-4 text-zinc-800" />
          </button>

          <button
            onClick={() => { sounds.playClick(); setTool('eraser'); }}
            className={`w-9 h-9 flex items-center justify-center rounded border ${
              tool === 'eraser' ? 'bg-zinc-300 border-zinc-600 shadow-inner' : 'bg-white hover:bg-zinc-100 border-zinc-400'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4 text-zinc-800" />
          </button>

          <button
            onClick={() => { sounds.playClick(); setTool('line'); }}
            className={`w-9 h-9 flex items-center justify-center rounded border ${
              tool === 'line' ? 'bg-zinc-300 border-zinc-600 shadow-inner' : 'bg-white hover:bg-zinc-100 border-zinc-400'
            }`}
            title="Line"
          >
            <Minus className="w-4 h-4 text-zinc-800" />
          </button>

          <button
            onClick={() => { sounds.playClick(); setTool('rect'); }}
            className={`w-9 h-9 flex items-center justify-center rounded border ${
              tool === 'rect' ? 'bg-zinc-300 border-zinc-600 shadow-inner' : 'bg-white hover:bg-zinc-100 border-zinc-400'
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4 text-zinc-800" />
          </button>

          <div className="w-full border-t border-zinc-300 my-1" />

          {/* Stroke Width Selector */}
          <div className="flex flex-col gap-1 items-center w-full">
            {[1, 3, 6, 10].map(w => (
              <button
                key={w}
                onClick={() => { sounds.playClick(); setLineWidth(w); }}
                className={`w-8 h-4 flex items-center justify-center rounded ${
                  lineWidth === w ? 'bg-zinc-300 border border-zinc-600' : 'hover:bg-zinc-200'
                }`}
              >
                <div className="bg-black rounded-full" style={{ height: `${Math.max(1, w)}px`, width: '16px' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#7b889b] p-4 overflow-auto flex items-center justify-center">
          <div className="border-2 border-zinc-800 shadow-2xl bg-white">
            <canvas
              ref={canvasRef}
              width={640}
              height={380}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              className="cursor-crosshair block"
            />
          </div>
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="bg-[#e4e4dc] border-t border-zinc-300 p-2 flex items-center gap-3">
        {/* Current Active Color Box */}
        <div className="w-8 h-8 border-2 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white p-0.5 bg-white">
          <div className="w-full h-full" style={{ backgroundColor: color }} />
        </div>

        {/* 2-Row XP Palette */}
        <div className="grid grid-rows-2 grid-flow-col gap-1">
          {PALETTE_COLORS.map((c, i) => (
            <button
              key={i}
              onClick={() => { sounds.playClick(); setColor(c); }}
              className="w-4 h-4 border border-zinc-500 rounded-xs hover:scale-110 transition cursor-pointer"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <span className="text-[11px] text-zinc-500 ml-auto font-mono">640 x 380px</span>
      </div>
    </div>
  );
};
