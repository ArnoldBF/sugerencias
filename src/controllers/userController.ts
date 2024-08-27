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
    } catch (error) {}
};
