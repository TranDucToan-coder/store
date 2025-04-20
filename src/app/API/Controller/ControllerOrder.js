const mysql2 = require('mysql2/promise');
const fetchData = require('../Redis')
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const ControllerOrder = {
    InsertOrder: async (req, res) => {
        try {
            const { user_id, order_date, total_amount, status } = req.body;
            const query = "Insert into orders(user_id, order_date, total_amount, status) values(?,?,?,?)"
            const [results] = await pool.query(query, [user_id, order_date, total_amount, status]);
            return res.status(200).json({
                results,
                order_id : results.insertId
            });
        } catch (error) {
            console.log("Failed: " + error)
        }
    },
    InsertDetailOrder: async(req, res) => {
        try {
            const {order_id, product_id, quantity, price} = req.body;
            if(order_id != null)
            {
                const query = "INSERT INTO order_details(order_id, product_id, quantity, price) VALUES (?,?,?,?)";
                const [results] = await pool.query(query, [order_id, product_id, quantity, price]);
                res.status(200).json(results);}
        } catch (error) {
            console.log("Failed: " + error);
        }
    },
    GetOrderByID : async(req, res) => {
        try {
            const user_id = req.params.id;
            const query = "SELECT * FROM orders WHERE user_id = ?";
            const [results] = await pool.query(query, [user_id]);
            res.status(200).json(results);
        } catch (error) {
            console.log("Failed: " + error)
        }
    },
    GetDetailOfOrder : async(req, res) => {
        try {
            const order_id = req.params.id;
            const query = `
            SELECT order_details.*, products.product_name, image_url 
            FROM order_details JOIN products ON order_details.product_id = products.product_id 
            WHERE order_id = ?`;
            const [results] = await pool.query(query, [order_id]);
            res.status(200).json(results);
        } catch (error) {
            console.log("Failed" + error);
        }
    },
}
module.exports = ControllerOrder