import express from 'express';
// 👈 NOUVEAU : Importez body pour définir les règles
import { body } from 'express-validator'; 

import { addPlateforme, getAllPlateformes } from '../controllers/plateformeController.js';

const router = express.Router();

// Route POST pour la création d'une plateforme
router.post(
  '/', 
  // 👈 NOUVEAU : Tableau des règles de validation
  [
    // Validez que le nom de la plateforme est obligatoire
    body('nom')
      .notEmpty().withMessage("Le nom de la plateforme est obligatoire.")
      .isString().withMessage("Le nom doit être une chaîne de caractères.")
      .isLength({ min: 2, max: 50 }).withMessage("Le nom doit avoir entre 2 et 50 caractères."),
      
    // Vous pouvez ajouter une validation pour le champ 'fabricant' si applicable à votre modèle
    // body('fabricant')
    //   .optional().isString().withMessage("Le fabricant doit être une chaîne de caractères."),
  ], 
  addPlateforme // Le controller est appelé après que les règles aient été exécutées
);

// Route GET (Lecture)
router.get('/', getAllPlateformes);

export default router;