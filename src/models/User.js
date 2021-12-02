import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'El usuario es obligatorio']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'El correo es obligatorio']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    rol: [
      {
        type: Schema.Types.ObjectId,
        ref: "ROL"
      },
    ],
    //agregar condicional
    telefono: {
      type: String,
      required: [true, 'El telefono es requerido']
    },
    direccion: {
      type: String,
      required: [true, 'La direccion es requerido']
    },
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es requerido']
    },
    tienda: [
      {
        type: Schema.Types.ObjectId,
        ref: "TIENDA",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", productSchema);
