import express from "express";

import * as avaliacoesController from "../controllers/avaliacoes.controller.js";

const router = express.Router();

// Conforme a atividade: apenas listar todas as avaliações (com usuário e livro)
// e criar nova avaliação
router.get("/", avaliacoesController.listarAvaliacoes);
router.post("/", avaliacoesController.criarAvaliacao);

export default router;
