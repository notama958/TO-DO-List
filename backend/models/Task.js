const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  list: {
    title: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    tasks: [
      {
        text: {
          type: String,
          require: true,
        },
        check: {
          type: Boolean,
          default: false,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
