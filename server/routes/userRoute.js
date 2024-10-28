const express= require('express');
const router= express.Router();
const User= require('../models/userModel');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const authMiddleware= require('../middlewares/authMiddleware');

//register user
router.post('/register', async (req, res) => {
    try{
        console.log("in userRoute")
        const user = await User.findOne({email : req.body.email});
        if(user){
            console.log("User already exists")
            return res.send({
                success: false,
                message: "User already exists"
            })
            
        }
        // hashing the password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password, salt);
        //creating new user
        // we can also use the following code to create a new user
        // but we have to first set the password to hashedPassword
        // const newUser= new User(req.body);
        // newUser.password= hashedPassword;
        // await newUser.save();
        const newUser= new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone
        });
        await newUser.save();
        return res.send({
            success: true,
            message: "User created successfully"
        })
    }   
    catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }

}
);

//login user
router.post('/login', async (req,res)=>{
    try{
        const getUser= await User.findOne({email: req
            .body.email});
           if(!getUser){
             return   res.send({
                     success: false,
                     message: "User not found"
                })
           } 
              //checking if password is correct
                const validPassword= await bcrypt.compare(req.body.password, getUser.password);
                if(!validPassword){
                   return res.send({
                        success: false,
                        message: "Invalid password"
                    })
                }

                //create and assign a token
                const token= jwt.sign({userId: getUser._id}, process.env.jwt_secret, {expiresIn: '1d'});
                
                return res.send(
                    {
                        success: true,
                        message: "Login successful",
                        data: token
                    }
                )

                

                
    }
    catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
})


// users
router.get('/getAllUsers/:role',authMiddleware, async(req,res)=>{
    try{
        const users= await User.find({role: req.params.role});
        if(!users){
            console.log("No users found")
            return res.send({
                success: false,
                message: "No users found"
            })
        }
        
        return res.send({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    }
    catch(e){
        console.log(e);
        res.send({
            success: false,
            message: e.message
        })
    }
})



router.get('/getUserDetails',authMiddleware, async(req,res)=>{
    try{
       const user= await User.findById(req.body.userIdFromToken); 
        if(!user){
            return res.send({
                success: false,
                message: "User not found"
            })
        }
        return res.send({
            success: true,
            message: "User details fetched successfully",
            data: user
        })
       
    }
    catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
})

    

module.exports= router;