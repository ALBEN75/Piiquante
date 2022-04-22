const bcrypt = require('bcrypt');// On importe le package bcrypt, pour crypté le mot de passe(hash) de l'utilisateur.
const jwt = require('jsonwebtoken');// On importe le package jsonwebtoken, pour générer un jeton d'accès(token) encodé à notre utilisateur lors de l'inscription et de le vérifier par la suite lors de la connexion.

const User = require('../models/user');// On importe notre fichier user.js de notre dossier models contenant le model, puisque on va devoir enregistrer des utilisateurs(signup) et lire des utilisateurs(login) dans nos middlewares.

// Middleware pour l'inscription(ou enregistrement) de l'utilisateur.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)// On appel la fonction hash, pour crypter un mot de passe et il va éxectuer 10 tour pour notre algorithme de cryptage.  
      .then(hash => {
        
        // Inscription du nouvel utilisateur
        const user = new User({
          email: req.body.email,
          password: hash// Mot de passe crypté (hash). 
        });
        user.save()// On utilise la méthode save pour enregistrer l'utilisateur dans la base de données. 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Middleware pour la connexion(ou d'identification) de l'utilisateur.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })// On utilise la méthode findOne pour trouver un seul utilisateur de la base de données et de son email.
      .then(user => {
        
        // Si nous ne trouvons pas l'utilisateur, cela retourne un code erreur 401.  
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)// On utilise la fonction compare pour comparer(ou vérifier) le mot de passe stocké dans la base de données à celui inscrit par l'utilisateur. 
          .then(valid => {
            // Si la comparaison des deux mots de passe n'est pas valid(ou identique), il nous retourne donc un code erreur 401.
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si la comparaison est valid(true), on renvoi un status 200 OK donc la connexion est acceptée.
            res.status(200).json({
              // On renvoi dans notre base de données, des données concernant l'utilisateur.
              userId: user._id, // Donnée stockant l'ID de l'utilisateur.
              token: jwt.sign( // On utilise la fonction sign, pour encodés les données de l'utilisateur dans le token.
                { userId: user._id }, // Encodage de l'Id de l'utilisateur. 
                '4GU4SP-!bOm*f$Pl', // Clé secrète pour securiser l'encodage.
                { expiresIn: '24h' } // Expiration du token générer pour l'utilisateur.
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };