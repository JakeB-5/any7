import axios from 'axios';
import type { NasaApod } from '../types/index.js';

const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchNasaApod(): Promise<NasaApod> {
  const apiKey = process.env.NASA_API_KEY ?? 'DEMO_KEY';
  const { data } = await axios.get(NASA_APOD_URL, {
    params: { api_key: apiKey },
    timeout: 10000,
  });

  return {
    title: data.title,
    explanation: data.explanation,
    url: data.url,
    date: data.date,
    media_type: data.media_type,
  };
}
