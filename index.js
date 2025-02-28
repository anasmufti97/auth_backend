// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter.js');

// require('dotenv').config();
// require('./Models/db');
// const PORT = process.env.PORT || 8080;

// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);


// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// })


const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db'); // Ensure DB connection is established before running the server

// Import Routes
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const itemRoutes = require('./Routes/itemRoutes');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Replaces bodyParser.json()
app.use(cors({
    origin: '*', // Adjust this based on your security needs (e.g., allow only frontend domain)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health Check Route
app.get('/ping', (req, res) => res.send('PONG'));

// API Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/items', itemRoutes);


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
