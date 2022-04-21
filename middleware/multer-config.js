const multer = require('multer');// On importe le package multer qui nous permet de gérer nos fichiers téléchargés.

// Différents formats d'images qui seront téléchargées.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Ceci nous permettra d'enregister les images envoyées par les utilisateurs. On utilise la méthode destination pour définir le dossier où l'image sera enregistrée et la méthode filename pour renommer une image. 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// On exporte uniquement le fichier image entièrement configuré.
module.exports = multer({ storage }).single('image');