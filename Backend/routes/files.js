const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload/image', upload.single('image'), (req, res) => {

  if (!req.file) return res.status(400).send('pas d image envoyer');
  
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  uploadStream.end(req.file.buffer);

});


router.get('/images', async (req, res) => {
  const files = await mongoose.connection.db.collection('images.files').find().toArray();
  res.json(files);
});


router.get('/images/:id', async (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
    const objectId = new ObjectId(req.params.id);

    
    const files = await mongoose.connection.db.collection('images.files').find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Fichier introuvable' });
    }
    res.set('Content-Type', files[0].contentType || 'application/octet-stream');

    const downloadStream = bucket.openDownloadStream(objectId);
    downloadStream.pipe(res);
    downloadStream.on('error', () => res.status(404).json({ error: 'Erreur lors du téléchargement' }));
  } catch (err) {
    res.status(400).json({ error: 'erreur mauvais id' });
  }
});



module.exports = router;