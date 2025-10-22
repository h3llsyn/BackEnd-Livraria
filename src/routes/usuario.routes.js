import express from "express";
const router = express.Router();
import * as usuarioController from "../controllers/usuario.controllers.js";


/* / Rotas de Usuário */
router.get("/usuarios", usuarioController.listarUsuarios);
router.get("/usuarios/:id", usuarioController.obterUsuario);
router.post("/usuarios", usuarioController.criarUsuario);
router.put("/usuarios/:id", usuarioController.atualizarUsuario);
router.delete("/usuarios/:id", usuarioController.deletarUsuario);

export default router;