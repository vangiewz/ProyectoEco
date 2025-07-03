import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthBackground from '../components/AuthBackground'
import Wrapper from '../components/Wrapper'
import { useAuth } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
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
      <AuthBackground>
        <Wrapper title="INICIA SESIÓN">
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label className="form-label fs-5 fw-semibold">Email:</label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fs-5 fw-semibold">Contraseña:</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-success py-2 fs-5"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>
            <div className="text-center">
                ¿No tienes cuenta?
            </div>
            <div className="text-center">
              <Link to="/register" className="fs-5 text-decoration-none text-success">
                 Regístrate
              </Link>
            </div>
          </form>
        </Wrapper>
      </AuthBackground>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Login
