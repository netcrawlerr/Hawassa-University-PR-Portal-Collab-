import {
  addTextReport,
  viewTextReport,
  csViewTextReport,
  itViewTextReport,
  isViewTextReport,
  updateTextReports,
  getID,
} from "../Database/database.js";
import authController from "./auth.js";
import IIEReport from "../Database/models/IIEReport.model.js"
import GeneralData from "../Database/models/generalData.model.js";
import { dataValues, DELIMITER } from "../views/utils.js";

const categorizeData = (data) => {
  const dataset = {}
    for (let type of dataValues.types) {
      const keys = Object.keys(data).filter((key) => key.startsWith(type)).sort()
      console.log(Object.keys(data))
      const oneData = {}
      if (keys.length > 0) {
        for (let i = 1; i <= keys.length; i++){
          let key = `${keys[i]}${i}`
          oneData[`data${i}`] = data[key]
        }
        let generalData = textareas.join(DELIMITER)
        oneData['generalData'] = generalData
        dataset[`data${i}`] = oneData
      }
    }
    if (Object.keys(dataset).length <=0 ){
      return 0;
    }
}
async function handleReportSubmission(req, res) {
  console.log("Request body:", req.body);
  const userID = req.user.id;

  const dataset = categorizeData(req.body)
  console.log(dataset)
  if (dataset ==0) {
    return false
  }
  const { textareas } = req.body;
  let generalData = textareas.join(DELIMITER)

  console.log("From submit report ", userID);
  for (let data of Object.values(dataset)) {
    data['submittedby'] = userID
  data['receivedby'] = userID;
    let report = await IIEReport.create(data);
    console.log(data)
    let tableDataId = `IIEReport${report.id}`
    let general = await GeneralData.create({generalData, tableDataId})
    console.log(data)
    await report.save()
    await general.save()
  }

}

const submitReport = [authController.isLoggedIn, handleReportSubmission];

// function to view the report
async function handleReportView(req, res) {
  const goalID = req.body.goal_id;
  const department = req.body.department;
  const userID = req.user.id;
  const user = req.user.position;
  console.log("Username is: ", user);
  console.log("Department to show report: ", department);
  console.log("handle Report", userID);
  console.log("goal id", goalID);

  if (req.user.username == "informaticshead") {
    if (department == "cshead") {
      console.log(department);
      const report = await csViewTextReport(goalID, department);
      console.log("Report for cs head: " + report);
      res.render(
        "../views/Report/View_Report/informatics/informaticsViewReport.hbs",
        {
          reports: report,
          goal_id: goalID,
        }
      );
    } else if (department == "ithead") {
      console.log(department);
      const report = await itViewTextReport(goalID, department);
      console.log("Report for cs head: " + report);
      res.render(
        "../views/Report/View_Report/informatics/informaticsViewReport.hbs",
        {
          reports: report,
          goal_id: goalID,
        }
      );
    } else if (department == "ishead") {
      console.log(department);
      const report = await isViewTextReport(goalID, department);
      console.log("Report for cs head: " + report);
      res.render(
        "../views/Report/View_Report/informatics/informaticsViewReport.hbs",
        {
          reports: report,
          goal_id: goalID,
        }
      );
    } else {
      res.render(
        "../views/Report/View_Report/informatics/informaticsViewReport.hbs"
      );
      console.log("Not CSHEAD");
    }
  } else {
    try {
      const report = await viewTextReport(userID, goalID);

      switch (goalID) {
        case "1":
          res.render("../views/Report/View_Report/viewReport1", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "2":
          res.render("../views/Report/View_Report/viewReport2", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "3":
          res.render("../views/Report/View_Report/viewReport3", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "4":
          res.render("../views/Report/View_Report/viewReport4", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "5":
          res.render("../views/Report/View_Report/viewReport5", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "6":
          res.render("../views/Report/View_Report/viewReport6", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "7":
          res.render("../views/Report/View_Report/viewReport7", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "8":
          res.render("../views/Report/View_Report/viewReport8", {
            reports: report,
            goal_id: goalID,
          });
          break;
        case "9":
          res.render("../views/Report/View_Report/viewReport9", {
            reports: report,
            goal_id: goalID,
          });
          break;
        default:
          res.render("../views/Report/View_Report/viewReport1");
          break;
      }

      // res.json({ report });
      console.log("Sent back to client");

      // return report;
    } catch (error) {
      // If there's an error fetching the report, handle it
      console.error("Error fetching report:", error);
      // Sending an error response to the client
      res.status(500).json({ error: "Failed to fetch report" });
    }
  }
}

// Middleware for checking if the user is logged in
const viewReport = [authController.isLoggedIn, handleReportView];

async function handleEditReport(req, res) {
  console.log("about to edit report");
  const goalID = req.body.goal_id;
  const userID = req.user.id;
  const username = req.user.username;
  
  console.log("GoalID from handleEditReport", goalID);
  console.log("UserID from handleEditReport", userID);

  const editedReports = req.body.reportTextArea || [];
  console.log("Text areas", editedReports);
  try {
    await updateTextReports(userID, goalID, editedReports);
    res.redirect(`/viewReport${goalID}`);
  } catch (error) {
    console.error("Error handling edit report:", error);
    res.status(500).json({ error: "Failed to handle edit report" });
  }
}

const editReport = [authController.isLoggedIn, handleEditReport];

const submitTable1Report = async (req, res) => {};
const submitTable2Report = async (req, res) => {};
const submitTable3Report = async (req, res) => {};
const submitTable4Report = async (req, res) => {};
const submitTable5Report = async (req, res) => {};
const submitTable6Report = async (req, res) => {};
const submitTable7Report = async (req, res) => {};
const submitTable8Report = async (req, res) => {};
const submitTable9Report = async (req, res) => {};

export default { submitReport, viewReport, editReport };
