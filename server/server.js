//---------------------------------------EXPRESS AND GLOBAL MIDDLEWARE IMPORTS
require("dotenv").config();//loads environment variables into process.env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);
const passportConfig = require('./config/passportConfig') 

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

var store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: 'awonderfulworld',
    resave: false,
    store: store,
    saveUnitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true
    }
}));

app.use(cookieParser('awonderfulworld'));


app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use((req, res, next) => {
    console.log('session id is: ' + req.session.id);
    next();
});



//---------------------------------------GET ROUTES
const books = require('./routes/api/books');
const authentication = require('./routes/authentication');

app.use('/api/books', books);
app.use(authentication);

//---------------------------------------APP CONFIG
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//---------------------------------------WELCOME MESSAGE
app.get('/', (req, res) => {
    res.send("this is just a welcome message. pls go to server logs to understand how broken this all really is.")
})