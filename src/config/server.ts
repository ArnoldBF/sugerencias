import express, { Application } from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "../database/dbConection";
import buscadorRouter from "../routes/buscadorRouter";
import cors from "cors";
import path from "path";

class Server {
    public app: Application;
    public port: string;
    public paths: { [key: string]: string };
    private staticFilesDir: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.staticFilesDir = path.join(__dirname, "files");

        this.paths = {
            buscar: "/api/buscar",
        };

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use("/files", express.static(this.staticFilesDir));
        this.app.use(express.static("public"));
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "/tmp/",
                createParentPath: true,
            })
        );
    }

    private async dbConnection() {
        try {
            await connectDB();
            console.log(`base de datos: ${process.env.DB_NAME} conectada`);
        } catch (error) {
            console.error("Error al conectar a la DB:", error);
        }
    }

    private routes() {
        this.app.use(this.paths.buscar, buscadorRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;
