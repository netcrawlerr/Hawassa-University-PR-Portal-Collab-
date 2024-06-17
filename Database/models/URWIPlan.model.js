import db from './index.js'
import { DataTypes } from "sequelize"
import users from "./user.model.js"

const URWIPlan = db.define( 'URWIPlan', {
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
approved: { type: DataTypes.STRING, allowNull:true},
feedback: {type: DataTypes.STRING(500), allowNull: true}
})

URWIPlan.belongsTo(users, {as: 'submittedby', foreignKey:'submittedBy'})
URWIPlan.belongsTo(users, {as: 'receivedby', foreignKey:'receivedBy'})

export default URWIPlan

