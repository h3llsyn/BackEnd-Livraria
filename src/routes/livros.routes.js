import express from "express";

import * as livrosController from "../controllers/livros.controller.js";

const router = express.Router();

router.get("/", livrosController.listarLivros);
router.get("/:id", livrosController.buscarLivro);
router.post("/", livrosController.criarLivro);
router.put("/:id", livrosController.atualizarLivro);
router.delete("/:id", livrosController.excluirLivro);

export default router;
