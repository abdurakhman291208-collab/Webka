import React, { useState } from 'react';

function GameForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('planned');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      title,
      status,
      rating: Number(rating),
    });

    setTitle('');
    setStatus('planned');
    setRating(0);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="card__title">Добавить игру</h3>

      <div className="form__group">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например, Elden Ring"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="status">Статус</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="playing">Играю</option>
          <option value="completed">Завершена</option>
          <option value="planned">Запланирована</option>
        </select>
      </div>

      <div className="form__group">
        <label htmlFor="rating">Рейтинг</label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          placeholder="0 - 10"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Добавить игру
      </button>
    </form>
  );
}

export default GameForm;
