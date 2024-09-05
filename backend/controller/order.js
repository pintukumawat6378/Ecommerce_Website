const Order = require("../model/order")


exports.getAllOrder = async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.getOrderByUserId = async (req,res)=>{
    const { id } = req.params;
    try {
        const orders = await Order.find({userId : id});
        res.status(200).send({message : "Orders Fetched" , data : orders});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}
// exports.createOrder = async (req,res)=>{
//     const { userId, customerName, customerContactNumber, address, pinCode, product, transactionId } = req.body;
//     console.log(userId);
//     try {

//         // const productImage = req.file.path;
//         const order = new Order({
//             userId : userId ,
//             customerName : customerName ,
//             customerContactNumber : customerContactNumber, 
//             address  :  address , 
//             pinCode : pinCode,
//             product:product,
//             transactionId:transactionId,
//             createdAt:Date.now()
//         });
//         console.log(order);
//         await order.save();
//         return res.status(201).send({message : "Order Created", data : order})
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({message : "error", error : error});
//     }
// }

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        // console.log('Order:', order);
        // console.log('Status:', status);
        // console.log('ID:', id);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        order.status = status;
        order.product = order.product.map(product => ({
            ...product,
            status: status
        }));

        const updatedOrder = await order.save();
        // console.log("updatedOrder: ", updatedOrder);
        res.status(200).send({ message: "Order status updated", data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating order status", error: error.message });
    }
};

exports.deleteOrder = async (req,res)=>{
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).send({message : "Order deleted",data : order});
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "error"})
    }
    
}




//protected Routes
//  "/" -- anyone
//  "/login" -- anyone but not loggedin user/admin
//  "/signup" -- anyone but not loggedin user/admin
//  "/profile" -- only admin and user
//  "/admin" -- admin
//  "/myOrder" -- user
//  "/order" -- user