import path from "path";
import XLSX from "xlsx";

export const receiveMessage = async (req, res) => {
  try {

    const { message } = req.body;

    console.log("message =>", message);

    const excelPath = path.join(__dirname, "../../../demo_file.xlsx");


    // Check if file exists
    const fs = require("fs");
    if (!fs.existsSync(excelPath)) {
      return res.status(404).json({ message: "Excel file not found" });
    }

    // Read Excel
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0]; // first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Example HRBP Analysis
    const totalEmployees = data.length;
    let summary = `Total employees: ${totalEmployees}\n`;

    const departmentCount: Record<string, number> = {};
    data.forEach((row: any) => {
      const dept = row.Department || "Unknown";
      departmentCount[dept] = (departmentCount[dept] || 0) + 1;
    });

    summary += "Employees per department:\n";
    for (const dept in departmentCount) {
      summary += `${dept}: ${departmentCount[dept]}\n`;
    }

    return res.status(201).json({
      reply: summary,
      data
    });
  } catch (error) {
    console.error("❌ Error creating student record:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};