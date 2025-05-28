const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion a la base de données MongoDB : 
mongoose.connect('mongodb://localhost:27017/projet_moodle')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// importation des routes : 
try {
const coursRoutes = require('./routes/cours');
app.use('/api/cours', coursRoutes);
} catch (error) {
    console.error('Erreur lors du chargement des routes', error);
}

// Demarrage du serveur :
app.listen(3000, () => {
  console.log('API démarrée sur http://localhost:3000');
});
