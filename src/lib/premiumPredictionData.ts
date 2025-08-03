import { Prediction } from './premiumTypes';

export const dummyPredictions: Prediction[] = [
  {
    id: 3,
    timestamp: "2025-07-06T14:30:00Z",
    predictor: {
      name: "Sara Win",
      avatar: "/sara.jpg",
      rating: 4.9,
      followers: 12400,
      verified: true,
      winStreak: 7,
    },
    premium: false,
    price: 0,
    paid: false,
    subscriptionId: null,
    views: 2840,
    likes: 156,
    confidence: 85,
    games: [
      {
        team1: "Juventus",
        team2: "Inter",
        logo1: "/juve.png",
        logo2: "/inter.png",
        prediction: "2",
        odds: "2.40",
        status: "correct",
        date: "2025-07-08",
        time: "21:00",
        stadium: "Allianz Stadium",
        league: "Serie A"
      }
    ],
    premiumTicketsViewed: 0
  },
  {
    id: 1,
    timestamp: "2025-07-07T10:00:00Z",
    predictor: {
      name: "John Tips",
      avatar: "/john.jpg",
      rating: 4.8,
      followers: 8200,
      verified: false,
      winStreak: 3
    },
    premium: false,
    price: 0,
    views: 1920,
    likes: 89,
    confidence: 78,
    games: [
      {
        team1: "Man Utd",
        team2: "Chelsea",
        logo1: "/manutd.png",
        logo2: "/chelsea.png",
        prediction: "1X",
        odds: "1.85",
        status: "correct",
        date: "2025-07-10",
        time: "18:00",
        stadium: "Old Trafford",
        league: "Premier League"
      },
      {
        team1: "Madrid",
        team2: "Barca",
        logo1: "/rm.png",
        logo2: "/fcb.png",
        prediction: "Over 2.5",
        odds: "1.75",
        status: "wrong",
        date: "2025-07-12",
        time: "20:00",
        stadium: "Santiago Bernabéu",
        league: "La Liga"
      },
      {
        team1: "Aston Villa",
        team2: "Liverpool",
        logo1: "/rm.png",
        logo2: "/fcb.png",
        prediction: "Over 2.5",
        odds: "1.75",
        status: "wrong",
        date: "2025-07-12",
        time: "20:00",
        stadium: "Santiago Bernabéu",
        league: "La Liga"
      },
      {
        team1: "Arsenal",
        team2: "PSG",
        logo1: "/rm.png",
        logo2: "/fcb.png",
        prediction: "Over 2.5",
        odds: "1.75",
        status: "wrong",
        date: "2025-07-12",
        time: "20:00",
        stadium: "Santiago Bernabéu",
        league: "La Liga"
      }
    ],
    premiumTicketsViewed: 0,
    paid: false,
    subscriptionId: null
  },
  {
    id: 2,
    timestamp: "2025-07-05T16:45:00Z",
    predictor: {
      name: "Elite Bets",
      avatar: "/elite.jpg",
      rating: 5.0,
      followers: 25600,
      verified: true,
      winStreak: 12
    },
    premium: true,
    price: 500,
    views: 4580,
    likes: 312,
    confidence: 92,
    games: [
      {
        team1: "PSG",
        team2: "Lyon",
        logo1: "/psg.png",
        logo2: "/lyon.png",
        prediction: "GG",
        odds: "1.90",
        status: null,
        date: "2025-07-11",
        time: "19:30",
        stadium: "Parc des Princes",
        league: "Ligue 1"
      }
    ],
    premiumTicketsViewed: 1,
    paid: false,
    subscriptionId: null
  },
  {
    id: 5,
    timestamp: "2025-07-20T16:45:00Z",
    predictor: {
      name: "Wilz Bets",
      avatar: "/elite.jpg",
      rating: 5.0,
      followers: 200,
      verified: true,
      winStreak: 12
    },
    premium: true,
    price: 1100,
    views: 10,
    likes: 210,
    confidence: 100,
    games: [
      {
        team1: "WHU",
        team2: "LIV",
        logo1: "/psg.png",
        logo2: "/lyon.png",
        prediction: "OVER 2.0",
        odds: "2.90",
        status: null,
        date: "2025-07-11",
        time: "19:30",
        stadium: "Parc des Princes",
        league: "Ligue 22"
      }
    ],
    premiumTicketsViewed: 0,
    paid: false,
    subscriptionId: null
  }
];

export const dummyQuickScores = [
  { id: 1, team1: "Bayern", team2: "Dortmund", score: "2-1", time: "72'", league: "Bundesliga" },
  { id: 2, team1: "Arsenal", team2: "Tottenham", score: "0-0", time: "45'", league: "Premier League" }
];

export const dummyResults = [
  { id: 1, team1: "Chelsea", team2: "Everton", score: "3-1", league: "Premier League", date: "2025-07-07" },
  { id: 2, team1: "Juventus", team2: "AC Milan", score: "1-2", league: "Serie A", date: "2025-07-07" }
];

export const dummyFixtures = [
  { id: 1, team1: "Liverpool", team2: "Man City", date: "2025-07-09", time: "20:00", league: "Premier League" },
  { id: 2, team1: "Barcelona", team2: "Atletico", date: "2025-07-10", time: "21:00", league: "La Liga" }
];

export const dummyHighlights = [
  { id: 1, title: "Messi scores stunning free-kick in La Liga", date: "2025-07-07" },
  { id: 2, title: "Premier League upset: Underdog triumphs", date: "2025-07-06" }
];