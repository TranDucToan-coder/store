const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const productRouter = require('../API/Route/routes');
const categoriesRouter = require('../API/Route/routesCategory');
const loginRouter = require('../API/Route/routesLogin');
const orderRouter = require("./Route/routesOrder")
const dashboardRouter = require("./Route/routesDashboard");

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "Toan2003@@",
    database: "ecommerce",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connect() {
    try {
        await pool.getConnection();
        console.log("Database is connected!");
    } catch (err) {
        console.log("Error: " + err);
        return null;
    }
}
connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//app.use(res.static(path.join(__dirname, 'public')))
app.use("/product", productRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);
app.use("/order", orderRouter)
app.use("/dashboard", dashboardRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = pool ;

