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
            {/* Registrar Operaciones */}
            <div className="col-12 col-md-6">
              <a href="/transacciones" className="text-decoration-none">
                <div className="card shadow-sm custom-card">
                  <div className="card-body d-flex align-items-start">
                    <div className="display-4 me-3">📝</div>
                    <div>
                      <h5 className="card-title mb-2">Registrar Operaciones</h5>
                      <p className="card-text">
                        Alta de ingresos, egresos y demás flujos financieros
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Indicadores de Gestión */}
            <div className="col-12 col-md-6">
              <a href="/indicadores" className="text-decoration-none">
                <div className="card shadow-sm custom-card">
                  <div className="card-body d-flex align-items-start">
                    <div className="display-4 me-3">📊</div>
                    <div>
                      <h5 className="card-title mb-2">Indicadores de Gestión</h5>
                      <p className="card-text">
                        Punto de equilibrio, flujo de caja y márgenes
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Dashboard Gráfico */}
            <div className="col-12 col-md-6">
              <a href="/dashboard" className="text-decoration-none">
                <div className="card shadow-sm custom-card">
                  <div className="card-body d-flex align-items-start">
                    <div className="display-4 me-3">📈</div>
                    <div>
                      <h5 className="card-title mb-2">Dashboard Gráfico</h5>
                      <p className="card-text">
                        Gráficos de evolución y tableros de control
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Reportes y Simulaciones */}
            <div className="col-12 col-md-6">
              <a href="/reportes" className="text-decoration-none">
                <div className="card shadow-sm custom-card">
                  <div className="card-body d-flex align-items-start">
                    <div className="display-4 me-3">📑</div>
                    <div>
                      <h5 className="card-title mb-2">Reportes y Simulaciones</h5>
                      <p className="card-text">
                        Generar informes y simular escenarios
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
