// Dans controllers/roleController.js
import Role from '../models/Role.js'; // On importe le modèle

// POST /api/roles - Créer un nouveau rôle
export const addRole = async (req, res) => {
  try {
    // On utilise la méthode create() de Sequelize [cite: 1112]
    // req.body contient les données envoyées (ex: { "nom": "Admin" })
    const nouveauRole = await Role.create(req.body);
    
    // On répond avec un statut 201 (Created) et le nouveau rôle [cite: 1112, 1118]
    res.status(201).json(nouveauRole);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du rôle", error: error.message });
  }
};

// GET /api/roles - Obtenir tous les rôles
export const getAllRoles = async (req, res) => {
  try {
    // On utilise la méthode findAll() de Sequelize [cite: 1078]
    const roles = await Role.findAll();
    
    // On répond avec un statut 200 (OK) et la liste des rôles [cite: 1079, 1084]
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des rôles", error: error.message });
  }
};