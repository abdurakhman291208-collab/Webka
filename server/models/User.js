const mongoose = require('mongoose');

// Схема пользователя: email должен быть уникальным, пароль будет храниться как хеш bcrypt
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);