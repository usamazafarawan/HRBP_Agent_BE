
import ParentAccount from '../parents_account/parents_account.model';
import StudentRecord from '../students/students.model';
import schoolExpenses from '../school_expenses/expenses.model';





export const getDashboardData = async (req, res) => {
  try {
      const { startDate, endDate } = req.query;

    // Convert to real date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Include full day of endDate
    end.setHours(23, 59, 59, 999);


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
               parentId: "$_id",
               sortOrder: 1, // keep for debugging (optional)
             },
           },
     
           // Sort by the computed sort order
           { $sort: { sortOrder: 1, name: 1 } },
         ]);
     
        const classes = classOrder.map((cls, idx) => {
      const filteredStudents = students.filter(s => s.class === cls);

      return {
        id: idx + 1,                 // unique id
        name: cls,                   // class name
        students: filteredStudents   // students of this class
      };

    });

    return res.status(200).json({
      message: "Students fetched successfully",
      data: {
        studentsPerClass: classes,
        totalStudents: students.length,
      }
    });


  
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

