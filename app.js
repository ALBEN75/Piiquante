const express = require('express');// On Importe le framework express qui sert à construire des applications web pour Node.js.
const bodyParser = require('body-parser');// Analyse le corp d'une requête entrant afin qu'il n'y est pas d'erreus.
const mongoose = require('mongoose');// Constante qui nous servira de connexion a MangoDB afin d'utiliser des operations CRUD.
const path = require('path');// On se sert de path qui nous permettra a travailer avec les chemins de fichiers et de répertoires. 

// Déclaration de nos routes pour les utilisateurs et les sauces.
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// On appel notre const mongoose pour nous connecter à la base de données MangoDB.
mongoose.connect('mongodb+srv://ALBEN75:8YncWXhcAFLcXhTL@cluster1.ywky0.mongodb.net/Cluster1?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Déclaration de notre const app pour créer une application express.
const app = express();

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