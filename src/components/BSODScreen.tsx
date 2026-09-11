import React, { useEffect } from 'react';
import { sounds } from '../utils/audio';

interface BSODScreenProps {
  onRecover: () => void;
}

export const BSODScreen: React.FC<BSODScreenProps> = ({ onRecover }) => {
  useEffect(() => {
    sounds.playError();

    const handleKeyDown = () => {
      sounds.playStartup();
      onRecover();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRecover]);

  return (
    <div
      onClick={() => {
        sounds.playStartup();
        onRecover();
      }}
      className="fixed inset-0 z-[100000] bg-[#0000aa] text-white font-mono p-6 md:p-12 select-none overflow-y-auto cursor-pointer"
      style={{ fontFamily: '"Lucida Console", "Courier New", monospace' }}
    >
      <div className="max-w-3xl mx-auto space-y-4 text-xs md:text-sm leading-relaxed">
        <div className="bg-[#aaaaaa] text-[#0000aa] inline-block px-2 py-0.5 font-bold mb-4">
          *** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A89) ***
        </div>

        <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>

        <p className="font-bold">DRIVER_IRQL_NOT_LESS_OR_EQUAL</p>

        <p>
          If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:
        </p>

        <p>
          Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.
        </p>

        <p>
          If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing.
        </p>

        <div className="pt-4 border-t border-blue-400/40">
          <p className="font-bold">Technical Information:</p>
          <p>*** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A89)</p>
          <p>*** nallu_kernel.sys - Address F86B5A89 base at F86B2000, DateStamp 3d6dd67c</p>
        </div>

        <div className="pt-4 space-y-1 text-[#ffff55]">
          <p>Beginning dump of physical memory...</p>
          <p>Physical memory dump complete.</p>
          <p className="font-bold animate-pulse">
            Press any key or click anywhere on screen to restart NalluOS...
          </p>
        </div>
      </div>
    </div>
  );
};
