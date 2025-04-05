# Back-end Features Implementation

This document describes the back-end features implemented for the "Andhra Spices" restaurant website.

## 1. Serving Files to the Client

The server is configured to serve static files from the React build directory:

```javascript
app.use(express.static(path.join(__dirname, 'build')));
```

Additionally, a catch-all route is implemented to serve the React app for client-side routing:

```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

This enables the server to handle all client-side routes and serve the appropriate React components.

## 2. Manipulating Data in a Database (MongoDB Atlas)

We've implemented MongoDB Atlas integration without using Mongoose, directly utilizing the MongoDB Node.js driver:

- **Menu Items Management**: The server retrieves menu items from the database and sends them to the client:
  ```javascript
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
  ```

- **Contact Form Submissions**: User contact form submissions are stored in the database:
  ```javascript
  app.post('/api/contact', async (req, res) => {
    // Validate and store contact form submissions in MongoDB
  });
  ```

- **Order Processing**: Customer orders are stored with their details:
  ```javascript
  app.post('/api/orders', async (req, res) => {
    // Process and store order information in MongoDB
  });
  ```

## 3. User Data Collection via Forms

We've implemented a comprehensive form handling system:

- **Contact Form**: Allows visitors to submit inquiries which are stored in the database
- **Checkout Form**: Collects customer information for order processing
- **Form Validation**: Server-side validation ensures data integrity
- **Response Handling**: Success/error responses are handled appropriately and displayed to the user

The forms follow best practices:
- Form data is validated on both client and server sides
- Appropriate HTTP methods are used (POST for data submission)
- Success/error feedback is provided to users
- The server sends appropriate status codes based on the result

## Database Configuration

The MongoDB Atlas database is configured to be accessible from any IP address for grading purposes. Connection is established using environment variables to keep sensitive information secure.