const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{

    res.sendFile(__dirname + "/signup.html");
});





app.post("/", (req, res)=>{

var fname = req.body.fname;
var lname = req.body.lname;
var email = req.body.email;

//  res.write("<h1>" + fname +"</h1>");
//  res.write("<h1>" + lname +"</h1>");
//  res.write("<h1>" + email +"</h1>");
//  res.send();

 var data = {

    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }

        }

    ]
}

var url = "https://us9.api.mailchimp.com/3.0/lists/762b48a583";
var jsonData = JSON.stringify(data);

const  Options = {
    method:"POST",
    auth:"sam:45b3acbf3c811eb2b59ee572c2b8440b-us9"
}


var request = https.request(url, Options, function(response){
    response.on("data", function(data){
       // console.log(JSON.parse(data));
    });

    if(response.statusCode===200){
        res.sendFile(__dirname +"/success.html");
    
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
});


request.write(jsonData);
request.end();
});


 
app.post("/failure", (req, res)=>{
  
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, ()=>{

    console.log("Server started on port 3000");
});


 

 