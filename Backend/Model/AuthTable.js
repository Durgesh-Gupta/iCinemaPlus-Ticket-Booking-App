const mongoose= require("mongoose")
const {Schema}= mongoose

const AuthTableSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    token:{
        type:String,

    }
})

const Authtable=mongoose.model("authtable",AuthTableSchema)
module.exports=Authtable