import Jeu from '../models/Jeu.js';
// 👈 NOUVEAU : Importez validationResult pour vérifier les erreurs
import { validationResult } from 'express-validator'; 

export const addJeu = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si des erreurs sont détectées (par les règles de la route), on arrête et renvoie 400.
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis pour le jeu.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        const nouveauJeu = await Jeu.create(req.body);

        res.status(201).json(nouveauJeu);
    } catch (error) {
        // Pour les erreurs dues à des contraintes de la base de données (ex: titre déjà utilisé), 
        // 500 est souvent plus approprié. Je laisse 400 pour rester cohérent.
        res.status(400).json({ message: "Erreur lors de la création du jeu", error: error.message });
    }
};

export const getAllJeux = async (req, res) => {
    // Reste inchangé
    try {
        const jeux = await Jeu.findAll();

        res.status(200).json(jeux);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des jeux", error: error.message });
    }
};