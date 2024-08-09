// types/match.ts

export interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  categories: BetCategory[];
}

export interface BetCategory {
  id: string;
  category: string;
  details: (MatchResultDetail | HandicapDetail | OverUnderDetail)[];
}

export interface MatchResultDetail {
  type: 'Win' | 'Lose';
  team: string;
  value: number;
}

export interface HandicapDetail {
  type: 'Handicap';
  team: string;
  point: number;
  value: number;
}

export interface OverUnderDetail {
  type: 'Over' | 'Under';
  point: number;
  value: number;
}