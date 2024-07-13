const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  dueDate: {type: Date, required: true},
  priority: {type: String, enum: ['low', 'medium', 'high'], default: 'low'},
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do',
  },
  history: [
    {
      change: String,
      date: {type: Date, default: Date.now},
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
