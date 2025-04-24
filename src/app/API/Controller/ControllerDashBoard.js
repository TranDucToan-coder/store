const mysql2 = require("mysql2/promise");

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
})
module.exports =  ControllerDashboard