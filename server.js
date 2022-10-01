const express = require("express");
const port = 3000;
const app = express();
const path = require("path");

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/images", express.static(path.join(__dirname, "/imagesFiles")));
app.use("/css", express.static(path.join(__dirname, "/cssFiles")));

app
  .get("/", workingDaysHours, (req, res) => {
    req.isWorking === true ? res.render("home.pug") : res.render("restDay.pug");
  })
  .get("/Home", workingDaysHours, (req, res) => {
    req.isWorking === true ? res.render("home.pug") : res.render("restDay.pug");
  });

app.get("/Services", (req, res) => {
  res.render("services.pug");
});

app.get("/Contact", (req, res) => {
  res.render("contact.pug");
});

app.get("/restDay", (req, res) => {
  res.render("restDay.puh");
});

function workingDaysHours(req, res, next) {
  const date = new Date();
  const Hour = date.getHours();
  const Day = date.getDay();

  const isWokingDay = Day > 0 && Day < 6;
  const isWoringHour = Hour >= 9 && Hour <= 17;

  if (isWokingDay && isWoringHour) {
    req.isWorking = true;
    next();
  } else {
    req.isWorking = false;
    next();
  }
}

app.listen(port);
