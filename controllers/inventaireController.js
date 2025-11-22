import Inventaire from '../models/Inventaire.js';

import Utilisateur from '../models/Utilisateur.js';
import Jeu from '../models/Jeu.js';
import Plateforme from '../models/Plateforme.js';

// 👈 NOUVEAU : Importez validationResult
import { validationResult } from 'express-validator'; 

export const addInventaire = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si des erreurs sont détectées par les règles de la route, on arrête et renvoie 400.
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        // Le corps de la requête contient directement les IDs (utilisateurId, jeuId, plateformeId)
        // en plus de toute autre propriété de l'inventaire.
        const nouvelInventaire = await Inventaire.create(req.body); 
        
        res.status(201).json(nouvelInventaire);
    } catch (error) {
        // Utiliser 500 pour les erreurs serveur/base de données.
        res.status(500).json({ message: "Erreur lors de l'ajout à l'inventaire", error: error.message });
    }
};

export const getAllInventaire = async (req, res) => {
    // Cette fonction (GET) ne reçoit pas de corps à valider, elle reste inchangée.
    try {
        const inventaire = await Inventaire.findAll({
            include: [
                { 
                    model: Utilisateur,
                    attributes: ['nom_utilisateur']
                },
                { 
                    model: Jeu,
                    attributes: ['titre', 'genre']
                },
                { 
                    model: Plateforme,
                    attributes: ['nom']
                }
            ]
        });
        
        res.status(200).json(inventaire);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'inventaire", error: error.message });
    }
};