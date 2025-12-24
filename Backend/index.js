const express = require("express");
const cors = require("cors");
const EventEmitter = require('events');
const {notFound,errorHandler} = require("./middleware/errorHandler.js");
const PORT = process.env.PORT || 4001;
require("dotenv").config();



const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");


const emitter = new EventEmitter();
emitter.setMaxListeners(15); 

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use(notFound);
app.use(errorHandler);


app.get('/', (req,res)=>{
    return res.status(200).send({message:"welcome to  backend"})
})

process.on('warning', (warning) => {
    console.warn(warning.stack);
  });

app.listen(PORT, ()=>{
    console.log('Server is running on PORT '+ PORT)});