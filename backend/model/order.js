const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDesc: { type: String, required: true },
    productCategory: { type: String, required: true },
    productImage: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = mongoose.Schema({
    userId : {type : String , required : true},
    customerName : {type : String , required : true},
    customerContactNumber  : {type : String , required : true},
    address : {type : String , required : true},
    pinCode : {type  :  Number , require  : true},
    product: [productSchema],
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order",orderSchema);