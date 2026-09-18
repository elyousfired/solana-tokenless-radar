# unminted.sol — Solana Pre-Token Protocol Intelligence Terminal

A real-time on-chain discovery engine and research terminal for **live Solana protocols that have NOT yet launched a token (Pre-TGE)**.

Bypasses the weeks-long manual listing delays of DeFiLlama by scanning Anchor Smart Contracts, Program Derived Address (PDA) vault balances, and security audit releases directly from the Solana blockchain.

## Key Capabilities
1. **Zero-Day Anchor IDL Decoupling**: Automatically queries on-chain Anchor IDLs (`anchor idl fetch <program_id>`) to decode smart contract functions (`deposit`, `borrow`, `liquidate`, `harvest`) so researchers instantly understand what the protocol does.
2. **On-Chain Vault TVL Verification**: Tracks real custody balances held inside Program Derived Addresses (PDAs) with SOL & USDC denominated reserves.
3. **0-Token Mint Verification**: Verifies that the deployer / upgrade authority multisig holds no SPL Token or Token-2022 mint address.
4. **Live On-Chain Anchor Scanner**: Real-time event stream of BPF Loader program deployments and PDA vault balance changes on Solana Mainnet-Beta.
5. **Fundamental Research Dossiers**: Deep technical breakdown of protocol architecture, economic models, seed backers, audit status, and bull-case theses.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Institutional Terminal Dark Theme
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **Solana Connection**: Direct Solana Mainnet JSON-RPC (`getEpochInfo`, `getAccountInfo`)

## Local Development
```bash
npm install
npm run dev
```
Runs live at `http://localhost:5176`.
