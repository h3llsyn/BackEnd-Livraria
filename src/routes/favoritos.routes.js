import express from 'express';

import * as favoritosController from '../controllers/favoritos.controllers.js'; // corrigido: .controllers.js

const router = express.Router();

router.get('/', favoritosController.listarFavoritos);   // usar os nomes exportados no controller  // usar os nomes exportados no controller
router.post('/', favoritosController.criarFavorito);
router.delete('/:id', favoritosController.excluirFavorito);

export default router;