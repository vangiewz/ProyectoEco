import React from 'react'
import '../index.css'

export default function AuthBackground({ children }) {
  return (
    <div
      className="auth-background d-flex flex-column justify-content-start align-items-center"
      style={{
        minHeight: '100vh',
        paddingTop: '90px',
        paddingBottom: '2rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}
