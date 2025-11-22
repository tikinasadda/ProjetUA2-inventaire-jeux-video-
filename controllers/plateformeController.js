import Plateforme from '../models/Plateforme.js';
// 👈 NOUVEAU : Importez validationResult
import { validationResult } from 'express-validator'; 

export const addPlateforme = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si des erreurs sont détectées par les règles de la route, on arrête et renvoie 400.
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis pour la plateforme.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        const nouvellePlateforme = await Plateforme.create(req.body);
        
        res.status(201).json(nouvellePlateforme);
    } catch (error) {
        // Pour une erreur interne du serveur ou de la base de données, 500 est souvent plus précis.
        res.status(500).json({ message: "Erreur lors de la création de la plateforme", error: error.message });
    }
};

export const getAllPlateformes = async (req, res) => {
    // Reste inchangé car c'est une route GET (lecture)
    try {
        const plateformes = await Plateforme.findAll();
        
        res.status(200).json(plateformes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des plateformes", error: error.message });
    }
};