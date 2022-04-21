const http = require('http');// On importe notre package http de node.js.
const app = require('./app');// On importe notre application du fichier app.js.

// On utilise la méthode .set pour notre application afin qu'elle se lance sur le port 3000 si dispo ou celui de l'environnement sur lequel tourne le server si il nous en renvoi un port a utiliser. 
app.set('port', process.env.PORT || 3000);

// On appel la méthode createServer de notre package http pour notre application.
const server = http.createServer(app);

// On écoute le server avec la méthode listen, sur notre port 3000 si dispo ou celui de l'environnement sur lequel tourne le server si il nous en renvoi un port a utiliser. 
server.listen(process.env.PORT || 3000);

