import express from 'express';
import User from '../models/User.js';
const router = express.Router();

// GET /users
router.get('/', async (req, res) => {
  const { search, sortBy = 'firstName', order = 'asc' } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ]
    };
  }
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const users = await User.find(query).sort(sort);
  res.json(users);
});

// POST /users
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
