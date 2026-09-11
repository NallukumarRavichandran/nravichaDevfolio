import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Key sound trigger
  const playBeep = () => sounds.playClick();

  const handleDigit = (digit: string) => {
    playBeep();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDot = () => {
    playBeep();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    playBeep();
    setDisplay('0');
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    playBeep();
    setDisplay('0');
  };

  const handleBackspace = () => {
    playBeep();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOperator = (nextOp: string) => {
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

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
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
      setDisplay('Invalid input');
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

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDot();
      if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') handleOperator(e.key);
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Escape') handleClear();
      if (e.key === 'Backspace') handleBackspace();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f0f0e8] p-3 select-none text-xs font-sans">
      {/* Menu bar */}
      <div className="flex gap-4 border-b border-zinc-300 pb-1 mb-2 text-zinc-700">
        <span className="hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 rounded cursor-pointer">Help</span>
      </div>

      {/* LCD Display */}
      <div className="bg-white border-2 border-t-zinc-600 border-l-zinc-600 border-b-white border-r-white p-2 mb-3 text-right font-mono text-xl text-black overflow-x-auto shadow-inner tracking-wider font-bold">
        {display}
      </div>

      {/* Memory Indicators and Backspace row */}
      <div className="flex justify-between items-center mb-2 gap-2">
        <div className="w-10 h-7 bg-white border border-zinc-400 flex items-center justify-center font-bold text-zinc-700 shadow-inner">
          {memory !== null ? 'M' : ''}
        </div>
        <div className="flex gap-1 flex-1">
          <button
            onClick={handleBackspace}
            className="flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
          >
            Backspace
          </button>
          <button
            onClick={handleClearEntry}
            className="flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
          >
            CE
          </button>
          <button
            onClick={handleClear}
            className="flex-1 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
          >
            C
          </button>
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-5 gap-1 flex-1">
        {/* Memory buttons */}
        <button
          onClick={() => { playBeep(); setMemory(null); }}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          MC
        </button>
        <button
          onClick={() => handleDigit('7')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          7
        </button>
        <button
          onClick={() => handleDigit('8')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          8
        </button>
        <button
          onClick={() => handleDigit('9')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          9
        </button>
        <button
          onClick={() => handleOperator('/')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          /
        </button>

        <button
          onClick={() => { playBeep(); if (memory !== null) setDisplay(String(memory)); }}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          MR
        </button>
        <button
          onClick={() => handleDigit('4')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          4
        </button>
        <button
          onClick={() => handleDigit('5')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          5
        </button>
        <button
          onClick={() => handleDigit('6')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          6
        </button>
        <button
          onClick={() => handleOperator('*')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          *
        </button>

        <button
          onClick={() => { playBeep(); setMemory(parseFloat(display)); }}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          MS
        </button>
        <button
          onClick={() => handleDigit('1')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          1
        </button>
        <button
          onClick={() => handleDigit('2')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          2
        </button>
        <button
          onClick={() => handleDigit('3')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          3
        </button>
        <button
          onClick={() => handleOperator('-')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          -
        </button>

        <button
          onClick={() => { playBeep(); setMemory((memory || 0) + parseFloat(display)); }}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          M+
        </button>
        <button
          onClick={() => handleDigit('0')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          0
        </button>
        <button
          onClick={handleToggleSign}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          +/-
        </button>
        <button
          onClick={handleDot}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          .
        </button>
        <button
          onClick={() => handleOperator('+')}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-sm active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          +
        </button>

        <button
          onClick={handleSqrt}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-xs active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          sqrt
        </button>
        <button
          onClick={handleInvert}
          className="py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-blue-900 font-bold text-xs active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          1/x
        </button>
        <button
          onClick={handleEquals}
          className="col-span-3 py-2 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-red-700 font-bold text-base active:border-t-2 active:border-l-2 active:border-zinc-600 shadow-xs"
        >
          =
        </button>
      </div>
    </div>
  );
};
