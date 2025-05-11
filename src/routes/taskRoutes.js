const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../models/taskModel');

// 📥 GET /api/tasks - Obtenir toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des tâches.' });
  }
});

// ➕ POST /api/tasks - Créer une nouvelle tâche
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Le champ "title" est requis.' });
  }

  try {
    const task = await createTask(title.trim(), description || '');
    res.status(201).json(task);
  } catch (error) {
    console.error('❌ Erreur lors de la création de la tâche :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la tâche.' });
  }
});

module.exports = router;
