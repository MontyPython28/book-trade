// app.js

require("dotenv").config()

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require("path"); //for Heroku

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// For Heroku
app.use(express.static(path.join(__dirname, "client", "build")))

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); // for MongoDB

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); //for Heroku
app.listen(port, () => console.log(`Server running on port ${port}`));