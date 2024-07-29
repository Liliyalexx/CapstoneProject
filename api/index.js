import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Initialize Express
const app = express();
// Middleware
app.use(express.json());
app.use(cors()); // Use the cors middleware
// app.use(cookieParser());

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
