# StreamScout 🎬

Find where to stream any movie or TV show. Search for titles, see posters, descriptions, ratings, and — most importantly — which streaming services carry each title.

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and the free [TMDB API](https://www.themoviedb.org/documentation/api).

## Getting Started

### 1. Get a TMDB API Key (free)

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API** and request an API key
3. Copy your **API Key (v3 auth)**

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your TMDB API key.

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Search** movies and TV shows by title
- **Trending** — 5 featured movies and 5 featured TV shows on the home page
- **Detail pages** with poster, description, genres, rating, and runtime/seasons
- **Streaming providers** — see which services (Netflix, Disney+, etc.) carry each title
- Dark theme, responsive design
- No login required

## Streaming Data

Streaming availability is powered by [JustWatch](https://www.justwatch.com/) via TMDB. It defaults to US providers (falls back to SE). The data includes:

- **Stream** — included with subscription
- **Free with Ads** — ad-supported
- **Rent** — available to rent
- **Buy** — available to purchase
