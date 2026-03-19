# any7

A beautiful terminal dashboard that aggregates real-time data from multiple public APIs into a single view.

```
╭─ 🌌 NASA Astronomy Picture of the Day ─────────╮
│  Cosmic Cliffs in the Carina Nebula             │
│  Date: 2026-03-19                               │
│  ...                                            │
╰─────────────────────────────────────────────────╯
╭─ 🌤️  Weather ───────────────────────────────────╮
│  Seoul, South Korea                             │
│  ☀️ 9°C  Partly cloudy                          │
│  Humidity: 34%  Wind: 20 km/h                   │
╰─────────────────────────────────────────────────╯
╭─ 🔥 GitHub Trending ────────────────────────────╮
│  1. user/repo ★1.2k TypeScript                  │
│  2. ...                                         │
╰─────────────────────────────────────────────────╯
╭─ 💬 Quote of the Moment ────────────────────────╮
│  "Life is what you make it."                    │
│  — Eleanor Roosevelt                            │
╰─────────────────────────────────────────────────╯
```

## Features

- **NASA APOD** - Astronomy Picture of the Day with title and description
- **Weather** - Real-time weather for any city (default: Seoul)
- **GitHub Trending** - Top 5 trending repositories from the past week
- **Inspirational Quotes** - Random quotes from ZenQuotes
- **Auto-refresh** - Dashboard updates every 5 minutes
- **Resilient** - Graceful fallbacks when APIs are unavailable

## Installation

```bash
npm install -g any7
```

Or run directly:

```bash
npx any7
```

## Usage

```bash
# Default (Seoul weather)
any7

# Custom location
any7 --location "New York"
any7 --location Tokyo
```

## Development

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build
npm run build

# Run built version
npm start
```

## Tech Stack

- **TypeScript** - Type-safe codebase
- **Ink** - React for interactive command-line apps
- **Axios** - HTTP client for API requests
- **Chalk** - Terminal string styling

## APIs Used

| API | Description | Auth |
|-----|-------------|------|
| [NASA APOD](https://api.nasa.gov/) | Astronomy Picture of the Day | DEMO_KEY (free) |
| [wttr.in](https://wttr.in/) | Weather data | None |
| [GitHub Search](https://docs.github.com/en/rest/search) | Repository search | None |
| [ZenQuotes](https://zenquotes.io/) | Inspirational quotes | None |

## License

MIT

---

Built with curiosity and coffee by [anylabs](https://github.com/anylabs).
