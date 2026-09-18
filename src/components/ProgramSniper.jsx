import React, { useState } from 'react';
import { 
  Crosshair, 
  Search, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Flame,
  Layers,
  Code2
} from 'lucide-react';
import { inspectOnChainAddress } from '../services/solanaRpcScanner';

const PRESETS = [
  { label: 'Ember Curve', address: '5dvXTZ5qwgafnHtwu3Ls3QrWx1U4LQsFeCuJgkk4QEC6', icon: '🔥' },
  { label: 'Ember Burn Wallet', address: 'GZjYfGyUNQfDChcQ66Gc3ZMcQqPEisyRYe1nPyQhP9bp', icon: '💰' },
  { label: 'Fragmetric Restake', address: 'fragnAis7Bp6FTsMoa6YcH8UffhEw43Ph79qAiK3iF3', icon: '⚡' },
  { label: 'Meteora DLMM', address: 'LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo', icon: '📦' },
  { label: 'Pump.fun Core', address: '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P', icon: '🎯' }
];

export default function ProgramSniper() {
  const [inputAddress, setInputAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleInspect(targetAddress) {
    const addr = targetAddress || inputAddress;
    if (!addr) return;
    setLoading(true);
    setResult(null);

    const res = await inspectOnChainAddress(addr);
    setResult(res);
    setLoading(false);
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="card p-6 border-slate-800 bg-[#0e1422] font-mono text-xs shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Crosshair className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>On-Chain Program & IDL Sniper</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                Mainnet-Beta RPC Direct
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Paste ANY newly detected Solana Program ID, bonding curve, or fee wallet to inspect its live BPF bytecode & age.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Quick Snipe:</span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setInputAddress(p.address);
                handleInspect(p.address);
              }}
              className="px-2.5 py-1 rounded bg-[#070b14] hover:bg-slate-800 border border-slate-700/80 text-[11px] text-slate-300 hover:text-cyan-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleInspect();
        }}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Paste Solana Program ID, Token Mint, or Treasury Wallet (e.g. 5dvXTZ... or fragnAis...)"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#070b14] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !inputAddress.trim()}
          className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Scanning On-Chain...</span>
            </>
          ) : (
            <>
              <Crosshair className="w-3.5 h-3.5" />
              <span>Inspect On-Chain</span>
            </>
          )}
        </button>
      </form>

      {/* Results View */}
      {result && (
        <div className="mt-4 p-4 rounded-lg bg-[#070b14] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          {result.error ? (
            <div className="flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.error}</span>
            </div>
          ) : !result.exists ? (
            <div className="text-slate-400">
              {result.summary}
            </div>
          ) : (
            <>
              {/* Verdict Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                    result.type === 'BPF_PROGRAM'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      : result.type === 'SPL_MINT'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {result.category}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {result.verdict}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopy(result.address)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Pubkey'}</span>
                  </button>
                  <a
                    href={`https://solscan.io/account/${result.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>View on Solscan</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                {result.type === 'BPF_PROGRAM' && (
                  <>
                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Program Age</span>
                      <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{result.ageText}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 block">Slot #{result.deploySlot}</span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Bytecode Size</span>
                      <span className="text-sm font-bold text-purple-400 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{result.bytecodeKb} KB</span>
                      </span>
                      <span className="text-[10px] text-slate-500 block">Rust/Anchor Binary</span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Upgrade Authority</span>
                      <span className="text-xs font-bold text-slate-200 truncate block" title={result.upgradeAuthority}>
                        {result.upgradeAuthority === 'Renounced (Immutable)' ? '🔒 Renounced' : '🔑 Active Key'}
                      </span>
                      <span className="text-[10px] text-slate-500 block">BPF Loader</span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">SOL in Program</span>
                      <span className="text-sm font-bold text-cyan-400">
                        {result.solBalance} SOL
                      </span>
                      <span className="text-[10px] text-slate-500 block">Rent-Exempt</span>
                    </div>
                  </>
                )}

                {result.type === 'SPL_MINT' && (
                  <>
                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Total Token Supply</span>
                      <span className="text-sm font-bold text-white truncate block">
                        {result.supply}
                      </span>
                      <span className="text-[10px] text-cyan-400 block">{result.decimals} Decimals</span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Mint Authority</span>
                      <span className="text-xs font-bold text-emerald-400 block">
                        {result.mintAuthority.includes('Renounced') ? '🔒 Fixed (Renounced)' : '⚠️ Active Mint'}
                      </span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Freeze Authority</span>
                      <span className="text-xs font-bold text-emerald-400 block">
                        {result.freezeAuthority.includes('Renounced') ? '🛡️ Safe (No Freeze)' : '⚠️ Can Freeze'}
                      </span>
                    </div>

                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Token Standard</span>
                      <span className="text-xs font-bold text-purple-400 block">
                        SPL Token
                      </span>
                    </div>
                  </>
                )}

                {result.type === 'VAULT_OR_WALLET' && (
                  <>
                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800 col-span-2">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Vault Balance</span>
                      <span className="text-base font-bold text-emerald-400">
                        {result.solBalance}
                      </span>
                    </div>
                    <div className="p-3 rounded bg-[#0e1422] border border-slate-800 col-span-2">
                      <span className="text-[10px] text-slate-500 block mb-0.5">Owner Program</span>
                      <span className="text-xs font-mono text-cyan-400 truncate block">
                        {result.owner}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#0e1422] p-3 rounded border border-slate-800/80">
                {result.summary}
              </p>

              {/* Recent On-Chain Signatures */}
              {result.signatures && result.signatures.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Latest On-Chain Transactions ({result.signatures.length})
                  </span>
                  <div className="divide-y divide-slate-800/60 border border-slate-800 rounded bg-[#0e1422]">
                    {result.signatures.map((sig) => (
                      <div key={sig.signature} className="p-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 truncate max-w-[280px] sm:max-w-md">
                          <span className={`w-1.5 h-1.5 rounded-full ${sig.err ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                          <span className="text-slate-300 font-mono truncate">{sig.signature}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-slate-500">{sig.timeAgo}</span>
                          <a
                            href={`https://solscan.io/tx/${sig.signature}`}
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
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
