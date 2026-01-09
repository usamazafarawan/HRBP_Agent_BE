
import StudentRecord from './students.model';
import ParentAccount from '../parents_account/parents_account.model';






export const createStudentAdmissionRecord = async (req, res) => {
  try {
    console.log("📥 Received Student Admission Record:", req.body);

    const { parent, students } = req.body;

    // 🔹 Basic validation
    if (!parent || !students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Invalid payload — parent or students missing" });
    }

    // Remove _id if empty string
    if (parent && parent._id === "") {
      delete parent._id;
    }

    // Also remove studentId if empty
    students.forEach(s => {
      if (s.studentId === "") delete s.studentId;
    });

    // 🔹 Generate random roll numbers for each student
    const studentsWithRollNos = students.map((s) => {
      const prefix = s.class?.substring(0, 3).toUpperCase() || "STD";
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const rollNo = `${prefix}-${randomNum}`;

      return {
        ...s,
        rollNo,
        createdAt: new Date(),
      };
    });

    // 🔹 Create new record
    const record = new StudentRecord({
      parent,
      students: studentsWithRollNos,
    });

          console.log('record: ', record);


    const savedRecord = await record.save();

    console.log("✅ Saved Student Record:", savedRecord);

        // ➤ CALCULATE total admission + monthly fees for ALL students
    const admissionTotal = students.reduce((sum, s) => sum + s.admissionFee, 0);
    const monthlyTotal = students.reduce((sum, s) => sum + s.monthlyFee, 0);

    const academyFee = students.reduce((sum, s) => sum + (s.hasAcademy ? s.academyFee : 0), 0);
    const totalInitialDebit = admissionTotal + monthlyTotal + academyFee;

        // ➤ CREATE Parent Account
    const account = new ParentAccount({
      parentId: savedRecord._id,
      totalDebit: totalInitialDebit,
      balance: totalInitialDebit,
      transactions: [
        {
          type: "DEBIT",
          description: "Initial Admission + Monthly Fee",
          amount: totalInitialDebit,
        },
      ],
    });

    await account.save();

    return res.status(201).json({
      message: "Student record created successfully",
      record: savedRecord,
      account:account
    });
  } catch (error) {
    console.error("❌ Error creating student record:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



export const getAllStudentsWithParents = async (req, res) => {
  try {
    const classOrder = [
      "PG",
      "Nursery",
      "Prep",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ];

    const students = await StudentRecord.aggregate([
      { $unwind: "$students" },
      { $match: { "students.isDeleted": { $ne: true } } },

      // Add custom sort index based on your manual order
      {
        $addFields: {
          sortOrder: {
            $indexOfArray: [classOrder, "$students.class"],
          },
        },
      },

      // Project student + parent info
      {
        $project: {
          _id: "$students._id",
          name: "$students.name",
          class: "$students.class",
          gender: "$students.gender",
          rollNo: "$students.rollNo",
          // monthlyFee: "$students.monthlyFee",
          // admissionFee: "$students.admissionFee",
          // totalFee: "$students.totalFee",
          // createdAt: "$students.createdAt",
          hasAcademy: "$students.hasAcademy",
          // academyFee: "$students.academyFee",
          // image: "$students.image",
          hasLeftSchool: "$students.hasLeftSchool",
          parentId: "$_id",
          parentName: "$parent.name",
          parentPhone: "$parent.phone",

          sortOrder: 1, // keep for debugging (optional)
        },
      },

      // Sort by the computed sort order
      { $sort: { sortOrder: 1, name: 1 } },
    ]);

   return res.status(200).json({
      data: {
        totalStudents: students.length,
        students,
      },
      message: "Students fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getClassStudents = async (req, res) => {
  try {
    const classOrder = [
      "PG",
      "Nursery",
      "Prep",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ];

    const students = await StudentRecord.aggregate([
      { $unwind: "$students" },
      { $match: { 
        "students.isDeleted": { $ne: true }, 
        "students.hasLeftSchool": { $ne: true }
      } },

      // Add custom sort index based on your manual order
      {
        $addFields: {
          sortOrder: {
            $indexOfArray: [classOrder, "$students.class"],
          },
        },
      },

      // Project student + parent info
      {
        $project: {
          _id: "$students._id",
          name: "$students.name",
          class: "$students.class",
          gender:"$students.gender",
          rollNo: "$students.rollNo",
          hasAcademy: "$students.hasAcademy",
          hasLeftSchool: "$students.hasLeftSchool",
          parentId: "$_id",
          parentName: "$parent.name",
          parentPhone: "$parent.phone",
          sortOrder: 1, // keep for debugging (optional)
        },
      },

      // Sort by the computed sort order
      { $sort: { sortOrder: 1, name: 1 } },
    ]);

   return res.status(200).json({
      data: {
        totalStudents: students.length,
        students,
      },
      message: "Students fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const getStudentDetailsById = async (req, res) => {
  try {

     const studentId = req.params.studentId;
    console.log('studentId: ', studentId);

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

  
   // Find the record containing that student
    const record:any = await StudentRecord.findOne(
      { "students._id": studentId },
      {
        parent: 1,
        students: 1,
        createdAt: 1,
        updatedAt: 1
      }
    );

    if (!record) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Extract the student
    const student = record.students.find((s:any) => s._id.toString() === studentId);
    record.parent._id = record._id; // add parentId for reference

    res.status(200).json({
      message: "Student details",
      parent: record.parent,
      student: student,
      siblings: record.students.filter((s:any) => s._id.toString() !== studentId)
    });


  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateParentAndStudentRecord = async (req, res) => {
  try {


    const { parent, students } = req.body;

    // 🔹 Basic validation
    if (!parent || !students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Invalid payload — parent or students missing" });
    }

    // new functionality to update parent and students

      const recordId = parent._id; // Record and parent document share ID

    // 1️⃣ Update parent
    await StudentRecord.updateOne(
      { _id: recordId },
      { $set: { parent } }
    );

    const updates = [];
    const newStudents = [];

    for (const s of students) {

      // 2️⃣ Existing student → update inside array
      if (s.studentId) {

        updates.push(
          StudentRecord.updateOne(
            { "students._id": s.studentId },
            {
              $set: {
                "students.$.name": s.name,
                "students.$.class": s.class,
                "students.$.gender": s.gender,
                "students.$.monthlyFee": s.monthlyFee,
                "students.$.admissionFee": s.admissionFee,
                "students.$.academyFee": s.academyFee,
                "students.$.totalFee": s.totalFee,
                "students.$.hasLeftSchool": s.hasLeftSchool,
                "students.$.updatedAt": new Date()
              }
            }
          )
        );

      } else {
        // 3️⃣ NEW sibling → push into array
        const prefix = s.class?.substring(0, 3).toUpperCase() || "STD";
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const rollNo = `${prefix}-${randomNum}`;

        newStudents.push({
          ...s,
          rollNo,
          createdAt: new Date()
        });
      }
    }

    // 4️⃣ Push new siblings (if any)
    if (newStudents.length > 0) {
      updates.push(
        StudentRecord.updateOne(
          { _id: recordId },
          { $push: { students: { $each: newStudents } } }
        )
      );
    }

    await Promise.all(updates);

    return res.json({
      success: true,
      message: "Record updated successfully"
    });





  } catch (error) {
    console.error("❌ Error in deleting student account:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



export const deleteStudentAccount = async (req, res) => {
  try {

     const studentId = req.body.studentId;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const result: any = await StudentRecord.updateOne(
      { "students._id": studentId },
      {
        $set: {
          "students.$.isDeleted": true,
          "students.$.updatedAt": new Date()
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Student soft-deleted successfully",
      data: result
    });

  } catch (error) {
    console.error("❌ Error in deleting student account:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
