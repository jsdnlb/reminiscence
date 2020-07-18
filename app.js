var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var admin = require("firebase-admin");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use("/static", express.static(__dirname + "/public"));

// Fetch the service account key JSON file contents
var serviceAccount = require("./reminiscenceKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://databaseName.firebaseio.com",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function (snapshot) {
  console.log(snapshot.val());
});

app.get("/", function (req, res) {
  res.render("home", {
    title: "Bienvenido",
    description: "Gracias por visitar esta página",
  });
});

app.get("/about", function (req, res) {
  res.render("home", {
    title: "Acerca de",
    description: "Somos expertos en aprender",
  });
});

app.post("/save", function (req, res) {
  console.log(req);
  res.render("home", {
    title: "Acerca de",
    description: "Somos expertos en aprender",
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
