
import authController from "./auth.js";
import IIEReport from "../Database/models/IIEReport.model.js";
import GeneralData from "../Database/models/generalData.model.js";
import { dataValues, DELIMITER } from "../views/utils.js";

const categorizeData = (datas, textareas) => {
  const dataset = {};
  for (let type of dataValues.types) {
    const keys = datas
      .filter((data) => data[name].startsWith(type));
    keys.sort(function(a, b) {
      if (a.name < b.name) {
          return -1;
      }
      if (a.name > b.name) {
          return 1;
      }
      return 0;
  });
    const oneData = {};
    if (keys.length > 0) {
      for (let i = 1; i <= keys.length; i++) {
        let key = `${keys[i].name}${i}`;
        oneData[`data${i}`] = key[i].value
      }
      let generalData = textareas.join(DELIMITER);
      oneData["generalData"] = generalData;
      dataset[`data${i}`] = oneData;
    }
  }
  if (Object.keys(dataset).length <= 0) {
    return 0;
  }
};
async function handleReportSubmission(req, res) {
  console.log("Request body:", req.body);
  const userID = req.user.id;

  // const {}

  const dataset = categorizeData(req.body.dataset , textareas)
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
// 
// Middleware for checking if the user is logged in


const submitTable1Report = async (req, res) => {};
const submitTable2Report = async (req, res) => {};
const submitTable3Report = async (req, res) => {};
const submitTable4Report = async (req, res) => {};
const submitTable5Report = async (req, res) => {};
const submitTable6Report = async (req, res) => {};
const submitTable7Report = async (req, res) => {};
const submitTable8Report = async (req, res) => {};
const submitTable9Report = async (req, res) => {};

export default { submitReport };
