const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true,"please provide an email"],
        unique  : [true,"Email Exist"]
    },

    password : {
        type :  String,
        required : [true,"please provide a Password !!"],
        unique : false,
    },
})

module.exports =  mongoose.model("Users", UserSchema);
