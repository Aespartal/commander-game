import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
  console.log("Conectado a la base de datos PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Error inesperado en el cliente de la base de datos", err);
  process.exit(-1);
});

export const testDbConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Conexión a la base de datos verificada exitosamente.");
  } catch (error) {
    console.error("Error al verificar la conexión a la base de datos:", error);
  }
};

export default pool;
