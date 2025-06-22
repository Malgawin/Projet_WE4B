const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignments');


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


module.exports = router;