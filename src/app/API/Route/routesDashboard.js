const express = require("express");
const route = express.Router();
const ControllerDashboard = require("../Controller/ControllerDashBoard");

route.get("/totalItem", ControllerDashboard.getCountItem);
route.get("/totalCustomer", ControllerDashboard.getCountCustomer);
route.get("/totalStaff", ControllerDashboard.getCountStaff)

route.get("/customer", ControllerDashboard.getCustomer);
route.get("/customer/:id", ControllerDashboard.getDetailCustomer);
route.delete("/customer/del/:id", ControllerDashboard.deleteUser);
route.post("/customer/add", ControllerDashboard.addCustomer);
route.put("/customer/update/:id", ControllerDashboard.updateCustomer);

route.get('/employee', ControllerDashboard.getEmployee);
route.put("/employee/update/:id", ControllerDashboard.updateEmployee);

module.exports = route;