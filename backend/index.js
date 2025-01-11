import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CartRoute from "./routes/CartRoutes.js";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";
import path from "path";
import Cart from "./models/CartModels.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync({ alter: true });
})();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({

    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://192.168.56.1:3000",
    ],

    credentials: true,
  })
);

app.use(fileUpload());
app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(CartRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server running");
});
