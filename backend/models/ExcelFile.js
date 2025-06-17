import mongoose from "mongoose";

const excelFileSchema = new mongoose.Schema({
  filename: String,
  data: Object, // You can store JSON representation of Excel
  uploadedAt: { type: Date, default: Date.now }
});

const ExcelFile = mongoose.model("ExcelFile", excelFileSchema);

export default ExcelFile;