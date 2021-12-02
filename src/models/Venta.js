import { Schema, model, Date } from "mongoose";

const ventaSchema = Schema(
    {
        fecha:
        {
            type: Date
        },
        hora:
        {
            type: Date
        },
        articulos:[
            {
                type: Schema.Types.ObjectID,
                ref: 'ARTICULOS'
            }
        ],
        precioTotal:
        {
            type: Number,
            required: [true, 'Se requiere un precio']
        },
        cajero:
        {
            type: Schema.Types.ObjectID,
            ref: 'USUARIO'
        },
        cliente:
        {
            type: Schema.Types.ObjectID,
            ref: 'CLIENTE'
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
);

export default model('VENTA', ventaSchema);