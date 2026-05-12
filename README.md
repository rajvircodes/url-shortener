# 🔗 URL Shortener

A full-stack URL shortener built with the **MERN stack** (MongoDB, Express, React, Node.js).

## Features

- Shorten long URLs into compact, shareable links
- Redirect short URLs to their original destinations
- Track click counts per shortened link
- Clean and responsive React frontend

### Prerequisites
- Node.js >= 14
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/rajvircodes/url-shortener.git
cd url-shortener

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### Run the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
```
