require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const todo = require("./models/shemas");
const app = express();
var items  = [];
var bubles = [];
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true})) ; 
app.use(express.static("public"));
require("dotenv").config();

app.get("/" , function(request ,response){
    let day = date.genereteDate();
    todo.find().then((result)=>{
        response.render("index" , {date : day , arrobj : result });
    }).catch(err => {
        console.log(err);
    })
});

app.post("/" , function(request , response){
    var item = request.body.itemtoadd;
    items.push(item);
    const newtodo = new todo(request.body);
    console.log(newtodo);
    newtodo.save().then((result) => {
        response.redirect("/");
    }).catch((err) =>{
        console.log(err);
    });
});

mongoose.connect(process.env.MONGODB_URI).then( (result)=>{
    app.listen(process.env.PORT || 5000 , function(){
        console.log("--Start listining on port 5000 .");
        console.log("--Type localhost:3000 on your browser to connect .")
        console.log("...");
    });
}).catch((err)=>{
    console.log(err);
})

