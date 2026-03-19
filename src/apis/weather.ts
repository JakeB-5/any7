import axios from 'axios';
import type { WeatherData } from '../types/index.js';

const WTTR_URL = 'https://wttr.in';

export async function fetchWeather(location = 'Seoul'): Promise<WeatherData> {
  const { data: raw } = await axios.get(`${WTTR_URL}/${encodeURIComponent(location)}`, {
    params: { format: 'j1' },
    timeout: 10000,
    headers: { 'User-Agent': 'curl/7.0' },
  });

  // wttr.in may nest under .data
  const data = raw?.data ?? raw;
  const current = data.current_condition?.[0];
  const area = data.nearest_area?.[0];

  const locationName = area?.areaName?.[0]?.value ?? location;
  const country = area?.country?.[0]?.value ?? '';

  return {
    location: country ? `${locationName}, ${country}` : locationName,
    temperature: Number(current?.temp_C ?? 0),
    description: current?.weatherDesc?.[0]?.value ?? 'Unknown',
    humidity: Number(current?.humidity ?? 0),
    wind: Number(current?.windspeedKmph ?? 0),
  };
}
