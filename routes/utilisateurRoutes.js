import express from 'express';
// 👈 NOUVEAU : On importe body pour définir les règles
import { body } from 'express-validator'; 

import { addUtilisateur, getAllUtilisateurs, login } from '../controllers/utilisateurController.js';

import { verifierToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route POST pour la création d'utilisateur (Enregistrement)
router.post(
  '/', 
  // 👈 NOUVEAU : On définit le tableau des règles
  [
    body('nom').notEmpty().withMessage("Le nom est requis."),
    body('prenom').notEmpty().withMessage("Le prénom est requis."),
    body('email').isEmail().withMessage("Veuillez fournir une adresse email valide."),
    body('password').isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  addUtilisateur // Le controller sera appelé seulement si les règles sont respectées.
);

// Route POST pour le login
router.post(
  '/login', 
  // 👈 NOUVEAU : On définit les règles pour le login
  [
    body('email').notEmpty().withMessage("L'email est requis."),
    body('password').notEmpty().withMessage("Le mot de passe est requis."),
  ], 
  login
);

router.get('/', verifierToken, getAllUtilisateurs);

export default router;