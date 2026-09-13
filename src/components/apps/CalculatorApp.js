import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { sounds } from "../../utils/audio";
const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const playBeep = () => sounds.playClick();
  const handleDigit = (digit) => {
    playBeep();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };
  const handleDot = () => {
    playBeep();
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };
  const handleClear = () => {
    playBeep();
    setDisplay("0");
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(false);
  };
  const handleClearEntry = () => {
    playBeep();
    setDisplay("0");
  };
  const handleBackspace = () => {
    playBeep();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };
  const handleOperator = (nextOp) => {
    playBeep();
    const inputValue = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentVal = prevValue || 0;
      const result = calculate(currentVal, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }
    setWaitingForOperand(true);
    setOperator(nextOp);
  };
  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };
  const handleEquals = () => {
    playBeep();
    const inputValue = parseFloat(display);
    if (operator && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };
  const handleSqrt = () => {
    playBeep();
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
      setWaitingForOperand(true);
    } else {
      sounds.playError();
      setDisplay("Invalid input");
    }
  };
  const handleInvert = () => {
    playBeep();
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(1 / val));
      setWaitingForOperand(true);
    }
  };
  const handleToggleSign = () => {
    playBeep();
    setDisplay(String(parseFloat(display) * -1));
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      if (e.key === ".") handleDot();
      if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") handleOperator(e.key);
      if (e.key === "Enter" || e.key === "=") handleEquals();
      if (e.key === "Escape") handleClear();
      if (e.key === "Backspace") handleBackspace();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col bg-[#f0f0e8] p-3 select-none text-xs font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 border-b border-zinc-300 pb-1 mb-2 text-zinc-700", children: [
      /* @__PURE__ */ jsx("span", { className: "hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer", children: "Edit" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer", children: "View" }),
      /* @__PURE__ */ jsx("span", { className: "hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer", children: "Help" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-2 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white p-2 mb-3 text-right font-mono text-xl text-black overflow-x-auto shadow-inner tracking-wider font-bold", children: display }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2 gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-7 bg-white border border-zinc-400 flex items-center justify-center font-bold text-zinc-700 shadow-inner", children: memory !== null ? "M" : "" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleBackspace,
            className: "flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
            children: "Backspace"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClearEntry,
            className: "flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
            children: "CE"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClear,
            className: "flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
            children: "C"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-1 flex-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            playBeep();
            setMemory(null);
          },
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "MC"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("7"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "7"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("8"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "8"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("9"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "9"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleOperator("/"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "/"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            playBeep();
            if (memory !== null) setDisplay(String(memory));
          },
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "MR"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("4"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("5"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "5"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("6"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "6"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleOperator("*"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "*"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            playBeep();
            setMemory(parseFloat(display));
          },
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "MS"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("1"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "1"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("2"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "2"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("3"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "3"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleOperator("-"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "-"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            playBeep();
            setMemory((memory || 0) + parseFloat(display));
          },
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "M+"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDigit("0"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "0"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleToggleSign,
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "+/-"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDot,
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "."
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleOperator("+"),
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "+"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSqrt,
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-xs active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "sqrt"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleInvert,
          className: "py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-xs active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "1/x"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleEquals,
          className: "col-span-3 py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-base active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs",
          children: "="
        }
      )
    ] })
  ] });
};
export {
  CalculatorApp
};
