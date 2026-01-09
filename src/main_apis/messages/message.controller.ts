
export const createStudentAdmissionRecord = async (req, res) => {
  try {
    console.log("📥 Received Student Admission Record:", req.body);

    const { parent, students } = req.body;

 

    return res.status(201).json({
      message: "Student record created successfully",
    });
  } catch (error) {
    console.error("❌ Error creating student record:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};