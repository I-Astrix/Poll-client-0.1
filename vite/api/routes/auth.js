// Packages
const router = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Model
const User = require('../models/User');



const JWT_SECRET = 'alongsecurestringfromjwtsecret';


router.post('/register',[
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('fullName').isLength({min: 3}),
], async(req, res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors});
    }

            try{
            const user = await User.findOne({email: req.body.email});
            if(user){
                res.status(400).send({error: 'Email already exists'})
            }
            else{
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const newUser = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPassword
                })                
                await newUser.save();            
                res.status(200).json({success: true})
            }
        }
        catch(err){
            res.status(400).json({err, success: false})
        }
    })

    router.post('/login', async(req, res)=>{
        console.log(req.body)
            try{
                const user = await User.findOne({email: req.body.email});
                if(!user){
                    res.status(400).json("Invalid Credentials")
                }
                else{
                    const checkPass = await bcrypt.compare(req.body.password, user.password, (err, success)=>{
                        if(success){
                            const authToken = jwt.sign(
                                {id: user._id}, JWT_SECRET, { expiresIn: '1h' });

                            const {password, ...others} = user._doc;

                            res.cookie("poll_access", authToken, {
                                httpOnly: true,
                                secure: true
                                }).status(200).json({...others, success: true})
                        }
                        else{
                            res.status(400).json({err, success: false})
                        }    
                    });                 
                }
            }
            catch(err){
                res.status(400).json(err)
            }
    })


    router.post('/logout', (req,res)=>{
        try{
            res.clearCookie('poll_access')
            res.status(200).json({success: true, msg: 'Logged Out Success'});
        }   
        catch{
            res.status(200).json({success: false, msg: 'Logged Out Failed'});
        }
    })

module.exports = router;
