const mongoose = require('mongoose');// On importe mongoose pour pouvoir utiliser la methode schéma et la méthode model.
const uniqueValidator = require('mongoose-unique-validator');// On importe ce package qui améliore les messages d'erreur lors de l'enregistrement de données uniques.

// On utilise la méthode schema de Mongoose permet de créer un schéma de données pour notre base de données MangoDB. Qui contient un email unique et un mot de passe.
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);// On applique ce validator sur notre schéma avec la méthode plugin.

module.exports = mongoose.model('User', userSchema);// On exporte et on utilise la méthode model de Mongoose qui transforme notre schéma en un modèle utilisable.