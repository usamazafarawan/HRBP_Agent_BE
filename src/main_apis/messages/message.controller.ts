import path from "path";
import XLSX from "xlsx";
import OpenAI from "openai";
// const client = new OpenAI({ apiKey: '' });

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
  // Lowercase query for easier matching
    const query = message.toLowerCase();

    let reply = "Sorry, I could not find information for your query.";

    // Check for leave queries
    if (query.includes("leave")) {
      reply = "Leave Summary:\n";
      data.forEach((emp) => {
        reply += `${emp["Employee Name"]}: Leave Balance = ${emp["Leave Balance"]}, Paid Leaves Taken = ${emp["Paid Leaves Taken"]}, Sick Leaves Taken = ${emp["Sick Leaves Taken"]}, Casual Leaves Taken = ${emp["Casual Leaves Taken"]}\n`;
      });
    }

    // Check for loan queries
    else if (query.includes("loan")) {
      reply = "Loan Summary:\n";
      data.forEach((emp) => {
        reply += `${emp["Employee Name"]}: Loan Eligibility = ${emp["Employee Loan Eligibility"]}, Loan Taken = ${emp["Loan Taken (USD)"] || 0}, Loan Remaining = ${emp["Loan Remaining"] || 0}\n`;
      });
    }

    // Check for promotion queries
    else if (query.includes("promotion")) {
      reply = "Promotion Eligibility:\n";
      data.forEach((emp) => {
        reply += `${emp["Employee Name"]}: Promotion Eligible = ${emp["Promotion Eligibility"]}\n`;
      });
    }

    // Check for KPI/goal achievement
    else if (query.includes("kpi") || query.includes("goal")) {
      reply = "Goal Achievement & KPI:\n";
      data.forEach((emp) => {
        reply += `${emp["Employee Name"]}: Goal Achievement = ${emp["Goal Achievement %"]}, KPI Rating = ${emp["KPI Rating (1-5)"]}, Behavioral Score = ${emp["Behavioral Score"]}\n`;
      });
    }

    // If none of the above, maybe general summary
    else if (query.includes("summary") || query.includes("employee count")) {
      const totalEmployees = data.length;
      reply = `Total employees: ${totalEmployees}\nDepartments:\n`;
      const deptCount: Record<string, number> = {};
      data.forEach((emp:any) => {
        const dept = emp.Department || "Unknown";
        deptCount[dept] = (deptCount[dept] || 0) + 1;
      });
      for (const dept in deptCount) {
        reply += `${dept}: ${deptCount[dept]}\n`;
      }
    }

    const prompt = `
Here is the data:
${JSON.stringify(data, null, 2)}
Answer this query: "${message}"
`;

  console.log('prompt: ', prompt);

// const response = await client.chat.completions.create({
//   model: "gpt-4",
//   messages: [{ role: "user", content: prompt }],
// });

  // console.log('response: ', response);


    return res.status(201).json({
      // reply: response.choices[0].message.content ?? reply,
      reply:  reply,


    });
  } catch (error) {
    console.error("❌ Error creating student record:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};