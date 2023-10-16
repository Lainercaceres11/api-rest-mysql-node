"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUsers = exports.postUsers = exports.getUsersById = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield user_model_1.default.findAll();
    res.json({
        msg: "Lista de usuarios",
        usuarios,
    });
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield user_model_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.json({
            msg: `Usuario con el id ${id} no existe`,
        });
    }
});
exports.getUsersById = getUsersById;
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield user_model_1.default.findOne({
            where: {
                correo: body.correo,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe ese email",
            });
        }
        const newUser = new user_model_1.default(body);
        yield newUser.save();
        res.json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar usuario",
        });
    }
});
exports.postUsers = postUsers;
const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield user_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `No exsite un usuario con ese id ${id} `,
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: "No se puedo modificar el usuario",
        });
    }
});
exports.putUsers = putUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield user_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe el usuario con ese id ${id} `,
            });
        }
        // Eliminacion fisica
        // await usuario.destroy()
        yield usuario.update({ estado: false });
        res.json({
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar el usuario",
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controllers.js.map