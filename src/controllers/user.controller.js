import User from "../models/User";
import ROL from "../models/Role";
import TIENDA from "../models/Tienda";
export const createUser = async (req, res) => {
  try {
    const { username, email, password, rol , telefono , direccion , nombre, apellido ,tienda} = req.body;

    const rolesFound = await ROL.find({ name: { $in: rol } });

    const tiendaFound = await TIENDA.find({ nombre: { $in: tienda } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      rol: rolesFound.map((role) => role._id),
      telefono,
      direccion,
      nombre,
      apellido,
      tienda: tiendaFound.map((tienda) => tienda._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      rol: savedUser.rol,
      telefono: savedUser.telefono,
      direccion: savedUser.direccion,
      nombre: savedUser.nombre,
      apellido: savedUser.apellido,
      tienda: savedUser.tienda,
    });
  } catch (error) {
    console.error(error);
  }
};
/*
export const updateUser = async (req, res) => {
  try{

  }catch (error){
    console.error(error);
    return res.status(500).json({mensaje: "Error al editar usuario."});
  }
};*/

export const getUsers = async (req, res) => {
  try{
    const usersFound = await User.find({},{password:0});
    if (!usersFound){ return res.status(401).json({mensaje: "No se encontraron usuarios"})}

    return res.status(200).json({
      users: usersFound
    });
  }catch (error){
    console.error(error);
    return res.status(500).json({mensaje: "Error al extraer usuarios."});
  }
};

export const getUser = async (req, res) => {
  try{
    const userFound = await User.findOne({ _id: req.params.id },{password: 0});
    if(!userFound) return res.status(401).json({mensaje: "Usuario no existe."});

    return res.status(200).json({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
      telefono: userFound.telefono,
      direccion: userFound.direccion,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      tienda: userFound.tienda,
    });

  }catch (error){
    console.error(error);
    return res.status(500).json({mensaje: "Error al extraer usuario."});
  }
  
};

export const deleteUser = async (req, res) => {
  try{
    const { _id } = req.body;
    const userFound = await User.findOne({_id: _id});
    if (!userFound){ return res.status(401).json({mensaje: "Usuario no existe"})}

    await User.deleteOne({_id: _id});
    return res.status(201).json({mensaje: "El Usuario fue eliminado."});

  }catch(error){
    console.log(error);
    return res.status(500).json({mensaje: "Error al eliminar usuario"});
  }
};
