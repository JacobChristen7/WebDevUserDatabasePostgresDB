import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

// Postgres connection
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI || 'postgres://username:password@host:port/dbname',
  ssl: { rejectUnauthorized: false },
});

app.set('db', pool);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
