const userModel = require("../models/userModel").userModel;
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
  isAdmin: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect("/auth/login")
    } else if (userModel.findById(req.user.id).role === "admin"){
      return next();
    }
    res.redirect("/reminders")
  }
};
