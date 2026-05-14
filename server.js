const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb+srv://syedjunaid:syed123@cluster0.uyi5sm8.mongodb.net/alnoor?retryWrites=true&w=majority&appName=Cluster0"
)

.then(()=>{
    console.log("MongoDB Connected");
})

.catch((err)=>{
    console.log(err);
});

const orderSchema = new mongoose.Schema({

    name:String,
    phone:String,
    address:String,
    city:String,
    pincode:String,
    payment:String,

    products:[
        {
            name:String,
            price:Number,
            quantity:Number
        }
    ],

    total:Number

});

const Order = mongoose.model("Order", orderSchema);
/* SAVE ORDER */

app.post("/place-order",async(req,res)=>{

    try{

        const newOrder = new Order(req.body);

        await newOrder.save();

        res.json({
            message:"Order Saved Successfully"
        });

    }catch(err){

        res.status(500).json({
            message:"Error Saving Order"
        });

    }

});

app.listen(5000,()=>{

    console.log("Server Running On Port 5000");

});