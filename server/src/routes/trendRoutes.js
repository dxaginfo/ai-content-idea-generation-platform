const express = require('express');
const router = express.Router();
const {
  getTrendingTopics,
  getIndustryTrends,
  getKeywordTrends,
} = require('../controllers/trendController');
const { protect } = require('../middleware/authMiddleware');

// Get trending topics
router.get('/', protect, getTrendingTopics);

// Get industry-specific trends
router.get('/industry/:industry', protect, getIndustryTrends);

// Get keyword-related trends
router.get('/keyword/:keyword', protect, getKeywordTrends);

module.exports = router;
