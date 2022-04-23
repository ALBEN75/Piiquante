const jwt = require('jsonwebtoken');// On importe notre package jsonwebtoken pour générer un access token qui permet un échange sécurisé de donnée entre deux parties.
require('dotenv').config();// On importe le package dotenv pour pouvoir utiliser par la suite la ou les variable(s) d'environnement.

// Ceci nous permettra de verifier l'access token de l'utilisateur.
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];// On récupère le token dans le headers d'authorization de la requête. 
    const decodedToken = jwt.verify(token, process.env.TOKEN);// jwt décode le token puis le vérifie avec la fonction verify à l'aide de la clé secrète.
    const userId = decodedToken.userId;// On récupere donc le token décodé de l'utilisateur.
    
    // Si la demande contient un ID utilisteur on le compare a celui du token, si ils sont différents on génére une erreur.
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide !';
    } else {
      next(); // Sinon dans le cas contraire ils sont identiques et l'utilisateur est authentifié donc on passe à l'éxecution avec la fonction next().
    }
  } catch {
    res.status(401).json({ error: new Error ('Requête invalide !') });// On génére une erreur 401 car la requête néccessite une authenfication valide. 
  }
};