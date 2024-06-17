import db from './index.js'
import { DataTypes } from "sequelize"

const GeneralData = db.define( 'GeneralData', {
    generalData: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tableDataId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default GeneralData

