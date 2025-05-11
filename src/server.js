const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createTasksTable } = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Log de démarrage
console.log(`🌐 Starting server with DATABASE_URL: ${process.env.DATABASE_URL}`);

// Middleware
app.use(cors());
app.use(express.json());

// Init DB
createTasksTable().catch((err) => {
  console.error("❌ Échec création table : ", err);
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/tasks', taskRoutes);

// Lancement serveur
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
