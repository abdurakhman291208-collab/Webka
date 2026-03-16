const mongoose = require('mongoose');

// Схема игры: каждая игра принадлежит пользователю (userId)
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['playing', 'completed', 'planned'], required: true },
  rating: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Game', gameSchema);
