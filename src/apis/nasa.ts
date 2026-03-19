import axios from 'axios';
import type { NasaApod } from '../types/index.js';

const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchNasaApod(): Promise<NasaApod> {
  try {
    const { data } = await axios.get(NASA_APOD_URL, {
      params: { api_key: 'DEMO_KEY' },
      timeout: 10000,
    });

    return {
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      date: data.date,
      media_type: data.media_type,
    };
  } catch {
    // Fallback when DEMO_KEY is rate-limited
    const today = new Date().toISOString().split('T')[0];
    return {
      title: 'Astronomy Picture of the Day',
      explanation:
        'NASA APOD API is currently rate-limited. Visit apod.nasa.gov for today\'s image.',
      url: 'https://apod.nasa.gov/',
      date: today!,
      media_type: 'image',
    };
  }
}
