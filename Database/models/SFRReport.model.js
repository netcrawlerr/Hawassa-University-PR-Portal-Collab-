import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"
import SFRPlan from './SFRPlan.model.js'

const SFRReport = db.define( 'SFRReport', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.INTEGER,
        allowNull:false
    },
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

SFRReport.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
SFRReport.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})
SFRReport.belongsTo(SFRPlan, {as: 'planid', foreignKey:'planId'})

export default SFRReport

