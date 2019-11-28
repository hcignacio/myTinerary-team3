const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
// const uri = "mongodb+srv://user1:" + process.env.MONGO_ATLAS_PW + "@mytinerarycluster-zsbch.mongodb.net/mytinerary?retryWrites=true&w=majority";
const uri = "mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@mytinerary-ipcio.mongodb.net/mytinerary?retryWrites=true&w=majority"
const db = mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },()=>{
   // console.log(mongoose.connection.collections)

  });

module.exports = db;