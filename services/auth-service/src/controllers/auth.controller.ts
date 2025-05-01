import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../config/database";
import { signToken } from "../utils/jwt";
import { User } from "../models/user.model";

const SALT_ROUNDS = 10;

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, username, email, password } = req.body;

  // Validar datos de entrada
  if (!name || !username || !email || !password) {
    return res.status(400).json({
      message: "Nombre, nombre de usuario, email y contraseña son requeridos",
    });
  }

  try {
    // 1. Verificar si el usuario ya existe (¡IMPLEMENTAR QUERY!)
    const userExistsResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (userExistsResult.rows.length > 0) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    // 2. Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Insertar nuevo usuario en la BD (¡IMPLEMENTAR QUERY!)
    const newUserResult = await pool.query(
      `INSERT INTO users (name, username, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, username, email`,
      [name, username, email, passwordHash]
    );

    const newUser: Partial<User> = newUserResult.rows[0];

    return res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", userId: newUser.id });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  try {
    // 1. Buscar usuario por email (¡IMPLEMENTAR QUERY!)
    const userResult = await pool.query(
      "SELECT id, name, username, email, created_at, updated_at, password, isactive FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user: User = {
      id: userResult.rows[0].id,
      name: userResult.rows[0].name,
      username: userResult.rows[0].username,
      email: userResult.rows[0].email,
      password: userResult.rows[0].password,
      createdAt: userResult.rows[0].created_at,
      updatedAt: userResult.rows[0].updated_at,
      isActive: userResult.rows[0].isActive,
    };

    // 2. Comparar contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const tokenPayload = { id: user.id, email: user.email };
    const token = signToken(tokenPayload);

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
