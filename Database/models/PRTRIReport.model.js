import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"
import PRTRIPlan from "./PRTRIPlan.model.js"

const PRTRIReport = db.define( 'PRTRIReport', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.INTEGER,
        allowNull:false
    },
data2 : {
    type: DataTypes.INTEGER,
    allowNull:false
},
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

PRTRIReport.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
PRTRIReport.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})
PRTRIReport.belongsTo(PRTRIPlan, {as: 'planid', foreignKey:'planId'})

export default PRTRIReport

