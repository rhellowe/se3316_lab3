var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var EntrySchema=new Schema({
    desc:String,
    time:String,
    courseCode:String
});
module.exports=mongoose.model("Entry",EntrySchema);