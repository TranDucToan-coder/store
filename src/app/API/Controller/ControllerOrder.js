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
            const order_id = 0;
            const query = "Insert into orders(user_id, order_date, total_amount, status) values(?,?,?,?)"
            const key_cache = `user_id_${order_id + 1}`;
            const results = await fetchData(key_cache, query, [user_id, order_date, total_amount, status]);
            //const [results] = await pool.query(query, [user_id, order_date, total_amount, status]);
            return res.status(200).json(results)
        } catch (error) {
            console.log("Failed: " + error)
        }
    }
}
module.exports = ControllerOrder