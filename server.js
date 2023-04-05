const express = require('express');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection.js');
const controllers = require('./controllers');

const helpers = require('./utils/helpers.js');

const handlebars = expressHandlebars.create({helpers});


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'keyyyyy',
    cookie: {
        maxAge: 28800000
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    })
}

app.use(session(sess));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening: ' + PORT));
});
