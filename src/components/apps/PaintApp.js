import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Pencil, Brush, Eraser, Minus, Square, Download, Trash2 } from "lucide-react";
import { sounds } from "../../utils/audio";
const PALETTE_COLORS = [
  "#000000",
  "#787878",
  "#790300",
  "#757a01",
  "#007902",
  "#007778",
  "#010078",
  "#7b0077",
  "#ffffff",
  "#b8b8b8",
  "#ff0000",
  "#ffff00",
  "#00ff01",
  "#00ffff",
  "#0000ff",
  "#ff00fe",
  "#ff9900",
  "#990066",
  "#339966",
  "#0066cc",
  "#663399",
  "#cc6600",
  "#996633",
  "#333333"
];
const PaintApp = () => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [savedImageData, setSavedImageData] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  const startDraw = (e) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (tool === "line" || tool === "rect") {
      setSavedImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };
  const draw = (e) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? lineWidth * 3 : tool === "brush" ? lineWidth * 2 : lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (startPos && savedImageData) {
      ctx.putImageData(savedImageData, 0, 0);
      ctx.beginPath();
      if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (tool === "rect") {
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const handleSave = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "nalluos_paint_artwork.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-h-0 bg-[#f0f0e8] text-xs font-sans select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 px-2 py-1 border-b border-zinc-300 bg-[#eaeae2] text-zinc-700", children: [
      /* @__PURE__ */ jsxs("button", { onClick: handleSave, className: "hover:underline flex items-center gap-1 cursor-pointer", children: [
        /* @__PURE__ */ jsx(Download, { className: "w-3 h-3 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { children: "Save PNG" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: handleClear, className: "hover:underline flex items-center gap-1 cursor-pointer", children: [
        /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3 text-red-600" }),
        /* @__PURE__ */ jsx("span", { children: "Clear Canvas" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex min-h-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-14 bg-[#e4e4dc] border-r border-zinc-300 p-1.5 flex flex-col gap-1 items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setTool("pencil");
            },
            className: `w-9 h-9 flex items-center justify-center rounded border ${tool === "pencil" ? "bg-zinc-300 border-zinc-600 shadow-inner" : "bg-white hover:bg-zinc-100 border-zinc-400"}`,
            title: "Pencil",
            children: /* @__PURE__ */ jsx(Pencil, { className: "w-4 h-4 text-zinc-800" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setTool("brush");
            },
            className: `w-9 h-9 flex items-center justify-center rounded border ${tool === "brush" ? "bg-zinc-300 border-zinc-600 shadow-inner" : "bg-white hover:bg-zinc-100 border-zinc-400"}`,
            title: "Brush",
            children: /* @__PURE__ */ jsx(Brush, { className: "w-4 h-4 text-zinc-800" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setTool("eraser");
            },
            className: `w-9 h-9 flex items-center justify-center rounded border ${tool === "eraser" ? "bg-zinc-300 border-zinc-600 shadow-inner" : "bg-white hover:bg-zinc-100 border-zinc-400"}`,
            title: "Eraser",
            children: /* @__PURE__ */ jsx(Eraser, { className: "w-4 h-4 text-zinc-800" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setTool("line");
            },
            className: `w-9 h-9 flex items-center justify-center rounded border ${tool === "line" ? "bg-zinc-300 border-zinc-600 shadow-inner" : "bg-white hover:bg-zinc-100 border-zinc-400"}`,
            title: "Line",
            children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4 text-zinc-800" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setTool("rect");
            },
            className: `w-9 h-9 flex items-center justify-center rounded border ${tool === "rect" ? "bg-zinc-300 border-zinc-600 shadow-inner" : "bg-white hover:bg-zinc-100 border-zinc-400"}`,
            title: "Rectangle",
            children: /* @__PURE__ */ jsx(Square, { className: "w-4 h-4 text-zinc-800" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-full border-t border-zinc-300 my-1" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 items-center w-full", children: [1, 3, 6, 10].map((w) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              sounds.playClick();
              setLineWidth(w);
            },
            className: `w-8 h-4 flex items-center justify-center rounded ${lineWidth === w ? "bg-zinc-300 border border-zinc-600" : "hover:bg-zinc-200"}`,
            children: /* @__PURE__ */ jsx("div", { className: "bg-black rounded-full", style: { height: `${Math.max(1, w)}px`, width: "16px" } })
          },
          w
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-[#7b889b] p-4 overflow-auto flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "border-2 border-zinc-800 shadow-2xl bg-white", children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          width: 640,
          height: 380,
          onMouseDown: startDraw,
          onMouseMove: draw,
          onMouseUp: stopDraw,
          onMouseLeave: stopDraw,
          className: "cursor-crosshair block"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#e4e4dc] border-t border-zinc-300 p-2 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white p-0.5 bg-white", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full", style: { backgroundColor: color } }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-rows-2 grid-flow-col gap-1", children: PALETTE_COLORS.map((c, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setColor(c);
          },
          className: "w-4 h-4 border border-zinc-500 rounded-xs hover:scale-110 transition cursor-pointer",
          style: { backgroundColor: c }
        },
        i
      )) }),
      /* @__PURE__ */ jsx("span", { className: "text-[11px] text-zinc-500 ml-auto font-mono", children: "640 x 380px" })
    ] })
  ] });
};
export {
  PaintApp
};
