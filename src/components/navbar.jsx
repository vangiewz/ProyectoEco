import React from 'react';
import { useAuth } from '../context/AuthContext';
import logo   from '/logo.png';
import avatar from '../assets/auth2.png';

const Navbar = () => {
  const { signOutUser } = useAuth();

  const handleLogout = async () => {
    await signOutUser();   // ← sin navigate: el router se encarga
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderBottom: '2px solid #00ff99'
      }}
    >
      <div className="container-fluid">
        {/* Sugerencia: usa <Link to="/">…</Link> para evitar recarga */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" width="40" height="40" />
          <span
            className="ms-2 fw-bold d-none d-lg-inline"
            style={{ color: '#00ff99' }}
          >
            Gestión Económico-Financiera
          </span>
        </a>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-label="Toggle menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="mainNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avatar}
                  alt="Avatar"
                  width="40"
                  height="40"
                  className="rounded-circle border border-success"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* estilos inline */}
      <style>{`
        .navbar-toggler {
          border-color: #00ff99;
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%2300ff99' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0,255,153,1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        .dropdown-item:hover,
        .dropdown-item:focus,
        .dropdown-item:active {
          background-color: #00ff99 !important;
          color: #000 !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
