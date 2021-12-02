import Cliente from "../models/Cliente";

export const createClient = async (req, res) => {
    const { nombre, dni, direccion, telefono } = req.body;

    try {
        const newClient = new Cliente({
            nombre,
            dni,
            direccion,
            telefono
        });

        const clientSaved = await newClient.save();

        res.status(201).json(clientSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getClientById = async (req, res) => {
    const { clientId } = req.params;

    const client = await Cliente.findById(clientId);
    res.status(200).json(client);
};

export const getClients = async (req, res) => {
    const clients = await Cliente.find();
    return res.json(clients);
};

export const updateClientById = async (req, res) => {
    const updatedClient = await Cliente.findByIdAndUpdate(
        req.params.clientId,
        req.body,
        {
            new: true,
        }
    );
    res.status(204).json(updatedClient);
};

export const deleteClientById = async (req, res) => {
    const { clientId } = req.params;

    await Cliente.findByIdAndDelete(clientId);

    // code 200 is ok too
    res.status(204).json();
};
