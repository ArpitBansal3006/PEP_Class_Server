const express=require('express');//expres module included 
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require('./src/routes/authRoutes');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected'))
.catch(error => console.log(error));
const app=express();//instanceof express application

app.use(express.json());//middleware
app.use(cookieParser());
const corsOptions={
    origin:' process.env.CLIENT_ENDPOINT',
    credentials:true
};
app.use(cors(corsOptions));

app.use('/auth',authRoutes);

const PORT=8001;
app.listen(PORT,(error)=>{
    if(error){
        console.log('Server not started: ',error)
    }
    else{

        console.log(`Server running on http://localhost:${PORT}`)
    }
});