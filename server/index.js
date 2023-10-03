import express from 'express';
import { Pool } from 'pg';

let express = require('express');
const app = express();
const port = 5000; // Choose a suitable port

app.use(express.json());

// Connect to PostgreSQL database (using 'pg' library)
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'AG2417Project',
    password: 'postgres',
    port: '5432' // 默认的PostgreSQL端口
});

// Define routes (e.g., playerRoutes.js)
const playerRoutes = require('./routes/playerRoutes');
app.use('/api/players', playerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

