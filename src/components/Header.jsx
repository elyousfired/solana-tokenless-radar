import React from 'react';
import { 
  Radar, 
  Terminal, 
  ExternalLink, 
  Activity, 
  Layers, 
  Sparkles, 
  Search,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function Header({ clusterStats, totalTracked, totalTvlUsd }) {
  const epoch = clusterStats?.epoch || 684;
  const tps = clusterStats?.tps || 2950;
  const solPrice = clusterStats?.solPrice || 112.50;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070b14]/95 backdrop-blur-md">
      {/* Top Network Ticker */}
      <div className="border-b border-slate-800/60 bg-[#05080f] px-4 sm:px-6 py-1.5 text-xs font-mono flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Solana Network:</span>
            <span className="font-bold text-white">Mainnet-Beta</span>
            <span className="text-emerald-400 font-bold">({tps} TPS)</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Epoch:</span>
            <span className="font-bold text-cyan-400">#{epoch}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">SOL/USD:</span>
            <span className="font-bold text-amber-400">${solPrice.toFixed(2)}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden md:block" />

          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Anchor IDL Parser:</span>
            <span className="font-bold text-purple-300">Active (v0.30)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold">
            Zero-Token Intelligence
          </span>
          <a
            href="https://explorer.solana.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition"
          >
            <span>Solana Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Radar className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white font-mono tracking-tight">unminted.sol</span>
              <span className="border border-cyan-500/30 bg-cyan-500/10 rounded px-1.5 py-0.2 text-[10px] text-cyan-400 font-bold font-mono">
                PRE-TOKEN RADAR
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Solana Protocol Discovery & Anchor IDL Intelligence
            </p>
          </div>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1 rounded-lg bg-[#0e1422] border border-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Tracked Protocols:</span>
            <span className="font-bold text-white">{totalTracked} Active</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0e1422] border border-slate-800">
            <span className="text-slate-400">Total Pre-Token TVL:</span>
            <span className="font-bold text-cyan-400">${(totalTvlUsd / 1e6).toFixed(1)}M</span>
          </div>
        </div>
      </div>
    </header>
  );
}
