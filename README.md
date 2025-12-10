# 📊 Stock Price Alert System

A full-stack stock monitoring tool that lets users track live stock prices, set alerts, and receive triggers when price conditions are met.

---

## 🚀 Features

### 🔔 Price Alerts
- Create alerts based on stock price movements
- Alerts for **above** or **below** target conditions
- Active and triggered alert tracking

### 🔍 Stock Search
- Smart search input with autosuggestions
- Instant stock symbol lookup (e.g., AAPL, TSLA, INFY, TCS)
- Click to open stock detail page

### 📈 Stock Detail View
- Current price with change indicator
- Day high / low
- Market cap
- Previous close
- Industry, country & exchange
- Direct link to company website

### 🌓 Dark / Light Mode
- Theme toggle stored in user preference
- Uses custom CSS variables (no Tailwind config changes)
- Theme **resets to light on logout**

### 👤 Account Page
- View user information
- Theme preference control
- Logout section

### 🔐 Authentication
- Secure JWT-based login & registration
- Protected routes for:
  - `/dashboard`
  - `/stock/:symbol`
  - `/account`

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- React Router
- Axios
- Lucide Icons

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)

**Other**
- JWT Authentication
- Custom Theme Context

---

## 📁 Preview

**Dashboard**
- Track alerts
- Trigger statuses
- Create new alert

**Alert Modal**
- Smart symbol suggestions
- Inline selections for price condition

**Detail Page**
- Company fundamentals and price snapshot

**Account Page**
- Profile information + theme controls


