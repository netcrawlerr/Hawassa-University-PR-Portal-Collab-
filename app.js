import express from "express";

import routerPages from "./routes/pages.js";
import routerAuth from "./routes/auth.js";

import cookieParser from "cookie-parser";
import taskAuth from "./routes/tasks.js";

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "hbs");

// Defining Routes

app.use("/", routerPages);
app.use("/auth", routerAuth);
app.use("/tasks", taskAuth);
app.listen(3000, (req, res) => {
  console.log("Server Listening At Port 3000.........");
});
