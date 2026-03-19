import axios from 'axios';
import type { Quote } from '../types/index.js';

const QUOTES_URL = 'https://zenquotes.io/api/random';

export async function fetchQuote(): Promise<Quote> {
  const { data } = await axios.get(QUOTES_URL, { timeout: 10000 });

  const item = Array.isArray(data) ? data[0] : data;

  return {
    text: item?.q ?? 'The only way to do great work is to love what you do.',
    author: item?.a ?? 'Steve Jobs',
  };
}
