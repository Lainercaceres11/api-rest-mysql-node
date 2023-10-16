import { Sequelize } from "sequelize";

const connectionDB = new Sequelize("node", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
})
export default connectionDB;