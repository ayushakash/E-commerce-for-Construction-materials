const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://chardeevari:chardeevari%40mongo@cluster0.rfwfs.mongodb.net/?retryWrites=true&w=majority',
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


