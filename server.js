const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const fs = require('fs');

app.use(bodyparser.json()); //app.use will always be runned

fs.readFile("index.html","utf-8",function(err,data){
    console.log(data);
}) //if i dont mention the encoding type then it will return the buffer values

app.post("/write", function(req,res){
    const message = req.body.message;
    console.log(message);
    if(message){
        fs.writeFile("index.html",message,function(err){
            if(err){
                console.log(err);
                res.end();
            }
            else{
                res.send("Your message:"+message+"\nhas been successfully recorded!")
            }
        })
    }
    else{
        console.log("no message was given");
        res.end();
    }
})

app.get("/read",function(req,res){
    fs.readFile("index.html","utf-8", function(err,data){
        console.log(data);
        res.send(data);
    })
})

app.listen(process.env.PORT || 9000);