const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const indexRouter = require("./routes/indexRouter");
const pool = require("./db/pool");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    //Equals to 1 week or 7 days
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    name: "session_cookie",
  })
);
app.use(passport.session());
//Data type of req.body will only be string
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username.toLowerCase()]
      );
      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);

      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

// The reason passport require us to define these functions is so
// that we can make sure that whatever bit of data it’s looking
// for actually exists in our Database
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    //attach user object to .user property of req as req.user
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  //now locals.session.messages can contain failureMessage's
  //deep copy as req.session.messages is property of obj reference
  //which edits both req and res obj property
  res.locals.session = JSON.parse(JSON.stringify(req.session));
  req.session.messages = null;
  next();
});

app.use("/", indexRouter);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    // Need to fix: Redirect user to same page when entered wrong pw on dialog
    failureRedirect: "/sign-up",
    failureMessage: true,
  })
);

app.use((req, res) => {
  res.render("error", {
    error: {
      statusCode: "404",
      message: "This is not the page you're looking for",
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).redirect("error", { error: err });
});

app.listen(PORT, () => {
  console.log(`App is live at - http://localhost:${PORT}/`);
});
