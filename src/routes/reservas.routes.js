import express from "express";
import * as reservasController from "../controllers/reservas.controllers.js";


const router = express.Router();

router.get("/", reservasController.obterReservas);
router.post("/", reservasController.criarReserva);
router.delete("/:id", reservasController.cancelarReserva);

export default router;