import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';

import productsRouter from "./routers/products.router.js";
import viewsRouter from "./routers/views.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");
app.use(cookieParser('password1234'));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://juampiiHill:060966@codercluster.invhles.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 6000,
    }),
    secret: "password1234",
    resave: true,
    saveUninitialized: true,
  })
);

mongoose.connect(
  "mongodb+srv://juampiiHill:060966@codercluster.invhles.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`Listen ${port}`);
});
