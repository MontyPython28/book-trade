//-----------------------------Imports
const passportLocal = require("passport-local").Strategy;
const session = require('express-session');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const books = require('./routes/api/books');
const authentication = require('./routes/api/authentication');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();


//---------------------------------------Connect Database
connectDB();

//---------------------------------------MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//lets all websites access this server ig(?)
app.use(cors({ origin: true, credentials: true }));

//dunno what that does
app.use(express.json({ extended: false }));

//sth to do with marking cookies for a session or sth
app.use(session ({
    secret: 'awonderfulworld',
    resave: true,
    saveUnitialized: true,
}));
//related to express-sessions
app.use(cookieParser('awonderfulworld'));


//---------------------------------------END OF MIDDLEWARE


// use Routes
app.use('/api/books', books);
app.use('', authentication);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));