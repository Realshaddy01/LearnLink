
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true,
      validate: [arrayLimit, 'Quiz must have between 2 and 4 options']
    },
    correctAnswer: {
      type: Number,
      required: true,
      validate: [validAnswerIndex, 'Correct answer must be a valid option index']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length >= 2 && val.length <= 4;
}

function validAnswerIndex(val) {
  return val >= 0 && val < this.options.length;
}

const quizModel = mongoose.model('quiz', quizSchema);

module.exports = quizModel;