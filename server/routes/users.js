import express from 'express';
const router = express.Router();

// GET /users
// Helper to get db pool
function getDb(req) {
  return req.app.get('db');
}

// Get all users (limit 10)
router.get('/', async (req, res) => {
  const pool = getDb(req);
  const { sortBy = 'id', order = 'asc', search = '' } = req.query;
  const validFields = ['id', 'first_name', 'last_name', 'email', 'age'];
  const sortField = validFields.includes(sortBy) ? sortBy : 'id';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
  let query = `SELECT * FROM users`;
  let params = [];
  if (search) {
    query += ` WHERE first_name ILIKE $1 OR last_name ILIKE $1`;
    params.push(`%${search}%`);
  }
  query += ` ORDER BY ${sortField} ${sortOrder} LIMIT 10`;
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users
router.post('/', async (req, res) => {
  const pool = getDb(req);
  const { first_name, last_name, email, age } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  const pool = getDb(req);
  const { first_name, last_name, email, age } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, age=$4 WHERE id=$5 RETURNING *',
      [first_name, last_name, email, age, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const pool = getDb(req);
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
