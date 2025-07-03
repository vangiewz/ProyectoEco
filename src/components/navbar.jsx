import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import logo from '/logo.png'
import avatar from '../assets/auth2.png'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
      return
    }
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Fondo semi-transparente negro
        borderBottom: '2px solid #00ff99'       // Línea verde neon
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          <span
            className="ms-2 fw-bold d-none d-lg-inline"
            style={{ color: '#00ff99' }} // Texto verde neon
          >
            Gestión Económico-Financiera
          </span>
        </a>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          aria-label="Toggle menu"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
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
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userMenu"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .navbar-toggler {
          border-color: #00ff99;
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%2300ff99' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 255, 153, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        .dropdown-item:hover,
        .dropdown-item:focus,
        .dropdown-item:active {
          background-color: #00ff99 !important;
          color: #000 !important;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
