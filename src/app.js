require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const Keycloak = require("keycloak-connect");

const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});

const data = [
  {
    id: 1,
    title: "hell",
    content: "loresm skjskjsjffoissjsjf ofdsis",
    comments: [
      {
        user_name: "random",
        message: "helllo",
        responses: [{ user_name: "replayer", message: "Welcom" }],
      },
    ],
  },
  {
    id: 2,
    title: "hell2",
    content: "loresm skjskjsjffoissjsjf ofdsis",
    comments: [
      {
        user_name: "random",
        message: "helllo",
        responses: [{ user_name: "replayer", message: "Welcom" }],
      },
    ],
  },
];
// usr cors
app.use(cors({ origin: "*" }));
// set up keycloak auth & session
const sessionMemoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "votre_secret_de_session",
    resave: false,
    saveUninitialized: true,
    store: sessionMemoryStore,
  })
);
const kcConfig = {
  realm: process.env.KC_REALM,
  "auth-server-url": process.env.KC_SERVER_URL,
  resource: process.env.KC_RESOURCE,
  // "ssl-required": "external",
  // "public-client": true,
  // "confidential-port": 0
};
const keycloak = new Keycloak({ store: sessionMemoryStore }, kcConfig);

app.use(keycloak.middleware());

// set default view engine
app.use(express.static(__dirname + "/../public"));
app.set("view engine", "html");

app.get("/", async (req, res) => {
  const user = req.kauth.grant?.access_token.content;
  console.log(user);
  res.render("pages/home", { title: "hello", data, user });
});

app.get("/article/:id", keycloak.protect(), (req, res) => {
  const user = req.kauth.grant?.access_token.content;

  const articleId = req.params.id;
  const article = data.find((el) => el.id == articleId);
  if (!article)
    return res.render("pages/404", {
      message: "Record " + articleId + " not found",
    });
  res.render("pages/article", { data: article, user });
});

//// Login / Logout
app.get("/login", keycloak.protect(), (req, res) => {
  res.redirect("/");
});

app.get("/load-data", (req, res) => {
  // Replace with code to fetch data or perform actions here
  const newData = "This is the dynamically loaded content.";
  res.send(newData);
});

module.exports = app;
