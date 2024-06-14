import db from './index.js'
import { DataTypes } from "sequelize"

const users = db.define( 'Users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name : {
        type: DataTypes.STRING,
        allowNull:false
    },
job : {
    type: DataTypes.STRING,
    allowNull:false
},
password : {
    type: DataTypes.STRING,
    allowNull:false
},
email: { type: DataTypes.STRING, allowNull:false},
privilege: {type: DataTypes.STRING(500), allowNull: true}
})


export default users

