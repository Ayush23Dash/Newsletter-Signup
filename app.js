// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res)
{
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
var data={
  members:[
    {
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
  ]
};

var jsonData = JSON.stringify(data);
var options ={
  url:"https://us5.api.mailchimp.com/3.0/lists/75d9eccdfa",
  method:"POST",
  headers:{
    "Authorization":"ayush1 8a4e75630456511f1364c8b251cefc89-us5"
  },
  body: jsonData
};

request(options,function(error,response,body)
{
  if(error||response.statusCode!=200){
    res.sendFile(__dirname + "/failure.html");
  }else{
    res.sendFile(__dirname + "/success.html");
  }
}
);

});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is Running on port 3000");
}
);

// 8a4e75630456511f1364c8b251cefc89-us5
// 75d9eccdfa
