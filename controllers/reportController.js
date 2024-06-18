
import authController from "./auth.js";
import IIEReport from "../Database/models/IIEReport.model.js";
import GeneralData from "../Database/models/generalData.model.js";
import { dataValues, DELIMITER, goalsPlan, tableNames, tables } from "../utils.js";
import users from "../Database/models/user.model.js";

const categorizeData = (datas) => {
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
  console.log("Request body:", req.body.dataset);
  const userID = req.user.id;
 
  const { textareas, tablename } = req.body;
  let generalData = textareas.join(DELIMITER)
  let validKeys = categorizeData(req.body.dataset)
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
  for (let [key, data] of Object.entries(dataset)) {

    data['submittedBy'] = userID
  data['receivedBy'] = userID;
  data['type'] = key
  delete data.key
  let table = tables[tablename]
  console.log(table);
    let report;
     await table.create(data).then((data) => {
      report = data;
      report.save()
    })
    .catch(err => console.log(err));

    let tableDataId = `${tablename}${report.id}`
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
const handleViewReport = async (req, res) => {
  const {department, goal_id} = req.body;
  const table = goalsPlan[goal_id];
  let userss = await users.findAll({where: {privilege: department}})
  const user = userss[0]
  let tabularDatas = await table.findAll({where: {submittedBy: user.id}})
  const tabularData = tabularDatas[0]
  let general_id = `${tableNames[goal_id]}${tabularData.id}`
  console.log('general_id', general_id)
  let generals = await GeneralData.findAll({where: {tableDataId: `${tableNames[goal_id]}${tabularData.id}`}})
  const general = generals[0]
  console.log(tabularData)
  const splitedGeneral = general.split(DELIMITER)

  res.status(200).render(`/compile${goal_id}`,{
    tabularData: tabularData, general:splitedGeneral
  })

}
// Middleware for checking if the user is logged in
const viewReport = [authController.isLoggedIn, handleViewReport]

const submitTable1Report = async (req, res) => {};
const submitTable2Report = async (req, res) => {};
const submitTable3Report = async (req, res) => {};
const submitTable4Report = async (req, res) => {};
const submitTable5Report = async (req, res) => {};
const submitTable6Report = async (req, res) => {};
const submitTable7Report = async (req, res) => {};
const submitTable8Report = async (req, res) => {};
const submitTable9Report = async (req, res) => {};

export default { submitReport , viewReport};
