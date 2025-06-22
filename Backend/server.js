const pool = require('./poolPgSQL');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());





// Connexion a la base de données MongoDB : 
async function connectMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/projet_moodle'); // tentative de connexion 
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
  }
}
connectMongoDB();



// Connexion a la base de données PostgreSQL :
async function connectPgSql() { 
  try {
    const client = await pool.connect(); // tentative de connexion 
    console.log('Connecté à PgSql');
    client.release();
  } catch (err) {
    console.error('Erreur de connexion à PgSql:', err);
  }
}
connectPgSql();




// importation des routes : 

// routes mongoDB:
try {
  const filesRoutes = require('./routes/files');
  app.use('/api/files', filesRoutes);
  const forumRoutes = require('./routes/forum');
  app.use('/api/forums', forumRoutes);
  const logsRoutes = require('./routes/journal_logs');
  app.use('/api/logs', logsRoutes);
  const assignmentsRoutes = require('./routes/assignments');
  app.use('/api/assignments', assignmentsRoutes);

} catch (error) {
  console.error('Erreur lors du chargement des routes mongodb', error);
}

//route PostgreSQL:
try {
  const enrollmentRoutes = require('./routes/enrollment');
  app.use('/api/enrollment', enrollmentRoutes);
  const ueRoutes = require('./routes/ue');
  app.use('/api/ue', ueRoutes);
  const activitesRoutes = require('./routes/activites');
  app.use('/api/activites', activitesRoutes);
  const usersRoutes = require('./routes/users');
  app.use('/api/users', usersRoutes);
  const postRoutes = require('./routes/post');
  app.use('/api/posts', postRoutes);
  const courseContentRoutes = require('./routes/course_content');
  app.use('/api/course_content', courseContentRoutes);
} catch (error) {
  console.error('Erreur lors du chargement des routes pgsql', error);
}





// Demarrage du serveur :
app.listen(3000, () => {
  console.log('API démarrée sur http://localhost:3000');
});
