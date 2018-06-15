const express = require('express');
const Path = require('path');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookie = require('cookie-parser');
const xvalidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);



require('dotenv/config');

//connection


mongoose.connect('mongodb://' + process.env.MONGO_LAB_USER + ':' + process.env.MONGO_LAB_PASSWORD + '@ds257077.mlab.com:57077/hotel_luxuz', {
    useMongoClient: true
});
// mongoose.connect("mongodb://localhost:27017/shop");



//listen to database connection

mongoose.connection.on('open', () => {
    console.log('server connected to mongodb database');
})

//include passport user config


//port
const port = process.env.PORT || 3000;


//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, Authorization', );

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE,PATCH');
        return res.sendStatus(200).json({});
    }
    next();
});



//api
const mainpage = require('./api/main_page');
const users = require('./api/users');
const rooms = require('./api/room_booking');


//static files
// app.use(express.static(Path.join(`${__dirname}/public`)));
// app.set('views', Path.join(__dirname, 'views'));



//middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(xvalidator());
app.use(cookie());
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 82 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());



//connect api
app.use('/hotelluxuz', mainpage);
app.use('/hotelluxuz/users', users);
app.use('/hotelluxuz/hotel/rooms', rooms);


//connect server
app.listen(port, () => {
    console.log(`server connected on port  ${port} `);
});