var express = require("express")
var router = express.Router();
var fs = require("fs")

router.get("/deleteReview/:id",function(req,res){
    console.log(req.params.id)
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    reviews.splice(req.params.id,1)
    fs.writeFileSync('reviews.txt',JSON.stringify(reviews))
    res.send("delete karo")
})

router.post("/addReview",function(req,res){
    console.log(req.body)
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    reviews.push(req.body)
    fs.writeFileSync('reviews.txt',JSON.stringify(reviews))
    res.send("aagu ra aandhi ni thuthara")
})

router.get("/getReview",function(req,res){
    res.sendFile(__dirname+"/addreview.html")
})

router.get('/',function(req,res){
    var reviews = JSON.parse(fs.readFileSync("reviews.txt").toString());
    res.render("home",{reviews:reviews,students:['sandeep','philip','sai','tarun']})
})
module.exports=router;