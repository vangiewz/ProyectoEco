import React from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '/logo.png';
import avatar from '../assets/auth.png';

const Navbar = () => {
  const { signOutUser } = useAuth();

  const handleLogout = async () => {
    await signOutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-lg fixed-top custom-navbar">
      <div className="container-fluid px-4">
        {/* Logo y Marca */}
        <a className="navbar-brand d-flex align-items-center brand-container" href="/">
          <div className="logo-wrapper">
            <img 
              src={logo} 
              alt="Logo" 
              className="navbar-logo"
            />
          </div>
          <div className="brand-text d-none d-lg-block">
            <span className="brand-title">COSTOS INTELIGENTES</span>
            <span className="brand-subtitle">Gestión Económico-Financiera</span>
          </div>
        </a>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu colapsable */}
        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          {/* Menu de usuario */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle user-dropdown d-flex align-items-center justify-content-center"
                href="#"
                id="userMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar-container">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="user-avatar"
                  />
                  <div className="status-indicator"></div>
                </div>
              </a>
              
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                <li>
                  <button className="dropdown-item custom-dropdown-item logout-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        /* Variables CSS para colores */
        :root {
          --navy-primary: #1a237e;
          --navy-secondary: #283593;
          --navy-light: #3949ab;
          --navy-dark: #0d47a1;
          --accent-blue: #2196f3;
          --accent-light: #64b5f6;
          --white: #ffffff;
          --light-gray: #f8faff;
          --border-color: rgba(25, 35, 126, 0.1);
          --shadow: 0 4px 20px rgba(26, 35, 126, 0.15);
        }

        /* Navbar principal */
        .custom-navbar {
          background: linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-secondary) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 3px solid var(--accent-blue);
          transition: all 0.3s ease;
          min-height: 70px;
          z-index: 1050;
        }

        .custom-navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.05);
          pointer-events: none;
        }

        /* Logo y marca */
        .brand-container {
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .brand-container:hover {
          transform: translateY(-1px);
        }

        .logo-wrapper {
          border-radius: 12px;
          padding: 8px;
          margin-right: 15px;
          transition: all 0.3s ease;
        }

        .logo-wrapper:hover {
          transform: translateY(-2px);
        }

        .navbar-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: brightness(1.1);
        }

        .brand-text {
          margin-left: 5px;
        }

        .brand-title {
          display: block;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 0.5px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          margin-bottom: -2px;
        }

        .brand-subtitle {
          display: block;
          font-size: 0.85rem;
          color: var(--accent-light);
          font-weight: 500;
          letter-spacing: 0.3px;
        }



        /* Botón hamburguesa personalizado */
        .custom-toggler {
          border: none;
          width: 30px;
          height: 30px;
          position: relative;
          background: transparent;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
        }

        .custom-toggler span {
          display: block;
          height: 3px;
          width: 100%;
          background: var(--white);
          border-radius: 3px;
          opacity: 1;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }

        .custom-toggler:not(.collapsed) span:nth-child(1) {
          transform: rotate(135deg) translate(8px, 8px);
        }

        .custom-toggler:not(.collapsed) span:nth-child(2) {
          opacity: 0;
        }

        .custom-toggler:not(.collapsed) span:nth-child(3) {
          transform: rotate(-135deg) translate(7px, -6px);
        }

        /* Dropdown de usuario */
        .user-dropdown {
          padding: 10px !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 60px;
          height: 60px;
        }

        .user-dropdown:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .avatar-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 3px solid var(--accent-light);
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .user-avatar:hover {
          border-color: var(--white);
          box-shadow: 0 0 15px rgba(255,255,255,0.3);
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #4caf50;
          border: 2px solid var(--white);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* Dropdown personalizado */
        .custom-dropdown {
          background: var(--white);
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(26, 35, 126, 0.2);
          padding: 8px 0;
          margin-top: 15px;
          min-width: 180px;
          overflow: hidden;
        }

        .custom-dropdown-item {
          padding: 12px 20px;
          color: var(--navy-primary);
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
        }

        .custom-dropdown-item:hover {
          background: linear-gradient(135deg, var(--light-gray), rgba(33, 150, 243, 0.1));
          color: var(--navy-dark);
          transform: translateX(5px);
          padding-left: 25px;
        }

        .custom-dropdown-item i {
          width: 20px;
          color: var(--accent-blue);
        }

        .logout-item:hover {
          background: linear-gradient(135deg, #ffebee, rgba(244, 67, 54, 0.1));
          color: #d32f2f;
        }

        .logout-item:hover i {
          color: #d32f2f;
        }

        /* Responsive */
        @media (max-width: 991.98px) {
          .custom-navbar {
            min-height: 60px;
          }
          
          .navbar-logo {
            width: 50px;
            height: 50px;
          }
          
          .brand-title {
            font-size: 1.1rem;
          }
          
          .brand-subtitle {
            font-size: 0.7rem;
          }
          

          
          .custom-dropdown {
            min-width: 160px;
          }
        }

        @media (max-width: 576px) {
          .logo-wrapper {
            padding: 6px;
            margin-right: 10px;
          }
          
          .navbar-logo {
            width: 45px;
            height: 45px;
          }
          
          .brand-title {
            font-size: 0.9rem;
          }
          
          .user-avatar {
            width: 35px;
            height: 35px;
          }
        }

        /* Animaciones */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .custom-dropdown {
          animation: fadeIn 0.3s ease-out;
        }

        /* Efectos de glassmorphism */
        .custom-navbar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
