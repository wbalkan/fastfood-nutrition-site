// backend/server.js
const express = require('express');
const app = express();
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Import the API routes

app.use(cors()); // Enable CORS
app.use('/api', apiRoutes); // Use the imported API routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});