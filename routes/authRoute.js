const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

// Testing function
// const logThing = (req, res, next) => { console.log(req.session); return next();}
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/github", passport.authenticate("github"));

router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/auth/login',
    successRedirect: "/reminders", 
  }))

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;
