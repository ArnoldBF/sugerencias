import dotenv from "dotenv";
dotenv.config();
import path from "path";
import Server from "./config/server";
import { extraerTexto, procesarTokens } from "./helpers/preProcesarArchivo";

const server = new Server();

server.listen();

const mostrarContenido = async () => {
    const rutaData = path.join(__dirname, "data");
    const contenidoDeTextos = await extraerTexto(rutaData);
    const tokensTuning = procesarTokens(contenidoDeTextos);
    console.log(contenidoDeTextos);
    console.log(tokensTuning);
};

mostrarContenido();
