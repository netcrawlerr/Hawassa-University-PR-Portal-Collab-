
import authController from "./auth.js";
import IIEReport from "../Database/models/IIEReport.model.js";
import GeneralData from "../Database/models/generalData.model.js";
import { dataValues, DELIMITER } from "../views/utils.js";

const categorizeData = (datas, textareas) => {
  const dataset = {};
  for (let type of dataValues.types) {
    const keys = datas
      .filter((data) => data["name"].startsWith(type));
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
      let init = 1;
      for (let some of keys) {
        console.log(some)
        console.log("values in setting the data", some['value'])
        let key = `data${init}`;
        oneData[`data${init}`] = some['value']
        Object.assign(oneData, {key: some['value']})
        init++
      }
      console.log(oneData)
      let generalData = textareas.join(DELIMITER);
      oneData["generalData"] = generalData;
      let allNotNull = Object.values(oneData).every(data => data != null || data != '')
      if (allNotNull){
        dataset[type] = oneData;
        init++;
      }
    }
  }
  if (Object.keys(dataset).length <= 0) {
    return 0;
  }
  return dataset
};
async function handleReportSubmission(req, res) {
  console.log("Request body:", req.body.dataset[0]);
  const userID = req.user.id;

  // const {}

  
  const { textareas } = req.body;
  let generalData = textareas.join(DELIMITER)
  let validKeys = categorizeData(req.body.dataset , textareas)
  const dataset = Object.fromEntries(
    Object.entries(validKeys).filter(([key, value]) => {
      return Object.values(value).every(val => val != "")
    })
  )
  console.log("categorized dataset", dataset)
  if (dataset ==0) {
    return false
  }
  console.log("From submit report ", userID);
  for (let data of Object.values(dataset)) {

    data['submittedBy'] = userID
  data['receivedBy'] = userID;
  delete data.key
    let report;
     await IIEReport.create(data).then((data) => {
      report = data;
      console.log('data IIE created', report)
      report.save()
    })
    .catch(err => console.log(err));

    console.log("report", report)
    let tableDataId = `IIEReport${report.id}`
    let general;
     await GeneralData.create({generalData, tableDataId})
    .then(data => {
      general = data;
      general.save()

    })
    .catch(err => console.log(err))
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
