// Dans controllers/utilisateurRoleController.js
import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';
import Utilisateur_Roles from '../models/Utilisateur_Roles.js';

// POST /api/assigner-role
// Assigner un rôle à un utilisateur
export const assignerRole = async (req, res) => {
  try {
    // Le body devra contenir : { "utilisateurId": 1, "roleId": 1 }
    const { utilisateurId, roleId } = req.body;

    // On vérifie d'abord si l'utilisateur et le rôle existent
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const role = await Role.findByPk(roleId);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    // On crée l'association dans la table de jointure
    // C'est la même chose que de faire : Utilisateur_Roles.create({ utilisateurId, roleId })
    await utilisateur.addRole(role);
    
    res.status(200).json({ message: `Rôle '${role.nom}' assigné à l'utilisateur '${utilisateur.nom_utilisateur}'` });
  
  } catch (error) {
    // Gérer les erreurs (ex: si l'association existe déjà)
    res.status(400).json({ message: "Erreur lors de l'assignation du rôle", error: error.message });
  }
};