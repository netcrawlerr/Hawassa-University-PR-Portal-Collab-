import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const ESAEOPPlan = db.define( 'ESAEOPPlan', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.STRING,
        allowNull:false
    },
data2 : {
    type: DataTypes.STRING,
    allowNull:false
},
data3 : {
    type: DataTypes.STRING,
    allowNull:false
},
data4 : {
    type: DataTypes.INTEGER,
    allowNull:false
},
data5 : {
    type: DataTypes.STRING,
    allowNull:false
},
data6 : {
    type: DataTypes.STRING,
    allowNull:false
},
data7 : {
    type: DataTypes.STRING,
    allowNull:false
},
data8 : {
    type: DataTypes.STRING,
    allowNull:false
},
data9 : {
    type: DataTypes.STRING,
    allowNull:false
},
data10 : {
    type: DataTypes.STRING,
    allowNull:false
},
data11 : {
    type: DataTypes.STRING,
    allowNull:false
},
data12 :{
    type: DataTypes.INTEGER,
    allowNull: false
},
data13 :{
    type: DataTypes.INTEGER,
    allowNull: false
},
data14:{
    type: DataTypes.STRING,
    allowNull: false
},
data15:{
    type: DataTypes.STRING,
    allowNull: false
},
data16:{
    type: DataTypes.STRING,
    allowNull: false
},
data17:{type:DataTypes.INTEGER, allowNull:false},
data18:{type:DataTypes.INTEGER, allowNull:false},
data19:{type:DataTypes.INTEGER, allowNull:false},
data20:{type:DataTypes.INTEGER, allowNull:false},
approved: { type:DataTypes.STRING, allowNull:false},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

ESAEOPPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
ESAEOPPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default ESAEOPPlan
