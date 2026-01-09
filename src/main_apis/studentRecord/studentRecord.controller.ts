
import studentAdmissionRecord from './studentRecord.model';
const { createTableForStudentAccount } = require('../studentAccount/studentAccount.controller');






export const createStudentAdmissionRecord = function (req, res) {
  console.log(" studnets Admission Record ** ", req.body)
  return studentAdmissionRecord.findOne({
    $and: [{ class: req.body.class },
    { rollNumber: req.body.rollNumber }]
  }).then((x) => {
    console.log('x: ', x);
    if (!x) {
      return studentAdmissionRecord.create(req.body).then(async (response:any) => {
        console.log('response: ', response);

        
const studentId=response._id.toString() ;
console.log('studentId: ', studentId);




try{

  // mock res and req for creating accountTable Sutudents at current time 
  const req = {
    params: {
      studentId: studentId // Convert ObjectId to string
    }
  }
  const responseMock = {
    statusCode: 200,
    data: null,
    status: function(code) {
      this.statusCode = code;
      return this; // For method chaining
    },
    json: function(data) {
      this.data = data;
      console.log(data);
      return this; // For method chaining
    },
    end: function() {
      console.log('Response ended with status code:', this.statusCode);
      console.log('Response data:', this.data);
    }
  };
  const data  = await createTableForStudentAccount(req, responseMock);
  console.log('data: ', data);
  return res.status(200).json(response).end();

}
catch (error) {
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal Server Error' }).end();
}




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


export const getListOfStudents = function (req, res) {

  return studentAdmissionRecord.find().then(response => {
    if (response.length) {
      console.log('response: all list  ', response);
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

/**
 * for the siblings if have query 
 * @param req 
 * @param res 
 * @returns 
 */
export const getStudentsForSiblings  = function (req, res) {

  return studentAdmissionRecord.find().select('studentName studentFatherName class rollNumber _id , ad').
  then(response => {
    if (response.length) {
      console.log('response: all list  ', response);
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

export const updateStudentRecord = function (req,res){
  console.log('req:  UPadte', req);


  const upadtedData={

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
    finalFeePerMonth:req.body.finalFeePerMonth,
    rollNumber: req.body.rollNumber,
    addmissionDate: req.body.addmissionDate,
    admissionFee:req.body.admissionFee,
    selectedSiblings:req.body.selectedSiblings
  }

  // data("11111111");

  // return res.status(200).json({}).end();

  return studentAdmissionRecord.findOneAndUpdate(
    {
    _id:req.body.studentId,
  },

  { $set: upadtedData }, // Update operation
  { returnOriginal: false }, // Option to return the modified document


  ).then((x) => {
    console.log('x: ', x);
    if (!x) {
      return res.status(400).json({ message: "Student Record Not Found"}).end();
    }
    else {
      console.log("Found x",x)
      console.log("Found req.body",req.body)

      return res.status(200).json(req.body).end();
    }
  },
    (error) => {
      console.log("Error 1", error)
    })


}

// function data(asas){

// console.log("asasas", asas)

// }

