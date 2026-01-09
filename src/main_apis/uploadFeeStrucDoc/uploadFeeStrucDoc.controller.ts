
import feeStructureDoc from './uploadFeeStrucDoc.model';
import jwt from 'jsonwebtoken';
// import * as jwtTokenKey from '../../app'
import bcrypt from 'bcryptjs'





export const uploadFile = function (req, res) {
  console.log("SIGNUP file upload ", req.body)
  return feeStructureDoc.deleteMany({}).then(response => {
    console.log('response: ', response);
    if (response && response.acknowledged) {
      return feeStructureDoc.create(req.body).then(response => {
        const result = {
          name: req.body.name,
          fileEncrypt: req.body.fileEncrypt,
        }
        return res.status(200).json(result).end();
      },
        (error) => {
          console.log("Error in Uploading File ", error)
        });
    }
  },
    (error) => {
      console.log("Error in deleteing Docuent", error)
    })
}



export const getFile = function (req, res) {
  return feeStructureDoc.find().then(response => {
    if (response.length) {
      const result = {
        name: response[0].name,
        fileEncrypt: response[0].fileEncrypt,
      }
      return res.status(200).json(result).end();
    }
  },
    (error) => {
      console.log("Error in Getting File ", error)
    });
}

export const deleteFeeStructureFile = function (req, res) {
  return feeStructureDoc.deleteMany({}).then(response => {
    if (response && response.acknowledged) 
     {
      return res.status(200).json({}).end();
    }

    // if (response.length) {
    //   const result = {
    //     name: response[0].name,
    //     fileEncrypt: response[0].fileEncrypt,
    //   }
    //   return res.status(200).json(result).end();
    // }
  },
    (error) => {
      console.log("Error in Getting File ", error)
    });
}



