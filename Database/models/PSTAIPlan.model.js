import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const PSTAIPlan = db.define( 'PSTAIPlan', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.FLOAT,
        allowNull:false
    },
data2 : {
    type: DataTypes.INTEGER,
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
    type: DataTypes.FLOAT,
    allowNull:false
},
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

PSTAIPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
PSTAIPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default PSTAIPlan

