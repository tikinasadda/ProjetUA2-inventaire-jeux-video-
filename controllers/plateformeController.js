// Dans controllers/plateformeController.js
import Plateforme from '../models/Plateforme.js'; // On importe le modèle Plateforme

// POST /api/plateformes - Créer une nouvelle plateforme
export const addPlateforme = async (req, res) => {
  try {
    // req.body devrait contenir { "nom": "PC" } par exemple
    const nouvellePlateforme = await Plateforme.create(req.body);
    
    // On répond avec un statut 201 (Created)
    res.status(201).json(nouvellePlateforme);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la plateforme", error: error.message });
  }
};

// GET /api/plateformes - Obtenir toutes les plateformes
export const getAllPlateformes = async (req, res) => {
  try {
    // On utilise la méthode findAll()
    const plateformes = await Plateforme.findAll();
    
    // On répond avec un statut 200 (OK)
    res.status(200).json(plateformes);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des plateformes", error: error.message });
  }
};