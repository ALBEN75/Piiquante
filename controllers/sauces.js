const Sauce = require('../models/sauces');// On importe notre fichier sauces.js dans le dossier models contenant le model pour nos sauces.
const fs = require('fs');// On importe le package file system de node.js pour gérer les télécharments, les modifications et les suppression des fichiers.  

// Middleware qui permet à l'utilisateur d'ajouter(ou de créer) une nouvelle sauce.
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // On récupère l'Url dynamique de l'image.
    });
    sauce.save()// On utilise la méthode save pour enregistrer la nouvelle sauce dans la base de données.
        .then(() => res.status(201).json({ message: 'Enregistrement effectué !'}))
        .catch(error => res.status(400).json({ error }));
    };

// Middleware qui permet d'obtenir une seule sauce de notre API.
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Middleware qui permet d'obtenir toutes les sauces de notre API.
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  };

// Middleware qui permet à l'utilisateur de modifier les sauces de son choix qui l'a ajoutées uniquement. 
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        // On utilise la méthode updateOne pour mettre à jour la modification.
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Modification éffectuée !'}))
        .catch(error => res.status(400).json({ error }));
};

// Middleware qui permet à l'utilisateur de supprimer les sauces de son choix qui l'a ajoutées uniquement.
exports.deleteSauce = (req, res, next) => {     
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        // On utilise la fonction unlink du package fs pour supprimer l'image stockée dans l'API.
        fs.unlink(`images/${filename}`, () => {
            // On utilise la méthode deletOne pour éffectué la supression.
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: ' Suppression effectuée !'}))
                .catch(error => res.status(400).json({ error }));
        });    
    })
    .catch(error => res.status(500).json({ error }));
};

// Middleware qui permet à l'utilisateur de like ou dislike une seule fois une sauce et si le souhaite annuler son appréciation. 
exports.likeOrDislikeSauce = (req, res, next) => {
    
    // Condition qui permet de like la sauce de son choix en incrémentant 1 à "likes" et de stocker son ID d'utilisateur dans le tableau "usersLiked".
    if (req.body.like == 1) {
        Sauce.findOneAndUpdate(
            { _id: req.params.id }, 
            { $inc:{likes:1}, $push:{usersLiked:req.body.userId} }
        )
        .then(() => res.status(200).json ({ message: "Like enregistrée !"}))
        .catch(error => res.status(404).json({ error }));
    
    // Condition qui permet de dislike la sauce de son choix en incrémentant 1 à "dislikes" et de stocker son ID d'utilisateur dans le tableau "usersDisliked".    
    } else if (req.body.like == -1) { 
        Sauce.findOneAndUpdate(
            { _id: req.params.id }, 
            { $inc:{dislikes:1}, $push:{usersDisliked:req.body.userId} }
        )
        .then(() => res.status(200).json ({ message: "Dislike enregistrée !"}))
        .catch(error => res.status(404).json({ error }));
    
    // Condition qui permet d'annuler le like ou le dislike par l'utilisateur.    
    } else {
        Sauce.findOne({ _id: req.params.id })
        .then((result) => {
            
            // Condition qui permet d'annuler le like par l'utilisateur en incrémentant -1 à "likes" et de retirer du tableau "usersLiked" son ID d'utilisateur.
            if (result.usersLiked.includes(req.body.userId)) {
                Sauce.findOneAndUpdate(
                    { _id: req.params.id }, 
                    { $inc:{likes:-1}, $pull:{usersLiked:req.body.userId} }
                )
                .then(() => res.status(200).json ({ message: "Like annulé !"}))
                .catch(error => res.status(404).json({ error }));
            
            // Condition qui permet d'annuler le dislike par l'utilisateur en incrémentant -1 à "dislikes" et de retirer du tableau "usersDisliked" son ID d'utilisateur.
            } else if (result.usersDisliked.includes(req.body.userId)) {
                Sauce.findOneAndUpdate(
                    { _id: req.params.id }, 
                    { $inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId} }
                )
                .then(() => res.status(200).json ({ message: "Dislike annulé !"}))
                .catch(error => res.status(404).json({ error }));
            }
        })
    }
};