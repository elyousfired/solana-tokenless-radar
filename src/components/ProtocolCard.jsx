import React from 'react';
import { 
  Lock, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Coins, 
  Cpu, 
  BookOpen, 
  Code2, 
  Users,
  Activity,
  ArrowRight
} from 'lucide-react';
import { fmtUsd, fmtSol, fmtCompact } from '../lib/format';

export default function ProtocolCard({ protocol, onOpenModal }) {
  return (
    <div className="card p-5 border-slate-800 bg-[#0e1422] hover:border-slate-700 flex flex-col justify-between transition group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base font-mono tracking-tight group-hover:text-cyan-400 transition">
                {protocol.name}
              </h3>
              <span className="badge-emerald flex items-center gap-1 font-mono text-[10px]">
                <Lock className="w-2.5 h-2.5" />
                <span>NO TOKEN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 line-clamp-1">
              {protocol.tagline}
            </p>
          </div>

          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700 whitespace-nowrap">
            {protocol.category}
          </span>
        </div>

        {/* Traction & TVL Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-[#070b14] border border-slate-800/80 font-mono text-xs mb-3">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Real Vault TVL</span>
            <span className="text-base font-bold text-white">
              {fmtUsd(protocol.tvlUsd)}
            </span>
            <span className="text-[10px] text-cyan-400 block">
              {fmtSol(protocol.vaultSol)}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Contract Age</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{protocol.ageDays} Days Old</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {fmtCompact(protocol.dailyUsers)} daily signers
            </span>
          </div>
        </div>

        {/* What it Does Summary */}
        <div className="mb-3">
          <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
            {protocol.summary}
          </p>
        </div>

        {/* Anchor IDL Instructions Preview */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mb-1.5">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-slate-300">Anchor Instructions Decoded:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {protocol.idlInstructions.slice(0, 3).map((instr) => (
              <span
                key={instr.name}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141c2e] border border-slate-700/80 text-purple-300"
                title={instr.desc}
              >
                {instr.name}()
              </span>
            ))}
            {protocol.idlInstructions.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                +{protocol.idlInstructions.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[150px]">{protocol.auditStatus.split('&')[0]}</span>
        </div>

        <button
          onClick={() => onOpenModal(protocol)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold transition text-xs cursor-pointer"
        >
          <span>Deep Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
