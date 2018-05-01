require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  cors = require("cors"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");
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
      function(accessToken, refreshToken, extraParams, profile, done) {
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
  
  app.get("/auth/me", function(req, res) {
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


  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));