const express = require('express');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Все маршруты ниже требуют аутентификации
router.use(authMiddleware);

// GET /games - список игр текущего пользователя
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ userId: req.user.id });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// POST /games - создать новую игру
router.post('/', async (req, res) => {
  const { title, status, rating } = req.body;
  if (!title || !status) {
    return res.status(400).json({ message: 'Название и статус обязательны' });
  }

  try {
    const game = new Game({ title, status, rating, userId: req.user.id });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// PUT /games/:id - обновить игру
router.put('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }
    if (game.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Запрещено' });
    }

    const { title, status, rating } = req.body;
    if (title !== undefined) game.title = title;
    if (status !== undefined) game.status = status;
    if (rating !== undefined) game.rating = rating;

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// DELETE /games/:id - удалить игру
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }
    if (game.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Запрещено' });
    }

    await game.remove();
    res.json({ message: 'Игра удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;