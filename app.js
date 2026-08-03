import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";
import passport from "passport";
import "./config/passport.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PostgresStore = connectPgSimple(session);

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: new PostgresStore({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 24 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", authRouter);

app.listen(3000, (err) => {
  if (err) console.error(err);
  console.log("Express app listening on port 3000!");
});
