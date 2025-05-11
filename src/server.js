const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const { createTasksTable } = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  },
  connectionTimeoutMillis: 5000,
  query_timeout: 10000
});

// Initialize database
createTasksTable().catch(console.error);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});