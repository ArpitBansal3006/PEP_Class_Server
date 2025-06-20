const express=require('express');//expres module included 
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require('./src/routes/authRoutes');


const app=express();//instanceof express application

app.use(express.json());//middleware
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:3000',
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