import express from 'express';
// 👈 NOUVEAU : Importez body pour définir les règles
import { body } from 'express-validator'; 

import { addJeu, getAllJeux } from '../controllers/jeuController.js';

const router = express.Router();

// Route POST pour la création d'un jeu
router.post(
  '/', 
  // 👈 NOUVEAU : Tableau des règles de validation
  [
    // Le titre est obligatoire et doit être une chaîne de caractères
    body('titre')
      .notEmpty().withMessage("Le titre du jeu est obligatoire.")
      .isString().withMessage("Le titre doit être une chaîne de caractères valide."),
      
    // Le genre est obligatoire
    body('genre')
      .notEmpty().withMessage("Le genre du jeu est obligatoire."),
      
    // Si vous avez d'autres champs comme 'annee_sortie', assurez-vous qu'ils sont des nombres valides
    body('annee_sortie') 
      .optional() // Rendre ce champ facultatif, mais s'il est envoyé...
      .isInt({ min: 1970, max: new Date().getFullYear() }).withMessage("L'année de sortie doit être une année valide.")
  ], 
  addJeu // Le controller sera appelé seulement après l'exécution des règles
);

// Route GET (Lecture)
router.get('/', getAllJeux);

export default router;