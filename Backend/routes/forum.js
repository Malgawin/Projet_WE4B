const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Forum = require('../models/forum');

router.get('/cours/:coursId', async (req, res) => {
    const coursId = Number(req.params.coursId);
    const forums = await Forum.find({ coursId }).sort({ createdAt: -1 });
    res.json(forums);
});

router.get('/:forumId/messages', async (req, res) => {
    const forum = await Forum.findById(req.params.forumId);
    res.json(forum.messages);
});




router.post('/cours/:coursId', async (req, res) => {
 
    const { title, authorId } = req.body;
    const coursId = req.params.coursId;

    const nouveauForum = new Forum({
      coursId,
      title,
      authorId,
      createdAt: new Date(),
      messages: []
    });

    await nouveauForum.save();
    res.json(nouveauForum);
 
});




router.post('/:forumId/messages', async (req, res) => {
 
    const forum = await Forum.findById(req.params.forumId);

    const newMessage = {
      content: req.body.content,
      authorId: req.body.authorId,
      createdAt: new Date()
    };

    forum.messages.push(newMessage);
    await forum.save();

    const addedMessage = forum.messages[forum.messages.length - 1];

    
    res.json(addedMessage);
 
});


router.delete('/:forumId', async (req, res) => {
  const { forumId } = req.params;
  await Forum.findByIdAndDelete(forumId);
  res.json({ message: 'Forum supprimé avec succès' });
});


router.delete('/:forumId/messages/:messageId', async (req, res) => {
  const { forumId, messageId } = req.params;
  await Forum.updateOne( { _id: forumId }, { $pull: { messages: { _id: messageId } } });
  res.json({ message: 'Message supprimé avec succès' });
});

module.exports = router;