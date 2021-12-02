import Proveedor from "../models/Proveedor";

export const createProveedor = async (req, res) => {
    const { nombre, ruc, direccion, telefono, email } = req.body;

    try {
        const newProveedor = new Proveedor({
            nombre,
            ruc,
            direccion,
            telefono,
            email
        });

        const proveedorSaved = await newProveedor.save();

        res.status(201).json(proveedorSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getProveedorById = async (req, res) => {
    const { proveedorId } = req.params;

    const proveedor = await Proveedor.findById(proveedorId);
    res.status(200).json(proveedor);
};

export const getProveedores = async (req, res) => {
    const proveedores = await Proveedor.find();
    return res.json(proveedores);
};

export const updateProveedorById = async (req, res) => {
    const updatedProveedor = await Proveedor.findByIdAndUpdate(
        req.params.proveedorId,
        req.body,
        {
            new: true,
        }
    );
    res.status(204).json(updatedProveedor);
};

export const deleteProveedorById = async (req, res) => {
    const { proveedorId } = req.params;

    await Proveedor.findByIdAndDelete(proveedorId);

    // code 200 is ok too
    res.status(204).json();
};
