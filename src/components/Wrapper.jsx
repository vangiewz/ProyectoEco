import React from 'react'
import escudo from '../assets/auth.png'

const Wrapper = ({ children, title }) => {
  return (
    <div
      className="bg-white p-4 p-md-5 rounded-5 shadow my-3 mx-auto"
      style={{ width: '90%', maxWidth: '25rem' }}
    >
      <div className="d-flex justify-content-center mb-4">
        <img
          src={escudo}
          alt="Logo"
          style={{ height: '10rem', width: 'auto' }}
        />
      </div>
      <h1 className="text-center fs-2 fw-bold mb-4">{title}</h1>
      {children}
    </div>
  )
}

export default Wrapper
