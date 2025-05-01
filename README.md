# Commander-game

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://docs.docker.com/compose/)

Commander-game es un proyecto de juego de estrategia multijugador basado en microservicios, inspirado en juegos como OGame. Los jugadores pueden gestionar territorios, recolectar recursos, construir edificios, investigar tecnologías y expandir su imperio a través de múltiples servidores/mundos.

## 🎮 Características del juego

- **Múltiples mundos**: Diferentes servidores con configuraciones únicas
- **Gestión de recursos**: Recolección y administración de oro, piedra, madera y alimentos
- **Construcción e investigación**: Mejora tu infraestructura y tecnologías
- **Colonización**: Expande tu imperio a otros territorios
- **Flotas y combates**: Construye flotas para defensa y ataque
- **Alianzas**: Forma alianzas con otros jugadores

## 🧩 Arquitectura

![Arquitectura del Sistema](https://via.placeholder.com/800x400?text=Commander-game+Architecture)

- **API Gateway**: Punto de entrada único al sistema. Enruta solicitudes, aplica rate limiting y gestiona la autenticación inicial.
  
- **Auth Service**: Maneja el registro, inicio de sesión y emisión de tokens JWT. Almacena la información de cuentas de usuario.
  
- **World Manager**: Administra los mundos disponibles, su creación y selección por jugadores. Permite a los administradores configurar parámetros de cada mundo.
  
- **Game Engine**: Ejecuta la lógica específica de cada mundo: gestión de jugadores, territorios, recursos, construcciones y combates.

- **Resource Service** *(próximamente)*: Servicio especializado en cálculos de recursos y producción.

- **Combat System** *(próximamente)*: Maneja todos los cálculos relacionados con combates y movimientos de flota.

Cada servicio se ejecuta en su propio contenedor Docker y mantiene su propia base de datos PostgreSQL, siguiendo los principios de microservicios para garantizar escalabilidad y resiliencia.

## 📦 Tecnologías

### Backend
- **Node.js + Express**: Framework para servicios API
- **TypeScript**: Tipado estático para mayor seguridad y mejor DX (Developer Experience)
- **PostgreSQL**: Base de datos relacional
- **TypeORM**: ORM para gestión de bases de datos
- **JWT**: Autenticación y autorización
- **Redis**: Caché y gestión de sesiones
- **Socket.io**: Comunicación en tiempo real

### Frontend
- **React**: Biblioteca de UI
- **Redux Toolkit**: Gestión de estado
- **TailwindCSS**: Framework CSS
- **Vite**: Herramienta de construcción

### DevOps
- **Docker + Docker Compose**: Contenedorización y orquestación
- **GitHub Actions**: CI/CD
- **Jest**: Testing unitario
- **Supertest**: Testing de APIs

## 🚀 Instalación y configuración

### Prerrequisitos
- Docker y Docker Compose
- Node.js (v18 o superior)
- npm o yarn

### Configuración del entorno de desarrollo
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Aespartal/commander-game.git
   cd commander-game
   ```

2. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   # Edita .env con tus configuraciones
   ```

3. Inicia los servicios con Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Para desarrollo local de un servicio específico:
   ```bash
   cd services/auth-service
   npm install
   npm run dev
   ```

## 📁 Estructura del proyecto

```
commander-game/
├── docker-compose.yml         # Configuración de Docker Compose
├── .github/                   # Workflows de GitHub Actions
├── services/                  # Código fuente de los microservicios
│   ├── api-gateway/           # API Gateway
│   ├── auth-service/          # Servicio de autenticación
│   ├── world-manager/         # Gestor de mundos
│   └── game-engine/           # Motor del juego
├── frontend/                  # Aplicación frontend React
│   ├── public/
│   └── src/
├── shared/                    # Código compartido entre servicios
│   ├── models/                # Definiciones de modelos comunes
│   └── utils/                 # Utilidades compartidas
└── docs/                      # Documentación adicional
```

## 🧪 Testing

Ejecuta los tests de un servicio específico:

```bash
cd services/auth-service
npm test
```

Para ejecutar tests de integración:

```bash
npm run test:integration
```

## 📝 API Documentation

La documentación de la API está disponible en:

- Desarrollo: `http://localhost:3000/api-docs`

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Sube tus cambios (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Convenciones de código

- Usamos [Conventional Commits](https://www.conventionalcommits.org/) para los mensajes de commit
- El código debe seguir el linting con ESLint y las reglas de Prettier
- Todo el código nuevo debe tener tests
- La cobertura de tests debe mantenerse o aumentar

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- Alejandro Espartal (https://github.com/Aespartal) - Developer
- Enrique Ruiz (https://github.com/RicarteDeveloper) - Developer
