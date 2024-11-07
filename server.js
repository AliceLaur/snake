const express = require("express");
const cors = require("cors");

// Initialiser l'application
const app = express();
const PORT = 3000;

// Utiliser CORS pour permettre les requêtes cross-origin
app.use(cors());

// Servir les fichiers statiques du dossier "src"
app.use(express.static("src"));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});
