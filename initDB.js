const { MongoClient } = require('mongodb');
require('dotenv').config();

const menuItems = [
  {
    name: "Biryani",
    desc: "Mild spicy, Medium Spicy, Extra Spicy",
    price: 10.99,
    link: "/images/biryani.jpg",
    category: "main"
  },
  {
    name: "Panner-Tikka-Masala",
    desc: "Mild spicy, Medium Spicy, Extra Spicy",
    price: 7.99,
    link: "/images/paneer_tikka.jpg",
    category: "main"
  },
  {
    name: "Chicken65",
    desc: "Mild spicy, Medium Spicy, Extra Spicy",
    price: 8.99,
    link: "/images/chicken65.jpeg",
    category: "appetizer"
  },
  {
    name: "Butter Naan",
    desc: "Freshly baked bread",
    price: 2.99,
    link: "/images/naan.jpg",
    category: "bread"
  },
  {
    name: "Gulab Jamun",
    desc: "Sweet dessert balls soaked in syrup",
    price: 3.99,
    link: "/images/gulab_jamun.jpg",
    category: "dessert"
  }
];

async function initDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db('andhra_spices_db');
    
    // Create collections if they don't exist
    await db.createCollection('menu_items');
    await db.createCollection('contacts');
    await db.createCollection('orders');
    
    // Check if menu items already exist
    const menuCollection = db.collection('menu_items');
    const existingItems = await menuCollection.countDocuments();
    
    if (existingItems === 0) {
      // Insert menu items
      const result = await menuCollection.insertMany(menuItems);
      console.log(`${result.insertedCount} menu items added to the database`);
    } else {
      console.log('Menu items already exist in database');
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await client.close();
  }
}

initDatabase();