// app.js
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  defaultExtention: ".njk",
  watch: true,
});

app.get("/", (req, res) => {
  res.render("pages/home.njk", { title: "hello" });
});

app.get("/load-data", (req, res) => {
  // Replace with code to fetch data or perform actions here
  const newData = "This is the dynamically loaded content.";
  res.render("components/message.njk", { message: newData });
});

module.exports = app;
