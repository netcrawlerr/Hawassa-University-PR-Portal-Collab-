import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"
import QAIPlan from "./QAIPlan.model.js"

const QAIReport = db.define( 'QAIReport', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.FLOAT,
        allowNull:false
    },
data2 : {
    type: DataTypes.FLOAT,
    allowNull:false
},
data3 : {
    type: DataTypes.FLOAT,
    allowNull:false
},
data4 : {
    type: DataTypes.FLOAT,
    allowNull:false
},
data5 : {
    type: DataTypes.INTEGER,
    allowNull:false
},
data6 : {
    type: DataTypes.INTEGER,
    allowNull:false
},
data7 : {
    type: DataTypes.INTEGER,
    allowNull:false
},
approved: { type: DataTypes.STRING, allowNull:false},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

QAIReport.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
QAIReport.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})
QAIReport.belongsTo(QAIPlan, {as: 'planid', foreignKey:'planId'})

export default QAIReport

