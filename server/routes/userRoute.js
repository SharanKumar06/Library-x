const express= require('express');
const router= express.Router();
const User= require('../config/models/userModel');
const bcrypt= require('bcryptjs');

//register user
router.post('/register', async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(user){
            res.send({
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
router.post('login', async (req,res)=>{
    try{
        const getUser= await User.findOne({email: req
            .body.email});
           if(!getUser){
                res.send({
                     success: false,
                     message: "User not found"
                })
           } 
              //checking if password is correct
                const validPassword= await bcrypt.compare(req.body.password, getUser.password);
                if(!validPassword){
                    res.send({
                        success: false,
                        message: "Invalid password"
                    })
                }

                //create and assign a token
                const token= jwt.sign({userId: getUser._id}, process.env.jwt_secret, {expiresIn: '1d'});

                res.send({
                    success: true,
                    message: "Login successful"
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