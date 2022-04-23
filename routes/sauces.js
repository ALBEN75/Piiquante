const express = require('express');
const router = express.Router();// On utilise la méthode express.Router() qui nous permet de créer des routeurs séparés pour chaque route principale de l'application.

const sauceCtrl = require('../controllers/sauces');// On importe nos fonctions pour les sauces dans la constante.
const auth = require('../middleware/auth');// On importe nos middleware d'authenfication.
const multer = require('../middleware/multer-config');// On importe nos fonctions de config pour multer.

router.post('/', auth, multer, sauceCtrl.createSauce);// Route pour l'ajout d'une nouvelle sauce par l'utilisateur qui sera stockée dans l'API. 
router.get('/:id', auth, sauceCtrl.getOneSauce);// Route pour obtenir une sauce a l'aide de son :id stockée dans l'API.
router.get('/', auth, sauceCtrl.getAllSauces);// Route pour obtenir toutes les sauces de l'API. 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);// Route pour modfier une sauce ajoutée par son utilisateur. 
router.delete('/:id', auth, sauceCtrl.deleteSauce);// Route pour supprimer une sauce ajoutée par son utilisateur.
router.post('/:id', auth, sauceCtrl.likeOrNotSauce);// Route pour noter(like or dislike) une sauce par utilisateur.

module.exports = router;// On exporte notre routeur finale pour pouvoir l'utiliser. 