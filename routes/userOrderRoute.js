const express = require("express");
const router = express.Router();
const UserOrderModel = require('../models/userOrderSchema');
const { validateToken } = require("../middlewares/middleware");
const OrderIdModel = require("../models/userId");

router.get('/', validateToken ,async (req, res) => {

    
    try{

        const userOrders = await UserOrderModel.find({user:req.user});
        console.log("kkkkjjjjjj")
        res.status(200).json({
            status:"Success",
            message:userOrders
        })
        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});



router.post('/', validateToken,async (req, res) => {

    try{

        let orderId;

        //console.log(await OrderIdModel.find());
        if((await OrderIdModel.find()).length === 0)
        {   
            let result = await OrderIdModel.create({order_id:1});
            orderId = result.order_id;
        }
        else
        {
            let order_id = await OrderIdModel.find();

            orderId = order_id[0].order_id;
            orderId++;
            await OrderIdModel.updateOne({_id:order_id[0]._id},{order_id:orderId});
        }

        const UserOrderDetails = await UserOrderModel.create({

            order_id:"OI00"+orderId,
            total_price:req.body.total_price,
            order_status:req.body.order_status,
            order_product_type:req.body.order_product_type,
            order_store_details:req.body.order_store_details,
            user:req.user

        });

        res.status(200).json({
            status:"Success",
            message:UserOrderDetails
        });
                

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});


router.delete('/:id', validateToken,async (req, res) => {

    try{
        // UserOrderModel.deleteOne({_id:req.params.id}).then((result)=>{
        //     res.status(200).json(result)
        //   }).catch((err)=>{console.warn(err)});

          const message = await UserOrderModel.deleteOne({_id:req.params.id});

            res.status(200).json({
                status:"Success",
                message:message,
                
            });
    }
    catch(e){

        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }
});


module.exports = router;
