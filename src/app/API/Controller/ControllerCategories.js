const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const ControllerCategories = {
    getItem: async(req, res) => {
        try {
            const query = "SELECT * FROM Categories";
            const [results] = await pool.query(query);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    getDetailItem: async (req, res) => {
        try {
            const id = req.params.id;
            const query = `select * from categories 
            inner join products 
            on categories.category_id = products.category_id 
            and products.category_id = ?`;
            const [results] = await pool.query(query, [id]);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    insertItem: async(req, res) => {
        try {
            const { category_name } = req.body;
            const query = "INSERT FROM categories(category_name) VALUES(?)";
            const [results] = await pool.query(query, [category_name]);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    updateItem: async(req, res) => {
        try {
            const id = req.params.id;
            const { category_name } = req.body;
            const query = `UPDATE categories SET category_name = ? WHERE category_id = ?`;
            const [results] = await pool.query(query, [category_name, id]);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    deleteItem: async (req, res) => {
        try {
            const id = req.params;
            const query = `DELETE FROM categories WHERE category_id = ?`;
            const [results] = await pool.query(query, [id]);
            return res.status(200).json(results)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = ControllerCategories