// src/pages/Operations.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

export default function Operations() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)

    // Obtener usuario
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) {
      toast.error('No hay sesión activa.')
      setLoading(false)
      return
    }

    // Construir query con filtros opcionales
    let query = supabase
      .from('transactions')
      .select('id, amount, date, description, categories(name)')
      .eq('usuario_id', user.id)
      .order('date', { ascending: false })

    if (startDate) query = query.gte('date', startDate)
    if (endDate)   query = query.lte('date', endDate)

    const { data, error: txErr } = await query
    if (txErr) {
      toast.error('Error al cargar operaciones: ' + txErr.message)
    } else {
      setTransactions(data)
    }
    setLoading(false)
  }

  // Función que muestra confirmación vía toast con botones
  const requestDelete = (id) => {
    toast.info(
      <div>
        <p>¿Seguro que deseas eliminar esta operación?</p>
        <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger me-2">
          Sí
        </button>
        <button onClick={() => toast.dismiss()} className="btn btn-sm btn-secondary">
          No
        </button>
      </div>,
      { autoClose: false, closeOnClick: false }
    )
  }

  const handleDelete = async (id) => {
    toast.dismiss()
    setLoading(true)
    const { error: delErr } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (delErr) {
      toast.error('No se pudo eliminar: ' + delErr.message)
    } else {
      toast.success('Operación eliminada')
      fetchTransactions()
    }
    setLoading(false)
  }

  const clearFilters = async () => {
    setStartDate('')
    setEndDate('')
    setLoading(true)

    // Recargar sin filtros
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) {
      toast.error('No hay sesión activa.')
      setLoading(false)
      return
    }
    const { data, error: txErr } = await supabase
      .from('transactions')
      .select('id, amount, date, description, categories(name)')
      .eq('usuario_id', user.id)
      .order('date', { ascending: false })

    if (txErr) {
      toast.error('Error al cargar operaciones: ' + txErr.message)
    } else {
      setTransactions(data)
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar />

        <div className="container py-5">
          <h2 className="text-light mb-4">Mis Operaciones</h2>

          {/* Filtrado por fecha */}
          <div className="row g-3 align-items-end mb-4">
            <div className="col-12 col-md-5 col-lg-3">
              <label className="form-label text-primary">Fecha inicio</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-5 col-lg-3">
              <label className="form-label text-primary">Fecha fin</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-2 col-lg-2">
              <button
                className="btn btn-primary w-100"
                onClick={fetchTransactions}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Filtrar'}
              </button>
            </div>
            <div className="col-12 col-md-2 col-lg-2">
              <button
                className="btn btn-primary w-100"
                onClick={clearFilters}
                disabled={loading}
              >
                Limpiar
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-light">Cargando...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-dark align-middle">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th className="text-end">Monto</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? transactions.map(tx => (
                    <tr key={tx.id}>
                      <td>{new Date(tx.date).toLocaleDateString()}</td>
                      <td>{tx.categories.name}</td>
                      <td>{tx.description || '-'}</td>
                      <td className="text-end">
                        ${parseFloat(tx.amount).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => requestDelete(tx.id)}
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No hay operaciones en este rango.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
