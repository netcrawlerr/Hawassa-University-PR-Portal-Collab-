  import { Sequelize } from "sequelize"
  import { config } from "dotenv"
  config()
  console.log(process.env.PASSWORD, process.env.USER)
  const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,{
      host: process.env.HOST,
      dialect: 'mysql'
  })
  // import EBUAIGPlan from "./EBUAIGPlan.model.js"
  // import EBUAIGReport from "./EBUAIGReport.model.js"
  // import ESAEOPlan from "./ESAEOPlan.model.js"
  // import ESAEOReport from "./ESAEOReport.model.js"
  // import FADPlan from "./FADPlan.model.js"
  // import FADReport from './FADReport.model.js'
  // import IIEPlan from './IIEPlan.model.js'
  // import IEEReport from './IIEPlan.model.js'
  // import PRTRIPlan from './PRTRIPlan.model.js'
  // import PRTRIReport from './PRTRIReport.model.js'
  // import PSTAIPlan from './PSTAIPlan.model.js'
  // import PSTAIReport from './PSTAIReport.model.js'
  // import QAIPlan from './QAIPlan.model.js'
  // import QAIReport from './QAIReport.model.js'
  // import SFRPlan from './SFRPlan.model.js'
  // import  SFRReport from './SFRReport.model.js'
  // import URWIPlan from './URWIPlan.model.js'
  // import URWIReport from './URWIReport.model.js'
  // import users from "./user.model.js"

  db.sync({force: false}).then(() =>  {
    console.log('database and tables created')
  }).catch(() => {
    console.log('some error occurred')
  })

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default db;