const express = require('express');
const router = express.Router();
const registerModel = require('../models/register');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

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

router.post("/",[ body('firstName', "*([a-z] or [A-Z] allowed").isAlpha(),
                body('lastName', "*[a-z] or [A-Z] allowed").isAlpha(),
                body('phoneNumber', "*Enter valid 10-digit phone number").isNumeric(),
                body('phoneNumber', "*Enter valid 10-digit phone number").isLength(min=10,max=10),
                body('email', "*Enter valid e-mail").isEmail(),
                body('state', "*Select State").isAlpha(),
                body('city', "*Select City").isAlpha(),
                body('address', "*Enter Address").isAlpha('en-US',{ignore:' '}),
                body('pincode', "*Enter valid pincode").isNumeric(),
                body('pincode', "*Enter valid pincode").isLength(min=6,max=6),
                body('password', "*Password should have atleast 6-characters").isLength(min=6)]             
    ,async (req,res) => {

        console.log()
        try{

            const errors = validationResult(req);
            //console.log();

            if(errors.errors.length !== 0)
            {
                res.status(202).json({ 
                    status:"Failed",
                    error:errors
                });
                return;
            }

            const users = await registerModel.find();

            const exists = users.filter((user) => {
                    if(user.email === req.body.email)
                    {
                        res.status(202).json({ 
                            status:"Failed",
                            emailError:"Email already exists"
                        });
                        return true;
                    }

                    else if(user.phoneNumber === req.body.phoneNumber)
                    {
                        res.status(202).json({ 
                            status:"Failed",
                            phoneNumberError:"Phone Number already exists"
                        });
                        return true;
                    }

                    //return true;
                });

                //console.log(exists,"kk");

            if(exists.length===0) 
            {
                if(req.body.password !== req.body.confirmPassword)
                {
                    res.status(202).json({ 
                        status:"Failed",
                        errorPassword:"*Confirm password should be same as password"
                    });
                    return;
                }

                bcrypt.hash(req.body.password,10, async (error,hash) => {

                    if(error)
                    {
                        return res.status(400).json({status:"Error", message:err.message});
                    }
                    else
                    {
                        let result = await registerModel.create({
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            phoneNumber:req.body.phoneNumber,
                            email:req.body.email,
                            state:req.body.state,
                            city:req.body.city,
                            address:req.body.address,
                            pincode:req.body.pincode,
                            password:hash
                        });
        
                        res.status(200).json({ 
                            status:"Success",
                            data:result
                        });
                    }

                    
                });
    
                
            }
            else
            {
                return;
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