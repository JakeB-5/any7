import axios from 'axios';
import type { GitHubRepo } from '../types/index.js';

const GITHUB_API = 'https://api.github.com/search/repositories';

export async function fetchGitHubTrending(limit = 5): Promise<GitHubRepo[]> {
  const since = new Date();
  since.setDate(since.getDate() - 7);
  const dateStr = since.toISOString().split('T')[0];

  const { data } = await axios.get(GITHUB_API, {
    params: {
      q: `created:>${dateStr}`,
      sort: 'stars',
      order: 'desc',
      per_page: limit,
    },
    headers: { Accept: 'application/vnd.github.v3+json' },
    timeout: 10000,
  });

  return (data.items ?? []).map((item: Record<string, unknown>) => ({
    name: item.full_name as string,
    description: ((item.description as string) ?? '').slice(0, 80),
    stars: item.stargazers_count as number,
    language: (item.language as string) ?? 'Unknown',
    url: item.html_url as string,
  }));
}
