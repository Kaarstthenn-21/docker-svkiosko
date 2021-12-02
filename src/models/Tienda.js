import { Schema, model } from "mongoose";

const tiendaSchema = new Schema(
  {
    nombre: 
    {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    ubicacion: 
    {
        type: String,
        required: [true, 'La ubicacion es requerido']
    },
  },
  {
    versionKey: false,
  }
);

export default model("TIENDA", tiendaSchema);