import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        //Validacion

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son requeridos",
            });
        }

        //Crear usuario

        const user = await User.create({ username, email, password });
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error al crear el usuario", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
