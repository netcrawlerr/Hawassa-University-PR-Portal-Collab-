import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"
import URWIPlan from './URWIPlan.model.js'

const URWIReport = db.define( 'URWIReport', {
 
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
 type: {
    type: DataTypes.STRING,
    allowNull: false
},
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

URWIReport.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
URWIReport.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})
URWIReport.belongsTo(URWIPlan, {as: 'planid', foreignKey:'planId'})


export default URWIReport

