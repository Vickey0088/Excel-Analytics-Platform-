import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!file) {
      setMessage("Please select an Excel file.");
      return;
    }
    const formData = new FormData();
    formData.append("excel", file);

    try {
      await axios.post("http://localhost:1000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("File uploaded and saved to database successfully!");
      setFile(null);
    } catch (err) {
      setMessage("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="upload-con">
     <BackButton />
      <h2>Please upload an Excel file</h2>
      <form onSubmit={handleUpload} style={{ margin: "2rem auto", display: "inline-block" }}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <button
          type="submit"
          style={{
            background: "#0077cc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.6rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Upload File
        </button>
      </form>
      {message && <div style={{ marginTop: "1rem", color: message.startsWith("File uploaded") ? "green" : "red" }}>{message}</div>}
    </div>
  );
}

export default Upload;