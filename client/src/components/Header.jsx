import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getLinkClass = ({ isActive }) =>
    `nav__link ${isActive ? 'nav__link-active' : ''}`;

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand" onClick={() => navigate('/')}>Webkaa</div>
        <nav className="nav">
          {token ? (
            <>
              <NavLink to="/dashboard" className={getLinkClass}>
                Моя библиотека
              </NavLink>
              <button className="btn btn-outline" onClick={handleLogout} type="button">
                Выйти
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={getLinkClass}>
                Вход
              </NavLink>
              <NavLink to="/register" className={getLinkClass}>
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
