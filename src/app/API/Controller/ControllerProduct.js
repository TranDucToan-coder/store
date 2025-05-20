const mysql2 = require('mysql2/promise');
const fetchData = require("../Redis")
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const ProductController = {
    getProduct: async (req, res) => {
        try {
            const query = "SELECT * FROM Products";
            const cacheKey = "cache_key";
            const products = await fetchData(cacheKey, query);
            return res.status(200).json(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    getDetailProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM Products WHERE product_id = ?";
            const [results] = await pool.query(query, [id]);
            return res.status(200).json(results);
            //const cache_key = `product:${id}`;
            //const products = await fetchData(cache_key, query, [id]);
            //return res.status(200).json(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
          const product_id = req.params.id;
          const {product_name, category_id, price, description, stock_quantity, image_url } = req.body;
          const query = `UPDATE Products SET 
            product_name = ?, 
            category_id = ?, 
            price = ?, 
            description = ?, 
            stock_quantity = ?, 
            image_url = ?
            WHERE product_id = ?`;
          const results = await pool.query(query, [product_name, category_id, price, description, stock_quantity, image_url, product_id]);
          return res.status(200).json(results);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: error.message });
        }
      },
      insertProduct: async (req, res) => {
        try {
            const {product_name, category_id, price, description, stock_quantity, image_url } = req.body;
            const query = `INSERT INTO Products (product_name, category_id, price, description, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
            const results = await pool.query(query, [product_name, category_id, price, description, stock_quantity, image_url]);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
      },
      deleteProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const query = "DELETE FROM Products WHERE product_id = ?";
            const results = await pool.query(query, [id]);
            return res.status(200).json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
      },
};

module.exports = ProductController;
