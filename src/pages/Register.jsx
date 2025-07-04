import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthBackground from '../components/AuthBackground'
import Wrapper from '../components/Wrapper'
import { useAuth } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUpUser } = useAuth()
  const navigate = useNavigate()

  const handleSignUp = async e => {
  e.preventDefault()
  if (!email || !password || !confirm) {
    toast.error('Por favor completa todos los campos.')
    return
  }
  if (password !== confirm) {
    toast.error('Las contraseñas no coinciden.')
    return
  }

  setLoading(true)
  const result = await signUpUser(email, password)
  setLoading(false)

  if (result.success) {
    toast.success('Registro exitoso. Revisa tu correo para confirmar tu cuenta.', {
      autoClose: 5000
    })
    setTimeout(() => navigate('/login'), 5000)
  } else {
    toast.error(result.message)
  }
}

  return (
    <>
      <AuthBackground>
        <Wrapper title="REGISTRO">
          <form onSubmit={handleSignUp}>
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
            <div className="mb-3">
              <label className="form-label fs-5 fw-semibold">Confirmar contraseña:</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="********"
              />
            </div>
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-success py-2 fs-5"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
            <div className="text-center">
              <span className="d-block mb-1">¿Ya tienes cuenta?</span>
              <Link to="/login" className="fs-5 text-decoration-none text-success">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </Wrapper>
      </AuthBackground>
      <ToastContainer position="top-right" autoClose={3000} closeButton={false} hideProgressBar />
    </>
  )
}

export default Register
