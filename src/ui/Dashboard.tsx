import React, { useState, useEffect } from 'react';
import { Text, Box, Newline } from 'ink';
import Spinner from 'ink-spinner';
import chalk from 'chalk';
import type { DashboardData } from '../types/index.js';
import { fetchAllData } from '../apis/index.js';
import { box, truncate, formatStars } from '../utils/format.js';

interface DashboardProps {
  location?: string;
}

export default function Dashboard({ location = 'Seoul' }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAllData(location);
        if (mounted) {
          setData(result);
          setLastUpdate(new Date().toLocaleTimeString());
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    }

    load();

    // Auto-refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [location]);

  if (loading && !data) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>
          <Text color="cyan">
            <Spinner type="dots" />
          </Text>
          {' '}Loading dashboard data...
        </Text>
      </Box>
    );
  }

  if (error && !data) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">Error: {error}</Text>
      </Box>
    );
  }

  if (!data) return null;

  const W = 52;

  // NASA APOD panel
  const nasaContent = data.nasa
    ? [
        chalk.yellow(`  ${data.nasa.title}`),
        chalk.dim(`  Date: ${data.nasa.date}`),
        '',
        ...wrapText(data.nasa.explanation, W - 4).map((l) => `  ${l}`),
        '',
        chalk.dim.underline(`  ${truncate(data.nasa.url, W - 4)}`),
      ].join('\n')
    : chalk.dim('  Failed to load NASA data');

  // Weather panel
  const weatherContent = data.weather
    ? [
        `  ${chalk.bold(data.weather.location)}`,
        '',
        `  ${weatherEmoji(data.weather.description)} ${chalk.yellow(String(data.weather.temperature) + '\u00B0C')}  ${data.weather.description}`,
        `  ${chalk.dim('Humidity:')} ${data.weather.humidity}%  ${chalk.dim('Wind:')} ${data.weather.wind} km/h`,
      ].join('\n')
    : chalk.dim('  Failed to load weather data');

  // GitHub trending panel
  const githubContent =
    data.github.length > 0
      ? data.github
          .map(
            (repo, i) =>
              `  ${chalk.dim(`${i + 1}.`)} ${chalk.bold.blue(truncate(repo.name, 28))} ${chalk.yellow('\u2605' + formatStars(repo.stars))} ${chalk.dim(repo.language)}\n     ${chalk.dim(truncate(repo.description || 'No description', W - 7))}`,
          )
          .join('\n')
      : chalk.dim('  Failed to load GitHub data');

  // Quote panel
  const quoteContent = data.quote
    ? [
        '',
        ...wrapText(`"${data.quote.text}"`, W - 6).map(
          (l) => `  ${chalk.italic(l)}`,
        ),
        '',
        `  ${chalk.dim('— ' + data.quote.author)}`,
        '',
      ].join('\n')
    : chalk.dim('  No quote available');

  const header = chalk.bold.cyan(
    `\n  ${'='.repeat(W)}
  ${'  '.repeat(8)} any7 - Terminal Dashboard
  ${'='.repeat(W)}`,
  );

  const nasaBox = box('\u{1F30C} NASA Astronomy Picture of the Day', nasaContent, W);
  const weatherBox = box('\u{1F324}\uFE0F  Weather', weatherContent, W);
  const githubBox = box('\u{1F525} GitHub Trending', githubContent, W);
  const quoteBox = box('\u{1F4AC} Quote of the Moment', quoteContent, W);

  const footer = chalk.dim(
    `  Last updated: ${lastUpdate} | Auto-refreshes every 5 min | Ctrl+C to exit`,
  );

  const output = [
    header,
    '',
    nasaBox,
    '',
    weatherBox,
    '',
    githubBox,
    '',
    quoteBox,
    '',
    footer,
    '',
  ].join('\n');

  return (
    <Box flexDirection="column">
      <Text>{output}</Text>
    </Box>
  );
}

function weatherEmoji(desc: string): string {
  const d = desc.toLowerCase();
  if (d.includes('sun') || d.includes('clear')) return '\u2600\uFE0F';
  if (d.includes('cloud') || d.includes('overcast')) return '\u2601\uFE0F';
  if (d.includes('rain') || d.includes('drizzle')) return '\u{1F327}\uFE0F';
  if (d.includes('snow')) return '\u{1F328}\uFE0F';
  if (d.includes('thunder') || d.includes('storm')) return '\u26C8\uFE0F';
  if (d.includes('fog') || d.includes('mist')) return '\u{1F32B}\uFE0F';
  return '\u{1F321}\uFE0F';
}

function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (current.length + word.length + 1 > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}
