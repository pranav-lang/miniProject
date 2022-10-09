const bcrypt = require('bcrypt')
const express = require('express')
const db = require('./db')
const jwt = require("jsonwebtoken")
const User  = require("./models/user")
const bodyParser = require("body-parser")
const auth = require("./auth")
const app  = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
db()
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/",(req,res) => {
    res.send("hello")
})


app.post("/register",(req,res) => {
            bcrypt
              .hash(req.body.password,10)
              .then((hashedPassword) => {
                  const user = new User({
                email : req.body.email,
                password : hashedPassword,
                })
              user.save().then((result)=>{
                res.status(201).send({
                message : "User Creates Successfully",
                result,
            })
              })
            .catch((err) => {
            res.status(500).send({
                message: "Error creating user",
                err,
            })
        })
       })
       .catch((e)=>{
        res.status(500).send({
            message : "Password was not hashed successfully",
            e,
        })
       })
})
app.post("/login",(req,res) => {
    User.findOne({email : req.body.email})
    .then((user) => {
       bcrypt.compare(req.body.password,user.password)
        .then((passwordCheck) => {
            if(!passwordCheck) {
                return res.status(400).send({
                    message : "Passwords does not match",
                    err,
                })
            }
            const token = jwt.sign(
                {
                    userId  : user._id,
                    userEmail : user.email,
                },
                "RANDOM-TOKEN" ,
                  { expiresIn : "24h" }
            )
            res.status(200).send({
                message : "Login Successful",
                email : user.email,
                token
            })
        })
        .catch((err) => {
            res.status(400).send({
                message : "Passwords does not match",
                err,
            })
        })
    })
    .catch((e) => {
        res.status(404).send({
            message : "Email not Found!",
            e,
        })
    })
})

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(8000)

