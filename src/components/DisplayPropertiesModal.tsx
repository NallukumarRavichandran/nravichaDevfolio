import React, { useState } from 'react';
import { X, Check, Monitor } from 'lucide-react';
import { WALLPAPERS } from '../data/wallpapers';
import { WallpaperOption } from '../types';
import { sounds } from '../utils/audio';

interface DisplayPropertiesModalProps {
  currentWallpaper: WallpaperOption;
  onSelectWallpaper: (wp: WallpaperOption) => void;
  onClose: () => void;
}

export const DisplayPropertiesModal: React.FC<DisplayPropertiesModalProps> = ({
  currentWallpaper,
  onSelectWallpaper,
  onClose
}) => {
  const [selected, setSelected] = useState<WallpaperOption>(currentWallpaper);
  const [activeTab, setActiveTab] = useState<'desktop' | 'appearance' | 'settings'>('desktop');

  const handleApply = () => {
    sounds.playClick();
    onSelectWallpaper(selected);
  };

  const handleOk = () => {
    sounds.playClick();
    onSelectWallpaper(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/30 backdrop-blur-[1px] select-none">
      <div className="w-[430px] max-w-[95vw] bg-[#f0f0e8] border-[3px] border-[#0058e6] rounded-t-lg shadow-2xl flex flex-col font-sans text-xs">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#2d8eff] to-[#0058e6] p-1.5 flex justify-between items-center text-white font-bold">
          <div className="flex items-center gap-1.5 pl-1">
            <Monitor className="w-3.5 h-3.5 text-sky-200" />
            <span>Display Properties</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded border border-red-700 shadow-sm"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex gap-1 border-b border-zinc-300 px-2 pt-2 bg-[#eaeae2] text-zinc-800">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('desktop');
            }}
            className={`px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${
              activeTab === 'desktop'
                ? 'bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]'
                : 'bg-[#dadad0] border-transparent hover:bg-zinc-200'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('appearance');
            }}
            className={`px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${
              activeTab === 'appearance'
                ? 'bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]'
                : 'bg-[#dadad0] border-transparent hover:bg-zinc-200'
            }`}
          >
            Appearance
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('settings');
            }}
            className={`px-3 py-1.5 rounded-t-md font-bold text-xs border-t border-l border-r ${
              activeTab === 'settings'
                ? 'bg-[#f0f0e8] border-zinc-400 border-b-transparent -mb-[1px]'
                : 'bg-[#dadad0] border-transparent hover:bg-zinc-200'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex-1 bg-[#f0f0e8] space-y-3">
          {activeTab === 'desktop' && (
            <>
              {/* Retro CRT Monitor with Wallpaper Preview */}
              <div className="flex justify-center">
                <div className="w-48 h-36 bg-[#4a4f55] rounded-xl p-2.5 shadow-md flex flex-col items-center justify-between border-2 border-zinc-600">
                  {/* CRT Screen Bezel */}
                  <div
                    className="w-full h-24 rounded-md border-2 border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center relative"
                    style={{
                      ...selected.style,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-[10px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      NalluOS XP
                    </span>
                  </div>
                  {/* Monitor Stand */}
                  <div className="w-12 h-2.5 bg-zinc-500 rounded-b-xs border border-zinc-700 -mb-1" />
                </div>
              </div>

              {/* Wallpaper List */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Background:</label>
                <div className="bg-white border border-zinc-400 rounded p-1 max-h-32 overflow-y-auto space-y-0.5">
                  {WALLPAPERS.map(wp => {
                    const isPicked = selected.id === wp.id;
                    return (
                      <button
                        key={wp.id}
                        onClick={() => {
                          sounds.playClick();
                          setSelected(wp);
                        }}
                        className={`w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer ${
                          isPicked
                            ? 'bg-[#0a246a] text-white font-bold'
                            : 'hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-3 rounded-xs border border-zinc-400 shrink-0"
                            style={{ background: wp.thumbnailGradient }}
                          />
                          <span className="truncate">{wp.name}</span>
                        </div>
                        {isPicked && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-3">
              <p className="text-zinc-600">Choose the style for windows, buttons, and menus:</p>
              <div className="border border-zinc-300 bg-white p-3 rounded space-y-2">
                <div>
                  <label className="font-bold text-zinc-700">Windows and buttons:</label>
                  <div className="mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-bold text-blue-900">
                    Windows XP style (Luna)
                  </div>
                </div>
                <div>
                  <label className="font-bold text-zinc-700">Color scheme:</label>
                  <div className="mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-semibold text-zinc-800">
                    Default (Blue)
                  </div>
                </div>
                <div>
                  <label className="font-bold text-zinc-700">Font size:</label>
                  <div className="mt-1 p-1.5 bg-zinc-100 border border-zinc-300 rounded font-semibold text-zinc-800">
                    Normal (Tahoma 11pt)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-3">
              <div className="border border-zinc-300 bg-white p-3 rounded">
                <h4 className="font-bold text-zinc-800 mb-2">Display Mode</h4>
                <p className="text-zinc-600 leading-relaxed">
                  Screen resolution is auto-adaptive to your viewport. Supports 4K, retina desktop monitors, tablet landscape, and responsive mobile displays.
                </p>
                <div className="mt-3 text-[10px] text-zinc-500 font-mono">
                  Color Quality: Highest (32 bit) • Refresh Rate: 60Hz - 144Hz
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="bg-[#eaeae2] p-2.5 border-t border-zinc-300 flex justify-end gap-2">
          <button
            onClick={handleOk}
            className="px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800"
          >
            OK
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-1.5 bg-[#f0f0e8] hover:bg-zinc-200 border-t border-l border-white border-b-2 border-r-2 border-zinc-600 rounded text-xs font-bold text-zinc-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
