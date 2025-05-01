const mysql2 = require("mysql2/promise");
const bcrypt = require("bcrypt");

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const ControllerDashboard = ({
    getCountItem : async(req, res) => {
        try {
            const query = "SELECT COUNT(*) as Total FROM products";
            const [results] = await pool.query(query);
            res.status(200).json(results)
        } catch (error) {
            console.log(error);
        }
    },
    getCountCustomer : async(req, res) => {
        try {
            const query = `SELECT COUNT(*) AS Total FROM users WHERE users.role = \"customer\"`;
            const [results] = await pool.query(query);
            res.status(200).json(results);
        } catch (error) {
            console.log(error)
        }
    },
    getCountStaff : async(req, res) => {
        try {
            const query = `SELECT COUNT(*) AS Total FROM users WHERE users.role = \"staff\"`;
            const [results] = await pool.query(query);
            res.status(200).json(results);
        } catch (error) {
            console.log(error)
        }
    },
    getCustomer : async (req, res) => {
        try {
            const query = "SELECT * FROM users WHERE role = 'customer'";
            const [results] = await pool.query(query);
            res.status(200).json(results);
        } catch (error) {
            console.log(error)
        }
    },
    getDetailCustomer : async(req, res) => {
        try {
            const {username} = req.params.id;
            const query = "SELECT * FROM users WHERE username = ?";
            const [results] = pool.query(query, [username]);
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
        }
    },
    updateCustomer : async (req, res) => {
        try {
            const {username} = req.params.id;
            const {password, email, phone, address, role} = req.body;
            const query = `UPDATE users SET password = ?, email = ?, phone = ?, address = ?, role = ? WHERE username = ?`;
            const cryptPass = bcrypt.hash(password, 10);
            const [results] = await pool.query(query, [cryptPass, email, phone, address, role, username]);
            res.status(200).json(results);
        } catch (error) {
            console.log(error)
        }
    },
    deleteUser : async (req, res) => {
        const id = req.params;
        try {
            const query = `DELETE FROM user WHERE user_id = ?`;
            const [results] = pool.query(query, [id]);
            res.status(200).json(results);
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    },
})
module.exports =  ControllerDashboard