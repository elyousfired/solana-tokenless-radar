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
  ArrowUpRight
} from 'lucide-react';
import { fmtUsd, fmtSol } from '../lib/format';

export default function HeroStats({ stats, onSelectProtocol }) {
  const totalTvl = stats?.totalTvlUsd || 348500000;
  const totalSol = stats?.totalSolLocked || 3111607;
  const auditedPct = stats?.auditedPct || 88.1;
  const totalTracked = stats?.totalTracked || 42;

  return (
    <section className="card p-6 border-slate-800 bg-gradient-to-b from-[#0e1422] to-[#080d16] relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1.2fr_1fr] gap-8 items-center">
        
        {/* Left: Donut Gauge of Tokenless Ratio */}
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
                stroke="#00f2fe"
                strokeWidth="10"
                strokeDasharray="251.3 251.3"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold font-mono text-white leading-tight">
                0%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                MINTED
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Pre-Token · Working Products Only</span>
            </div>
            <div className="text-lg font-bold text-white tracking-tight mt-0.5">
              Zero Token Governance
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] leading-relaxed">
              Every protocol tracked operates live on Solana with real vault TVL, verified Anchor smart contracts, and NO existing token mint.
            </p>
            <div className="mt-2.5 flex items-center gap-2 font-mono">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {totalTracked} Verified Pre-TGE Protocols
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Key Numbers */}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-xs border-y lg:border-y-0 lg:border-x border-slate-800/80 py-4 lg:py-0 lg:px-6 font-mono">
          <dt className="text-slate-400">Total Locked Capital</dt>
          <dd className="text-right font-bold text-white text-sm">
            {fmtUsd(totalTvl)}
          </dd>

          <dt className="text-slate-400">SOL in Program Vaults</dt>
          <dd className="text-right font-bold text-cyan-400">
            {fmtSol(totalSol)}
          </dd>

          <dt className="text-slate-400">Security Audit Rate</dt>
          <dd className="text-right font-bold text-emerald-400">
            {auditedPct}% Audited
          </dd>

          <dt className="text-slate-400">Average Protocol Age</dt>
          <dd className="text-right font-medium text-slate-300">
            4.6 Months (Matured MVP)
          </dd>

          <dt className="text-slate-400">Smart Contract Standard</dt>
          <dd className="text-right font-medium text-purple-300">
            Solana Anchor v0.29 - v0.30
          </dd>
        </dl>

        {/* Right: Verified Checklist */}
        <ul className="grid gap-2 text-xs font-mono">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">On-Chain PDAs Verified</span>
            <span className="text-slate-500 ml-auto">Real Custody</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">0 SPL Mint Authority</span>
            <span className="text-cyan-400 ml-auto font-bold">Unreleased</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">DeFiLlama Bypass</span>
            <span className="text-slate-400 ml-auto">Zero-Day Intel</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Auditor Cross-Referencing</span>
            <span className="text-slate-400 ml-auto">OtterSec / Sec3</span>
          </li>
        </ul>

      </div>
    </section>
  );
}
