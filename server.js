"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let apiRoutestr = "";
if (process.env.NODE_ENV === "test"){
  apiRoutestr = "./routes/api.js";
}else{
  apiRoutestr = "./routes/alt.js";
}
const apiRoutes = require(apiRoutestr);
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");
require("./dbcon");

const app = express();

if (process.env.HELMET === "true"){
  const helmet = require("helmet");
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://code.jquery.com/jquery-2.2.1.min.js"],
        styleSrc: ["'self'"],
      },
    })
  );
}

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log("Tests are not valid:");
        console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; //for testing
