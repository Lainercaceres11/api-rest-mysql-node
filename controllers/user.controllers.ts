import { Request, Response } from "express";
import UserModel from "../models/user.model";

const getUsers = async (req: Request, res: Response) => {
  const usuarios = await UserModel.findAll();

  res.json({
    msg: "Lista de usuarios",
    usuarios,
  });
};

const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await UserModel.findByPk(id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.json({
      msg: `Usuario con el id ${id} no existe`,
    });
  }
};

const postUsers = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existeEmail = await UserModel.findOne({
      where: {
        correo: body.correo,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: "Ya existe ese email",
      });
    }

    const newUser = new UserModel(body);
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar usuario",
    });
  }
};

const putUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await UserModel.findByPk(id);

    if (!usuario) {
      return res.status(400).json({
        msg: `No exsite un usuario con ese id ${id} `,
      });
    }

    await usuario.update(body);

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.json({
      msg: "No se puedo modificar el usuario",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.findByPk(id);
    if (!usuario) {
      return res.status(400).json({
        msg: `No existe el usuario con ese id ${id} `,
      });
    }

    // Eliminacion fisica
    // await usuario.destroy()

    await usuario.update({ estado: false });

    res.json({
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar el usuario",
    });
  }
};

export { getUsers, getUsersById, postUsers, putUsers, deleteUser };
