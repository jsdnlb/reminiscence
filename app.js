const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch the service account key JSON file contents
var serviceAccount = require("./reminiscenceKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reminiscence-pro.firebaseio.com/",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

app.get("/", function (req, res) {
  res.render("home", {
    title: "Bienvenido",
    description: "Gracias por visitar esta página",
  });
});

// Login
app.get("/login", function (req, res) {
  console.log("req", req.body);
  res.render("login", {
    title: "Bienvenido",
    description: "Gracias por visitar esta página",
  });
});

app.get("/home", function (req, res) {
  res.render("home", {
    title: "Acerca de",
    description: "Somos expertos en aprender",
  });
});

app.get("/listUsers", function (req, res) {
  let allUsers;
  db.ref("users").on("value", function (snapshot) {
    allUsers = snapshot.val();
    // console.log("allUsers", allUsers);
    res.render("listUsers", {
      title: "Lista de usuarios",
      description: "Somos expertos en aprender",
      list: allUsers,
    });
  });
});

app.post("/save", function (req, res) {
  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  db.ref("users").push(newUser);
  res.render("home", {
    title: "Usuario: " + req.body.firstName + " " + req.body.lastName,
    description: "Se ha guardado correctamente el usuario",
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res, next) {
  res.status(404).send("404 Page not found!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
