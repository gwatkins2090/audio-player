'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RadioPlayer from '@/components/RadioPlayer';
import { ArrowLeft, Radio as RadioIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RadioPage() {
  const [currentStation] = useState({
    streamUrl: 'https://raw.githubusercontent.com/gwatkins2090/radio-stream/main/District%20%26%20Sleeper%20-%20Transitions%20%5BCHST017%5D.mp3',
    title: 'Live Radio Stream',
    station: 'Spirit Tech Radio',
    artwork: undefined,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7F39FB]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF1744]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b-2 border-[#FF1744]/30 bg-[#1e293b]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 hover:bg-[#334155] rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,23,68,0.3)] flex items-center gap-2 text-[#94a3b8] hover:text-[#FF1744]"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-semibold">Back</span>
                </motion.button>
              </Link>
              
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <RadioIcon className="w-8 h-8 text-[#FF1744]" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-[#FF1744] via-[#ec4899] to-[#7F39FB] bg-clip-text text-transparent">
                    Radio Player
                  </h1>
                  <p className="text-[#94a3b8] text-sm">Live streaming audio player</p>
                </div>
              </div>
            </div>

            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-[#FF1744]/10 border border-[#FF1744]/30 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-[#FF1744]" />
              <span className="text-[#FF1744] text-sm font-bold">LIVE</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <RadioPlayer
            streamUrl={currentStation.streamUrl}
            title={currentStation.title}
            station={currentStation.station}
            artwork={currentStation.artwork}
            showVisualizer={true}
            showEqualizer={true}
            autoPlay={false}
            onPlay={() => console.log('Radio started playing')}
            onPause={() => console.log('Radio paused')}
            onError={(error) => console.error('Radio error:', error)}
          />

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-[#FF1744]/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7F39FB] to-[#985EFF] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Real-time Visualizer</h3>
              <p className="text-[#94a3b8] text-sm">Dynamic frequency visualization with stunning animations</p>
            </div>

            <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-[#FF1744]/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF1744] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">5-Band Equalizer</h3>
              <p className="text-[#94a3b8] text-sm">Professional audio control with customizable EQ settings</p>
            </div>

            <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-[#FF1744]/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#00FFD4] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Auto-Reconnect</h3>
              <p className="text-[#94a3b8] text-sm">Seamless recovery from network interruptions</p>
            </div>
          </motion.div>

          {/* Tech Stack Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-[#94a3b8] text-sm">
              Built with <span className="text-[#FF1744] font-semibold">Web Audio API</span> • 
              <span className="text-[#7F39FB] font-semibold"> HTML5 Audio</span> • 
              <span className="text-[#00D4FF] font-semibold"> Canvas Visualization</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-[#FF1744]/20 bg-[#1e293b]/30 backdrop-blur-xl py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#94a3b8] text-sm">
            🎧 Enjoy high-quality audio streaming with advanced controls
          </p>
        </div>
      </div>
    </div>
  );
}

