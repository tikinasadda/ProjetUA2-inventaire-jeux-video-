import express from 'express';
// 👈 NOUVEAU : Importez body pour définir les règles
import { body } from 'express-validator'; 

import { assignerRole } from '../controllers/utilisateurRoleController.js'; 

import { verifierToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Route POST pour assigner un rôle à un utilisateur
router.post(
  '/', 
  verifierToken, // Vérification que l'utilisateur est connecté (authentifié)
  
  // 👈 NOUVEAU : Tableau des règles de validation
  [
    // Les IDs doivent exister pour que l'association puisse se faire
    body('utilisateurId')
      .exists().withMessage("L'ID de l'utilisateur à modifier est requis."),
      
    body('roleId')
      .exists().withMessage("L'ID du rôle à assigner est requis.")
  ],
  
  assignerRole // Le controller est appelé après que toutes les vérifications aient réussi
); 

export default router;