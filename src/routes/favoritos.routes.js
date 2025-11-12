import express from 'express';

import * as favoritosController from '../controllers/favoritos.controllers.js'; // corrigido: .controllers.js

const router = express.Router();

router.get('/', favoritosController.listarReservas);   // usar os nomes exportados no controller  // usar os nomes exportados no controller
router.post('/', favoritosController.criarReserva);
router.delete('/:id', favoritosController.excluirReserva);

export default router;