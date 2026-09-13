import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Flag, Bomb } from "lucide-react";
import { sounds } from "../../utils/audio";
const MinesweeperApp = () => {
  const [gridSize, setGridSize] = useState(8);
  const [mineCount, setMineCount] = useState(10);
  const [grid, setGrid] = useState([]);
  const [gameState, setGameState] = useState("idle");
  const [timer, setTimer] = useState(0);
  const [flagsRemaining, setFlagsRemaining] = useState(10);
  const [faceState, setFaceState] = useState("normal");
  const initBoard = (size, mines) => {
    sounds.playClick();
    const newGrid = [];
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        row.push({
          x,
          y,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        });
      }
      newGrid.push(row);
    }
    let placed = 0;
    while (placed < mines) {
      const rx = Math.floor(Math.random() * size);
      const ry = Math.floor(Math.random() * size);
      if (!newGrid[ry][rx].isMine) {
        newGrid[ry][rx].isMine = true;
        placed++;
      }
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (newGrid[y][x].isMine) continue;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < size && nx >= 0 && nx < size && newGrid[ny][nx].isMine) {
              count++;
            }
          }
        }
        newGrid[y][x].neighborMines = count;
      }
    }
    setGrid(newGrid);
    setGameState("idle");
    setTimer(0);
    setFlagsRemaining(mines);
    setFaceState("normal");
  };
  useEffect(() => {
    initBoard(gridSize, mineCount);
  }, [gridSize, mineCount]);
  useEffect(() => {
    let interval;
    if (gameState === "playing") {
      interval = setInterval(() => setTimer((t) => Math.min(999, t + 1)), 1e3);
    }
    return () => clearInterval(interval);
  }, [gameState]);
  const revealCell = (x, y) => {
    if (gameState === "won" || gameState === "lost") return;
    const cell = grid[y][x];
    if (cell.isRevealed || cell.isFlagged) return;
    sounds.playClick();
    if (gameState === "idle") {
      setGameState("playing");
    }
    if (cell.isMine) {
      sounds.playError();
      setGameState("lost");
      setFaceState("dead");
      setGrid(
        (prev) => prev.map(
          (row) => row.map((c) => c.isMine ? { ...c, isRevealed: true } : c)
        )
      );
      return;
    }
    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    const floodFill = (cx, cy) => {
      if (cx < 0 || cx >= gridSize || cy < 0 || cy >= gridSize) return;
      const target = newGrid[cy][cx];
      if (target.isRevealed || target.isFlagged || target.isMine) return;
      target.isRevealed = true;
      if (target.neighborMines === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            floodFill(cx + dx, cy + dy);
          }
        }
      }
    };
    floodFill(x, y);
    setGrid(newGrid);
    let unrevealedSafe = 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!newGrid[r][c].isMine && !newGrid[r][c].isRevealed) {
          unrevealedSafe++;
        }
      }
    }
    if (unrevealedSafe === 0) {
      sounds.playExclamation();
      setGameState("won");
      setFaceState("cool");
    }
  };
  const toggleFlag = (e, x, y) => {
    e.preventDefault();
    if (gameState === "won" || gameState === "lost") return;
    const cell = grid[y][x];
    if (cell.isRevealed) return;
    sounds.playClick();
    if (gameState === "idle") setGameState("playing");
    const nextGrid = grid.map(
      (row) => row.map((c) => {
        if (c.x === x && c.y === y) {
          const nextFlag = !c.isFlagged;
          setFlagsRemaining((prev) => nextFlag ? prev - 1 : prev + 1);
          return { ...c, isFlagged: nextFlag };
        }
        return c;
      })
    );
    setGrid(nextGrid);
  };
  const getNumberColor = (count) => {
    switch (count) {
      case 1:
        return "text-blue-600";
      case 2:
        return "text-emerald-600";
      case 3:
        return "text-red-600";
      case 4:
        return "text-indigo-900";
      case 5:
        return "text-amber-700";
      case 6:
        return "text-teal-600";
      case 7:
        return "text-black";
      case 8:
        return "text-zinc-600";
      default:
        return "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-[#c0c0c0] p-3 flex flex-col items-center justify-center select-none font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2 text-xs", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setGridSize(8);
            setMineCount(10);
          },
          className: `px-2.5 py-1 rounded border ${gridSize === 8 ? "bg-zinc-300 font-bold border-zinc-500" : "bg-zinc-100 hover:bg-zinc-200 border-zinc-400"}`,
          children: "Beginner (8x8)"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setGridSize(12);
            setMineCount(20);
          },
          className: `px-2.5 py-1 rounded border ${gridSize === 12 ? "bg-zinc-300 font-bold border-zinc-500" : "bg-zinc-100 hover:bg-zinc-200 border-zinc-400"}`,
          children: "Intermediate (12x12)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-4 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 p-2 bg-[#c0c0c0] shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-3 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white p-2 mb-2 bg-[#c0c0c0] flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-black text-red-600 font-mono text-xl px-2 py-0.5 font-bold tracking-widest border border-zinc-700 shadow-inner", children: String(Math.max(0, flagsRemaining)).padStart(3, "0") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => initBoard(gridSize, mineCount),
            className: "w-9 h-9 bg-[#c0c0c0] hover:bg-zinc-200 border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 active:border-t-zinc-600 active:border-l-zinc-600 flex items-center justify-center text-xl shadow-xs cursor-pointer",
            children: faceState === "cool" ? "\u{1F60E}" : faceState === "dead" ? "\u{1F635}" : faceState === "scared" ? "\u{1F62E}" : "\u{1F642}"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "bg-black text-red-600 font-mono text-xl px-2 py-0.5 font-bold tracking-widest border border-zinc-700 shadow-inner", children: String(timer).padStart(3, "0") })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "border-3 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white bg-zinc-400",
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
          },
          children: grid.map(
            (row, y) => row.map((cell, x) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => revealCell(x, y),
                onContextMenu: (e) => toggleFlag(e, x, y),
                onMouseDown: () => {
                  if (gameState === "playing") setFaceState("scared");
                },
                onMouseUp: () => {
                  if (gameState === "playing") setFaceState("normal");
                },
                className: `w-7 h-7 flex items-center justify-center font-bold text-sm cursor-pointer select-none transition-colors ${cell.isRevealed ? cell.isMine ? "bg-red-500 border border-zinc-400" : "bg-zinc-200 border border-zinc-300" : "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 active:border-t-zinc-600 active:border-l-zinc-600"}`,
                children: cell.isRevealed ? cell.isMine ? /* @__PURE__ */ jsx(Bomb, { className: "w-4 h-4 text-black fill-black" }) : cell.neighborMines > 0 ? /* @__PURE__ */ jsx("span", { className: getNumberColor(cell.neighborMines), children: cell.neighborMines }) : null : cell.isFlagged ? /* @__PURE__ */ jsx(Flag, { className: "w-3.5 h-3.5 text-red-600 fill-red-600" }) : null
              },
              `${x}-${y}`
            ))
          )
        }
      )
    ] })
  ] });
};
export {
  MinesweeperApp
};
