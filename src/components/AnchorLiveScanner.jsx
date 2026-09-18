import React, { useState, useEffect } from 'react';
import { Radio, ExternalLink, ShieldCheck, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { generateLiveDetectionFeed } from '../services/solanaRpcScanner';

export default function AnchorLiveScanner() {
  const [events, setEvents] = useState(generateLiveDetectionFeed());

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(generateLiveDetectionFeed());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-5 border-slate-800 bg-[#0e1422] font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <span>Live On-Chain Anchor Program & PDA Vault Feed</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              RPC Direct
            </span>
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Listening to BPFLoaderUpgradeab1e</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-3 rounded-lg bg-[#070b14] border border-slate-800 hover:border-slate-700 transition space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                ev.type === 'VAULT_DEPOSIT'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}>
                {ev.type === 'VAULT_DEPOSIT' ? 'Vault Deposit' : 'New Program Deploy'}
              </span>
              <span className="text-[10px] text-slate-500">{ev.timeAgo}</span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-bold text-white text-xs">{ev.programName}</span>
              <span className="text-emerald-400 font-bold text-xs">{ev.amount}</span>
            </div>

            <div className="text-[11px] text-purple-300 font-mono truncate">
              {ev.instruction}()
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Signer: {ev.signer}</span>
              <a
                href={`https://solscan.io/account/${ev.programId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-0.5"
              >
                <span>Solscan</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
