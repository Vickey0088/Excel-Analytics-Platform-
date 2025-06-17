import express from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import ExcelFile from "../models/ExcelFile.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("excel"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Parse Excel file buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    // Get first sheet name
    const sheetName = workbook.SheetNames[0];
    // Convert sheet to JSON
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save in database
    const excelFile = new ExcelFile({
      filename: req.file.originalname,
      data: sheetData
    });
    await excelFile.save();

    res.json({ message: "File uploaded and saved to database" });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// GET all uploaded Excel files (just metadata, not all data for brevity)
router.get("/", async (req, res) => {
  try {
    const files = await ExcelFile.find({}, "filename uploadedAt"); // show only filename & date
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

// Optionally: GET a single file (by id) with its data
router.get("/:id", async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch file" });
  }
});

// DELETE a file by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedFile = await ExcelFile.findByIdAndDelete(req.params.id);
    if (!deletedFile) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete file" });
  }
});




export default router;