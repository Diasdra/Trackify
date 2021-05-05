const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session")
const inventoryController = require("./controllers/inventoryController");

require('dotenv').config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(session({
  key: 'user_sid',
  secret: 'jennie',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

//Debugging console logs
app.use((req, res, next) => {
  console.log("Inventory Database is");
  console.log(req.body.inventory);
  console.log("Entire session object:");
  console.log(req.session);
  next();
});


app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs");

// Routes start here
app.get('/' , inventoryController.list)
app.get('/about', (req, res) => { res.render("about") })
app.get('/contact', (req, res) => { res.render("contact") })
app.get('/create', (req, res) => { res.render("create") })
app.post('/create', (req, res) => { inventoryController.create })


app.listen(8000, function () {
  console.log(
    "Server running. Visit: http://localhost:8000 in your browser 🚀"
  );
});
