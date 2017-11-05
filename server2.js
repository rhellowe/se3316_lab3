var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/entries");
var Entry=require("./app/models/entry");
app.use('/', express.static('static'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port=process.env.PORT||8080;
var fs=require("fs");
var router=express.Router();
app.use('/',express.static("/web_app"));
router.route("/entries")
.post(function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
    var entry=new Entry();
    entry.desc=req.body.desc;
    entry.time=req.body.time;
    entry.courseCode=req.body.courseCode;
    entry.save(function(err){
        if(err){res.send(err);}
        res.json("Entry Added!");
    });
})
.get(function(req,res){
     res.setHeader("Access-Control-Allow-Origin","*");
       Entry.find(function(err, entries) {
            if (err){
                res.send(err);}

            res.json(entries);
        });
});
router.route("/entries/:entry_id")
  .delete(function(req,res){
        Entry.remove({
            _id:req.params.entry_id
        },function(err,entry){
          if(err){res.send(err);}
          res.json({message: "Successfully deleted"});
        });
    });

app.use("/api",router);
app.listen(port);

