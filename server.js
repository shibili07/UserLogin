const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const session = require("express-session")
const username = "shibili"
const password = "1234"


app.set("view engine","hbs")


app.use(session({
    secret:"Secrete_key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*40,
    }
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    
    if(req.session.user){
        res.redirect("/home")
    }else{
        res.redirect("/login")
    }
})

app.get("/login",(req,res)=>{
    console.log("hre");
   

    if(req.session.user){
          res.redirect("/home")
    }else{
         
        if(req.session.pass === false){
            res.render("login")
            return;
        } 

    
         res.render("login")

    }
})


app.post("/verify",(req,res)=>{
    console.log(req.body.password);
    if(req.body.username===username && req.body.password===password){
     
      res.redirect("/home")
    }else{
        req.session.pass=false
        res.redirect("/login")
    }   
})


app.get("/home",(req,res)=>{
    if(req.session.user){
        res.render("home")

    }else{
        res.redirect("/")
    }
    
})





app.listen(5555,()=>{
    console.log("server is running");
    
})