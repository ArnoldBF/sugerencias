import pdfParse from "pdf-parse";

export const lectorPdf = async (buffer: Buffer): Promise<string> => {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        console.error("Error al procesar el archivo PDF: ", error);
        throw error;
    }
};
