import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null  // o spinner
  return user ? children : <Navigate to="/login" replace />
}
