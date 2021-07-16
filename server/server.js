//---------------------------------------EXPRESS AND GLOBAL MIDDLEWARE IMPORTS
require("dotenv").config();//loads environment variables into process.env
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

//---------------------------------------CREATING APP
const app = express();

//---------------------------------------CONNECT DATABASE
connectDB();

//---------------------------------------GLOBAL MIDDLEWARE

//i dont think anybody actually knows what cors does but its needed
app.use(cors({ origin: true, credentials: true }));
//same thing as bodyParser.json...parses json body content in a request...i think
app.use(express.json());
//same thing as body-parser.urlencoded....decodes urlencoded components(no clue what those are) in received http requests...i think
app.use(express.urlencoded({ extended: true }));




//---------------------------------------GET ROUTES
const books = require('./routes/api/books');
const posts = require('./routes/api/posts');
const threads = require('./routes/api/threads');
const confirmEmail = require('./routes/EmailConfirmation');
const CRUDuser = require('./routes/CRUDuser')

app.use(confirmEmail);
app.use('/api/books', books);
app.use('/api/posts', posts);
app.use('/api/threads', threads);
app.use(CRUDuser);



//---------------------------------------APP CONFIG
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//---------------------------------------WELCOME MESSAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'));
})