const express = require('express');
const router = express.Router(); // On utilise la méthode express.Router() qui nous permet de créer des routeurs séparés pour chaque route principale de l'application.

const userCtrl = require('../controllers/user');// On importe nos fonctions pour l'inscription et la connexion a l'aide de cette constante.

// Routes individuelles de notre routeur.
router.post('/signup', userCtrl.signup);// Route pour l'inscription de l'utilisateur.
router.post('/login', userCtrl.login);// Route pour la connexion de l'utilisateur.

module.exports = router; // On exporte notre router pour pouvoir l'utiliser.