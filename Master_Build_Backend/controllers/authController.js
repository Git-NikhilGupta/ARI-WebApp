const User= require('../models/user');
const bcrypt =require('bcrypt');

async function registerUser (req,res){

    console.log("Request is coming");
    console.log(req.body);
    console.log(req.query);
    const {username,password}=req.query;

    try{
        const user= new User({username,password});
        await user.save();        
        res.status(200).json({
            message: 'Registration successful',
            username,
            password
          });   

    }catch(err){
        res.status(400).send('Registration failed: ' + err.message);
    }
}

async function loginUser(req,res){
    const {username,password}=req.query;
    console.log(username+" "+ password);
    try{
        const user=  await User.findOne({username});
        if(!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid password');

        res.send('Login successful');
    }catch(err){
        res.status(500).send('Login error: ' + err.message);
    }
}

module.exports={registerUser,loginUser};