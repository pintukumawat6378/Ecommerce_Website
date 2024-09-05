const express = require("express");
const orderController = require("../controller/order");


const router = express.Router();

router.get("/getAllOrders",orderController.getAllOrder);
router.get("/getOrderByUserId/:id",orderController.getOrderByUserId);
// router.post("/createOrder",orderController.createOrder);
router.put("/updateStatus/:id",orderController.updateOrderStatus);
router.delete("/deleteOrder/:id",orderController.deleteOrder);


module.exports = router;