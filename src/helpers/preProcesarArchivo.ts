import { lectorPdf } from "../plugins/pdfParse";
import { tokenizarTexto } from "../plugins/token";
import fs from "fs";
import path from "path";

const limpiarTexto = (texto: string): string => {
    return texto
        .toLowerCase() // Convertir todo a minúsculas
        .replace(/[^a-zA-Z0-9áéíóúüñ\s]/g, "") // Eliminar caracteres especiales, excepto letras, números y espacios
        .replace(/\s+/g, " ") // Reemplazar múltiples espacios por uno solo
        .trim(); // Eliminar espacios en blanco al inicio y al final;
};

export const extraerTexto = async (dir: string): Promise<string[]> => {
    const contenido: string[] = [];

    try {
        // Leer todos los archivos en el directorio
        const archivos = fs.readdirSync(dir);

        // Filtrar solo los archivos .txt y leer su contenido
        for (const archivo of archivos) {
            const archivoPath = path.join(dir, archivo);

            if (archivo.endsWith(".txt")) {
                const content = fs.readFileSync(archivoPath, "utf-8");
                const textoLimpio = limpiarTexto(content);
                contenido.push(textoLimpio);
            } else if (archivo.endsWith(".pdf")) {
                const dataBuffer = fs.readFileSync(archivoPath);
                const pdfData = await lectorPdf(dataBuffer);
                const textLimpio = limpiarTexto(pdfData);
                contenido.push(textLimpio);
            }
        }
    } catch (error) {
        console.error("Error al leer los archivos:", error);
    }

    return contenido;
};

export const procesarTokens = (textos: string[]): number[][] => {
    return textos.map((texto) => tokenizarTexto(texto));
};
