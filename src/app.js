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

const data = [
  {
    id:1,
    title : "hell",
    content: "loresm skjskjsjffoissjsjf ofdsis",
    comments:[
      {
        user_name: "random",
        message:"helllo",
        responses: [{user_name: "replayer",message:"Welcom"}]
      }
    ]
  },
  {
    id:2,
    title : "hell2",
    content: "loresm skjskjsjffoissjsjf ofdsis",
    comments:[
      {
        user_name: "random",
        message:"helllo",
        responses: [{user_name: "replayer",message:"Welcom"}]
      }
    ]
  }
];
app.get("/", (req, res) => {
  res.render("pages/home.njk", { title: "hello", data });
});

app.get("/article/:id",(req, res) => {
  const articleId = req.params.id;
  res.send(`Article ID: ${articleId}`);
});

app.get("/load-data", (req, res) => {
  // Replace with code to fetch data or perform actions here
  const newData = "This is the dynamically loaded content.";
  res.send( newData);
});

module.exports = app;
