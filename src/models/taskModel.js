const { Pool } = require('pg');

// Connexion sécurisée pour Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  },
  connectionTimeoutMillis: 5000,
  query_timeout: 10000
});

// Création de la table "tasks" si elle n'existe pas
const createTasksTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('✅ Table "tasks" créée avec succès');
  } catch (error) {
    console.error('❌ Erreur création table "tasks" :', error);
    throw error;
  }
};

// Récupérer toutes les tâches
const getTasks = async () => {
  try {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('❌ Erreur récupération tasks :', error);
    throw error;
  }
};

// Créer une nouvelle tâche
const createTask = async (title, description) => {
  try {
    const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
    const values = [title, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('❌ Erreur création task :', error);
    throw error;
  }
};

module.exports = {
  createTasksTable,
  getTasks,
  createTask
};
