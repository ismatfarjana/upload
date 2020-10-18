const express = require("express");
const app = express();
const initRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/image"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

let port = 3300;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
