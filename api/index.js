import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
// import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Initialize Express
const app = express();
// Middleware
app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );
app.use(cookieParser());

// Error handling middleware in your Express app
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

// User Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// // Signout routes
// app.post('/api/user/signout', (req, res) => {
//   // Signout logic here
//   res.status(200).json({ message: 'Signout successful' });
// });

// Start Server
app.listen(3002, () => {
  console.log('Server running on port 3002!!');
});

// Graceful Shutdown
// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Server shut down gracefully');
//     mongoose.connection.close(() => {
//       console.log('MongoDB connection closed');
//       process.exit(0);
//     });
//   });
// });
