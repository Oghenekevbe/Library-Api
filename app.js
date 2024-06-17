const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const { connectUserDB } = require("./config/userDB");
const connectBookDB = require("./config/bookDB");
const statusCodeHandler = require("./middlewares/errorHandler");

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to the User Database
        await connectUserDB();

        // Connect to the Books Database
        await connectBookDB();

        const app = express();
        app.use(express.json());
        app.use(morgan("dev"));
        app.use("/api/books", require("./routes/bookRoutes"));
        app.use("/api/users", require("./routes/userRoutes"));
        app.use(statusCodeHandler);

        // Define middleware and routes here

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
};

startServer();
