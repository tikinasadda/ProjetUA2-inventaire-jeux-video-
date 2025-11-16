// Dans routes/plateformeRoutes.js
import express from 'express';
// On importe les fonctions du contrôleur
import { addPlateforme, getAllPlateformes } from '../controllers/plateformeController.js';

const router = express.Router();

// On lie les routes aux fonctions
// http://localhost:5000/api/plateformes
router.post('/', addPlateforme);
router.get('/', getAllPlateformes);

export default router;