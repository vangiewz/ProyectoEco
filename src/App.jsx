// src/App.jsx
import React from 'react'
import Navbar from './components/navbar'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
        {/* Hero Section */}
        <div className="hero-section">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <div className="hero-content">
                  <h1 className="hero-title">
                    <span className="gradient-text">Panel de Control</span>
                  </h1>
                  <p className="hero-subtitle">
                    Gestiona tus finanzas de manera inteligente con nuestras herramientas profesionales
                  </p>
                  <div className="stats-row">
                    <div className="stat-item">
                      <div className="stat-number">5</div>
                      <div className="stat-label">Módulos</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <div className="stat-number">100%</div>
                      <div className="stat-label">Seguro</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <div className="stat-number">24/7</div>
                      <div className="stat-label">Acceso</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="main-dashboard">
          <div className="container">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Herramientas de Gestión</h2>
              <p className="section-description">Accede rápidamente a todas las funcionalidades de tu plataforma</p>
            </div>

            <div className="row g-4">
              {/* Mis Operaciones */}
              <div className="col-12 col-md-6 col-lg-4">
                <a href="/operaciones" className="card-link">
                  <div className="dashboard-card operations-card">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <i className="fas fa-wallet"></i>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">Mis Operaciones</h3>
                      <p className="card-description">
                        Visualiza y administra todas tus transacciones financieras
                      </p>
                      <div className="card-features">
                        <span className="feature-tag">Visualización</span>
                        <span className="feature-tag">Gestión</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>

              {/* Registrar Operaciones */}
              <div className="col-12 col-md-6 col-lg-4">
                <a href="/transacciones" className="card-link">
                  <div className="dashboard-card register-card">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <i className="fas fa-plus-circle"></i>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">Registrar Operaciones</h3>
                      <p className="card-description">
                        Registra nuevos ingresos y egresos de forma rápida y segura
                      </p>
                      <div className="card-features">
                        <span className="feature-tag">Ingresos</span>
                        <span className="feature-tag">Egresos</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>

              {/* Indicadores de Gestión */}
              <div className="col-12 col-md-6 col-lg-4">
                <a href="/indicadores" className="card-link">
                  <div className="dashboard-card indicators-card">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <i className="fas fa-chart-pie"></i>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">Indicadores</h3>
                      <p className="card-description">
                        Analiza métricas clave como punto de equilibrio y márgenes
                      </p>
                      <div className="card-features">
                        <span className="feature-tag">KPIs</span>
                        <span className="feature-tag">Análisis</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>

              {/* Dashboard Gráfico */}
              <div className="col-12 col-md-6 col-lg-4">
                <a href="/dashboard" className="card-link">
                  <div className="dashboard-card dashboard-graphs-card">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">Dashboard</h3>
                      <p className="card-description">
                        Visualiza la evolución de tus finanzas con gráficos interactivos
                      </p>
                      <div className="card-features">
                        <span className="feature-tag">Gráficos</span>
                        <span className="feature-tag">Tendencias</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>

              {/* Reportes y Simulaciones */}
              <div className="col-12 col-md-6 col-lg-4">
                <a href="/reportes" className="card-link">
                  <div className="dashboard-card reports-card">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <i className="fas fa-file-chart-line"></i>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">Reportes</h3>
                      <p className="card-description">
                        Genera informes detallados y realiza simulaciones financieras
                      </p>
                      <div className="card-features">
                        <span className="feature-tag">Informes</span>
                        <span className="feature-tag">Simulaciones</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        /* Variables CSS para mantener consistencia con navbar */
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
          --gradient: linear-gradient(135deg, var(--navy-primary), var(--accent-blue));
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-secondary) 50%, var(--accent-blue) 100%);
          padding: 120px 0 80px;
          margin-top: 70px;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--white);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--white), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          font-weight: 400;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-light);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0.5rem;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.3);
        }

        /* Main Dashboard */
        .main-dashboard {
          padding: 80px 0;
          background: linear-gradient(180deg, var(--light-gray) 0%, var(--white) 100%);
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--navy-primary);
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Dashboard Cards */
        .card-link {
          text-decoration: none;
          display: block;
          height: 100%;
        }

        .dashboard-card {
          background: var(--white);
          border-radius: 20px;
          padding: 2rem;
          height: 100%;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }

        .dashboard-card:hover::before {
          left: 100%;
        }

        .dashboard-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(26, 35, 126, 0.2);
          border-color: var(--accent-blue);
        }

        .card-icon-wrapper {
          margin-bottom: 1.5rem;
        }

        .card-icon {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: var(--white);
          background: var(--gradient);
          box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
        }

        .card-content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--navy-primary);
          margin-bottom: 0.8rem;
        }

        .card-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .card-features {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .feature-tag {
          background: rgba(33, 150, 243, 0.1);
          color: var(--accent-blue);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-arrow {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: rgba(33, 150, 243, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue);
          transition: all 0.3s ease;
        }

        .dashboard-card:hover .card-arrow {
          background: var(--accent-blue);
          color: var(--white);
          transform: scale(1.1);
        }

        /* Card variations */
        .operations-card .card-icon { background: linear-gradient(135deg, #4caf50, #66bb6a); }
        .register-card .card-icon { background: linear-gradient(135deg, #ff9800, #ffb74d); }
        .indicators-card .card-icon { background: linear-gradient(135deg, #9c27b0, #ba68c8); }
        .dashboard-graphs-card .card-icon { background: linear-gradient(135deg, #f44336, #ef5350); }
        .reports-card .card-icon { background: linear-gradient(135deg, #3f51b5, #5c6bc0); }

        /* Responsive Design */
        @media (max-width: 991.98px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .stats-row {
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 767.98px) {
          .hero-section {
            padding: 100px 0 60px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .main-dashboard {
            padding: 60px 0;
          }
          
          .dashboard-card {
            padding: 1.5rem;
          }
          
          .card-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .stat-divider {
            display: none;
          }
        }

        /* Animaciones */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-card {
          animation: slideInUp 0.6s ease-out backwards;
        }

        .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
        .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
        .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
        .dashboard-card:nth-child(4) { animation-delay: 0.4s; }
        .dashboard-card:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </>
  )
}

export default App
