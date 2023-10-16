import { DataTypes } from "sequelize"
import connectionDB from "../db/connectionDB"


const UserModel = connectionDB.define("Usuarios", {
    nombre:{
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.BOOLEAN
    }
})

export default UserModel;