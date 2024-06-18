import EBUAIGPlan from "./Database/models/EBUAIGPlan.model.js"
import EBUAIGReport from "./Database/models/EBUAIGReport.model.js"
import ESAEOPlan from "./Database/models/ESAEOPlan.model.js"
import ESAEOReport from "./Database/models/ESAEOReport.model.js"
import FADPlan from "./Database/models/FADPlan.model.js"
import FADReport from './Database/models/FADReport.model.js'
import GeneralData from "./Database/models/generalData.model.js";
import IIEPlan from './Database/models/IIEPlan.model.js'
import IEEReport from './Database/models/IIEReport.model.js'
import PRTRIPlan from './Database/models/PRTRIPlan.model.js'
import PRTRIReport from './Database/models/PRTRIReport.model.js'
import PSTAIPlan from './Database/models/PSTAIPlan.model.js'
import PSTAIReport from './Database/models/PSTAIReport.model.js'
import QAIPlan from './Database/models/QAIPlan.model.js'
import QAIReport from './Database/models/QAIReport.model.js'
import SFRPlan from './Database/models/SFRPlan.model.js'
import  SFRReport from './Database/models/SFRReport.model.js'
import URWIPlan from './Database/models/URWIPlan.model.js'
import URWIReport from './Database/models/URWIReport.model.js'
import users from "./Database/models/user.model.js"

export const privileges = {
    departmentHeads: ['computerScienceHead', 'electricalHead', ],
    facultyHeads: ['informaticsHead', 'electricalHead']
}

export const dataValues = {
    types: ["initial",
     'final',
     'threeMonthPlan',
     'threeMonthPlanPerformance']
}

export const DELIMITER='||LIM||'

export const tables = {
EBUAIGPlan,
EBUAIGReport,
ESAEOPlan,
ESAEOReport,
FADPlan,
FADReport,
GeneralData,
IIEPlan,
IEEReport,
PRTRIPlan,
PRTRIReport,
PSTAIPlan,
PSTAIReport,
QAIPlan,
QAIReport,
SFRPlan,
SFRReport,
URWIPlan,
URWIReport,
}

export const goalsPlan = {
    1: IIEPlan,
    2: FADPlan,
    3: ESAEOPlan,
    4: PSTAIPlan,
    5: PRTRIPlan,
    6: URWIPlan,
    7: ESAEOPlan,
    8: QAIPlan,
    9: EBUAIGPlan
}

export  const tableNames = {
    1: 'IIEPlan',
    2: 'FADPlan',
    3: 'ESAEOPlan',
    4: 'PSTAIPlan',
    5: 'PRTRIPlan',
    6: 'URWIPlan',
    7: 'ESAEOPlan',
    8: 'QAIPlan',
    9: 'EBUAIGPlan'
}
