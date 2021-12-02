import { Schema, model } from "mongoose";

const proveedorSchema = new Schema(
  {
    nombre: 
    {
        type: String,
        required: [true, 'El nombre es requerido.']
    },
    ruc:{
        type: String,
        required: [true, 'El RUC es requerido.']
    },
    direccion: 
    {
        type: String,
        required: [true, 'La direccion es requerido.']
    },
    telefono:
    {
        type: String,
        required: [true, 'El telefono es requerido.']
    },
    email:
    {
        type: String,
        required: [true, 'El email es requerido']
    }
  },
  {
    versionKey: false,
  }
);

export default model("PROVEEDOR", proveedorSchema);