// Dans routes/utilisateurRoutes.js
import express from 'express';

// 1. IMPORTER LES CONTRÔLEURS
import { addUtilisateur, getAllUtilisateurs, login } from '../controllers/utilisateurController.js';

// 2. IMPORTER LE MIDDLEWARE
import { verifierToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Routes Publiques ---
// N'importe qui peut s'inscrire ou se connecter
router.post('/', addUtilisateur);      // Inscription
router.post('/login', login);          // Connexion

// --- Routes Protégées ---
// Seul un utilisateur avec un jeton valide peut voir la liste
router.get('/', verifierToken, getAllUtilisateurs);

export default router;