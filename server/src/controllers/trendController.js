const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Mock trending topics data (in a real app, this would come from an API)
const mockTrendingTopics = {
  general: [
    { topic: 'Artificial Intelligence', volume: 158, growth: '+23%' },
    { topic: 'Remote Work', volume: 132, growth: '+15%' },
    { topic: 'Sustainability', volume: 120, growth: '+18%' },
    { topic: 'Mental Health', volume: 95, growth: '+27%' },
    { topic: 'Blockchain Technology', volume: 88, growth: '+10%' },
  ],
  technology: [
    { topic: 'Machine Learning', volume: 145, growth: '+20%' },
    { topic: 'Cloud Computing', volume: 130, growth: '+12%' },
    { topic: 'Cybersecurity', volume: 118, growth: '+22%' },
    { topic: 'Edge Computing', volume: 85, growth: '+28%' },
    { topic: 'Quantum Computing', volume: 65, growth: '+35%' },
  ],
  marketing: [
    { topic: 'Content Marketing', volume: 135, growth: '+15%' },
    { topic: 'Influencer Marketing', volume: 125, growth: '+18%' },
    { topic: 'Social Media Marketing', volume: 115, growth: '+10%' },
    { topic: 'Video Marketing', volume: 95, growth: '+25%' },
    { topic: 'Email Marketing', volume: 85, growth: '+5%' },
  ],
  healthcare: [
    { topic: 'Telehealth', volume: 120, growth: '+30%' },
    { topic: 'Mental Wellness', volume: 110, growth: '+25%' },
    { topic: 'Healthcare Technology', volume: 100, growth: '+20%' },
    { topic: 'Personalized Medicine', volume: 80, growth: '+22%' },
    { topic: 'Healthcare Data Privacy', volume: 70, growth: '+15%' },
  ],
  finance: [
    { topic: 'Cryptocurrency', volume: 140, growth: '+18%' },
    { topic: 'Fintech', volume: 125, growth: '+22%' },
    { topic: 'Sustainable Investing', volume: 105, growth: '+28%' },
    { topic: 'Personal Finance', volume: 95, growth: '+15%' },
    { topic: 'Financial Literacy', volume: 85, growth: '+20%' },
  ],
  education: [
    { topic: 'Remote Learning', volume: 130, growth: '+25%' },
    { topic: 'EdTech', volume: 115, growth: '+20%' },
    { topic: 'Continuous Learning', volume: 100, growth: '+18%' },
    { topic: 'Gamification in Education', volume: 80, growth: '+22%' },
    { topic: 'Skills Development', volume: 75, growth: '+15%' },
  ],
};

/**
 * @desc    Get current trending topics
 * @route   GET /api/trends
 * @access  Private
 */
const getTrendingTopics = async (req, res) => {
  try {
    // In a real app, we would call an external API or analyze data
    // For demo purposes, return mock data
    res.json(mockTrendingTopics.general);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({ message: 'Error fetching trending topics' });
  }
};

/**
 * @desc    Get industry-specific trends
 * @route   GET /api/trends/industry/:industry
 * @access  Private
 */
const getIndustryTrends = async (req, res) => {
  try {
    const { industry } = req.params;
    const normalizedIndustry = industry.toLowerCase();

    // Check if we have mock data for this industry
    if (mockTrendingTopics[normalizedIndustry]) {
      return res.json(mockTrendingTopics[normalizedIndustry]);
    }

    // If no mock data, generate with OpenAI (in a real app)
    // For demo, return general trends
    res.json(mockTrendingTopics.general);
  } catch (error) {
    console.error('Error fetching industry trends:', error);
    res.status(500).json({ message: 'Error fetching industry trends' });
  }
};

/**
 * @desc    Get keyword-related trends
 * @route   GET /api/trends/keyword/:keyword
 * @access  Private
 */
const getKeywordTrends = async (req, res) => {
  try {
    const { keyword } = req.params;

    // In a real app, we would use the OpenAI API to generate related topics
    // For demo purposes, create synthetic data
    const trends = [
      { topic: `${keyword} in Business`, volume: Math.floor(Math.random() * 100) + 50, growth: `+${Math.floor(Math.random() * 30) + 5}%` },
      { topic: `${keyword} Innovations`, volume: Math.floor(Math.random() * 100) + 50, growth: `+${Math.floor(Math.random() * 30) + 5}%` },
      { topic: `${keyword} Best Practices`, volume: Math.floor(Math.random() * 100) + 50, growth: `+${Math.floor(Math.random() * 30) + 5}%` },
      { topic: `Future of ${keyword}`, volume: Math.floor(Math.random() * 100) + 50, growth: `+${Math.floor(Math.random() * 30) + 5}%` },
      { topic: `${keyword} Tips and Strategies`, volume: Math.floor(Math.random() * 100) + 50, growth: `+${Math.floor(Math.random() * 30) + 5}%` },
    ];

    res.json(trends);
  } catch (error) {
    console.error('Error fetching keyword trends:', error);
    res.status(500).json({ message: 'Error fetching keyword trends' });
  }
};

module.exports = {
  getTrendingTopics,
  getIndustryTrends,
  getKeywordTrends,
};
