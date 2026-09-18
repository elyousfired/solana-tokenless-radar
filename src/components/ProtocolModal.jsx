import React from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Code2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Coins, 
  Clock,
  BookOpen,
  ArrowUpRight,
  GitFork
} from 'lucide-react';
import { fmtUsd, fmtSol } from '../lib/format';

export default function ProtocolModal({ protocol, onClose }) {
  if (!protocol) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl card border-slate-700 bg-[#0e1422] shadow-2xl p-6 my-8 max-h-[90vh] overflow-y-auto font-mono text-xs">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge-emerald flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" />
              <span>{protocol.tokenStatus}</span>
            </span>
            <span className="badge-cyan">{protocol.category}</span>
            <span className="text-slate-500 text-[11px]">{protocol.framework}</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            {protocol.name}
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            {protocol.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
            <a
              href={protocol.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold transition"
            >
              <span>Launch dApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://solscan.io/account/${protocol.programId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition"
            >
              <span>Solscan Program</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {protocol.github && (
              <a
                href={protocol.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-white transition"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <span className="text-slate-500">{protocol.twitter}</span>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800">
            <span className="text-slate-400 text-[10px] block mb-1">Vault TVL</span>
            <span className="text-base font-bold text-white">{fmtUsd(protocol.tvlUsd)}</span>
            <span className="text-[10px] text-cyan-400 block">{fmtSol(protocol.vaultSol)}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800">
            <span className="text-slate-400 text-[10px] block mb-1">Deployment Age</span>
            <span className="text-base font-bold text-amber-400">{protocol.ageDays} Days</span>
            <span className="text-[10px] text-slate-500 block">Mainnet-Beta</span>
          </div>
          <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800">
            <span className="text-slate-400 text-[10px] block mb-1">Security Audit</span>
            <span className="text-xs font-bold text-emerald-400">{protocol.auditStatus}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800">
            <span className="text-slate-400 text-[10px] block mb-1">Backing & Seed</span>
            <span className="text-xs font-medium text-slate-200">{protocol.funding}</span>
          </div>
        </div>

        {/* Deep Fundamental Breakdown */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Mechanism & Architecture</span>
            </h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#070b14] p-3.5 rounded-lg border border-slate-800">
              {protocol.summary}
            </p>
          </div>

          {/* Anchor IDL Instructions Table */}
          <div>
            <h4 className="text-xs uppercase font-bold text-purple-400 tracking-wider mb-1.5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>On-Chain Anchor IDL Instructions (Functions)</span>
            </h4>
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#070b14] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Instruction Name</th>
                    <th className="py-2 px-3 font-semibold">Execution Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-[#0b101c]">
                  {protocol.idlInstructions.map((instr) => (
                    <tr key={instr.name} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-bold text-purple-300">{instr.name}()</td>
                      <td className="py-2 px-3 text-slate-300 font-sans">{instr.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Thesis & Risks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Bull Case (Fundamental Edge)</span>
              </h5>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {protocol.bullCase}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-500/5 border border-rose-500/20">
              <h5 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Key Risks & Fragility</span>
              </h5>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {protocol.risks}
              </p>
            </div>
          </div>

          {/* How to study */}
          <div className="p-3.5 rounded-lg bg-[#070b14] border border-slate-800">
            <h5 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
              How to Study & Test this Protocol:
            </h5>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {protocol.howToStudy}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <a
            href={protocol.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs transition shadow-lg shadow-cyan-500/20"
          >
            <span>Visit {protocol.name} Official Website</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
