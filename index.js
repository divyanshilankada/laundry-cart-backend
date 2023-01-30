const mongoose = require("mongoose");
const cors=require('cors');
const app = require('./app.js');
app.use(cors());

const PORT = process.env.PORT || 8080;





mongoose.connect("mongodb+srv://lankadadivyanshi:password321@cluster1.9bovumu.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
});
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err);
});
app.listen(PORT,()=>{
    console.log("the server is running on",8080);
});