import { Router } from "express";
const router = Router();

import * as tiiendaCtrl from "../controllers/tienda.controller";
import { authJwt } from "../middlewares";

router.get("/", tiiendaCtrl.getTiendas);

router.get("/:tiendaId", tiiendaCtrl.getTiendaById);

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    tiiendaCtrl.createTienda
);

router.put(
    "/:tiendaId",
    [authJwt.verifyToken, authJwt.isAdmin],
    tiiendaCtrl.updateTiendaById
);

router.delete(
    "/:tiendaId",
    [authJwt.verifyToken, authJwt.isAdmin],
    tiiendaCtrl.deleteTiendaById
);

export default router;