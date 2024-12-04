import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());  // Enables Cross-Origin Request Sharing (for frontend-backend communication)
app.use(json());  // For parsing application/json

// Set up MongoDB connection
connect('mongodb://localhost:27017/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
