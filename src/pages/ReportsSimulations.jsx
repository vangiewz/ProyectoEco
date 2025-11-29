import React, { useState } from 'react'
import dayjs from 'dayjs'
import { jsPDF } from 'jspdf'

import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/navbar'
import '../App.css'

/* ------------ Helper flujo ingreso / egreso ------------ */
const flowFromType = (type) => (type === 'venta' ? 'ingreso' : 'egreso')

/* ------------ Helper formato moneda -------------------- */
const money = (v) =>
  v.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })

const ReportsSimulations = () => {
  /* ---------- rango fechas ---------- */
  const today = dayjs().format('YYYY-MM-DD')
  const defaultStart = dayjs().startOf('month').format('YYYY-MM-DD')

  const [startDate, setStartDate] = useState(defaultStart)
  const [endDate, setEndDate] = useState(today)

  /* ---------- estado datos ---------- */
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [metrics, setMetrics] = useState({
    costFijo: 0,
    costVar: 0,
    ingresos: 0,
    egresos: 0,
  })

  /* ---------- estado simulación ---------- */
  const [priceUnit, setPriceUnit] = useState('')
  const [costVarUnit, setCostVarUnit] = useState('')
  const [deltaPrice, setDeltaPrice] = useState('0')
  const [deltaQty, setDeltaQty] = useState('0')
  const [simResult, setSimResult] = useState(null)

  /* ======================================================
     1) Generar reporte
     ====================================================== */
  const fetchReport = async () => {
    setError('')
    if (!startDate || !endDate) {
      setError('Debe seleccionar rango de fechas.')
      return
    }
    setLoading(true)

    // usuario actual
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()

    if (userErr || !user) {
      setError('No hay sesión activa.')
      setLoading(false)
      return
    }

    // transacciones en rango
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

    let costFijo = 0,
      costVar = 0,
      ingresos = 0,
      egresos = 0

    data.forEach(({ amount, categories }) => {
      const { type } = categories
      const amt = Number(amount)

      if (flowFromType(type) === 'ingreso') ingresos += amt
      else egresos += amt

      if (type === 'fijo') costFijo += amt
      else if (type === 'variable') costVar += amt
    })

    setMetrics({ costFijo, costVar, ingresos, egresos })
    setSimResult(null)
  }

  /* ======================================================
     2) Simular escenario
     ====================================================== */
  const simulate = () => {
    const P0 = Number(priceUnit)
    const CVu = Number(costVarUnit)
    const dP = Number(deltaPrice)
    const dQ = Number(deltaQty)

    if (!P0 || !CVu) {
      setError('Ingrese Precio y CVu para simular.')
      return
    }

    const { costFijo, ingresos } = metrics
    const Q0 = P0 > 0 ? ingresos / P0 : 0

    const P1 = P0 * (1 + dP / 100)
    const Q1 = Q0 * (1 + dQ / 100)

    const IT1 = P1 * Q1
    const CV1 = CVu * Q1
    const CT1 = costFijo + CV1
    const UN1 = IT1 - CT1
    const Qpe1 = P1 > CVu ? costFijo / (P1 - CVu) : null

    setSimResult({ IT1, CT1, UN1, Qpe1 })
  }

  /* ======================================================
     3) Descargar PDF
     ====================================================== */
  const downloadPdf = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    let y = 10

    doc.setFontSize(14)
    doc.text('Reporte financiero', 105, y, { align: 'center' })
    y += 8

    doc.setFontSize(11)
    doc.text(`Rango: ${startDate} → ${endDate}`, 10, y)
    y += 10

    const rows = [
      ['Ingresos', money(metrics.ingresos)],
      ['Egresos', money(metrics.egresos)],
      ['Costo Fijo', money(metrics.costFijo)],
      ['Costo Variable', money(metrics.costVar)],
      ['Utilidad Neta', money(metrics.ingresos - metrics.egresos)],
      ['Flujo de Caja', money(metrics.ingresos - metrics.egresos)],
    ]
    rows.forEach(([label, val]) => {
      doc.text(`${label}: ${val}`, 10, y)
      y += 7
    })

    if (simResult) {
      y += 5
      doc.setFontSize(12)
      doc.text('Simulación', 10, y)
      y += 8
      const simRows = [
        ['Ingreso Total', money(simResult.IT1)],
        ['Costo Total', money(simResult.CT1)],
        ['Utilidad Neta', money(simResult.UN1)],
        [
          'Punto de Equilibrio (u)',
          simResult.Qpe1 ? simResult.Qpe1.toFixed(2) : '—',
        ],
      ]
      doc.setFontSize(11)
      simRows.forEach(([label, val]) => {
        doc.text(`${label}: ${val}`, 10, y)
        y += 7
      })
    }

    doc.save(`reporte_${startDate}_${endDate}.pdf`)
  }

  /* ======================================================
     4) Render
     ====================================================== */
  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <div className="container py-4 pb-5">
          {/* ---------- Filtro ---------- */}
          <div className="row g-3 align-items-end mb-3">
            <div className="col-12 col-md-4 col-lg-3">
              <label className="form-label text-primary">Fecha inicio</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4 col-lg-3">
              <label className="form-label text-primary">Fecha fin</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-4 col-lg-3 d-grid">
              <button
                className="btn btn-primary"
                onClick={fetchReport}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Generar reporte'}
              </button>
            </div>

            <div className="col-6 col-md-6 col-lg-3 d-grid">
              <button
                className="btn btn-primary"
                onClick={downloadPdf}
                disabled={loading}
              >
                Descargar PDF
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* ---------- Métricas ---------- */}
          <div className="row g-4 mb-5">
            {[
              ['Ingresos', metrics.ingresos],
              ['Egresos', metrics.egresos],
              ['Costo Fijo', metrics.costFijo],
              ['Costo Variable', metrics.costVar],
              ['Utilidad Neta', metrics.ingresos - metrics.egresos],
              ['Flujo de Caja', metrics.ingresos - metrics.egresos],
            ].map(([label, val]) => (
              <div key={label} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm custom-card h-100">
                  <div className="card-body d-flex flex-column">
                    <span className="text-muted small">{label}</span>
                    <h4 className="fw-bold mt-auto">{money(val)}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Simulador ---------- */}
          <div className="row mb-4">
            <div className="col-12">
              <h4 className="text-center fw-bold" style={{ color: '#000080' }}>
                Simular cambios de Precio / Cantidad
              </h4>
            </div>
          </div>

          <div className="row g-4">
            {/* Formulario */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-lg custom-card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Parámetros</h5>

                  <div className="mb-3">
                    <label className="form-label">
                      Precio actual por unidad
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={priceUnit}
                      onChange={(e) => setPriceUnit(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Costo variable por unidad
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={costVarUnit}
                      onChange={(e) => setCostVarUnit(e.target.value)}
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">% cambio precio</label>
                      <input
                        type="number"
                        className="form-control"
                        value={deltaPrice}
                        onChange={(e) => setDeltaPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">% cambio cantidad</label>
                      <input
                        type="number"
                        className="form-control"
                        value={deltaQty}
                        onChange={(e) => setDeltaQty(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary w-100 mt-3"
                    onClick={simulate}
                  >
                    Simular escenario
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-lg custom-card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">Resultados simulados</h5>

                  {simResult ? (
                    <ul className="list-group list-group-flush flex-grow-1">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Ingreso Total</span>
                        <strong>{money(simResult.IT1)}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Costo Total</span>
                        <strong>{money(simResult.CT1)}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Utilidad Neta</span>
                        <strong>{money(simResult.UN1)}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Punto de Equilibrio (u)</span>
                        <strong>
                          {simResult.Qpe1 ? simResult.Qpe1.toFixed(2) : '—'}
                        </strong>
                      </li>
                    </ul>
                  ) : (
                    <p className="text-muted">
                      Aún no se ha simulado ningún escenario.
                    </p>
                  )}
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

export default ReportsSimulations
