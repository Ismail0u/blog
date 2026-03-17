import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './config/database.js';
import postsRouter from './routes/post.js';

// Create Express application
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);

// Initialize database
async function initDb() {
  try {
    // This will create tables based on models (we'll define these soon)
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Initialize database after server starts
  await initDb();
});
