
require('dotenv/config');
require('./db');

const express = require('express');
const app = express();

require('./config')(app);

const session = require('express-session');
const MongoStore = require('connect-mongo').default;

app.use(session({
    secret: 'haworthia33',
    saveUninitialized: false, 
    resave: false, 
    cookie: {
      maxAge: 1000*60*60*24// ms.  expiring in 1 day
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/PlantRush",
      ttl: 60*60*24, // s. expiring in 1 day
    })
}));

const allRoutes = require('./routes');
app.use('/api', allRoutes);
const plantRoutes = require('./routes/plant.routes');
app.use('/api', plantRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

require('./error-handling')(app);

module.exports = app;
