// src/pages/RegisterTransaction.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/navbar'
import '../App.css'

const RegisterTransaction = () => {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error cargando categorías:', error)
      } else {
        setCategories(data)
      }
    }
    loadCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!categoryId || !amount || !date) {
      setErrorMsg('Por favor completa todos los campos obligatorios.')
      return
    }

    setLoading(true)
    // 1) Obtener el usuario actual
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setErrorMsg('No se pudo verificar la sesión.')
      setLoading(false)
      return
    }

    // 2) Insertar transacción con usuario_id
    const { error } = await supabase
      .from('transactions')
      .insert({
        usuario_id:  user.id,
        category_id: categoryId,
        amount:      parseFloat(amount),
        date,
        description
      })

    setLoading(false)
    if (error) {
      setErrorMsg('Error al registrar la operación: ' + error.message)
    } else {
      setSuccessMsg('¡Operación registrada con éxito!')
      // Limpiar formulario
      setCategoryId('')
      setAmount('')
      setDate('')
      setDescription('')
    }
  }

  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg custom-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Registrar Operación</h4>

                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                  {successMsg && <div className="alert alert-success">{successMsg}</div>}

                  <form onSubmit={handleSubmit}>
                    {/* Categoría */}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Categoría *
                      </label>
                      <select
                        id="category"
                        className="form-select"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                      >
                        <option value="">Selecciona una...</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Monto */}
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        Monto *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="amount"
                        className="form-control"
                        placeholder="0.00"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                      />
                    </div>

                    {/* Fecha */}
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                      />
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Descripción (opcional)
                      </label>
                      <textarea
                        id="description"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? 'Registrando...' : 'Registrar Operación'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS */}
      <style>{`
        .content-wrapper {
          margin-top: 120px;
          min-height: calc(100vh - 120px);
          padding-top: 20px;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            margin-top: 100px;
            min-height: calc(100vh - 100px);
            padding-top: 15px;
          }
        }
      `}</style>
    </>
  )
}

export default RegisterTransaction
