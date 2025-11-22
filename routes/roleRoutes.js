import express from 'express';
// 👈 NOUVEAU : Importez body et param
import { body, param } from 'express-validator'; 

import { addRole, getAllRoles, updateRole, deleteRole } from '../controllers/roleController.js';

import { verifierToken } from '../middleware/authMiddleware.js'; 
// Si vous avez un middleware d'autorisation (ex: isAdmin), importez-le ici.
// import { isAdmin } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// ------------------------------------
// 1. Route POST (Création)
// ------------------------------------
router.post(
  '/', 
  verifierToken, // Assurez-vous d'être connecté
  // isAdmin, // Optionnel: Assurez-vous d'avoir les droits admin
  [
    // Le titre du rôle est OBLIGATOIRE pour la création
    body('titre')
      .notEmpty().withMessage("Le titre du rôle est requis.")
      .isString().withMessage("Le titre doit être une chaîne de caractères.")
  ],
  addRole
);

// ------------------------------------
// 2. Route PUT (Mise à jour)
// ------------------------------------
router.put(
  '/:id', 
  verifierToken,
  // isAdmin,
  [
    // L'ID du paramètre doit être un nombre entier valide
    param('id')
      .isInt({ min: 1 }).withMessage("L'ID du rôle doit être un nombre entier valide."),
      
    // Le titre du rôle est OBLIGATOIRE pour la mise à jour
    body('titre')
      .notEmpty().withMessage("Le nouveau titre du rôle est requis.")
      .isString().withMessage("Le titre doit être une chaîne de caractères.")
  ], 
  updateRole
);

// ------------------------------------
// 3. Route DELETE (Suppression)
// ------------------------------------
router.delete(
  '/:id', 
  verifierToken,
  // isAdmin,
  [
    // L'ID du paramètre doit être un nombre entier valide
    param('id')
      .isInt({ min: 1 }).withMessage("L'ID du rôle à supprimer doit être un nombre entier valide.")
  ],
  deleteRole
);

// ------------------------------------
// 4. Route GET (Lecture)
// ------------------------------------
router.get('/', getAllRoles);

export default router;