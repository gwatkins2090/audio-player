'use client';

import React, { useState } from 'react';
import { Sliders, RefreshCw } from 'lucide-react';
import Mandala from '@/components/sacred/Mandala';
import FlowerOfLife from '@/components/sacred/FlowerOfLife';

interface PlaygroundProps {
  componentType: 'mandala' | 'flower-of-life';
}

export function InteractivePlayground({ componentType }: PlaygroundProps) {
  // Mandala controls
  const [mandalaSize, setMandalaSize] = useState(300);
  const [mandalaLayers, setMandalaLayers] = useState(6);
  const [mandalaOpacity, setMandalaOpacity] = useState(0.8);
  const [mandalaSpinSeconds, setMandalaSpinSeconds] = useState(60);
  const [mandalaColorA, setMandalaColorA] = useState('#7F39FB');
  const [mandalaColorB, setMandalaColorB] = useState('#00FFD4');

  // Flower of Life controls
  const [folSize, setFolSize] = useState(400);
  const [folRings, setFolRings] = useState(3);
  const [folOpacity, setFolOpacity] = useState(0.6);
  const [folSpinSeconds, setFolSpinSeconds] = useState(80);
  const [folStroke, setFolStroke] = useState('#9b87f5');

  const resetMandala = () => {
    setMandalaSize(300);
    setMandalaLayers(6);
    setMandalaOpacity(0.8);
    setMandalaSpinSeconds(60);
    setMandalaColorA('#7F39FB');
    setMandalaColorB('#00FFD4');
  };

  const resetFlowerOfLife = () => {
    setFolSize(400);
    setFolRings(3);
    setFolOpacity(0.6);
    setFolSpinSeconds(80);
    setFolStroke('#9b87f5');
  };

  const generateCode = () => {
    if (componentType === 'mandala') {
      return `<Mandala
  size={${mandalaSize}}
  layers={${mandalaLayers}}
  opacity={${mandalaOpacity}}
  spinSeconds={${mandalaSpinSeconds}}
  colorA="${mandalaColorA}"
  colorB="${mandalaColorB}"
/>`;
    } else {
      return `<FlowerOfLife
  size={${folSize}}
  rings={${folRings}}
  opacity={${folOpacity}}
  spinSeconds={${folSpinSeconds}}
  stroke="${folStroke}"
/>`;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Preview */}
      <div className="relative">
        <div className="sticky top-24">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border-2 border-[#FF1744] shadow-[0_0_40px_rgba(255,23,68,0.25)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-[#f8fafc]">Live Preview</h3>
              <button
                onClick={componentType === 'mandala' ? resetMandala : resetFlowerOfLife}
                className="px-4 py-2.5 rounded-xl bg-[#1e293b] border-2 border-[#FF1744] text-[#f8fafc] hover:bg-[#FF1744] hover:shadow-[0_0_20px_rgba(255,23,68,0.4)] transition-all duration-300 flex items-center gap-2 font-bold"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
            <div className="h-[400px] flex items-center justify-center">
              {componentType === 'mandala' ? (
                <Mandala
                  size={mandalaSize}
                  layers={mandalaLayers}
                  opacity={mandalaOpacity}
                  spinSeconds={mandalaSpinSeconds}
                  colorA={mandalaColorA}
                  colorB={mandalaColorB}
                />
              ) : (
                <FlowerOfLife
                  size={folSize}
                  rings={folRings}
                  opacity={folOpacity}
                  spinSeconds={folSpinSeconds}
                  stroke={folStroke}
                />
              )}
            </div>
          </div>

          {/* Generated Code */}
          <div className="mt-6 bg-[#0f172a] rounded-xl p-6 border-2 border-[#334155]">
            <h4 className="text-lg font-bold text-[#f8fafc] mb-3">Generated Code</h4>
            <pre className="text-sm text-[#ec4899] font-mono overflow-x-auto leading-relaxed">
              <code>{generateCode()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="w-6 h-6 text-[#FF1744]" />
          <h3 className="text-2xl font-black text-[#f8fafc]">Controls</h3>
        </div>

        {componentType === 'mandala' ? (
          <>
            {/* Size */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Size: <span className="text-[#ec4899]">{mandalaSize}px</span>
              </label>
              <input
                type="range"
                min="100"
                max="500"
                value={mandalaSize}
                onChange={(e) => setMandalaSize(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Layers */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Layers: <span className="text-[#ec4899]">{mandalaLayers}</span>
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={mandalaLayers}
                onChange={(e) => setMandalaLayers(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Opacity */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Opacity: <span className="text-[#ec4899]">{mandalaOpacity.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={mandalaOpacity}
                onChange={(e) => setMandalaOpacity(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Spin Speed */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Spin Duration: <span className="text-[#ec4899]">{mandalaSpinSeconds}s</span>
              </label>
              <input
                type="range"
                min="10"
                max="120"
                value={mandalaSpinSeconds}
                onChange={(e) => setMandalaSpinSeconds(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Color A */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Color A
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={mandalaColorA}
                  onChange={(e) => setMandalaColorA(e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-[#FF1744]"
                />
                <input
                  type="text"
                  value={mandalaColorA}
                  onChange={(e) => setMandalaColorA(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#0f172a] border-2 border-[#334155] rounded-lg text-[#f8fafc] font-mono font-bold focus:border-[#FF1744] focus:outline-none"
                />
              </div>
            </div>

            {/* Color B */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Color B
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={mandalaColorB}
                  onChange={(e) => setMandalaColorB(e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-[#FF1744]"
                />
                <input
                  type="text"
                  value={mandalaColorB}
                  onChange={(e) => setMandalaColorB(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#0f172a] border-2 border-[#334155] rounded-lg text-[#f8fafc] font-mono font-bold focus:border-[#FF1744] focus:outline-none"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Flower of Life Controls */}
            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Size: <span className="text-[#ec4899]">{folSize}px</span>
              </label>
              <input
                type="range"
                min="200"
                max="600"
                value={folSize}
                onChange={(e) => setFolSize(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Rings: <span className="text-[#ec4899]">{folRings}</span>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={folRings}
                onChange={(e) => setFolRings(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Opacity: <span className="text-[#ec4899]">{folOpacity.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={folOpacity}
                onChange={(e) => setFolOpacity(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Spin Duration: <span className="text-[#ec4899]">{folSpinSeconds}s</span>
              </label>
              <input
                type="range"
                min="20"
                max="150"
                value={folSpinSeconds}
                onChange={(e) => setFolSpinSeconds(Number(e.target.value))}
                className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="bg-[#1e293b] rounded-xl p-5 border-2 border-[#334155] hover:border-[#FF1744] transition-all duration-300">
              <label className="block text-base font-bold text-[#f8fafc] mb-3">
                Stroke Color
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={folStroke}
                  onChange={(e) => setFolStroke(e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-[#FF1744]"
                />
                <input
                  type="text"
                  value={folStroke}
                  onChange={(e) => setFolStroke(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#0f172a] border-2 border-[#334155] rounded-lg text-[#f8fafc] font-mono font-bold focus:border-[#FF1744] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

