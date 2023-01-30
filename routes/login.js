const express = require('express');
const router = express.Router();
const registerModel = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
console.log(secret);

router.get("/", async (req,res) => {

    try{

        let result = await registerModel.find();

        res.status(200).json({ 
            status:"Success",
            data:result
        });
    }
    catch(e)
    {
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }
});

router.post("/",async (req,res) => {

        try{

            const user = await registerModel.findOne({$or : [{email:req.body.username},{phoneNumber:req.body.username}]});
            
            if(user)
            {
                bcrypt.compare(req.body.password,user.password).then((result) => {
                    
                    if(result)
                    {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: user._id
                          }, secret);
                          
                        res.status(200).json({
                            status:"Success",
                            message:"Login Successful",
                            name: `${user.firstName} ${user.lastName}`,
                            token: token
                        });
                    }
                    else
                    {
                        res.status(202).json({ 
                            status:"Failed",
                            errorPassword:"Invalid Password"
                        });
                    }
                })
            }
            else
            {
                res.status(202).json({ 
                    status:"Failed",
                    errorUsername:"Please enter a valid Email / Mobile Number"
                });
            }
        }
        catch(e)
        {
            res.status(401).json({ 
                status:"Failed",
                message:e.message
            });
        }
});

module.exports = router;