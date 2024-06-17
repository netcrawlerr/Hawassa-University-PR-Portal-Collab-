import express from "express";

import reportController from "../controllers/reportController.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

const taskAuth = express.Router();

taskAuth.post("/submitReport", reportController.submitReport, (req, res) => {
  console.log("Submitted ");
});



export default taskAuth;
