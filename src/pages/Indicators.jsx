import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/navbar'
import '../App.css'

const Indicators = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [metrics, setMetrics]     = useState({
    costFijo: 0,
    costVar: 0,
    ingresos: 0,
    egresos: 0,
  })

  const [priceUnit, setPriceUnit]       = useState('')
  const [costVarUnit, setCostVarUnit]   = useState('')
  const [breakEven, setBreakEven]       = useState(null)

  const [margin, setMargin]             = useState(null)

  const [mcUnit, setMcUnit] = useState(null)
const [priceForMC, setPriceForMC] = useState('')
const [cvForMC, setCvForMC] = useState('')

const [epd, setEpd] = useState(null)
const [oldQty, setOldQty] = useState('')
const [newQty, setNewQty] = useState('')
const [oldPrice, setOldPrice] = useState('')
const [newPrice, setNewPrice] = useState('')

const [cashFlow, setCashFlow] = useState(0)
const [netProfit, setNetProfit] = useState(0)

useEffect(() => {
  setCashFlow(metrics.ingresos - metrics.egresos)
  setNetProfit(metrics.ingresos - metrics.egresos)
}, [metrics])


  // Obtiene métricas del back
  const fetchMetrics = async () => {
    setError('')
    if (!startDate || !endDate) {
      setError('Debe seleccionar rango de fechas.')
      return
    }
    setLoading(true)
    // obtener user
    const {
      data: { user },
      error: userErr
    } = await supabase.auth.getUser()
    if (userErr || !user) {
      setError('No hay sesión activa.')
      setLoading(false)
      return
    }

    // traer transacciones con categoría
    const { data, error: txErr } = await supabase
      .from('transactions')
      .select('amount, categories(type)')
      .eq('usuario_id', user.id)
      .gte('date', startDate)
      .lte('date', endDate)

    setLoading(false)
    if (txErr) {
      setError('Error al cargar transacciones: ' + txErr.message)
      return
    }

    // calcular sumas
    let costFijo = 0, costVar = 0, ingresos = 0, egresos = 0
    data.forEach(tx => {
      const t = tx.categories.type
      const a = parseFloat(tx.amount)
      if (t === 'fijo') costFijo += a
      else if (t === 'variable') costVar += a
      else if (t === 'venta' || t === 'inversion') ingresos += a
      else if (t === 'compra' || t === 'otro') egresos += a
    })

    setMetrics({ costFijo, costVar, ingresos, egresos })
    // recalcular margen automáticamente
    if (ingresos > 0) {
      setMargin(((ingresos - costVar) / ingresos * 100).toFixed(2))
    } else {
      setMargin(null)
    }
    // limpiar punto de equilibrio
    setBreakEven(null)
  }

  // calcula punto de equilibrio
  const calcBreakEven = () => {
    const cf = metrics.costFijo
    const pu = parseFloat(priceUnit)
    const cv = parseFloat(costVarUnit)
    if (!pu || !cv || pu <= cv) {
      setBreakEven('Inválido')
      return
    }
    setBreakEven((cf / (pu - cv)).toFixed(2))
  }

  const calcMCUnit = () => {
  const p = parseFloat(priceForMC)
  const cv = parseFloat(cvForMC)
  if (!p || !cv) {
    setMcUnit(null)
    return
  }
  setMcUnit((p - cv).toFixed(2))
}

const calcEPD = () => {
  const q0 = parseFloat(oldQty)
  const q1 = parseFloat(newQty)
  const p0 = parseFloat(oldPrice)
  const p1 = parseFloat(newPrice)
  if (!q0 || !q1 || !p0 || !p1) {
    setEpd(null)
    return
  }
  const pctQ = ((q1 - q0) / q0) * 100
  const pctP = ((p1 - p0) / p0) * 100
  if (pctP === 0) {
    setEpd('Inválido')
  } else {
    setEpd((pctQ / pctP).toFixed(2))
  }
}


  return (
  <>
    <Navbar />
    <div className="content-wrapper">
      <div className="container pb-5">
        {/* Filtro de fechas */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row align-items-md-end gap-3">
              <div className="flex-fill">
                <label className="form-label text-light">Fecha inicio</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-fill">
                <label className="form-label text-light">Fecha fin</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex-fill" style={{ minWidth: '180px' }}>
                <button
                  className="btn btn-primary w-100"
                  onClick={fetchMetrics}
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Actualizar'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="col-12">
              <div className="alert alert-danger p-2 mt-2">{error}</div>
            </div>
          )}
        </div>

        {/* Métricas principales */}
        <div className="row g-4">
          {[
            { title: 'Costo Fijo Total', value: metrics.costFijo.toFixed(2) },
            { title: 'Costo Variable Total', value: metrics.costVar.toFixed(2) },
            { title: 'Ingresos Totales', value: metrics.ingresos.toFixed(2) },
            { title: 'Egresos Totales', value: metrics.egresos.toFixed(2) },
            { title: 'Flujo de Caja Operativo', value: cashFlow.toFixed(2) },
            { title: 'Utilidad Neta', value: netProfit.toFixed(2) },
          ].map(({ title, value }) => (
            <div key={title} className="col-12 col-md-6">
              <div className="card shadow-sm custom-card h-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
                  <h3 className="card-title">${value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Margen Bruto y Punto de Equilibrio */}
        <div className="row g-4 mt-4">
          {/* Margen Bruto */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm custom-card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Margen Bruto</h5>
                <div className="mt-auto">
                  {margin !== null
                    ? <h2>{margin} %</h2>
                    : <p className="text-muted">Actualiza fechas primero</p>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Punto de Equilibrio */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm custom-card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Punto de Equilibrio (unidades)</h5>
                <div>
                  <div className="mb-3">
                    <label className="form-label">Precio venta / unidad</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={priceUnit}
                      onChange={e => setPriceUnit(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Costo variable / unidad</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={costVarUnit}
                      onChange={e => setCostVarUnit(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={calcBreakEven}
                  >
                    Calcular
                  </button>
                  {breakEven !== null && (
                    <div className="mt-3">
                      {breakEven === 'Inválido'
                        ? <p className="text-danger">Valores no válidos</p>
                        : <h4>{breakEven} unidades</h4>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Margen Contribución Unitario */}
        <div className="row g-4 mt-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm custom-card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Margen Contribución Unitario</h5>
                <div>
                  <div className="mb-3">
                    <label className="form-label">Precio venta / unidad</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={priceForMC}
                      onChange={e => setPriceForMC(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Costo variable / unidad</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={cvForMC}
                      onChange={e => setCvForMC(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={calcMCUnit}
                  >
                    Calcular
                  </button>
                  {mcUnit !== null && (
                    <div className="mt-3">
                      <h4>${mcUnit} por unidad</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Elasticidad Precio de Demanda */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm custom-card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Elasticidad Precio de la Demanda</h5>
                <div>
                  <div className="mb-2">
                    <label className="form-label">Cantidad anterior</label>
                    <input
                      type="number"
                      className="form-control"
                      value={oldQty}
                      onChange={e => setOldQty(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Cantidad nueva</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newQty}
                      onChange={e => setNewQty(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Precio anterior</label>
                    <input
                      type="number"
                      className="form-control"
                      value={oldPrice}
                      onChange={e => setOldPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Precio nuevo</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={calcEPD}
                  >
                    Calcular
                  </button>
                  {epd !== null && (
                    <div className="mt-2">
                      {epd === 'Inválido'
                        ? <p className="text-danger">Valores no válidos</p>
                        : <h4>{epd}</h4>
                      }
                    </div>
                  )}
                </div>
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

export default Indicators
