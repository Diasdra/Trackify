const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userModel = require("../models/userModel").userModel;

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    email = email.toLowerCase() // Set it to lower case to make email not case sensitive
    const user = await userModel.getUserByEmailAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const GitHubLogin = new GitHubStrategy(
  {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:3001/auth/github/callback"
}, 
(accessToken, refreshToken, profile, done) => {
  userModel.findOrCreate(profile, (err, user) => {
    return done(err, user);
  });
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser( async function (id, done) {
  let user = await userModel.findById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin), passport.use(GitHubLogin);
