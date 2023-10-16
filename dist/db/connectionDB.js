"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionDB = new sequelize_1.Sequelize("node", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
});
exports.default = connectionDB;
//# sourceMappingURL=connectionDB.js.map