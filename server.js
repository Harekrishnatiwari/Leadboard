const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/claims', require('./routes/claims'));

// Initialize default users if database is empty
const initializeUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 
        'Sneha', 'Ravi', 'Pooja', 'Vikash', 'Anita'
      ];
      
      for (const userName of defaultUsers) {
        const user = new User({ name: userName });
        await user.save();
      }
      
      await User.updateRankings();
      console.log('Default users created successfully');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeUsers();
});
