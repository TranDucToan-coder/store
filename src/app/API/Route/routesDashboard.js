const express = require("express");
const route = express.Router();
const ControllerDashboard = require("../Controller/ControllerDashBoard");

route.get("/totalItem", ControllerDashboard.getCountItem);
route.get("/totalCustomer", ControllerDashboard.getCountCustomer);
route.get("/totalStaff", ControllerDashboard.getCountStaff)

route.get("/customer", ControllerDashboard.getCustomer);
route.get("/customer/:id", ControllerDashboard.getDetailCustomer);
route.delete("/delUser/:id", ControllerDashboard.deleteUser);
module.exports = route;