import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';


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

// User Routes
app.use('/api/user', router );
app.use('/api/auth', authRoute );

// Start Server
app.listen(3002, () => {
  console.log('Server running on port 3002!!');
});

