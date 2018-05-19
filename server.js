const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express()

const port = process.env.PORT || 3000;

app.set("view engine", hbs);
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("upperCased", (text) => {
  return text.toUpperCase();
});

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} : ${request.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (error) => {
    if(error) {
      console.log("Unable to append server log.");
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render("maintainance.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/home", (request, response) => {
  response.render("home.hbs", {
    name: "Chandan",
    message: "Welcome Home"
  });
});

app.get("/about", (request, response) => {
  response.render("about.hbs", {
    name: "Chandan",
    message: "About Chandan"
  });
});

app.get("/projects", (request, response) => {
  response.render("projects.hbs", {
    name: "Chandan",
    message: "Projects"
  });
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});