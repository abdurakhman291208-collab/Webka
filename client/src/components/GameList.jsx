import React, { useState } from 'react';

function GameList({ games, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('planned');
  const [editRating, setEditRating] = useState(0);

  const startEdit = (game) => {
    setEditingId(game._id);
    setEditTitle(game.title);
    setEditStatus(game.status);
    setEditRating(game.rating);
  };

  const submitEdit = (e) => {
    e.preventDefault();

    onEdit(editingId, {
      title: editTitle,
      status: editStatus,
      rating: Number(editRating),
    });

    setEditingId(null);
  };

  return (
    <div>
      <div className="dashboard__header">
        <h3 className="card__title">Игры</h3>
        <p className="card__subtitle">Управляйте списком, редактируйте рейтинг и отмечайте прогресс.</p>
      </div>

      {games.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          Пока нет игр. Добавьте первую игру в форму слева.
        </div>
      ) : (
        <div className="dashboard__grid">
          {games.map((game) => (
            <div key={game._id} className="card game-card">
              {editingId === game._id ? (
                <form className="form" onSubmit={submitEdit}>
                  <div className="form__group">
                    <label htmlFor={`title-${game._id}`}>Название</label>
                    <input
                      id={`title-${game._id}`}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor={`status-${game._id}`}>Статус</label>
                    <select
                      id={`status-${game._id}`}
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="playing">Играю</option>
                      <option value="completed">Завершена</option>
                      <option value="planned">Запланирована</option>
                    </select>
                  </div>

                  <div className="form__group">
                    <label htmlFor={`rating-${game._id}`}>Рейтинг</label>
                    <input
                      id={`rating-${game._id}`}
                      type="number"
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className="game-card__actions">
                    <button className="btn btn-primary" type="submit">
                      Сохранить
                    </button>
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => setEditingId(null)}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h4 className="game-card__title">{game.title}</h4>
                  <div className="game-card__meta">
                    <span>Статус: {game.status}</span>
                    <span>Рейтинг: {game.rating}</span>
                  </div>
                  <div className="game-card__actions">
                    <button className="btn btn-secondary" onClick={() => startEdit(game)}>
                      Редактировать
                    </button>
                    <button className="btn btn-outline" onClick={() => onDelete(game._id)}>
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameList;