import chalk from 'chalk';

const BOX_CHARS = {
  topLeft: '\u256D',
  topRight: '\u256E',
  bottomLeft: '\u2570',
  bottomRight: '\u256F',
  horizontal: '\u2500',
  vertical: '\u2502',
};

export function box(title: string, content: string, width = 50): string {
  const innerWidth = width - 2;
  const titleStr = ` ${title} `;
  const topPadding = innerWidth - titleStr.length;
  const top =
    BOX_CHARS.topLeft +
    BOX_CHARS.horizontal +
    chalk.bold.cyan(titleStr) +
    BOX_CHARS.horizontal.repeat(Math.max(0, topPadding - 1)) +
    BOX_CHARS.topRight;

  const bottom =
    BOX_CHARS.bottomLeft +
    BOX_CHARS.horizontal.repeat(innerWidth) +
    BOX_CHARS.bottomRight;

  const lines = content.split('\n').map((line) => {
    const stripped = stripAnsi(line);
    const pad = Math.max(0, innerWidth - stripped.length);
    return BOX_CHARS.vertical + line + ' '.repeat(pad) + BOX_CHARS.vertical;
  });

  return [top, ...lines, bottom].join('\n');
}

export function stripAnsi(str: string): string {
  return str.replace(/\x1B\[[0-9;]*m/g, '');
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

export function padRight(str: string, len: number): string {
  const stripped = stripAnsi(str);
  const pad = Math.max(0, len - stripped.length);
  return str + ' '.repeat(pad);
}

export function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return String(stars);
}

export function weatherEmoji(desc: string): string {
  const d = desc.toLowerCase();
  if (d.includes('sun') || d.includes('clear')) return '\u2600\uFE0F';
  if (d.includes('cloud') || d.includes('overcast')) return '\u2601\uFE0F';
  if (d.includes('rain') || d.includes('drizzle')) return '\u{1F327}\uFE0F';
  if (d.includes('snow')) return '\u{1F328}\uFE0F';
  if (d.includes('thunder') || d.includes('storm')) return '\u26C8\uFE0F';
  if (d.includes('fog') || d.includes('mist')) return '\u{1F32B}\uFE0F';
  return '\u{1F321}\uFE0F';
}

export function wrapText(text: string, maxWidth: number): string[] {
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
