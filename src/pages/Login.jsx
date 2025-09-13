import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authImage from '../assets/auth2.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signInUser } = useAuth()
  const navigate = useNavigate()

  const handleSignIn = async e => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      toast.error('Por favor completa todos los campos.')
      setLoading(false)
      return
    }
    const result = await signInUser(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <div className="login-container">
        {/* Background con patrones */}
        <div className="login-background">
          <div className="bg-pattern"></div>
          <div className="bg-gradient"></div>
        </div>

        {/* Contenido principal */}
        <div className="login-content">
          <div className="login-wrapper">
            <div className="login-card">
              {/* Header de la card */}
              <div className="login-header">
                <div className="logo-container">
                  <img src={authImage} alt="Logo" className="login-logo" />
                </div>
                <h1 className="login-title">Bienvenido</h1>
                <p className="login-subtitle">
                  Accede a tu panel de gestión financiera
                </p>
              </div>

              {/* Formulario */}
              <div className="login-form-container">
                <form onSubmit={handleSignIn} className="login-form">
                  {/* Email Input */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-envelope me-2"></i>
                      Correo Electrónico
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Ingresa tu email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Contraseña
                    </label>
                    <div className="input-wrapper password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.785 12C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C21.0439 13.6158 20.0262 15.0668 18.5543 16.2943M6.72432 6.71504C4.56225 8.1817 3.24924 10.2194 2.42111 11.2868C2.28428 11.5025 2.21587 11.6103 2.21587 12C2.21587 12.3897 2.28428 12.4975 2.42111 12.7132C3.54645 14.4952 6.89633 19 12.0004 19C13.5588 19 14.9146 18.5667 16.1334 17.8573M9.87871 9.87827C9.33576 10.4212 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5792 14.6647 14.1221 14.1218" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="btn-loading">
                        <div className="spinner"></div>
                        <span>Ingresando...</span>
                      </div>
                    ) : (
                      <div className="btn-content">
                        <i className="fas fa-sign-in-alt me-2"></i>
                        <span>Iniciar Sesión</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="login-footer">
                <div className="register-text">
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" className="register-link">
                    Regístrate aquí
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Estilos CSS */}
      <style>{`
        /* Variables CSS */
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
          --text-dark: #2c3e50;
          --text-light: #6c757d;
          --success: #10b981;
          --error: #ef4444;
        }

        /* Reset y base */
        * {
          box-sizing: border-box;
        }

        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-secondary) 25%, var(--navy-light) 50%, var(--accent-blue) 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Container principal */
        .login-container {
          min-height: 100vh;
          width: 100vw;
          position: relative;
        }

        /* Background */
        .login-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .bg-gradient {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-secondary) 25%, var(--navy-light) 50%, var(--accent-blue) 100%);
        }

        .bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.02) 50%, transparent 51%);
          background-size: 400px 400px, 300px 300px, 800px 800px, 60px 60px;
          z-index: 2;
          animation: backgroundMove 20s ease-in-out infinite;
        }

        @keyframes backgroundMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, -20px) rotate(1deg); }
          66% { transform: translate(20px, -10px) rotate(-1deg); }
        }

        /* Contenido */
        .login-content {
          position: relative;
          z-index: 3;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        .login-wrapper {
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }

        /* Card de login */
        .login-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          box-shadow: 
            0 30px 60px rgba(26, 35, 126, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          overflow: hidden;
          width: 100%;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Header */
        .login-header {
          text-align: center;
          padding: 2.5rem 2.5rem 1.5rem;
          background: linear-gradient(135deg, #f8faff 0%, rgba(255,255,255,0.9) 100%);
          position: relative;
        }

        .login-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: var(--gradient);
          border-radius: 2px;
        }

        .logo-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-logo {
          width: 130px;
          height: 130px;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(26, 35, 126, 0.15));
          transition: transform 0.3s ease;
        }

        .login-logo:hover {
          transform: scale(1.05);
        }

        .login-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--navy-primary);
          margin-bottom: 0.8rem;
          margin-top: 0;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          color: var(--text-light);
          font-size: 1.1rem;
          margin: 0;
          font-weight: 400;
          line-height: 1.4;
        }

        /* Formulario */
        .login-form-container {
          padding: 2.5rem 2.5rem 1.5rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--navy-primary);
          margin-bottom: 0.8rem;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 1.2rem 1.5rem;
          border: 2px solid rgba(26, 35, 126, 0.08);
          border-radius: 16px;
          font-size: 1.05rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.9);
          color: var(--text-dark);
          font-weight: 500;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          background: var(--white);
          box-shadow: 
            0 0 0 4px rgba(33, 150, 243, 0.1),
            0 8px 25px rgba(26, 35, 126, 0.08);
          transform: translateY(-2px);
        }

        .form-input::placeholder {
          color: var(--text-light);
          font-weight: 400;
        }

        /* Password wrapper */
        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(26, 35, 126, 0.05);
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 0.6rem;
          border-radius: 10px;
          transition: all 0.3s ease;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle svg {
          transition: all 0.3s ease;
        }

        .password-toggle:hover {
          color: var(--accent-blue);
          background: rgba(33, 150, 243, 0.15);
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
        }

        .password-toggle:hover svg {
          transform: scale(1.1);
        }

        .password-toggle:active {
          transform: translateY(-50%) scale(0.95);
        }



        /* Botón de login */
        .login-btn {
          width: 100%;
          padding: 1.3rem 2rem;
          background: var(--gradient);
          border: none;
          border-radius: 16px;
          color: var(--white);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 8px 20px rgba(33, 150, 243, 0.3),
            0 2px 4px rgba(26, 35, 126, 0.2);
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .login-btn:hover:not(:disabled)::before {
          left: 100%;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 
            0 12px 30px rgba(33, 150, 243, 0.4),
            0 4px 8px rgba(26, 35, 126, 0.3);
        }

        .login-btn:active {
          transform: translateY(-1px);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid var(--white);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Footer */
        .login-footer {
          padding: 1.5rem 2.5rem 2rem;
          background: linear-gradient(135deg, #f8faff 0%, rgba(248, 250, 255, 0.8) 100%);
          text-align: center;
          border-top: 1px solid rgba(26, 35, 126, 0.06);
        }

        .register-text {
          color: var(--text-light);
          font-size: 1rem;
          font-weight: 500;
        }

        .register-link {
          color: var(--accent-blue);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        .register-link:hover {
          color: var(--navy-primary);
          background: rgba(33, 150, 243, 0.08);
          text-decoration: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-content {
            padding: 1.5rem 1rem;
          }

          .login-wrapper {
            max-width: 400px;
          }

          .login-card {
            border-radius: 24px;
          }

          .login-header {
            padding: 2rem 2rem 1rem;
          }

          .login-form-container {
            padding: 1.5rem;
          }

          .login-footer {
            padding: 1rem 2rem 1.5rem;
          }

          .login-logo {
            width: 110px;
            height: 110px;
          }

          .login-title {
            font-size: 1.8rem;
          }

          .login-subtitle {
            font-size: 1rem;
          }

          .form-input {
            padding: 1rem 1.2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .login-content {
            padding: 1rem 0.5rem;
          }

          .login-wrapper {
            max-width: 100%;
          }

          .login-header {
            padding: 1.5rem 1.5rem 0.5rem;
          }

          .login-form-container {
            padding: 1.2rem;
          }

          .login-footer {
            padding: 0.8rem 1.5rem 1.2rem;
          }

          .logo-container {
            margin-bottom: 1rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .login-logo {
            width: 90px;
            height: 90px;
          }

          .login-title {
            font-size: 1.6rem;
          }
        }

        /* Animaciones */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-card {
          animation: fadeInUp 0.6s ease-out;
        }

        /* Toast customization */
        .Toastify__toast--error {
          background: linear-gradient(135deg, var(--error), #dc2626);
        }

        .Toastify__toast--success {
          background: linear-gradient(135deg, var(--success), #059669);
        }
      `}</style>
    </>
  )
}

export default Login
