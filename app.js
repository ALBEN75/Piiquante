const express = require('express');// On importe le framework express qui sert à construire des applications web pour Node.js.
const bodyParser = require('body-parser');// On importe body-parser qui sert analyser le corp d'une requête entrante afin qu'il n'y est pas d'erreus.
const mongoose = require('mongoose');// On importe mongoose qui nous servira de connexion a MangoDB afin d'utiliser des operations CRUD.
const path = require('path');// On importe path qui nous permettra de travailer avec les chemins de fichiers et de répertoires. 
const helmet = require("helmet");// On importe le package helmet qui nous permet de protéger notre application contre certaines vulnérabilités notamment les failles XSS.
require('dotenv').config();// On importe le package dotenv pour pouvoir utiliser par la suite la ou les variavle(s) d'environnement.

// Déclaration de nos routes pour les utilisateurs et les sauces.
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// On appel notre const mongoose pour nous connecter à la base de données MangoDB et on utilise une variable d'environnement pour sécuriser nos informations de connexion.
mongoose.connect( process.env.MangoDB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
const app = express(); // Déclaration de notre const app pour créer une application express.

app.use(helmet());// On déclare helmet pour l'utiliser, qui permettra de protéger notre application contre certaines vulnérabilités.

/* Ceci permettra à l'application d'accèder à notre API.
Donne l'accès de notre API à tous le monde, on autorise d'utiliser certain Headers sur l'objet requête et d'envoyer certaines méthodes de requête(verbes de requête).*/ 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// On utilisera ce middleware pour transformer les données des requêtes analysées en format json.  
app.use(bodyParser.json());

// Ce middleware nous permet de charger les fichiers d'images dans le répertoire images.
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware qui nous permet d'utiliser nos routes de notre API, pour les utilisateurs et les sauces.
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

// On exporte a l'aide du module notre application.
module.exports = app;