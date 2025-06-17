import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import "../styles/Files.css";

function Files() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); // for modal
  const [fileData, setFileData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:1000/api/upload")
      .then(res => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleViewFile = async (fileId) => {
    setShowModal(true);
    setDataLoading(true);
    setFileData([]);
    try {
      const res = await axios.get(`http://localhost:1000/api/upload/${fileId}`);
      setSelectedFile(res.data);
      setFileData(res.data.data); // .data array contains the Excel rows
    } catch (err) {
      setFileData([]);
    }
    setDataLoading(false);
  };

  // DELETE BUTTON FUNCTIONALITY
  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`http://localhost:1000/api/upload/${fileId}`);
      setFiles(files.filter(file => file._id !== fileId));
    } catch (err) {
      alert("Failed to delete file.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setFileData([]);
  };

  // Helper to render Excel data as table
  const renderTable = () => {
    if (!fileData.length) return <div>No data found in file.</div>;
    const columns = Object.keys(fileData[0]);
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={{ border: "1px solid #ddd", padding: "8px", background: "#f4f4f4" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col} style={{ border: "1px solid #ddd", padding: "8px" }}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="files-info">
        <BackButton />
      <h2>Uploaded Excel Files</h2>
      {loading ? (
        <div>Loading...</div>
      ) : files.length === 0 ? (
        <div>No files uploaded yet.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {files.map(file => (
            <li key={file._id} style={{
              border: "1px solid #eee",
              borderRadius: "6px",
              margin: "1rem 0",
              padding: "1rem"
            }}>
              <b className="head">{file.filename}</b>
              <br />
             <b> Uploaded: {new Date(file.uploadedAt).toLocaleString()}</b>
              <br />
              <button
                style={{
                  background: "#0077cc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.4rem 1.2rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.5rem"
                }}
                onClick={() => handleViewFile(file._id)}
              >
                View File
              </button>
              &nbsp;&nbsp;
               <button
                style={{
                  background: "grey",
                  color: "red",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.4rem 1.2rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.5rem"
                }}
                onClick={() => handleDeleteFile(file._id)}
              >
                Delete File
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "2rem",
            minWidth: "60vw",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "relative"
          }}>
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                cursor: "pointer"
              }}
              onClick={closeModal}
              aria-label="Close"
            >×</button>
            <h3 style={{ marginTop: 0 }}>
              {selectedFile ? selectedFile.filename : "File Data"}
            </h3>
            {dataLoading ? (
              <div>Loading data...</div>
            ) : (
              <>
                {renderTable()}
                <button
                  onClick={closeModal}
                  style={{
                    marginTop: "1.5rem",
                    background: "#0077cc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1.5rem",
                    fontSize: "1rem",
                    cursor: "pointer"
                  }}
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Files;