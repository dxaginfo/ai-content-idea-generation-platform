const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContentIdea',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date'],
    },
    endDate: {
      type: Date,
      default: function() {
        return this.startDate;
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    contentType: {
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
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
