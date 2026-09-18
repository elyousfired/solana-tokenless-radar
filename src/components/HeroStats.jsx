import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Coins, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  Flame,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { fmtUsd, fmtSol } from '../lib/format';

export default function HeroStats({ stats, onSelectProtocol }) {
  const totalTvl = stats?.totalTvlUsd || 6540000;
  const totalSol = stats?.totalSolLocked || 48920;
  const avgAge = stats?.avgAgeDays || 14.5;
  const dailyBurn = stats?.dailyBurnUsd || 142500;
  const totalTracked = stats?.totalTracked || 8;

  return (
    <section className="card p-6 border-slate-800 bg-gradient-to-b from-[#0e1422] to-[#080d16] relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1.2fr_1fr] gap-8 items-center">
        
        {/* Left: Fresh Protocol Gauge */}
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#1e293b"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#f97316"
                strokeWidth="10"
                strokeDasharray="251.3 251.3"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold font-mono text-white leading-tight">
                {avgAge}d
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                AVG AGE
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
              <span>Zero-Day Micro-Protocols & Flywheels</span>
            </div>
            <div className="text-lg font-bold text-white tracking-tight mt-0.5">
              Early-Stage Solana Hunters
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] leading-relaxed">
              Tracking the freshest experimental primitives (Ember, Stonk, Pons meta) with custom bonding curves, automated burn sinks, and fee loops.
            </p>
            <div className="mt-2.5 flex items-center gap-2 font-mono">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {totalTracked} Fresh Primitives Tracked
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Key Numbers */}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-xs border-y lg:border-y-0 lg:border-x border-slate-800/80 py-4 lg:py-0 lg:px-6 font-mono">
          <dt className="text-slate-400">Total Capital in Fresh Curves</dt>
          <dd className="text-right font-bold text-white text-sm">
            {fmtUsd(totalTvl)}
          </dd>

          <dt className="text-slate-400">SOL in Program Vaults</dt>
          <dd className="text-right font-bold text-cyan-400">
            {fmtSol(totalSol)}
          </dd>

          <dt className="text-slate-400">24h Automated Burn Volume</dt>
          <dd className="text-right font-bold text-orange-400 flex items-center justify-end gap-1">
            <Flame className="w-3 h-3" />
            <span>{fmtUsd(dailyBurn)}/day</span>
          </dd>

          <dt className="text-slate-400">Average Protocol Age</dt>
          <dd className="text-right font-medium text-amber-300">
            {avgAge} Days (Ultra Early)
          </dd>

          <dt className="text-slate-400">Smart Contract Stack</dt>
          <dd className="text-right font-medium text-purple-300">
            Anchor + Token-2022
          </dd>
        </dl>

        {/* Right: Sniper Advantage Checklist */}
        <ul className="grid gap-2 text-xs font-mono">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Custom Bonding Curves</span>
            <span className="text-cyan-400 ml-auto font-bold">Day 1</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Automated Buyback & Burn</span>
            <span className="text-orange-400 ml-auto font-bold">Deflationary</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Zero Dinosaur Protocols</span>
            <span className="text-emerald-400 ml-auto">No 2022 Oldies</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Anchor IDL Bytecode Hunter</span>
            <span className="text-purple-400 ml-auto font-bold">Active</span>
          </li>
        </ul>

      </div>
    </section>
  );
}
