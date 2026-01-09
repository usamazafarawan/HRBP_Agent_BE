
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./route";
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const bodyParser = require('body-parser');
const cors = require("cors");

export const app = express();
const server = http.createServer(app);

 app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb',     extended:true  },));
app.use(bodyParser.json({limit: '50mb'}));


app.use(cors(
{
origin:"*"
}
));


// SET STORAGE
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
     cb(null, file.name + '-' + Date.now())
   }
 })

var upload = multer({ storage: storage });
// Multer configuration


app.post("/uploadFeeStrucDoc",upload.single('uploadFeeStrucDoc'),(req,res)=>{
   console.log('req: ', req.body);
 
})

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS");
    next();
});
const port = 3000;
export const TOKEN_KEY="11223344";

   /**
    * Vercel apis for live
    */
   app.use('/api/auth', require('./main_apis/signup'));
   app.use('/api/students', require('./main_apis/students'));
   app.use('/api/parent-account', require('./main_apis/parents_account'));
   app.use('/api/expense', require('./main_apis/school_expenses'));
   app.use('/api/dashboard', require('./main_apis/dashboard'));



routes(app);


// mongoose.connect(url)
// .then(() => {
//    console.log('Connected to database!',url);
// })
// .catch(error => {
//    console.log('Connection failed!:', error);
// });

server.listen(port, () => {
console.log(`Express server listening ${port}`);
});

export default app;
