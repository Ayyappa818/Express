var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser")
var cors = require('cors')
app.use(cors())
app.set('view engine','pug')
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(__dirname+"/images"))
app.use(express.static(__dirname+"/public"))

app.get("/deleteReview/:id",function(req,res){
    console.log(req.params.id)
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    reviews.splice(req.params.id,1)
    fs.writeFileSync('reviews.txt',JSON.stringify(reviews))
    res.send("delete karo")
})

app.post("/addReview",function(req,res){
    console.log(req.body)
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    reviews.push(req.body)
    fs.writeFileSync('reviews.txt',JSON.stringify(reviews))
    res.send("aagu ra aandhi ni thuthara")
})

app.get("/getReview",function(req,res){
    res.sendFile(__dirname+"/addreview.html")
})

app.get('/',function(req,res){
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    res.render("home",{reviews:reviews,students:['sandeep','philip','sai','tarun']})
})

app.get("/student",function(req,res){
    console.log(req.params)
    res.send("hi student")
})

app.get("/add/:a/:b",function(req,res){
    var x = +req.params.a;
    var y = +req.params.b;
    var z = x+y;
    console.log(req.params)
    res.send(z.toString())
})

app.get("/studentdetails",function(req,res){
    console.log(req.params) 
    res.sendFile(__dirname+'/data.html')
})

app.get("/data",function(req,res){
    res.send(students)
})

var students = require("./students")
app.get("/studentsdet",function(req,res){
    var tb="";
    for(var i=0;i<=students.length-1;i++){
        tb=tb+`<tr>
            <td>${students[i].firstname}</td>
            <td>${students[i].lastname}</td>
            <td>${students[i].age}</td>
            <td>${students[i].gender}</td>
            <td><a href="/students/${students[i].id}">more</a></td>
          </tr>`
    };
    var table = `<table border='2'>
    <thead>
            <tr>
             <th id="A">Firstname</th>
             <th>Lastname</th>
             <th>Age</th>
             <th>Gender</th>
             <th>Details</th>
            </tr>
          </thead>
    <tbody>
      ${tb}
    </tbody>
    </table>`
    res.end(table)
})

app.get("/students/:fn",function(req,res){
    var det=null
    students.map((a,i)=>{

        if(i==req.params.fn){
            det=a
        }
    })
    res.send(
       `<div>
       <ul>
         <li>Firstname : ${det.firstname}</li>
         <li>Lastname : ${det.lastname}</li>
         <li>Gender : ${det.gender}</li>
         <li>Age : ${det.age}</li>
         <li>City : ${det.city}</li>
         <li>PineCode : ${det.pincode}</li>
       </ul>
       </div>`    
    )
        
})
.listen(4500)