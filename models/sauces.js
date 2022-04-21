const mongoose = require('mongoose');// On importe mongoose pour pouvoir utiliser la methode schéma et la méthode model.

// On utilise la methode Schéma de Mongoose contenant nos données pour les differents champs d'une sauce et leurs types.
const sauceSchema = mongoose.Schema ({
    userId: { type: String, required: true, },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required:true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [ String ],
    usersDisliked: [ String ]
});

module.exports = mongoose.model('Sauce', sauceSchema);// On exporte et on utilise la méthode model de Mongoose qui transforme notre schéma en un modèle utilisable.