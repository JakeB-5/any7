export interface NasaApod {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  wind: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface DashboardData {
  nasa: NasaApod | null;
  weather: WeatherData | null;
  github: GitHubRepo[];
  quote: Quote | null;
}
