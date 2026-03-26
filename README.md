# Golf Charity Subscription Platform ⛳💖

A subscription-based golf platform that allows users to track golf scores, participate in monthly draws, and support charities. Built using **MERN stack** (MongoDB, Express, React, Node.js) with JWT authentication and responsive UI.

---

## Features

### User Panel
- Subscribe (monthly/yearly) and manage subscription
- Enter last 5 golf scores (Stableford format)
- Participate in monthly draw-based prize pools
- Select charity and set contribution percentage
- Dashboard: view subscription status, scores, draws entered, winnings

### Admin Panel
- Manage users & subscriptions
- Run monthly draws (random or algorithmic)
- Verify winners and process payouts
- Manage charities (add/edit/delete)
- View reports: total users, prize pools, charity contributions, draw stats

### Draw & Reward System
- 5-number, 4-number, 3-number match draws
- Random or algorithm-based draw generation
- Monthly cadence with jackpot rollover for unclaimed prizes
- Auto-calculation of prize distribution per match tier

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting / Deployment:** Vercel (frontend) & Render / Heroku (backend)

---

## Installation

1. **Clone the repo:**
```bash
git clone <https://github.com/Jemimah000/golf-charity-platform.git>
