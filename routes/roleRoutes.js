// Dans routes/roleRoutes.js
import express from 'express';

// 1. IMPORTER LES CONTRÔLEURS
import { addRole, getAllRoles } from '../controllers/roleController.js';

// 2. IMPORTER LES MIDDLEWARES
import { verifierToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Routes Protégées (Admin seulement) ---
// [CORRECTION] LA LIGNE POST ÉTAIT MANQUANTE.
// On la remet ici SANS verifierToken et isAdmin, juste temporairement.
router.post('/', addRole);


// --- Routes Protégées (Utilisateur connecté) ---
// Pour VOIR les rôles, il faut juste être connecté
router.get('/', verifierToken, getAllRoles);

export default router;