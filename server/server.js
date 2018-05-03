require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  cors = require("cors"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  socket = require('socket.io'),
  cron = require('node-cron');

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT
} = process.env;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connection Established");
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
          db
            .create_user([profile.displayName, profile.id, profile.picture])
            .then(createdUser => {
              return done(null, createdUser[0].id);
            })
            .catch(err => console.log(err));
        } else {
          return done(null, userResult[0].id);
        }
      });
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  app
    .get("db")
    .find_session_user([id])
    .then(loggedInUser => {
      done(null, loggedInUser[0]);
    })
    .catch(err => console.log(err));
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);

app.get("/auth/me", function (req, res) {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    res.status(200).send(req.user);
  }
});



app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.FAILURE_REDIRECT);
});

//This is Cron Biz//10-0//Tenga Cuidado//
//Works but needs to be started after 5 in order to get the shortOrLongTimer variable to be in sync
//will be on the right track after the first cronjob executes

var countdown = 360;
var shortOrLongTimer = 5;

const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`)));
  cron.schedule('0 47 9,11,13,15,16,17 * * *', function () {

    console.log('running a task every minute');

    shortOrLongTimer--;
    if(shortOrLongTimer > 0){
      countdown = 7200;
    } else {
      countdown = 57600;
      shortOrLongTimer = 5;
    }

    io.sockets.emit('change-screen')
    // countdown = 60;
  
    // starter = 59;
    // countdown = starter
  })

var counting = true;
// var countdown = starter;

setInterval(function () {
  // if (countdown <= 0) {
  //   countdown = 60;
  // };
  if (!counting) return;
  countdown--;

  io.sockets.emit('timer', { countdown: countdown })
}, 1000)

io.on('connection', function (client) {
  console.log('connected')
  client.on('settimer', function () {
    // countdown = starter;
  })

  client.on('event', function (data) {
    switch (data.status) {
      case false: counting = false;
        break;
      case true: counting = true;
        break;
      default: return;
    }
  })
  client.on('disconnect', function () {
    console.log('disconnected')
  })
})