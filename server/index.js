const express = require("express");
const bodyParser = require("body-parser");
const mongoUtil = require("./mongoUtil");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const app = express();
const port = 3001;

app.use(
  session({
    secret: "v me 50",
    resave: false,
    saveUninitialized: true,
  })
);

const queryRoutes = require("./routes/query-routes");
const movieRoutes = require("./routes/movie-routes");
const reviewRoutes = require("./routes/review-routes");
const loginRoutes = require("./routes/login-routes");
// adding register
const registerRoutes = require("./routes/register-routes");

mongoUtil.connectToClient();

app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use(
//   session({
//     secret: "v me 50",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// //testing
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.session.user);
  next();
});


app.use("/api/query", queryRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);

//
app.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});

module.exports = app;
