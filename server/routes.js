/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const express = require('express');
const path = require("path"); // eslint-disable-line global-require
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const { Model, ValidationError } = require('objection');
const cors = require('cors');

// login stuff
const session = require("express-session");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { OAuth2Client } = require("google-auth-library");

//tables
const Player = require('./models/Player');
const Location = require('./models/Location');
const Game = require('./models/Game');


Model.knex(knex);
const { wrapError, DBError } = require('db-errors');
const buildPath = path.resolve(__dirname, "../client/build");
const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin'],
};


if (process.env.NODE_ENV === "production") {

  app.use(express.static(buildPath));
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//ROUTES---------------------------------------------------------------------
//USE
passport.use(
  new BearerStrategy((token, done) => {
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(async ticket => {
        const payload = ticket.getPayload();
        let player = await Player.query().findOne("googleId", payload.sub);
        if (!player) {
          player = await Player.query().insertAndFetch({
            googleId: payload.sub,
            name: payload.name
          });
        }
        done(null, player);
      })
      .catch(error => {
        done(error);
      });
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((player, done) => {
  done(null, player.id);
});

passport.deserializeUser((id, done) => {
  Player.query()
    .findOne("id", id)
    .then(player => {
      done(null, player);
    });
});

//LOGIN/LOGOUT
app.post(
  "/login",
  passport.authenticate("bearer", { session: true }),
  (request, response) => {
    console.log("HERE");
    response.sendStatus(200);
  }
);

app.post("/logout", (request, response) => {
  request.logout(); // logout function added by passport
  response.sendStatus(200);
});
//GET
app.get("/api/players", (request, response, next) => {
  Player.query().then(baller => {
    response.send(baller);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/players/:googleId", (request, response, next) => {
    Player.query()
      .where("googleId", request.params.googleId)
      .then(baller => {
        response.send(baller);
      }, next); // <- Notice the "next" function as the rejection handler
});

//POST
app.post("/api/players", (request, response, next) => {
    Player.query()
      .insertAndFetch(request.body)
      .then(worker => {
        response.send(worker);
      }, next);
});
//PUT
//DELETE



//-----------------------------------------------------------------------------

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  console.log(error);
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

if (process.env.NODE_ENV === "production") {
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = {
  app,
  knex,
};
