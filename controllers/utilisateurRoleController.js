import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';
import Utilisateur_Roles from '../models/Utilisateur_Roles.js';
// 👈 NOUVEAU : Importez validationResult
import { validationResult } from 'express-validator'; 

export const assignerRole = async (req, res) => {
    
    // ----------------------------------------------------
    // 👈 NOUVEAU BLOC DE VÉRIFICATION DE LA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Cela interceptera les erreurs si utilisateurId ou roleId sont manquants.
        return res.status(400).json({ 
            message: "Erreur de validation. Les IDs de l'utilisateur et du rôle sont requis.",
            errors: errors.array() 
        });
    }
    // ----------------------------------------------------
    
    try {
        const { utilisateurId, roleId } = req.body;

        const utilisateur = await Utilisateur.findByPk(utilisateurId);
        const role = await Role.findByPk(roleId);

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        // Utilise la méthode d'association Sequelize pour lier les deux entités
        await utilisateur.addRole(role); 
        
        res.status(200).json({ message: `Rôle '${role.titre}' assigné à l'utilisateur '${utilisateur.nom_utilisateur}'` });
    
    } catch (error) {
        // Souvent une erreur 500 si la base de données ne peut pas se connecter ou une autre erreur non liée à la validation
        res.status(500).json({ message: "Erreur lors de l'assignation du rôle", error: error.message });
    }
};