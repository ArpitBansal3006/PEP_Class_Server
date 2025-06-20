const jwt =require('jsonwebtoken');
const secret="01978eda-4942-4fc4-b7ed-924be5321f95";

const authController={
    login:(request, response)=>{
        // those values are here because of express.json() middleware
        const{username,password}=request.body;
        
        if(username==='admin' && password==='admin'){
            const userDetails={
                name:"Arpit",
                email:"arpit@b.com"
            };
            const token=jwt.sign(userDetails,secret,{expiresIn:'1h'});
            response.cookie('jwtToken',token,{//key and value and configuration
                httpOnly: true,//only server can change the details
                secure:true,//will only be accesible on https 
                domain:'localhost',// specified domain
                path:'/'//available on which path on the browser ,here it is available for all pages
            });
            
            response.json({message:'User authenticated',userDetails: userDetails});

        }
        else{
            response.status(401).json({message:'Invalid credentials'});
        }

    },
    logout:(request,response)=>{
        response.clearCookie('jwtToken');
        response.json({message:'User logged out successfully'});
    },
    isUserLoggedIn:(request,response)=>{
        const token=request.cookies.jwtToken;
        if(!token){
            return response.status(401).json({message:'Unauthorized access'});
        }
        jwt.verify(token,secret,(error,decodedSecret)=>{
            if(error){
                return response.status(401).json({message:'Unauthorized access'});
            }
            else{
                return response.json({userDetails:decodedSecret});
            }
        });
    },

};
module.exports=authController;
