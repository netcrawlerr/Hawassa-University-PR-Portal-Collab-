import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"
import IIEPlan from "./IIEPlan.model.js"

const IIEReport = db.define( 'IIEReport', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
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
data8 : {
    type: DataTypes.FLOAT,
    allowNull:false
},
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

IIEReport.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
IIEReport.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})
IIEReport.belongsTo(IIEPlan, {as: 'planid', foreignKey:'planId'})

export default IIEReport

