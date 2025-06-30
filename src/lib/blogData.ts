//src\lib\blogData.ts

import type { BlogPost } from "./blogTypes";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Win More Bets",
    slug: "how-to-win-more-bets",
    excerpt: "Discover strategies to increase your chances of winning.",
    content: `
      <p><strong>Winning bets</strong> isn't just luck—it requires research, discipline, and strategy. 
      Start by focusing on one sport and learning it thoroughly. Track team performance, player stats, 
      and external factors like weather or injuries. Avoid emotional betting and always have a staking plan.</p>
      <p>Most importantly, manage your bankroll. Bet only what you can afford to lose and keep records of all bets 
      to learn from your mistakes. Avoid chasing losses; stay patient and stick to your strategy.</p>
    `,
    category: "Tips",
    date: "2024-06-01",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716821112/cld-sample-4.jpg",
    highlight: true,
    reactions: { up: 12, down: 2, favorite: 5 },
    comments: [{
      id: "c1",
      author: "Jane",
      content: "Great tips!",
      date: "2024-06-02",
      reactions: { like: 0, dislike: 0 }
    }],
  },
  {
    id: "2",
    title: "The Psychology Behind Sports Betting",
    slug: "psychology-of-sports-betting",
    excerpt: "Understand the emotional triggers behind betting decisions.",
    content: `
      <p>Sports betting is as much psychological as it is analytical. The thrill of winning triggers dopamine, 
      making us want to bet more. But this same mechanism can lead to compulsive behavior.</p>
      <p>Recognize the biases—like confirmation bias and gambler’s fallacy—that affect decisions. 
      Staying aware of these can help you avoid costly mistakes and stay in control of your betting habits.</p>
    `,
    category: "Insights",
    date: "2024-06-03",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716821454/cld-sample-5.jpg",
    highlight: false,
    reactions: { up: 8, down: 1, favorite: 3 },
    comments: [],
  },
  {
    id: "3",
    title: "Top 5 Common Betting Mistakes",
    slug: "common-betting-mistakes",
    excerpt: "Avoid these pitfalls that even experienced bettors make.",
    content: `
      <ul>
        <li>Chasing losses: Trying to win back lost money often leads to bigger losses.</li>
        <li>Betting without research: Blindly placing bets without proper analysis.</li>
        <li>Ignoring bankroll management: Betting more than you can afford.</li>
        <li>Overconfidence after a win streak: Leads to careless betting.</li>
        <li>Betting under the influence: Emotions and substances impair judgment.</li>
      </ul>
      <p>Avoid these mistakes and watch your betting improve significantly.</p>
    `,
    category: "Tips",
    date: "2024-06-05",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716822015/cld-sample-2.jpg",
    highlight: false,
    reactions: { up: 14, down: 3, favorite: 6 },
    comments: [],
  },
  {
    id: "4",
    title: "What Makes a Good Bet?",
    slug: "what-makes-a-good-bet",
    excerpt: "Learn how to distinguish between good and bad bets.",
    content: `
      <p>A good bet offers value—it’s when the odds offered are greater than the actual probability of the outcome. 
      This requires evaluating stats, recent form, and external conditions.</p>
      <p>Look for underdogs with a solid chance, or markets where bookmakers may have overcompensated. 
      Remember, a good bet doesn't always win, but it consistently offers positive expected value over time.</p>
    `,
    category: "Strategy",
    date: "2024-06-07",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716822303/cld-sample-3.jpg",
    highlight: true,
    reactions: { up: 10, down: 4, favorite: 2 },
    comments: [],
  },
  {
    id: "5",
    title: "In-Play Betting: Pros and Cons",
    slug: "in-play-betting-pros-cons",
    excerpt: "Is live betting worth the hype?",
    content: `
      <p><strong>In-play betting</strong> offers dynamic opportunities but comes with its risks. 
      The pros? You can use real-time data to make decisions. The cons? Odds fluctuate rapidly and it’s easy to act impulsively.</p>
      <p>Stay calm, avoid emotional decisions, and always predefine your in-play strategy to make the most of it.</p>
    `,
    category: "Live Betting",
    date: "2024-06-10",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716823332/cld-sample.jpg",
    highlight: false,
    reactions: { up: 9, down: 0, favorite: 2 },
    comments: [],
  },
  {
    id: "6",
    title: "Bankroll Management 101",
    slug: "bankroll-management-101",
    excerpt: "Your ultimate guide to managing your betting funds.",
    content: `
      <p>Your bankroll is your most important tool. Allocate a fixed amount for betting and divide it into units (e.g., 1% per bet).</p>
      <p>Never bet based on emotion. Use a staking plan—flat betting or proportional—to maintain consistency. 
      Review your performance monthly to stay in control.</p>
    `,
    category: "Finance",
    date: "2024-06-12",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716821000/sample.jpg",
    highlight: true,
    reactions: { up: 11, down: 1, favorite: 4 },
    comments: [],
  },
  {
    id: "7",
    title: "Understanding Betting Odds",
    slug: "understanding-betting-odds",
    excerpt: "Fractional, decimal, or moneyline—let’s break it down.",
    content: `
      <p>Decimal odds (2.00) show total payout, including stake. Fractional odds (1/1) show profit per stake. 
      Moneyline odds (+100) show how much you win on a $100 bet.</p>
      <p>Understanding how odds translate to probability helps you find value bets more easily. 
      Master the math and you’ll improve your long-term results.</p>
    `,
    category: "Basics",
    date: "2024-06-14",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716821770/sample.jpg",
    highlight: false,
    reactions: { up: 7, down: 0, favorite: 1 },
    comments: [],
  },
  {
    id: "8",
    title: "How to Bet Responsibly",
    slug: "how-to-bet-responsibly",
    excerpt: "Stay in control and avoid addiction.",
    content: `
      <p>Responsible betting means setting limits on time and money. Take regular breaks, never borrow money to bet, 
      and seek help if it feels out of control.</p>
      <p>Use tools like self-exclusion or deposit limits. Gambling should be fun, not stressful. 
      Know when to stop, and always bet for entertainment, not income.</p>
    `,
    category: "Responsible Gaming",
    date: "2024-06-16",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716822999/cld-sample-1.jpg",
    highlight: false,
    reactions: { up: 6, down: 0, favorite: 2 },
    comments: [],
  },
  {
    id: "9",
    title: "Betting Markets You Should Know",
    slug: "betting-markets-to-know",
    excerpt: "From match winner to over/under goals—explore your options.",
    content: `
      <p>Beyond match winners, explore markets like BTTS (Both Teams to Score), over/under goals, 
      Asian handicap, and correct score. Each offers unique opportunities and requires specific strategies.</p>
      <p>Diversifying your bets with markets you understand can reduce risk and increase value.</p>
    `,
    category: "Markets",
    date: "2024-06-18",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716822345/sample.jpg",
    highlight: false,
    reactions: { up: 5, down: 1, favorite: 0 },
    comments: [],
  },
  {
    id: "10",
    title: "How to Read Match Stats Like a Pro",
    slug: "read-match-stats-pro",
    excerpt: "Mastering team and player data can boost your win rate.",
    content: `
      <p>Stats tell the real story of a match. Look beyond possession—analyze expected goals (xG), shots on target, 
      player form, and head-to-head records. Tools like SofaScore or WhoScored offer deep insights.</p>
      <p>Turn stats into strategy by identifying patterns and trends. This is where smart bettors find their edge.</p>
    `,
    category: "Analysis",
    date: "2024-06-20",
    image: "https://res.cloudinary.com/dh8rykrzu/image/upload/v1716822401/sample.jpg",
    highlight: true,
    reactions: { up: 13, down: 2, favorite: 6 },
    comments: [
      {
        id: "c2",
        author: "Musa",
        content: "This helped me improve a lot!",
        date: "2024-06-21",
        reactions: { like: 0, dislike: 0 }
      }
    ],
  }
];
