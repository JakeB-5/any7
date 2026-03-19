# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

```bash
npm run build          # Compile TypeScript → dist/
npm run dev            # Run in dev mode with tsx (hot reload)
npm start              # Run compiled output
npx tsc --noEmit       # Type-check without emitting
```

## Architecture

This is a TypeScript CLI dashboard tool using **Ink** (React for terminal UIs).

### Source Structure

- `src/index.tsx` - Entry point. Parses `--location` arg, renders `<Dashboard>`.
- `src/apis/` - Each file exports one async fetch function returning typed data. `index.ts` re-exports all and provides `fetchAllData()` which calls all APIs via `Promise.allSettled` for resilience.
- `src/ui/Dashboard.tsx` - Main React component. Uses `useEffect` for data fetching with auto-refresh (5 min). Renders all panels using box-drawing utility.
- `src/utils/format.ts` - Terminal box drawing, text wrapping, ANSI stripping, star formatting utilities.
- `src/types/index.ts` - Shared TypeScript interfaces (`NasaApod`, `WeatherData`, `GitHubRepo`, `Quote`, `DashboardData`).

### Key Patterns

- **Resilient fetching**: `Promise.allSettled` in `fetchAllData()` ensures one failing API doesn't break the entire dashboard. Each panel handles null data gracefully.
- **NASA fallback**: NASA DEMO_KEY has strict rate limits. The fetcher returns a static fallback on 429 errors rather than failing.
- **wttr.in quirk**: Response nests data under `.data` property. The weather fetcher handles both `raw.data` and direct formats. Requires `User-Agent: curl` header.
- **ESM project**: Uses `"type": "module"` with NodeNext module resolution. All local imports use `.js` extensions.
