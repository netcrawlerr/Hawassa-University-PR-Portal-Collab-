import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const SFRPlan = db.define( 'SFRPlan', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data1 : {
        type: DataTypes.INTEGER,
        allowNull:false
    },
approved: { type: DataTypes.STRING, allowNull:false},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

SFRPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
SFRPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default SFRPlan

