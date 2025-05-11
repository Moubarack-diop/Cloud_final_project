require('dotenv').config();
const { Pool } = require('pg');

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
      require: true
    },
    connectionTimeoutMillis: 10000, // Augmentation du timeout
    query_timeout: 10000
  });

  try {
    console.log('Attempting to connect to database...');
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    
    console.log('Testing query execution...');
    const result = await client.query('SELECT NOW()');
    console.log('Query result:', result.rows[0]);
    
    await client.end();
    console.log('Connection closed successfully');
  } catch (err) {
    console.error('Connection error:', err);
    console.error('Connection URL:', process.env.DATABASE_URL);
  }
}

testConnection();
