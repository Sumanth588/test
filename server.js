const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Database connection
const connectToDatabase = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db('andhra_spices_db');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize DB connection
let db;
(async () => {
  db = await connectToDatabase();
})();

// API Routes
// 1. Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Save to MongoDB
    const contactCollection = db.collection('contacts');
    const result = await contactCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us!',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// 2. Get menu items from database
app.get('/api/menu', async (req, res) => {
  try {
    const menuCollection = db.collection('menu_items');
    const menuItems = await menuCollection.find({}).toArray();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// 3. Submit an order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerInfo } = req.body;
    
    if (!items || !items.length || !customerInfo) {
      return res.status(400).json({ error: 'Invalid order data' });
    }
    
    const orderCollection = db.collection('orders');
    const result = await orderCollection.insertOne({
      items,
      customerInfo,
      orderDate: new Date(),
      status: 'pending'
    });
    
    res.status(201).json({ 
      success: true, 
      orderId: result.insertedId,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Catch all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});