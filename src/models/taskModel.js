const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create tasks table if it doesn't exist
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
    console.log('Tasks table created successfully');
  } catch (error) {
    console.error('Error creating tasks table:', error);
    throw error;
  }
};

// Get all tasks
const getTasks = async () => {
  const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
  const { rows } = await pool.query(query);
  return rows;
};

// Create a new task
const createTask = async (title, description) => {
  const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
  const values = [title, description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createTasksTable,
  getTasks,
  createTask
};