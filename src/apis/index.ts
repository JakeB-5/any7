import type { DashboardData } from '../types/index.js';
import { fetchNasaApod } from './nasa.js';
import { fetchWeather } from './weather.js';
import { fetchGitHubTrending } from './github.js';
import { fetchQuote } from './quotes.js';

export async function fetchAllData(weatherLocation = 'Seoul'): Promise<DashboardData> {
  const [nasa, weather, github, quote] = await Promise.allSettled([
    fetchNasaApod(),
    fetchWeather(weatherLocation),
    fetchGitHubTrending(5),
    fetchQuote(),
  ]);

  return {
    nasa: nasa.status === 'fulfilled' ? nasa.value : null,
    weather: weather.status === 'fulfilled' ? weather.value : null,
    github: github.status === 'fulfilled' ? github.value : [],
    quote: quote.status === 'fulfilled' ? quote.value : null,
  };
}

export { fetchNasaApod, fetchWeather, fetchGitHubTrending, fetchQuote };
