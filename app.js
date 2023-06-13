require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;

const dbURI = `mongodb+srv://vovasvidi:${process.env.dbPass}@cluster69.0nfk51j.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

// Connect to DB
connectDB(dbURI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: dbURI,
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  })
);

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main', '/main');
//app.set('layout.admin', './layouts/admin'); - How set layout for entire admin scope
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/main', require('./server/routes/main'));
app.use('/admin', require('./server/routes/admin'));
app.use('/api', require('./server/routes/apis'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
