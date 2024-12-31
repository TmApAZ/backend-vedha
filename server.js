const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const customizationRoutes = require('./routes/customizationRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Connect to DB
connectDB().then(() => console.log('Database connected successfully')).catch((err) => {
  console.error('Database connection failed:', err.message);
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Log product routes
app.use('/api/customizations', customizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
