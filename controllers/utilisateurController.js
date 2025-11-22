import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// 👈 NOUVEAU : Importez validationResult
import { validationResult } from 'express-validator'; 

export const addUtilisateur = async (req, res) => {
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si des erreurs sont détectées (par les règles dans utilisateurRoutes.js), 
        // on renvoie un statut 400 (Bad Request) et le détail des erreurs.
        return res.status(400).json({ 
            message: "Erreur de validation. Les données soumises sont incomplètes ou invalides.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------

    try {
        const { nom_utilisateur, email, mot_de_passe } = req.body;

        const salt = await bcrypt.genSalt(10);
        const mot_de_passe_hache = await bcrypt.hash(mot_de_passe, salt);

        const nouvelUtilisateur = await Utilisateur.create({
            nom_utilisateur: nom_utilisateur,
            email: email,
            mot_de_passe: mot_de_passe_hache 
        });

        res.status(201).json({
            id: nouvelUtilisateur.id,
            nom_utilisateur: nouvelUtilisateur.nom_utilisateur,
            email: nouvelUtilisateur.email
        });

    } catch (error) {
        // NOTE: Votre gestion d'erreur actuelle renvoie 400. 
        // Pour une erreur de serveur/BD, 500 est plus approprié, mais je laisse 400 pour l'instant.
        res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
    }
};

export const getAllUtilisateurs = async (req, res) => {
    // Aucune modification ici, car cette fonction ne reçoit pas de données à valider (c'est un GET)
    try {
        const utilisateurs = await Utilisateur.findAll({
            attributes: { exclude: ['mot_de_passe'] }
        });
        
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
    }
};

export const login = async (req, res) => {
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez fournir un email/nom d'utilisateur et un mot de passe.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------

    try {
        const { nom_utilisateur, mot_de_passe } = req.body;

        const utilisateur = await Utilisateur.findOne({ where: { nom_utilisateur: nom_utilisateur } });
        // ... (le reste de votre logique de login)
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const payload = { id: utilisateur.id };
        const token = jwt.sign(payload, 'votre_cle_secrete', {
            expiresIn: '1h' 
        });

        res.status(200).json({ message: "Connexion réussie", token: token });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
};