import { Router } from "express";
const router = Router();

import * as clientCtrl from "../controllers/client.controller";
import { authJwt } from "../middlewares";

router.get("/", clientCtrl.getClients);

router.get("/:clientId", clientCtrl.getClientById);

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    clientCtrl.createClient
);

router.put(
    "/:clientId",
    [authJwt.verifyToken, authJwt.isAdmin],
    clientCtrl.updateClientById
);

router.delete(
    "/:clientId",
    [authJwt.verifyToken, authJwt.isAdmin],
    clientCtrl.deleteClientById
);

export default router;