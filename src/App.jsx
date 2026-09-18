import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroStats from './components/HeroStats';
import CategoryFilter from './components/CategoryFilter';
import ProtocolCard from './components/ProtocolCard';
import ProtocolModal from './components/ProtocolModal';
import AnchorLiveScanner from './components/AnchorLiveScanner';
import ProgramSniper from './components/ProgramSniper';
import { SOLANA_TOKENLESS_PROTOCOLS, PRE_TOKEN_STATS } from './data/solanaTokenlessDatabase';
import { fetchSolanaClusterStats } from './services/solanaRpcScanner';
import { Radar, ExternalLink, ShieldCheck, Sparkles, Filter, Lock } from 'lucide-react';

export default function App() {
  const [clusterStats, setClusterStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('tvlDesc');
  const [activeModalProtocol, setActiveModalProtocol] = useState(null);

  useEffect(() => {
    fetchSolanaClusterStats().then(setClusterStats);
    const interval = setInterval(() => {
      fetchSolanaClusterStats().then(setClusterStats);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    SOLANA_TOKENLESS_PROTOCOLS.forEach(p => {
      if (!cats.includes(p.category)) cats.push(p.category);
    });
    return cats;
  }, []);

  const filteredProtocols = useMemo(() => {
    return SOLANA_TOKENLESS_PROTOCOLS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.programId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'tvlDesc') return b.tvlUsd - a.tvlUsd;
      if (sortBy === 'ageAsc') return a.ageDays - b.ageDays;
      if (sortBy === 'ageDesc') return b.ageDays - a.ageDays;
      if (sortBy === 'usersDesc') return b.dailyUsers - a.dailyUsers;
      return b.tvlUsd - a.tvlUsd;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header
        clusterStats={clusterStats}
        totalTracked={PRE_TOKEN_STATS.totalTracked}
        totalTvlUsd={PRE_TOKEN_STATS.totalTvlUsd}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 1. Hero Section: Fresh Protocol & Flywheel Gauge */}
        <HeroStats
          stats={PRE_TOKEN_STATS}
          onSelectProtocol={(proto) => setActiveModalProtocol(proto)}
        />

        {/* 2. Interactive On-Chain Program & IDL Sniper */}
        <ProgramSniper />

        {/* 3. Live On-Chain Anchor & PDA Vault Activity Feed */}
        <AnchorLiveScanner />

        {/* 3. Filter Bar & Search */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProtocols.length}
        />

        {/* 4. Protocol Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onOpenModal={(proto) => setActiveModalProtocol(proto)}
            />
          ))}
        </div>

        {filteredProtocols.length === 0 && (
          <div className="card p-12 text-center border-slate-800 bg-[#0e1422] font-mono text-xs text-slate-400">
            No pre-token protocols match your search criteria.
          </div>
        )}
      </main>

      {/* Protocol Research Dossier Modal */}
      {activeModalProtocol && (
        <ProtocolModal
          protocol={activeModalProtocol}
          onClose={() => setActiveModalProtocol(null)}
        />
      )}

      {/* Footer in Arc Theme */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] mt-16 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold">
              🔮
            </span>
            <div>
              <p className="text-white font-bold text-sm">unminted.sol — Solana Pre-Token Intelligence Terminal</p>
              <p className="text-[11px] text-slate-500">Zero-Day Anchor IDL & Program Vault Discovery</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <span>Solana.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://solana.fm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <span>SolanaFM IDL Index</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://squads.so"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <span>Squads Multisig</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
