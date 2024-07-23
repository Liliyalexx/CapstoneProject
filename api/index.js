import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
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
// Signout route
app.post('/api/user/signout', (req, res) => {
  // Handle signout logic
  res.status(200).json({ message: 'Signout successful' });
});


// Middleware
app.use(express.json());
app.use(cors()); // Use the cors middleware

// User Routes
app.use('/api/auth', authRoute);
app.use('/api/user', router );
app.use('/google', router);



// Start Server
app.listen(3002, () => {
  console.log('Server running on port 3002!!');
});

