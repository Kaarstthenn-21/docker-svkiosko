import ROL from "../models/Role";
import User from "../models/User";
import TIENDA from "../models/Tienda";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await ROL.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new ROL({ name: "user" }).save(),
      new ROL({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createTienda = async () => {
  try {
    // Count Tienda
    const count = await TIENDA.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new TIENDA({ nombre: "unspecified" ,ubicacion : "-" }).save()
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  try {
    const user = await User.findOne({ email: "admin@gmail.com" });
  // get roles _id
  const roles = await ROL.find({ name: { $in: ["admin"] } });
  if (!roles) {
    console.log("rol no encontrado");
  }

  if (!user) {
    //  create a new admin user
    await User.create({
      username: "admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin", 10),
      rol: roles.map((role)=> role._id),
      telefono: "927316613",
      direccion: "AV arequipa S/N",
      nombre: "Kaarstthenn Alexander",
      apellido: "Ancco Escobar",
    });
    console.log('Admin User Created!')
  }
  }catch(error){
    console.log(error)
  }
  
};
