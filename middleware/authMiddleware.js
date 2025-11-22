import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';

// Ce middleware vérifie l'existence et la validité du jeton.
export const verifierToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Pas authentifié, jeton manquant' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Pas authentifié, format du jeton invalide' });
    }
    
    try {
        // 🔑 SÉCURISÉ : Utilisation de la clé secrète à partir de la variable d'environnement
        const valeurDecodee = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = valeurDecodee.id; // Stocke l'ID de l'utilisateur pour le middleware suivant (isAdmin)
        next();
        
    } catch (error) {
        return res.status(401).json({ message: 'Jeton invalide ou expiré', error: error.message });
    }
};

// Ce middleware vérifie si l'utilisateur authentifié a le rôle 'admin'.
export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; // Récupère l'ID défini par verifierToken
        
        if (!userId) {
            return res.status(403).json({ message: "Accès interdit. ID utilisateur non fourni après authentification." });
        }

        const utilisateur = await Utilisateur.findByPk(userId, {
            // Inclut les rôles de l'utilisateur pour la vérification
            include: {
                model: Role,
                attributes: ['nom'],
                through: { attributes: [] }
            }
        });

        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non existant' });
        }

        const roles = utilisateur.Roles || [];
        // Vérifie si l'un des rôles est 'admin' (insensible à la casse)
        const hasAdminRole = roles.some(role => role.nom.toLowerCase() === 'admin');

        if (hasAdminRole) {
            next(); // Laisse passer si l'utilisateur est Admin
        } else {
            return res.status(403).json({ message: 'Accès interdit. Droits Administrateur requis.' });
        }

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la vérification des permissions", error: error.message });
    }
};