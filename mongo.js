const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI,

{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>console.log('mongo connected sucessfuly'))
.catch((err)=>console.log(err))


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  email: {
      type: String,
      required: true,
    },
  phone: {
    type: Number,
    default: 0,
  }, 
  password: {
      type: String,
      required: true,
    }
});


const User = mongoose.model("User", UserSchema);   ////////collection name will be users


module.exports = User;


