const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Assignment } = require('../models/assignments');


router.get('/', async (req, res) => {
    const assignments = await Assignment.find();
    res.json(assignments);
});


router.post('/addAssignment', async (req, res) => {
 
    const assign = req.body.assignment; // recuperation de l'id du cours

    const newAssignment = new Assignment({ // creation d'un nouveau forum
      coursId: assign.id_course,
      title: assign.title,
      authorId: assign.author_id,
      publishDate: assign.publishDate,
      deadline: assign.deadline,
      type: assign.type, // type de l'assignement (ex : devoir, projet, etc.)
      sort_order: assign.sort_order, // ordre de tri des assignments
      submit: [], // liste des notes des étudiants pour cet assignment
      messages: assign.messages // liste des messages du forum
    });

    await newAssignment.save(); // sauvegarde du nouveau forum dans la bdd
    res.json(newAssignment);
});

router.post('/addSubmit', async (req, res) => {
 
    const submit = req.body.submit; // recuperation de l'id du cours
    const id_assignment = req.body.id_assignment;
    console.log("id assignemnt :", submit);

    try {
        // 1. Trouver l'assignment par son id
        const assignment = await Assignment.findById(id_assignment);
        
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // 2. Ajouter le submit dans le tableau submit
        assignment.submit.push(submit);

        // 3. Sauvegarder l'assignment modifié
        await assignment.save();

        res.status(201).json({ message: "Submit ajouté à l'assignment", assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout du submit" });
    }
});


router.get('/cours/:coursId', async (req, res) => {
    const coursId = Number(req.params.coursId);
    const assignments = await Assignment.find({ coursId });
    res.json(assignments);
});


router.get('/assignment/:assignId', async (req, res) => {
    const assignId = req.params.assignId;
    const assignment = await Assignment.findById( assignId );
    res.json(assignment);
});

router.get('/submit/:assignId', async (req, res) => {
    const assignId = req.params.assignId;
    const assignment = await Assignment.findById( assignId );
    res.json(assignment.submit);
});

router.put('/updateAllSubmits', async (req, res) => {
    const { id_assignment, submits } = req.body;

    try {
        const assignment = await Assignment.findById(id_assignment);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Remplace tous les submits par ceux reçus
        assignment.submit = submits;

        await assignment.save();

        res.status(200).json({ message: "Tous les submits ont été mis à jour", assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la mise à jour des submits" });
    }
});


module.exports = router;