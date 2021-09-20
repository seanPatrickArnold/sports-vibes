const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const seedAll = require('./seeds/index.js');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const sess = {
  secret: 'Super secret secret',
<<<<<<< HEAD
  cookie: {
    maxAge: 1 * 3600 * 1000
  },
=======
  cookie: {},
>>>>>>> 8b8bf597b4748b8d962de108b990ba326e7c9e64
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({ helpers });

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// seedAll();
