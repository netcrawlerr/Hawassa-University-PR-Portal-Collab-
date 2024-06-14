import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const PRTRIPlan = db.define( 'PRTRIPlan', {
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
approved: { type: DataTypes.STRING, allowNull:false},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

PRTRIPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
PRTRIPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default PRTRIPlan

