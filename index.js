var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var MongoClient = require('mongodb').MongoClient;
var url ='mongodb://localhost:27017/mydb';


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/up",(req,res)=>{
     var id = req.body.code;
     var title = req.body.title;
     var name = req.body.author;
    

    var data = {
        "unique":id,
        "title": title,
        "name" : name
        
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

app.post("/down",(req,res)=>{
     var id = req.body.title;
     var query = {"unique": id };
     db.collection("users").find(query).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        
        

        

     });
     return res.redirect("success1.html")
});
   

console.log("Listening on PORT 3000");