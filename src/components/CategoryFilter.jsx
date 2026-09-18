import React from 'react';
import { Search, Filter, ArrowUpDown, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults
}) {
  return (
    <div className="space-y-3 font-mono">
      {/* Top Search & Sort Row */}
      <div className="card p-3.5 border-slate-800 bg-[#0e1422] flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search protocols, mechanisms, or Program IDs..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#070b14] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-xs hidden sm:inline">
            <strong className="text-cyan-400">{totalResults}</strong> protocols found
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-[#070b14] border border-slate-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 text-xs"
            >
              <option value="tvlDesc">Highest Vault TVL</option>
              <option value="ageAsc">Newest Deployed (Youngest)</option>
              <option value="ageDesc">Most Matured (Oldest)</option>
              <option value="usersDesc">Highest Daily Active Signers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                active
                  ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-[#0e1422] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
