// Dans routes/inventaireRoutes.js
import express from 'express';
// On importe les fonctions du contrôleur
import { addInventaire, getAllInventaire } from '../controllers/inventaireController.js';

const router = express.Router();

// On lie les routes aux fonctions
// http://localhost:5000/api/inventaire
router.post('/', addInventaire);
router.get('/', getAllInventaire);

export default router;