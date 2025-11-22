import Role from '../models/Role.js';
// 👈 NOUVEAU : Importez validationResult
import { validationResult } from 'express-validator'; 

export const addRole = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Le titre du rôle est requis.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        const nouveauRole = await Role.create(req.body);
        
        res.status(201).json(nouveauRole);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du rôle", error: error.message });
    }
};

export const getAllRoles = async (req, res) => {
    // Reste inchangé (GET)
    try {
        const roles = await Role.findAll();
        
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des rôles", error: error.message });
    }
};

// PUT /api/roles/:id - Mettre à jour un rôle
export const updateRole = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Cela interceptera les erreurs de l'ID (param) et du corps (body)
        return res.status(400).json({ 
            message: "Erreur de validation. L'ID ou le titre du rôle est invalide.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------

    try {
        const { id } = req.params; // Récupère l'ID depuis l'URL
        const [result] = await Role.update(req.body, { 
            where: { id: id }
        });

        if (result === 0) { 
            return res.status(404).json({ message: "Rôle non trouvé ou données identiques" });
        }
        
        res.status(200).json({ message: "Rôle mis à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du rôle", error: error.message });
    }
};

// DELETE /api/roles/:id - Supprimer un rôle
export const deleteRole = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Cela interceptera les erreurs de l'ID (param)
        return res.status(400).json({ 
            message: "Erreur de validation. L'ID du rôle est invalide.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        const { id } = req.params; // Récupère l'ID depuis l'URL
        const result = await Role.destroy({ 
            where: { id: id }
        });

        if (result === 0) { 
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        res.status(200).json({ message: "Rôle supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la suppression du rôle", error: error.message });
    }
};