const ContentIdea = require('../models/ContentIdea');
const generateIdeasWithAI = require('../services/openaiService');

/**
 * @desc    Generate content ideas using OpenAI
 * @route   POST /api/ideas/generate
 * @access  Private
 */
const generateIdeas = async (req, res) => {
  try {
    const { topic, industry, contentType, count = 4 } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    // Generate ideas using OpenAI
    const generatedIdeas = await generateIdeasWithAI(topic, industry, contentType, count);

    res.json(generatedIdeas);
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ message: 'Error generating ideas' });
  }
};

/**
 * @desc    Save a content idea
 * @route   POST /api/ideas
 * @access  Private
 */
const saveIdea = async (req, res) => {
  try {
    const {
      title,
      description,
      format,
      keywords,
      targetAudience,
      isScheduled,
      scheduledDate,
    } = req.body;

    const idea = await ContentIdea.create({
      userId: req.user._id,
      title,
      description,
      format,
      keywords,
      targetAudience,
      isScheduled,
      scheduledDate: isScheduled ? scheduledDate : null,
    });

    res.status(201).json(idea);
  } catch (error) {
    console.error('Error saving idea:', error);
    res.status(500).json({ message: 'Error saving idea' });
  }
};

/**
 * @desc    Get all user's saved ideas
 * @route   GET /api/ideas
 * @access  Private
 */
const getUserIdeas = async (req, res) => {
  try {
    const ideas = await ContentIdea.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ message: 'Error fetching ideas' });
  }
};

/**
 * @desc    Get a single idea by ID
 * @route   GET /api/ideas/:id
 * @access  Private
 */
const getIdeaById = async (req, res) => {
  try {
    const idea = await ContentIdea.findById(req.params.id);

    // Check if idea exists
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if idea belongs to user
    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(idea);
  } catch (error) {
    console.error('Error fetching idea:', error);
    res.status(500).json({ message: 'Error fetching idea' });
  }
};

/**
 * @desc    Update an idea
 * @route   PUT /api/ideas/:id
 * @access  Private
 */
const updateIdea = async (req, res) => {
  try {
    let idea = await ContentIdea.findById(req.params.id);

    // Check if idea exists
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if idea belongs to user
    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update idea
    idea = await ContentIdea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(idea);
  } catch (error) {
    console.error('Error updating idea:', error);
    res.status(500).json({ message: 'Error updating idea' });
  }
};

/**
 * @desc    Delete an idea
 * @route   DELETE /api/ideas/:id
 * @access  Private
 */
const deleteIdea = async (req, res) => {
  try {
    const idea = await ContentIdea.findById(req.params.id);

    // Check if idea exists
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if idea belongs to user
    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await idea.remove();

    res.json({ message: 'Idea removed' });
  } catch (error) {
    console.error('Error deleting idea:', error);
    res.status(500).json({ message: 'Error deleting idea' });
  }
};

/**
 * @desc    Toggle favorite status of an idea
 * @route   PUT /api/ideas/:id/favorite
 * @access  Private
 */
const toggleFavorite = async (req, res) => {
  try {
    let idea = await ContentIdea.findById(req.params.id);

    // Check if idea exists
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if idea belongs to user
    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Toggle favorite status
    idea.isFavorite = !idea.isFavorite;
    await idea.save();

    res.json(idea);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Error toggling favorite' });
  }
};

module.exports = {
  generateIdeas,
  saveIdea,
  getUserIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  toggleFavorite,
};
