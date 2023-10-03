const express = require('express');
const router = express.Router();

// Get player data from the database
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players'); // 'pool' is the PostgreSQL connection pool
    const players = result.rows;
    res.json(players);
  } catch (error) {
    console.error('Error fetching players', error);
    res.status(500).json({ error: 'An error occurred while fetching players' });
  }
});

module.exports = router;