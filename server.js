const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const customizationRoutes = require('./routes/customizationRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'], // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow cookies and other credentials
};
app.use(cors(corsOptions));

// Serve static files (e.g., uploads folder)
app.use('/uploads', express.static('uploads'));

// Connect to DB
connectDB().then(() => console.log('Database connected successfully')).catch((err) => {
  console.error('Database connection failed:', err.message);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customizations', customizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
