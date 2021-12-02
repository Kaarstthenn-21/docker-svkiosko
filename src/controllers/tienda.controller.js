import Tienda from "../models/Tienda";

export const createTienda = async (req, res) => {
    const { nombre, ubicacion } = req.body;

    try {
        const newTienda = new Tienda({
            nombre,
            ubicacion
        });

        const tiendaSaved = await newTienda.save();

        res.status(201).json(tiendaSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getTiendaById = async (req, res) => {
    const { tiendaId } = req.params;

    const tienda = await Tienda.findById(tiendaId);
    res.status(200).json(tienda);
};

export const getTiendas = async (req, res) => {
    const tiendas = await Tienda.find();
    return res.json(tiendas);
};

export const updateTiendaById = async (req, res) => {
    const updatedTienda = await Tienda.findByIdAndUpdate(
        req.params.tiendaId,
        req.body,
        {
            new: true,
        }
    );
    res.status(204).json(updatedTienda);
};

export const deleteTiendaById = async (req, res) => {
    const { tiendaId } = req.params;

    await Tienda.findByIdAndDelete(tiendaId);

    // code 200 is ok too
    res.status(204).json();
};
