const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const createTasksTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Tasks table created successfully');
  } catch (error) {
    console.error('Error creating tasks table:', error);
  }
};

const getTasks = async () => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const createTask = async (title, description) => {
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTasksTable,
  getTasks,
  createTask
};