const express = require('express')
require("dotenv").config();
const cors = require('cors')
const connectDB = require("./config/db");
const urlRoutes = require('./routes/url.routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json())


// health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/url',urlRoutes)
app.use('/', urlRoutes)


// Global error Handler (must be last)
app.use(errorHandler)


// Start server ONLY after DB connects
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});

