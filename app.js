const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://ALBEN75:8YncWXhcAFLcXhTL@cluster1.ywky0.mongodb.net/Cluster1?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(express.json());

/* Ceci permettra à l'application d'accèder à notre API.
Donne l'accès de notre API à tous le monde, on autorise d'utiliser certain Headers sur l'objet requête et d'envoyer certaines méthodes de requête(verbes de requête).*/ 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;