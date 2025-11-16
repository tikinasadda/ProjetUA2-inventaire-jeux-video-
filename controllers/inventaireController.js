// Dans controllers/inventaireController.js
import Inventaire from '../models/Inventaire.js';
// On importe aussi les modèles associés pour pouvoir les "joindre"
import Utilisateur from '../models/Utilisateur.js';
import Jeu from '../models/Jeu.js';
import Plateforme from '../models/Plateforme.js';

// POST /api/inventaire - Ajouter un jeu à l'inventaire d'un utilisateur
export const addInventaire = async (req, res) => {
  try {
    // Le body devra contenir :
    // { "statut": "Possédé", "utilisateurId": 1, "jeuId": 1, "plateformeId": 1 }
    const nouvelInventaire = await Inventaire.create(req.body);
    
    res.status(201).json(nouvelInventaire);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout à l'inventaire", error: error.message });
  }
};

// GET /api/inventaire - Obtenir tout l'inventaire (de tous les utilisateurs)
export const getAllInventaire = async (req, res) => {
  try {
    // C'est ici que la magie des relations opère !
    // On utilise "include" pour joindre les tables associées.
    const inventaire = await Inventaire.findAll({
      include: [
        { 
          model: Utilisateur,
          attributes: ['nom_utilisateur'] // On ne veut que le nom
        },
        { 
          model: Jeu,
          attributes: ['titre', 'genre'] // On veut le titre et le genre
        },
        { 
          model: Plateforme,
          attributes: ['nom'] // On veut le nom de la plateforme
        }
      ]
    });
    
    res.status(200).json(inventaire);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération de l'inventaire", error: error.message });
  }
};