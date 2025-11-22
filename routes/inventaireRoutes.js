import express from 'express';
// 👈 NOUVEAU : Importez body pour définir les règles
import { body } from 'express-validator'; 

import { addInventaire, getAllInventaire } from '../controllers/inventaireController.js';

const router = express.Router();

// Route POST pour ajouter à l'inventaire
router.post(
  '/', 
  // 👈 NOUVEAU : Tableau des règles de validation
  [
    // Validez que les clés étrangères requises sont présentes
    body('utilisateurId')
      .exists().withMessage("L'ID de l'utilisateur est requis."),
      
    body('jeuId')
      .exists().withMessage("L'ID du jeu est requis."),
      
    body('plateformeId')
      .exists().withMessage("L'ID de la plateforme est requis."),
      
    // Si la quantité est incluse et doit être un nombre entier positif
    body('quantite')
      .optional() // Rendre ce champ facultatif, mais s'il est envoyé...
      .isInt({ min: 1 }).withMessage("La quantité doit être un nombre entier positif.")
      // Alternativement, si la quantité est toujours requise :
      // .notEmpty().withMessage("La quantité est requise.")
      
  ], 
  addInventaire // Le controller est appelé après que les règles aient été exécutées
);

// Route GET (pas de validation de body nécessaire)
router.get('/', getAllInventaire);

export default router;