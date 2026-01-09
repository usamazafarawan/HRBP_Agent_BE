
import users from './signUp.model';
import jwt from 'jsonwebtoken';
import * as jwtTokenKey from '../../app'
import bcrypt from 'bcryptjs'





export const create =  function (req, res) { 
  console.log("SIGNUP",req.body)

  return  users.findOne(  {$and :[{userName:req.body.userName} , 
   {isSchoolAuthority:req.body.isSchoolAuthority}]
   }).then((x)=>{
    console.log('x: ', x);
if(!x){
     return users.create(req.body).then(response =>{
     const result={
       username:req.body.userName,
       password:req.body.password,
       isSchoolAuthority:req.body.isSchoolAuthority
     }
      return res.status(200).json(result).end();
    },
    (error)=>{
      console.log("Error 2",error)
    }
    )
}
else{
  console.log("Found ", )
  return  res.status(400).json({message:"Person Already Registered"}).end();    
}
},
  (error)=>{
    console.log("Error 1",error)
  })

}



export const loginValidation=   function(req,res){
  console.log("Login",req.body)
  return users.findOne(  {$and :[{email:req.body.email} , 
    {password:req.body.password}]
   }).then((user:any)=>{
    console.log('user: ', user);
if(!user){
  res.status(400).json({statusCode:400, err:"User Name OR Password is Invalid"}).end();
}
else{

  // const encryptedPassword =  bcrypt.hash(req.body.password, 10)

  const token = jwt.sign(
    { user_name: req.body.userName, password: req.body.password },
    process.env.TOKEN_KEY || jwtTokenKey.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  const reponse={
    userName:user.name,
    userEmail:user.email,
    userId:user._id,
    authToken:token,
  }
  console.log("token", token)
  res.status(200).json({data:reponse}).end();

}
},
  (error)=>{
    console.log("Error",error)
  })
}


export const getRecord=   function(req,res){
  console.log("Login",req.body)
  res.status(200).json({data:'sdsdsd'}).end();

}


// export const getRecord = function (req,res){
//   console.log("params",req.query)
//   console.log("body",req.body)
// // return res.status(200).json(req.params)
//   // return form1.find().then(response=>{
//   //   return res.status(200).json(response);
//   // })

//   if (Object.keys(req.query).length === 0){
//     console.log("Condition 1 ",req.query)

//     return form1.find().then(response=>{
//       return res.status(200).json(response);
//     });
 
//   }
//   else{
//     console.log("Condition 2 ",req.query)

//     return  form1.find({zip:req.query.Zipnumber})
//     .populate('libraryForm1')
//     .exec((err,user)=>{
//       if(err){
//         console.log("checking Error **",err)
//       }
//       else{
//         return res.status(200).json(user);
//       }
//     });

//   }



// }



// export const deleteRecord = function (req,res){
//   return form1.findOneAndDelete({_id:req.params.id}).then(response=>{
//     return res.status(200).json(response);
//   })

// }

// export const updateRecord = function (req,res){
//   return form1.findOneAndUpdate({_id:req.params.id},req.body,{ returnDocument: 'after' }).then(response=>{
//     return res.status(200).json(response);
//   })

// }

