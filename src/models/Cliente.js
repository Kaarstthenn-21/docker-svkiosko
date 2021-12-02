import { Schema, model } from "mongoose";

const clienteSchema = new Schema(
    {
        nombre:
        {
            type: String,
            required: [true, 'El nombre es requerido.']
        },
        dni:
        {
            type: String,
            required: [true, 'El dni es obligatorio'],
            length: 8
        },
        direccion:
        {
            type: String,
        },
        telefono:
        {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('CLIENTE', clienteSchema);