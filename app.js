var express = require("express");
var app = express();
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/static", express.static(__dirname + "/public"));

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

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
