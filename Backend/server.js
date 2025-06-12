const pool = require('./poolPgSQL');

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



// Connexion a la base de données PostgreSQL :
pool.connect()
  .then(client => {
    console.log('Connecté à PostgreSQL');
    client.release();
  })
  .catch(err => console.error('Erreur de connexion PostgreSQL:', err));




// importation des routes : 

// routes mongoDB:
try {
  const filesRoutes = require('./routes/files');
  app.use('/api/files', filesRoutes);
  const forumRoutes = require('./routes/forum');
  app.use('/api/forums', forumRoutes);
  const logsRoutes = require('./routes/journal_logs');
  app.use('/api/logs', logsRoutes);

} catch (error) {
  console.error('Erreur lors du chargement des routes mongodb', error);
}

//route PostgreSQL:
try {
  const enrollmentRoutes = require('./routes/enrollment');
  app.use('/api/enrollment', enrollmentRoutes);
  const ueRoutes = require('./routes/ue');
  app.use('/api/ue', ueRoutes);
  const usersRoutes = require('./routes/users');
  app.use('/api/users', usersRoutes);
} catch (error) {
  console.error('Erreur lors du chargement des routes pgsql', error);
}





// Demarrage du serveur :
app.listen(3000, () => {
  console.log('API démarrée sur http://localhost:3000');
});
