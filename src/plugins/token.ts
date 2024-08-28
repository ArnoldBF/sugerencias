import { encode, decode } from "gpt-3-encoder";

export const tokenizarTexto = (texto: string): number[] => {
    const tokens = encode(texto);
    return tokens;
};

export const detokenizarTexto = (tokens: number[]): string => {
    const texto = decode(tokens);
    return texto;
};
