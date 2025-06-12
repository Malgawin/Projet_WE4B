const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Log = require('../models/journal_logs');


router.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const log = await Log.findOne({ userId: userId });
    if (!log) return res.status(404).json({ message: 'Log introuvable' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router; 