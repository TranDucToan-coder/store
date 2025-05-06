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
            const id = req.params.id;
            const query = "SELECT * FROM users WHERE username = ?";
            const [results] = await pool.query(query, [id]);
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
        }
    },
    addCustomer : async(req, res) => {
        try {
            const { username,password,email,phone,address,role} = req.body;
            const query = `INSERT INTO users(username,password,email,phone,address,role) VALUES(?,?,?,?,?,?)`;
            const bcryptPass = await bcrypt.hash(password, 10);
            if(username != null || email != null || phone != null){
                const [results] = await pool.query(query, [ username, bcryptPass, email,phone ,address ,role]);
                res.status(200).json({results});
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateCustomer : async (req, res) => {
        try {
            const username = req.params.id;
            const {password, email, phone, address, role} = req.body;
            const query = `UPDATE users SET password = ?, email = ?, phone = ?, address = ?, role = ? WHERE username = ?`;
            const cryptPass = await bcrypt.hash(password, 10);
            const [results] = await pool.query(query, [cryptPass, email, phone, address, role, username]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser : async (req, res) => {
        const id = req.params.id;
        try {
            const query = `DELETE FROM user WHERE user_id = ?`;
            const [results] = pool.query(query, [id]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getEmployee : async(req, res) => {
        try {
            const query = `SELECT * FROM users WHERE role = "staff"`;
            const [results] = await pool.query(query);
            res.status(200).json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateEmployee : async (req, res) => {
        try {
            const username = req.params.id;
            const {password, email, phone, address, role} = req.body;
            const query = `
            UPDATE users 
            SET password = ?, email = ?, phone = ?, address = ?, role = ? 
            WHERE username = ?`;
            const cryptPass = await bcrypt.hash(password, 10);
            const [results] = await pool.query(query, [cryptPass, email, phone, address, role, username]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error)
        }
    },
})
module.exports =  ControllerDashboard