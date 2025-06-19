const express = require('express');
const router = express.Router();
const {
  generateIdeas,
  saveIdea,
  getUserIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  toggleFavorite,
} = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware');

// Generate content ideas with AI
router.post('/generate', protect, generateIdeas);

// Save a content idea
router.post('/', protect, saveIdea);

// Get all user's saved ideas
router.get('/', protect, getUserIdeas);

// Get, update, delete a specific idea
router.get('/:id', protect, getIdeaById);
router.put('/:id', protect, updateIdea);
router.delete('/:id', protect, deleteIdea);

// Toggle favorite status
router.put('/:id/favorite', protect, toggleFavorite);

module.exports = router;
