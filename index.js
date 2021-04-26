const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session")
require('dotenv').config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(session(
  {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }
))

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs");

//Passport Initialization
const passport = require("./middleware/passport")
app.use(passport.initialize())
app.use(passport.session())

// Route Paths
const authRoute = require("./routes/authRoute")
const indexRoute = require("./routes/indexRoute")
const reminderRoute = require("./routes/reminderRoute")

app.use("/", indexRoute)
app.use("/reminder", reminderRoute)
app.use("/auth", authRoute)

//Debugging console logs
// app.use((req, res, next) => {
//   console.log("User details are: ");
//   console.log(req.user);
//   console.log("Entire session object:");
//   console.log(req.session);

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
