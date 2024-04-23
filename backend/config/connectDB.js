const mongoose = require("mongoose");

const connect_database = async () => {
    
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => {
            console.log("Connection to the database is successful!");
        })
        .catch((error) => {
            console.error("Connection Error:", error);
        });
};

module.exports = connect_database
