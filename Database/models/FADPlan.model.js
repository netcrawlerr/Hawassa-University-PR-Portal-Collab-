import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const FADPlan = db.define( 'FADPlan', {
 
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
    type: DataTypes.FLOAT,
    allowNull:false
},
data6 : {
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

FADPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
FADPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default FADPlan

