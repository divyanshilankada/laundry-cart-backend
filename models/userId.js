const mongoose = require('mongoose');

const OrderIdSchema = new mongoose.Schema({

    order_id:{
        type:Number,
    }
});

const OrderIdModel = mongoose.model("orderId", OrderIdSchema);

module.exports = OrderIdModel;