import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import "../App.css";

dayjs.extend(relativeTime);

/* ---------------------- Helpers ---------------------- */
/**
 * Devuelve 'ingreso' o 'egreso' según el campo `type` de la categoría.
 * No altera la base — sólo usado por este dashboard.
 */
const flowFromType = (type) => (type === "venta" ? "ingreso" : "egreso");

/** Pastel elegante (12 tonos pastel) */
const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#A28EFF",
  "#FF6E9E",
  "#4CAF50",
  "#FFA600",
  "#B0E57C",
  "#F95D6A",
  "#2B908F",
  "#9E67AB",
];

const DashboardGrafico = () => {
  /* ---------- Rango de fechas ---------- */
  const today = dayjs().format("YYYY-MM-DD");
  const defaultStart = dayjs().subtract(5, "month").startOf("month").format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(today);

  /* ---------- UI State ---------- */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryTotals, setCategoryTotals] = useState([]); // gastos por categoría (egreso)
  const [flowTotals, setFlowTotals] = useState([]);      // ingreso vs egreso
  const [monthlyTotals, setMonthlyTotals] = useState([]);   // totales por mes
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));

  /* ---------- Layout responsive ---------- */
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const chartH = windowWidth < 768 ? 240 : 320;

  /* ---------- Fetch & aggregate ---------- */
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");

      // 1) User
      const { data: { user }, error: uErr } = await supabase.auth.getUser();
      if (uErr || !user) {
        mounted && (setError("Sesión no disponible."), setLoading(false));
        return;
      }

      // 2) Transactions + categoría type
      const { data, error: tErr } = await supabase
        .from("transactions")
        .select("amount, date, categories(type, name)")
        .eq("usuario_id", user.id)
        .gte("date", startDate)
        .lte("date", endDate);

      if (tErr) {
        mounted && (setError("Error cargando datos: " + tErr.message), setLoading(false));
        return;
      }

      /* ----- Agrupar ----- */
      const catTotals = {};   // egresos por categoría
      const flowTotalsObj = { ingreso: 0, egreso: 0 };
      const monthTotals = {};

      data.forEach(({ amount, date, categories }) => {
        const amt = Number(amount);
        const tipo = categories.type;
        const flujo = flowFromType(tipo); // ingreso | egreso

        // Ingreso vs Egreso
        flowTotalsObj[flujo] += amt;

        // Solo egresos para gráfico de categorías
        if (flujo === "egreso") {
          catTotals[categories.name] = (catTotals[categories.name] || 0) + amt;
        }

        // Totales mensuales (ambos flujos)
        const key = dayjs(date).format("YYYY-MM");
        monthTotals[key] = (monthTotals[key] || 0) + amt * (flujo === "egreso" ? -1 : 1); // ingreso positivo, egreso negativo
      });

      /* Transformar a arrays */
      const catArr = Object.entries(catTotals).map(([name, value]) => ({ name, value }));
      const flowArr = Object.entries(flowTotalsObj).map(([name, value]) => ({ name, value }));
      const monthArr = Object.entries(monthTotals)
        .sort(([a], [b]) => (a > b ? 1 : -1))
        .map(([m, amount]) => ({ month: dayjs(m + "-01").format("MMM YY"), amount }));

      if (mounted) {
        setCategoryTotals(catArr);
        setFlowTotals(flowArr);
        setMonthlyTotals(monthArr);
        setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [startDate, endDate]);

  /* ---------- Render ---------- */
  if (loading) {
    return (
      <>
        <Navbar />
          <div style={{ height: 76 }} />
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-success" role="status" />
  </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
        <div style={{ height: 76 }} />
        <div className="container py-5">
          {/* Filtro rango fechas */}
          <form className="row g-3 mb-4 align-items-end">
            <div className="col-12 col-md-4 col-lg-3">
              <label className="form-label text-primary mb-1">Fecha inicio</label>
              <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <label className="form-label text-primary mb-1">Fecha fin</label>
              <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </form>

          {/* ----- Gráfico Ingreso vs Egreso ----- */}
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="card shadow-lg custom-card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Ingresos vs Egresos</h5>
                  {flowTotals.every((f) => f.value === 0) ? (
                    <p className="text-muted">Sin datos en el rango seleccionado.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={chartH}>
                      <PieChart>
                        <Pie dataKey="value" data={flowTotals} cx="50%" cy="50%" outerRadius={windowWidth < 576 ? 70 : 90} label>
                          {flowTotals.map((_, i) => (
                            <Cell key={i} fill={i === 0 ? "#00C49F" : "#FF6E9E"} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => v.toLocaleString("es-BO", { style: "currency", currency: "BOB" })} />
                        {windowWidth >= 768 && <Legend layout="vertical" verticalAlign="middle" align="right" />}
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Gastos por categoría (solo egresos) */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-lg custom-card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Egresos por categoría</h5>
                  {categoryTotals.length === 0 ? (
                    <p className="text-muted">Sin egresos en el rango.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={chartH}>
                      <PieChart>
                        <Pie data={categoryTotals} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={windowWidth < 576 ? 70 : 90} label={({ name, percent }) =>
                            windowWidth < 576 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
                          }>
                          {categoryTotals.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => v.toLocaleString("es-BO", { style: "currency", currency: "BOB" })} />
                        {windowWidth >= 768 && <Legend layout="vertical" verticalAlign="middle" align="right" />}
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ----- Línea resultado neto ----- */}
          <div className="row g-4 mt-4">
            <div className="col-12">
              <div className="card shadow-lg custom-card">
                <div className="card-body">
                  <h5 className="card-title mb-3">Resultado neto por mes</h5>
                  {monthlyTotals.length === 0 ? (
                    <p className="text-muted">Sin datos en el rango.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={chartH + 40}>
                      <LineChart data={monthlyTotals} margin={{ top: 10, right: 30, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => v.toLocaleString("es-BO")}></YAxis>
                        <Tooltip formatter={(v) => v.toLocaleString("es-BO", { style: "currency", currency: "BOB" })} />
                        <Line type="monotone" dataKey="amount" stroke="#0088FE" strokeWidth={2} dot />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default DashboardGrafico;
