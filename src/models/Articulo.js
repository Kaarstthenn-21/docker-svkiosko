import { Schema, model, Number, ObjectId, SchemaType } from "mongoose";

const articuloSchema = Schema(
    {
        clave:
        {
            type: String
        },
        cantidad:
        {
            type: Number
        },
        costoVenta:
        {
            type: Number,
            required: [true, 'Se requiere costo de venta']
        },
        costoCompra:
        {
            type: Number,
            required: [true, 'Se requiere costo de compra']
        },
        perecero:
        {
            type: Date
        },
        descripcion:
        {
            type: String
        },
        proveedor:
        {
            type: Schema.Types.ObjectId,
            ref: 'PROVEEDOR'
        }
    },
    {
        versionKey: false
    }
);

export default model('ARTICULO', articuloSchema);