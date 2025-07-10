// src/App.jsx
import React from 'react'
import Navbar from './components/navbar'
import AuthBackground from './components/AuthBackground'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <AuthBackground>
        <div className="container my-4">
          <div className="row g-4">
            {/* Mis Operaciones */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/operaciones" className="text-decoration-none">
                <div className="card shadow-sm custom-card hover-effect">
                  <div className="card-body d-flex align-items-center p-4">
                    <div className="display-4 me-3">💰</div>
                    <div>
                      <h5 className="card-title mb-1">Mis Operaciones</h5>
                      <p className="card-text text-muted small">
                        Ver y eliminar transacciones
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Registrar Operaciones */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/transacciones" className="text-decoration-none">
                <div className="card shadow-sm custom-card hover-effect">
                  <div className="card-body d-flex align-items-center p-4">
                    <div className="display-4 me-3">📝</div>
                    <div>
                      <h5 className="card-title mb-1">Registrar Operaciones</h5>
                      <p className="card-text text-muted small">
                        Alta de ingresos y egresos
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Indicadores de Gestión */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/indicadores" className="text-decoration-none">
                <div className="card shadow-sm custom-card hover-effect">
                  <div className="card-body d-flex align-items-center p-4">
                    <div className="display-4 me-3">📊</div>
                    <div>
                      <h5 className="card-title mb-1">Indicadores</h5>
                      <p className="card-text text-muted small">
                        Punto de equilibrio y márgenes
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Dashboard Gráfico */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/dashboard" className="text-decoration-none">
                <div className="card shadow-sm custom-card hover-effect">
                  <div className="card-body d-flex align-items-center p-4">
                    <div className="display-4 me-3">📈</div>
                    <div>
                      <h5 className="card-title mb-1">Dashboard</h5>
                      <p className="card-text text-muted small">
                        Gráficos de evolución
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Reportes y Simulaciones */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/reportes" className="text-decoration-none">
                <div className="card shadow-sm custom-card hover-effect">
                  <div className="card-body d-flex align-items-center p-4">
                    <div className="display-4 me-3">📑</div>
                    <div>
                      <h5 className="card-title mb-1">Reportes</h5>
                      <p className="card-text text-muted small">
                        Informes y simulaciones
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </AuthBackground>
    </>
  )
}

export default App
