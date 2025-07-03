import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import App      from './App'
import Login    from './pages/Login'
import Register from './pages/Register'
import RegisterTransaction from './pages/RegisterTransaction'
import Indicators from './pages/Indicators'

import PrivateRoute from './components/PrivateRoute'
import PublicRoute  from './components/PublicRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },
  {
    path: '/transacciones',
    element: (
      <PrivateRoute>
        <RegisterTransaction />
      </PrivateRoute>
    )
  },
  {
    path: '/indicadores',
    element: (
      <PrivateRoute>
        <Indicators />
      </PrivateRoute>
    )
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
])
