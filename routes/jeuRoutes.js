// Dans routes/jeuRoutes.js
import express from 'express';
// On importe les fonctions du contrôleur
import { addJeu, getAllJeux } from '../controllers/jeuController.js';

const router = express.Router();

// On lie les routes aux fonctions
// http://localhost:5000/api/jeux
router.post('/', addJeu);
router.get('/', getAllJeux);

export default router;