
import Jeu from '../models/Jeu.js';

export const addJeu = async (req, res) => {
  try {

    const nouveauJeu = await Jeu.create(req.body);

    res.status(201).json(nouveauJeu);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du jeu", error: error.message });
  }
};

export const getAllJeux = async (req, res) => {
  try {
    const jeux = await Jeu.findAll();

    res.status(200).json(jeux);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des jeux", error: error.message });
  }
};