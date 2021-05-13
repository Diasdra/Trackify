const path = require("path");
const ejsLayouts = require("express-ejs-layouts");

const express = require("express");
const app = express();
const session = require("express-session")
const inventoryController = require("./controllers/inventoryController");

const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

require('dotenv').config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

//serializes inventory
app.use(async (req, res, next) => {
  req.inventory = await prisma.inventory.findMany()
  next()
})

// Debugging console logs
// app.use(async (req, res, next) => {
//   console.log("Inventory Database is");
//   console.log(req.inventory)
//   console.log("Entire session object:");
//   console.log(req.session);
//   next();
// });


app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs");

// Routes start here
app.get('/' , inventoryController.list)
app.get('/about', (req, res) => { res.render("about") })
app.get('/contact', (req, res) => { res.render("contact") })
app.get('/create', (req, res) => { res.render("create") })
app.post('/create', inventoryController.create)
app.get('/inventory', inventoryController.list)
app.post('/inventory', inventoryController.update)


run = app.listen(8000, function () {
        console.log(
          "Server running. Visit: http://localhost:8000 in your browser 🚀"
        );
      });

module.exports.app = app
module.exports.run = run
module.exports.prisma = prisma