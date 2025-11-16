// Dans routes/utilisateurRoleRoutes.js
import express from 'express';

// 1. IMPORTER LE CONTRÔLEUR
import { assignerRole } from '../controllers/utilisateurRoleController.js'; 

// 2. IMPORTER LE MIDDLEWARE MANQUANT
import { verifierToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// On applique verifierToken ici (car tu l'as ajouté)
router.post('/', verifierToken, assignerRole); 

export default router;