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

import EBUAIGPlan from "./Database/models/EBUAIGPlan.model.js";
import EBUAIGReport from "./Database/models/EBUAIGReport.model.js";
import ESAEOPlan from "./Database/models/ESAEOPlan.model.js";
import ESAEOReport from "./Database/models/ESAEOReport.model.js";
import FADPlan from "./Database/models/FADPlan.model.js";
import FADReport from "./Database/models/FADReport.model.js";
import IIEPlan from "./Database/models/IIEPlan.model.js";
import IEEReport from "./Database/models/IIEReport.model.js";
import PRTRIPlan from "./Database/models/PRTRIPlan.model.js";
import PRTRIReport from "./Database/models/PRTRIReport.model.js";
import PSTAIPlan from "./Database/models/PSTAIPlan.model.js";
import PSTAIReport from "./Database/models/PSTAIReport.model.js";
import QAIPlan from "./Database/models/QAIPlan.model.js";
import QAIReport from "./Database/models/QAIReport.model.js";
import SFRPlan from "./Database/models/SFRPlan.model.js";
import SFRReport from "./Database/models/SFRReport.model.js";
import URWIPlan from "./Database/models/URWIPlan.model.js";
import URWIReport from "./Database/models/URWIReport.model.js";
import users from "./Database/models/user.model.js";

db.sync({ force: false })
  .then(() => {
    console.log("database and tables created");
  })
  .catch(() => {
    console.log("some error occurred");
  });

app.listen(3000, (req, res) => {
  console.log("Server Listening At Port 3000.........");
});
