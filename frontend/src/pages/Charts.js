import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import {
  Bar, Line, Pie, Doughnut, Radar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement, LineElement, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement, Tooltip, Legend,
} from "chart.js";
import "../styles/Charts.css";

ChartJS.register(
  BarElement, LineElement, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement, Tooltip, Legend
);

function Charts() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [xCol, setXCol] = useState("");
  const [yCol, setYCol] = useState("");
  const chartRef = useRef(null); // for download

  useEffect(() => {
    axios.get("http://localhost:1000/api/upload")
      .then(res => setFiles(res.data))
      .catch(() => setFiles([]));
  }, []);

  useEffect(() => {
    if (selectedFileId) {
      axios.get(`http://localhost:1000/api/upload/${selectedFileId}`)
        .then(res => {
          setExcelData(res.data.data || []);
          if (res.data.data && res.data.data.length) {
            const cols = Object.keys(res.data.data[0]);
            setColumns(cols);
            setXCol(cols[0]);
            setYCol(cols.length > 1 ? cols[1] : "");
          }
        })
        .catch(() => setExcelData([]));
    } else {
      setExcelData([]);
      setColumns([]);
      setXCol("");
      setYCol("");
    }
  }, [selectedFileId]);

  const getChartData = () => {
    if (!excelData.length || !xCol || !yCol) return {};
    return {
      labels: excelData.map(row => String(row[xCol])),
      datasets: [{
        label: yCol,
        data: excelData.map(row => Number(row[yCol])),
        backgroundColor: [
          "#1d6f42", "#0077cc", "#f4a261", "#e63946", "#2a9d8f",
          "#ffbe0b", "#3a86ff", "#8338ec", "#fb5607", "#ff006e"
        ],
        borderColor: "#222",
        borderWidth: 1,
      }]
    };
  };

  const renderChart = () => {
    if (!xCol || !yCol) return <div>Please select columns for X and Y axis.</div>;
    const chartProps = {
      data: getChartData(),
      options: {
        responsive: true,
        plugins: {
          legend: { display: chartType !== "bar" },
        }
      },
      ref: chartRef
    };
    switch (chartType) {
      case "bar": return <Bar {...chartProps} />;
      case "line": return <Line {...chartProps} />;
      case "pie": return <Pie {...chartProps} />;
      case "doughnut": return <Doughnut {...chartProps} />;
      case "radar": return <Radar {...chartProps} />;
      default: return null;
    }
  };

  return (
    <div className="chart-info">
      <BackButton />
      <h2>Visualize File Data (Charts)</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          <b>Select File:</b>
          <select
            value={selectedFileId}
            onChange={e => setSelectedFileId(e.target.value)}
            style={{ marginLeft: 10, padding: 5 }}
          >
            <option value="">-- Choose Excel File --</option>
            {files.map(f => (
              <option value={f._id} key={f._id}>{f.filename}</option>
            ))}
          </select>
        </label>
      </div>

      {columns.length >= 2 && (
        <>
          <div className="label-data" style={{ marginBottom: 15 }}>
            <label>
              X-Axis:
              <select value={xCol} onChange={e => setXCol(e.target.value)} style={{ marginLeft: 5 }}>
                {columns.map(col => (
                  <option value={col} key={col}>{col}</option>
                ))}
              </select>
            </label>
            <label style={{ marginLeft: 25 }}>
              Y-Axis:
              <select value={yCol} onChange={e => setYCol(e.target.value)} style={{ marginLeft: 5 }}>
                {columns.map(col => (
                  <option value={col} key={col}>{col}</option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>
              <b>Chart Type:</b>
              <select value={chartType} onChange={e => setChartType(e.target.value)} style={{ marginLeft: 10 }}>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
                <option value="radar">Radar</option>
              </select>
            </label>
          </div>
       <div className="chart-img" style={{ minHeight: 400, textAlign: "center" }}>
  {renderChart()}

  <button
    onClick={() => {
      if (chartRef.current) {
        const link = document.createElement("a");
        link.download = `chart-${chartType}.png`;
        link.href = chartRef.current.toBase64Image();
        link.click();
      }
    }}
    style={{
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#0077cc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom:"10px",
    }}
  >
    📥 Download Chart
  </button>
</div>

        </>
      )}
      {selectedFileId && columns.length < 2 && (
        <div style={{ color: "red" }}>Excel must have at least 2 columns with numeric data for meaningful charts.</div>
      )}
    </div>
  );
}

export default Charts;
