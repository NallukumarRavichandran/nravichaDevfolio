import React from 'react';
import { sounds } from '../utils/audio';

interface TurnedOffScreenProps {
  onPowerOn: () => void;
}

export const TurnedOffScreen: React.FC<TurnedOffScreenProps> = ({ onPowerOn }) => {
  const handleTurnOn = () => {
    sounds.playStartup();
    onPowerOn();
  };

  return (
    <div className="fixed inset-0 z-[10001] bg-black text-amber-500 font-sans flex flex-col items-center justify-center p-8 select-none text-center">
      <div className="max-w-md space-y-6">
        <div className="text-4xl filter drop-shadow-md">💻</div>
        <h1 className="text-xl font-bold text-amber-400 tracking-wide font-mono">
          It is now safe to turn off your computer.
        </h1>
        <p className="text-xs text-zinc-500 font-mono">
          All services and background workers have safely unmounted.
        </p>

        <div className="pt-4">
          <button
            onClick={handleTurnOn}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-full shadow-lg flex items-center gap-2 mx-auto cursor-pointer active:scale-95 transition-all"
          >
            <span>⏻</span>
            <span>Power On System</span>
          </button>
        </div>
      </div>
    </div>
  );
};
