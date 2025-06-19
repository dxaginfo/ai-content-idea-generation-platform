const mongoose = require('mongoose');

const contentIdeaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    format: {
      type: String,
      enum: [
        'Blog Post',
        'Social Media Post',
        'Video Script',
        'Email Newsletter',
        'Podcast Episode',
        'Infographic',
        'Case Study',
        'How-to Guide',
        'Other',
      ],
      default: 'Blog Post',
    },
    keywords: [{
      type: String,
      trim: true,
    }],
    targetAudience: {
      type: String,
      default: '',
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    scheduledDate: {
      type: Date,
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ContentIdea', contentIdeaSchema);
