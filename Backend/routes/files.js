const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Utilisation de multer pour stocker les fichiers en mémoire



// Post /upload/image : permet d'uploader une image dans la bdd mongo
router.post('/upload/image', upload.single('image'), (req, res) => {

  // si pas d'image envoyer on renvoie une erreur 400
  if (!req.file) return res.status(400).send('pas d image envoyer');
  
  //creation d'un bucket GridFS pour stocker les images
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
  
  //ouvre un flux d'upload pour l'image
  const uploadStream = bucket.openUploadStream(req.file.originalname, // nom de l'image
  { contentType: req.file.mimetype, // type de contenu de l'image
  }); // length, chunkSize, uploadDate genrer automatiquement par gridfs

  const fileId = uploadStream.id; //recupere l'id de l'image uploadée

  // envoie du contenu de l'image dans le flux d'upload
  uploadStream.end(req.file.buffer);

  // quand l'upload est terminé, on envoie une réponse avec le status 201 et l'id du fichier
  uploadStream.on('finish', () => {
    res.status(201).json({ message: 'Image upload', _id: fileId });
  });

});



// GET /images : recupere la liste de toutes les images uplodées dans la bdd 
router.get('/images', async (req, res) => {
  const files = await mongoose.connection.db.collection('images.files').find().toArray();
  res.json(files);
});

// GET /images/:id : recupere une image par son id
router.get('/images/:id', async (req, res) => {

  try {

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' }); // creation d'un bucket GridFS images pour lire les images
    const objectId = new ObjectId(req.params.id); // convertit l'id recu en ObjectId de mongodb

     // recherche de l'image dans la collection images.files avec l'id fourni
    const files = await mongoose.connection.db.collection('images.files').find({ _id: objectId }).toArray(); //toArray() pour convertir le curseur en tableau
    
    if (!files) { // si pas de fichiers trouvés, on renvoie une erreur 404
      return res.status(404).json({ error: 'Fichier introuvable' }); 
    }

    // on envoie le type de contenu de l'image
    res.set('Content-Type', files[0].contentType);

    //création d'un flux de téléchargement pour l'image
    const downloadStream = bucket.openDownloadStream(objectId);
    downloadStream.pipe(res); // on pipe le flux de téléchargement vers la réponse HTTP
    downloadStream.on('error', () => res.status(404).json({ error: 'Erreur lors du chargement de l image' })); // cas d'erreur lors du téléchargement de l'image
  
  
  } catch (err) {
    res.status(400).json({ error: 'erreur mauvais id' });
  }

});








// PDF : 

// Post /upload/pdf : permet d'uploader un PDF dans la bdd mongodb 
router.post('/upload/pdf', upload.single('pdf'), (req, res) => {

  //verifie qu'il y a un fichier PDF a envoyé
  if (!req.file) return res.status(400).send('pas de PDF envoyé');

  //creation d'un bucket GridFS pour stocker les PDF
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documentsPdf' });
  
  //ouvre un flux d'upload pour le PDF
  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  //envoie le contenu du PDF dans le flux d'upload
  uploadStream.end(req.file.buffer);

  // quand l'upload est terminé, on envoie une réponse avec le status 201 et l'id du fichier
  uploadStream.on('finish', () => {
    res.status(201).json({ message: 'PDF upload', _id: uploadStream.id });
  });
});



router.get('/pdf/:id', async (req, res) => {

  try {

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documentsPdf' }); //cre  ation d'un bucket GridFS pour recuperer les PDF
    const objectId = new ObjectId(req.params.id); // convertit l'id recu en ObjectId de mongodb

    // recherche du PDF dans la collection documentsPdf.files avec l'id fourni
    const files = await mongoose.connection.db.collection('documentsPdf.files').find({ _id: objectId }).toArray();

    if (!files) {  // si pas de fichiers trouvés, on renvoie une erreur 404 
      return res.status(404).json({ error: 'Fichier introuvable' });
    }

    // on envoie le type de contenu, ici normalement PDF, permet au navigateur de savoir comment traiter le fichier
    res.set('Content-Type', files[0].contentType);
    //indique au navigateur que c'est un fichier à télécharger et avec le nom du fichier
    res.set('Content-Disposition', `attachment; filename="${files[0].filename}"`);

    // création d'un flux de téléchargement pour le PDF
    const downloadStream = bucket.openDownloadStream(objectId);

    // on pipe le flux de téléchargement vers la réponse HTTP
    downloadStream.pipe(res);
    
    // gestion des erreurs lors du téléchargement
    downloadStream.on('error', () => res.status(404).json({ error: 'Erreur de téléchargement' }));
  
  } catch (err) {
    res.status(400).json({ error: 'Erreur mauvais id' });
  }
});




module.exports = router;