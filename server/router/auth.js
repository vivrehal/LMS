const express = require('express');
const router=express.Router();
const User = require('../model/userSchema');
const bcrypt=require('bcryptjs');

router.get('/',(req,res)=>{
    res.send("hello router ");
});


router.post('/register', async(req,res)=>{

    const {name,email,phone,password,cpassword}=req.body
    if(!name ||!email ||!phone ||!password ||!cpassword ||password!=cpassword){
       return (res.status(422).send("plz fill all the data correctly")); 
    }
    try{
    if( await User.findOne({email:email})){
    console.log("email already");
       return  (res.status(422).send("email already exists"));
    }
    const user=new User({name,email,phone,password,cpassword});
    //middleware bcrypt
    try {
        await user.save();
        res.send("user added");
    } catch (error) {
        console.log("error while saving");
        res.send("error while signup").status(422);
    }
    }
    catch{
        res.send("error while signup").status(422);
    }

});

//login

router.post('/Login',async (req,res)=>{
        console.log(req.body);
        const{email,password}=req.body;
        if(!email || !password){
            res.status(422).send("fill the details");
        }
    try{
        const user=await User.findOne({email:email});
        if(await bcrypt.compare(password,user.password)){
            console.log("here");
            res.send("OK hai");
        }
        else{
        res.status(401).send("invalid login credentials");
    }}
    catch(err){
        res.status(401).send("invalid login credentials");
    }
});

module.exports=router;
