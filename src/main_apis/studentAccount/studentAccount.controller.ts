
import studentAdmissionRecord from '../studentRecord/studentRecord.model';
import studentsAccountRecord from '../studentAccount/studentAccount.model';






export const createStudentAdmissionRecord = function (req, res) {
  console.log(" studnets Admission Record ** ", req.body)
  return studentAdmissionRecord.findOne({
    $and: [{ class: req.body.class },
    { rollNumber: req.body.rollNumber }]
  }).then((x) => {
    console.log('x: ', x);
    if (!x) {
      return studentAdmissionRecord.create(req.body).then(response => {
        console.log('response: ', response);
        return res.status(200).json(response).end();
      },
        (error) => {
          console.log("Error 2", error)
        }
      )
    }
    else {
      console.log("Found ",)
      return res.status(400).json({ message: "Student Already Registered" }).end();
    }
  },
    (error) => {
      console.log("Error 1", error)
    })

}

////////////////////////////////////////////////////////////
export const getListOfStudentsForAccounts = function (req, res) {
  console.log('req: && account Create Response ', req);

  return studentAdmissionRecord.find()
    .select('studentName studentFatherName class rollNumber _id , ad')
    .then(response => {
      if (response.length) {
        console.log('response: all list  for Accounts  ', response);
        response.sort((a, b) => {
          return a.class - b.class;
        });

        return res.status(200).json(response).end();
      }
    },
      (error) => {
        console.log("Error in Getting List of Studnents  ", error)
      });
}



export const createTableForStudentAccount = function (req, res) {
  console.log('req: **** ', req.params);
  studentsAccountRecord.findOne({ studentId: req.params.studentId }).then((studentAccountRecord) => {
    if (studentAccountRecord) {
      return res.status(200).json(studentAccountRecord).end();
    }
    else {
      studentAdmissionRecord.findOne({ _id: req.params.studentId })
        .select('studentName  addmissionDate class rollNumber  finalFeePerMonth schoolFee_HavingAcademy havingAcademy academyFee_HavingAcademy admissionFee ')
        .then(response => {
          if (response) {
            console.log('response: all list  for Accounts  ', response);
            const accountDetaial = {
              studentName: response.studentName,
              studentId: req.params.studentId,
              studentRollNo: response.rollNumber,
              class: response.class,
              totalDues: response.finalFeePerMonth,
              PendingDues: response.finalFeePerMonth + response.admissionFee,
              Submitted: 0,
              finalFeePerMonth: response.finalFeePerMonth,
              schoolFee_HavingAcademy: response.schoolFee_HavingAcademy,
              havingAcademy: response.havingAcademy,
              academyFee_HavingAcademy: response.academyFee_HavingAcademy,
              admissionFee:response.admissionFee,
              details: [{ description: `Fee ${new Date(response.addmissionDate).toLocaleString('default', { month: 'long' })} , ${new Date(response.addmissionDate).getFullYear()} + Admission Fee`, amount: response.finalFeePerMonth+response.admissionFee, type: 'Add', currentDate:response.addmissionDate }]
            }
            studentsAccountRecord.create(accountDetaial).then((x) => {
              if (x) {
                  return res.status(200).json(accountDetaial).end();
              }
            });
          }
        },
          (error) => {
            console.log("Error in Creating Student Record  ", error)
          });
    }
  },
    (error) => {
      console.log("Error in Finding Studnent Account Record  ", error)
    }
  );
}






/////////////////////////////////////////////////////////////////////////

export const deleteStudentRecord = function (req, res) {
  return studentAdmissionRecord.findOneAndDelete({ _id: req.params.id }).then(response => {
    if (response) {
      return res.status(200).json(response).end();
    }
  },
    (error) => {
      console.log("Error in Getting List of Studnents  ", error)
    });
}

export const updateStudentRecord = function (req, res) {
  console.log('req:  UPadte', req);


  const upadtedData = {

    studentName: req.body.studentName,
    studentFatherName: req.body.studentFatherName,
    fatherOccuption: req.body.fatherOccuption,
    address: req.body.address,
    studentPicture: req.body.studentPicture,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: req.body.placeOfBirth,
    Religion: req.body.Religion,
    cast: req.body.cast,
    motherTongue: req.body.motherTongue,
    class: req.body.class,
    havingAcademy: req.body.havingAcademy,
    schoolFee_HavingAcademy: req.body.schoolFee_HavingAcademy,
    academyFee_HavingAcademy: req.body.academyFee_HavingAcademy,
    totalFee_HavingAcademy: req.body.totalFee_HavingAcademy,
    feePerMonth: req.body.feePerMonth,
    finalFeePerMonth: req.body.finalFeePerMonth,
    rollNumber: req.body.rollNumber,
    addmissionDate: req.body.addmissionDate,
    admissionFee:req.body.admissionFee,

  }

  // data("11111111");

  // return res.status(200).json({}).end();

  return studentAdmissionRecord.findOneAndUpdate(
    {
      _id: req.body.studentId,
    },

    { $set: upadtedData }, // Update operation
    { returnOriginal: false }, // Option to return the modified document


  ).then((x) => {
    console.log('x: ', x);
    if (!x) {
      return res.status(400).json({ message: "Student Record Not Found " }).end();
    }
    else {
      console.log("Found x", x)
      console.log("Found req.body", req.body)

      return res.status(200).json(req.body).end();
    }
  },
    (error) => {
      console.log("Error 1", error)
    })


}

////


export const addAmountToRecord = function (req, res) {
  console.log('req:  UPadte', req);

const studentId:string = req.params.studentId;

  return studentsAccountRecord
    .findOneAndUpdate(
      {
        studentId: studentId,
      },
      {
        $push: { details: req.body }, // push data to existing array
        $inc: {
          // increment to the number field
          /* Spec fy the fields you want to update */
          PendingDues: req.body.amount,
        },
      }, // Update operation
      { returnOriginal: false } // Option to return the modified document
    )
    .then(
      (x) => {
        console.log("x: ", x);
        if (!x) {
          return res
            .status(400)
            .json({ message: "Student Record Not Found " })
            .end();
        } else {
          console.log("Found x", x);
          console.log("Found req.body", req.body);

          return res.status(200).json(x).end();
        }
      },
      (error) => {
        console.log("Error 1", error);
      }
    );


}
export const receivedAmount = function (req, res) {
  const studentId: string = req.params.studentId;

  return studentsAccountRecord
    .findOneAndUpdate(
      {
        studentId: studentId,
      },
      {
        $push: { details: req.body }, // push data to existing array
        $inc: {
          // decrement to the number field
          /* Spec fy the fields you want to update */
          PendingDues: -req.body.amount,
          Submitted: req.body.amount,
        },
      }, // Update operation
      { returnOriginal: false } // Option to return the modified document
    )
    .then(
      (x) => {
        console.log("x: ", x);
        if (!x) {
          return res
            .status(400)
            .json({ message: "Student Record Not Found " })
            .end();
        } else {
          console.log("Found x", x);
          console.log("Found req.body", req.body);

          return res.status(200).json(x).end();
        }
      },
      (error) => {
        console.log("Error 1", error);
      }
    );
};


export  const  upadteStudentsCurrentMonthFee = async function (req, res) {
const currentMonth:string = new Date().toLocaleString('default', { month: 'long' });
  try {
    const records = await studentsAccountRecord.aggregate([
      {
        $match: {
          "details.description": {
            $not: {
              $regex: currentMonth,
            },
          },
        },
      },
    ]);
  
    if (records.length) {
      for (const element of records) {
        const final = await studentsAccountRecord.findOneAndUpdate(
          {
            _id: element._id,
          },
          {
            $push: {
              details: {
                description: `Fee ${new Date().toLocaleString("default", {
                  month: "long",
                })} , ${new Date().getFullYear()} `,
                amount: element.finalFeePerMonth,
                type: "Add",
                currentDate: new Date(Date.now()),
              },
            },
            $set: {
              PendingDues: element.PendingDues + element.finalFeePerMonth,
            },
          },
          { multi: true }
        );
        console.log("final ", final);
      }
    }
    else{
      return res.status(500).json({ message:    `Fee of Month ${currentMonth} is  already added`    }).end();
    }
  
    return res.status(200).json({ data: true }).end();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" }).end();
  }


};
