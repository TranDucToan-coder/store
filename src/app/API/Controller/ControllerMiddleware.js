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

const SECRET_KEY = '983922519b19b299f5823bfbe82a191f8546347d0bdd951eb539458b0b3c9708';

const ControllerMiddleware = {
    getAuthorToken: (req, res, next) => {
        const token = req.headers["authorization"].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Cannot find Token" });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    },
};
module.exports = ControllerMiddleware;