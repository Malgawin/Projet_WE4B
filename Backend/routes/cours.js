const express = require('express');
const router = express.Router();
const Cours = require('../models/cours');

// get all courses
router.get('/', async (req, res) => {
    const cours = await Cours.find();
    res.json(cours);
});

//get course by id 
router.get('/:id', async (req, res) => {
    const cours = await Cours.findById(req.params.id);
    res.json(cours);

});



module.exports = router;