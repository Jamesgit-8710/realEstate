require("dotenv").config();
const app = require('./app');
const { connect_database } = require("./config");

const port = process.env.PORT || 8081;

const startServer = async () => {
    await connect_database();
    
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

startServer();
