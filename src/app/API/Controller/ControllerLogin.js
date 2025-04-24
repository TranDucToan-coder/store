const mysql2 = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const SECRET_KEY = "983922519b19b299f5823bfbe82a191f8546347d0bdd951eb539458b0b3c9708"; 
const ControllerLogin = {
    getData: async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log("Request Body:", req.body);
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password must be provided" });
            }
    
            const query = `SELECT username, user_id, role FROM users WHERE username = ? AND password = ?`;
            const [results] = await pool.query(query, [username, password]);
            console.log("Query Results:", results); 
    
            if (results.length === 0) {
                return res.status(401).json({ message: "Thông tin đăng nhập không chính xác" });
            }
            const user = results[0];
            console.log("Authenticated User:", user); 
    
            const payload = {
                user_id: user.user_id,
                username: user.username,
            };
    
            const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
            res.header('Authorization', `Bearer ${accessToken}`).status(200).json({
                user,
                accessToken,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    },
    createUser : async (req, res) => {
        const {username, password, email, phone, address, role} = req.body;
        try {
            const query = `INSERT INTO users(username, password, email, phone, address, role) VALUES(?,?,?,?,?,?)`;
            if(req.body != null)
            {
                const [results] = await pool.query(query, [username, password, email, phone, address, role])
                res.status(200).json(results);
            }
            else
            {
                res.status(403),json({message : "Cant't insert user"});
            }
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    },
    editUser : async (req, res) => {
        const id = req.params.id;
        const {password, email, phone, address} = req.body;
        try {
            const query = `UPDATE FROM users SET
            password = ?,
            email = ?,
            phone = ?,
            address = ?
            WHERE user_id = ?`;
            cosnt [results] = pool.query(query, [password, email, phone, address, id]);
            res.status(200).json(results);
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: error.message });
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
    getDetailUser : async(req, res) => {
        const id = req.params.id;
        try {
            const query = `SELECT * FROM users WHERE username = ?`;
            const [results] = await pool.query(query, [id]);
            res.status(200).json(results)
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: error.message });
        }
    },
}

module.exports = ControllerLogin;