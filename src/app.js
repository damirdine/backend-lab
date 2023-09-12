// app.js
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
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
// set default view engine
app.set('view engine', 'html');

app.get("/", (req, res) => {
  res.render("pages/home", { title: "hello", data });
});

app.get("/article/:id",(req, res) => {
  const articleId = req.params.id;
  const article = data.find(el => el.id==articleId)
  if (!article) return res.render("pages/404", {message:"Record "+articleId + " not found"});
  res.render("pages/article", { data: article});
});

app.get("/load-data", (req, res) => {
  // Replace with code to fetch data or perform actions here
  const newData = "This is the dynamically loaded content.";
  res.send( newData);
});

module.exports = app;
