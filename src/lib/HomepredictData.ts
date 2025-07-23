// src/lib/data.ts
import { Match, TimeFrame, LeagueGroup } from "./predictYtype";

export const matches: Match[] = [
  {
    id: 1,
    category: "Nigerian League",
    flagA: "🇳🇬",
    teamA: "Enyimba",
    flagB: "🇳🇬",
    teamB: "Kano Pillars",
    oddsA: 2.1,
    oddsB: 3.4,
    prediction: "A",
    result: "A",
    time: "16:00",
    date: "Today"
  },
  {
    id: 2,
    category: "La Liga",
    flagA: "🇪🇸",
    teamA: "Barcelona",
    flagB: "🇪🇸",
    teamB: "Real Madrid",
    oddsA: 1.8,
    oddsB: 2.9,
    prediction: "B",
    result: null,
    time: "21:00",
    date: "Today"
  },
  {
    id: 3,
    category: "Premier League",
    flagA: "🏴",
    teamA: "Manchester City",
    flagB: "🏴",
    teamB: "Liverpool",
    oddsA: 2.2,
    oddsB: 3.1,
    prediction: "A",
    result: null,
    time: "17:30",
    date: "Tomorrow"
  },
  {
    id: 4,
    category: "Football",
    flagA: "🇫🇷",
    teamA: "France",
    flagB: "🇩🇪",
    teamB: "Germany",
    oddsA: 2.1,
    oddsB: 3.4,
    prediction: "A",
    result: "A",
    time: "19:00",
    date: "Tomorrow"
  },
  {
    id: 5,
    category: "Football",
    flagA: "🇧🇷",
    teamA: "Brazil",
    flagB: "🇦🇷",
    teamB: "Argentina",
    oddsA: 1.8,
    oddsB: 2.9,
    prediction: "B",
    result: "A",
    time: "20:00",
    date: "Tomorrow"
  },
];

export const predictionTypes: string[] = [
  "Predictions 1X2",
  "Under/Over 2.5 goals",
  "Half Time",
  "Half Time/Full Time",
  "Both To Score",
  "Double chance",
  "Asian handicap",
  "Goalscorers",
  "Corners",
  "Cards"
];

export const timeFrames: TimeFrame[] = [
  { label: "Today's Predictions", key: "today" },
  { label: "Live Predictions", key: "live" },
  { label: "Yesterday's Predictions", key: "yesterday" },
  { label: "Tomorrow's Predictions", key: "tomorrow" },
  { label: "Weekend Predictions", key: "weekend" },
  { label: "All Predictions", key: "all" },
  { label: "Top Predictions", key: "top" }
];

export const leagues: LeagueGroup[] = [
  {
    country: "Nigeria",
    leagues: ["Nigerian Premier League", "Nigerian Championship", "Federation Cup"]
  },
  {
    country: "Spain",
    leagues: ["La Liga", "Segunda División", "Copa del Rey"]
  },
  {
    country: "England",
    leagues: ["Premier League", "Championship", "League One", "League Two"]
  },
  {
    country: "Germany",
    leagues: ["Bundesliga", "2. Bundesliga", "3. Liga"]
  },
  {
    country: "Italy",
    leagues: ["Serie A", "Serie B", "Coppa Italia"]
  },
  {
    country: "France",
    leagues: ["Ligue 1", "Ligue 2", "Coupe de France"]
  }
];
