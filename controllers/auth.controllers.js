const User = require("../models/user.models");
const bcrypt = require('bcryptjs');

const handleLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error: {message: "Invalid Credentials"}});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({error: {message: "Invalid Credentials"}});
        }
        res.status(200).json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            role: user.role,
        });
    } catch (error) {
        console.log({error});
        res.status(500).json({error});
    }
}

const handleSignup = async (req, res) => {
    try {
        const {name, email, phone, password, dob, role } = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({error: {message: "User already exists"}});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            dob,
            role
        });
        await newUser.save();
        res.status(200).json({message: "User created successfully"});
    } catch (error) {
        console.log({error});
        res.status(500).json({error});
    }
 }

module.exports = {handleLogin, handleSignup}