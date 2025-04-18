import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { testDbConnection } from './config/database';
dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Backend Express + TypeScript funcionando!');
});

// Iniciar el servidor
app.listen(port, async () => {
  console.log(`⚡️[server]: Servidor corriendo en http://localhost:${port}`);
  // Probar conexión a la BD al iniciar (opcional)
  await testDbConnection();
});