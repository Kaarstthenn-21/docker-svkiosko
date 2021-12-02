import User from "../models/User";
import ROL from "../models/Role";
import TIENDA from "../models/Tienda";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Cuando se de la solicitud con el body
    const { username, email, password, rol, telefono, direccion, nombre, apellido, tienda } = req.body;
    // Creando un objeto de usuario
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      telefono,
      direccion,
      nombre,
      apellido,
    });

    // Verificando roles
    if (req.body.rol) {
      const foundRoles = await ROL.find({ name: { $in: rol } });
      newUser.rol = foundRoles.map((role) => role._id);
    } else {
      const role = await ROL.findOne({ name: "user" });
      newUser.rol = [role._id];
    }
    if (req.body.tienda) {
      const foundTiendas = await TIENDA.find({ name: { $in: tienda } });
      newUser.tienda = foundTiendas.map((tienda) => tienda._id);
    } else {
      const tienda = await TIENDA.findOne({ nombre: "unspecefied" });
      newUser.tienda = [tienda._id];
    }

    // Guardando el objeto usuario en MongoDb
    const savedUser = await newUser.save();

    // Creando TOken
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours=86400S
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Solicitud del body, puede ser email o user
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "rol"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours = 86400 S
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
