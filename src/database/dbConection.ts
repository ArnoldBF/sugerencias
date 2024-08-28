import { Sequelize } from "sequelize";
import User from "../models/user";

const sequelize = new Sequelize({
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 1433,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialectOptions: {
        encrypt: false,
        trustServerCertificate: true,
    },
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};

export { sequelize, connectDB };
