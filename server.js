const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cloudinary = require('./config/cloudinaryConfig');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


if(cloudinary) {
    console.log('cloudinary config:');
    console.log(cloudinary.config());
};

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'klasjdf923908109581io2512598dljd',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
