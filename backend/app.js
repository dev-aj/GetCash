var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');
const config = require('./helpers/config');
const cors = require('cors');
var nodemailer = require('nodemailer');
const mailer = require('./helpers/mailconfig')

var app = express();
app.use(cors());
const loanPendingSub = "Loan Request received <GetCash>";
const loanApprovedSub = "Loan Approved <GetCash>";
const loanPendingText= "Thankyou for choosing GetCash!!\nYou will get an Email once your loan will be approved";
const loanApprovedText = "Thankyou for choosing GetCash!!\n Your Loan has been approved"

/** 
 * var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'getcashinfinity@gmail.com',
    pass: 'getcash123'
  }
});

var mailOptions = {
  from: 'getcashinfinity@gmail.com',
  to: 'ajamar5943@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
 */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailer.mailId,
      pass: mailer.PASSWORD
    }
  });
  
  var mailOptions = {
    from: mailer.mailId,
    to: 'ajamar5943@gmail.com',
    subject: loanPendingSub,
    text: loanPendingText,
    // attachments: [{
    //     filename: 'file.pdf',
    //     path: './loanAggrement.pdf',
    //     contentType: 'application/pdf'
    // }]
  };
  


app.set('views',path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

//MOngoose Connection to database 

mongoose.connect(config.url,{useNewUrlParser:true});

mongoose.connection.once('open', function(){
    console.log("Database Connection opened");
})

mongoose.connection.on('error', function(error){
    console.log("database connection %s",error);
})

mongoose.connection.on('reconnected', function(){
    console.log("Database reconnected")
})

mongoose.connection.on('disconnected', function(){
    console.log("Database Disconnected")
    mongoose.connect('config.url',{useNewUrlParser:true});
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 

// MOnngoDB  loan Schema

const UserSchema = new mongoose.Schema({
    
    loanAmount:{
        type: String,
        required:true,
    },
    loanPurpose:{
        type:String,
        required:true,
    },
    loanDuration:{
        type: String,
        required:true,
    },
    loanInterest:{
        type: String,
        required:true,
    }
    
})
// MongoDB Schema Ends
var UserModel = mongoose.model('UserModel',UserSchema);     //collection name is UserModel
//Loan model
//Schema for registration information

const RegSchema = new mongoose.Schema({
    fname:{
      type:String,
      required:true,
    },
    lname:{
      type:String,
      required:true,
    },
    dob:{
      type:Date,
      required:true,
    },
    father:{
      type:String,
      required:true,
    },
    state:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true,
    },
    pin:{
      type:String,
      required:true,
    },
    aadhar:{
      type:String,
      required:true,
    },
    contact:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
    psw:{
      type:String,
      required:true,
    },
    pan:{
        type:String,
        required:true,
    },
    bank:{
      type:String,
      required:true,
    },
    account:{
      type:String,
      required:true,
    },
    ifsc:{
      type:String,
      required:true,
    },
    paytm:{
      type:String,
      required:true,
    },
    certificates:{
        type:Boolean,
        default: false
    }
}) 

//Registration schema ends
//Registration Model

var UsersReg = mongoose.model("UsersReg" , RegSchema);
//Registrtion Model Ends


app.get('/',(req,res)=>{
    res.end("Will send the list");
    //res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/lender', (req,res)=>{
    console.log("lender get request")
    UserModel.find({}, function(err, data){
        if(err){
            console.log(err);
            res.json(err);
        }
        else{
            res.json(data);
        }
    });
})

app.post('/borrower',(req,res)=>{  
    console.log(req.body.loanAmount);
    const {loanAmount, loanPurpose, loanDuration, loanInterest} = req.body;
   	const newUser = new UserModel({
        loanAmount,
        loanPurpose,
        loanDuration,
        loanInterest
    })
    newUser.save({loanAmount,loanPurpose, loanDuration, loanInterest},(err,result)=>{
     if(err){
       res.end('Bhai error hai',err)
     }
     else {  
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });             
      res.send(result)
     }
   })  
//    transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   }); 
  
//      res.end("Will save you list item")
})

//UserData

app.post('/user/data',(req,res)=>{
    console.log(req.body)
     const {fname,lname,dob,father,state,city,pin,aadhar,contact,email,psw,pan,bank,account,ifsc,paytm,certificates} = req.body;
     var newUser = new UsersReg({
        fname, lname, dob, father, state, city, pin, aadhar, contact, email, psw, pan, bank, account, ifsc, paytm,certificates
    })
     newUser.save((err,result)=>{
       if(err)
       {
         res.end('Bhai error hai',err)
       }
       else 
       {      
         res.end("data saved")
        //res.sendfile("./sign1.html");
       }
     })   
     //res.end("Will save you list item")
  })


app.listen(config.PORT,()=>{
    console.log("Server Started");
})