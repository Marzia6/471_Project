import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    scenario: {
      type: String,
      required: true,
      trim: true
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    options: {
      type: [String],
      required: true,
      validate: [arr => arr.length >= 2, 'At least 2 options are required']
    },
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      validate: function(value) {
        return value < this.options.length;
      }
    },
    explanation: {
      type: String,
      required: true,
      trim: true
    }
}, {
    timestamps: true
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
