# Guía de Contribución para Commander-game

¡Gracias por tu interés en contribuir a Commander-game! Este documento proporciona lineamientos y mejores prácticas para colaborar en nuestro proyecto de juego de estrategia basado en microservicios.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Primeros Pasos](#primeros-pasos)
  - [Configuración del Entorno](#configuración-del-entorno)
  - [Estructura del Proyecto](#estructura-del-proyecto)
- [Proceso de Contribución](#proceso-de-contribución)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
- [Estándares de Código](#estándares-de-código)
  - [Convenciones de Estilo](#convenciones-de-estilo)
  - [Convenciones de Commits](#convenciones-de-commits)
  - [Testing](#testing)
- [Documentación](#documentación)
- [Microservicios](#microservicios)
  - [Trabajando con Servicios Existentes](#trabajando-con-servicios-existentes)
  - [Creando Nuevos Servicios](#creando-nuevos-servicios)
- [Base de Datos](#base-de-datos)
- [Preguntas Frecuentes](#preguntas-frecuentes)

## 🤝 Código de Conducta

Al participar en este proyecto, te comprometes a mantener nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Por favor, léelo antes de contribuir.

## 🚀 Primeros Pasos

### Configuración del Entorno

1. **Requisitos Previos**:
   - Node.js (v18 o superior)
   - Docker y Docker Compose
   - Git
   - Un editor de código (recomendamos VS Code)

2. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/Aespartal/commander-game.git
   cd commander-game
   ```

3. **Instalar Dependencias**:
   ```bash
   # Instalar dependencias globales del proyecto
   npm install

   # Instalar dependencias para un servicio específico
   cd services/auth-service
   npm install
   ```

4. **Configurar Variables de Entorno**:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones locales
   ```

5. **Iniciar el Entorno de Desarrollo**:
   ```bash
   # Iniciar todos los servicios con Docker Compose
   docker-compose -f docker-compose.dev.yml up

   # O para un servicio específico en modo desarrollo
   cd services/auth-service
   npm run dev
   ```

### Estructura del proyecto

Familiarízate con la [estructura del proyecto](README.md#estructura-del-proyecto).

```
proyecto/
├── .github/                    # Configuración de GitHub Actions
├── docs/                       # Documentación
├── services/                   # Microservicios
│   ├── api-gateway/
│   ├── auth-service/
│   └── ...
├── frontend/                   # Aplicación React
├── shared/                     # Código compartido
├── scripts/                    # Scripts útiles
├── docker-compose.yml          # Configuración de Docker
├── docker-compose.dev.yml      # Configuración para desarrollo
└── README.md                   # Documentación principal
```

## Cada servicio sigue una estructura similar:

```
service-name/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── tests/
├── Dockerfile
└── package.json
```

## Estructura del site

```
site/
├── public/
│   ├── index.html             # Archivo HTML principal
│   ├── favicon.ico            # Ícono del sitio
│   └── manifest.json          # Configuración del manifiesto
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/                 # Páginas principales
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── ...
│   ├── App.jsx                # Componente raíz
│   ├── index.jsx              # Punto de entrada de React
│   ├── assets/                # Recursos estáticos (imágenes, fuentes, etc.)
│   └── utils/                 # Utilidades y helpers
├── package.json               # Configuración del proyecto
└── README.md                  # Documentación del sitio
```


## 📝 Proceso de Contribución

### Pull Requests

1. **Crea una rama** para tu contribución:
   ```bash
   git checkout -b tipo/nombre-descriptivo
   # Ejemplos:
   # feature/sistema-alianzas
   # fix/corregir-calculo-recursos
   # docs/mejorar-api-docs
   ```

2. **Realiza tus cambios** siguiendo nuestras convenciones de código.

3. **Escribe tests** para tus cambios.

4. **Ejecuta los tests localmente** antes de enviar tu PR:
   ```bash
   npm run test
   npm run lint
   ```

5. **Actualiza la documentación** si es necesario.

6. **Haz commits siguiendo nuestras convenciones**.

7. **Envía tu Pull Request**:
   - Usa la plantilla de PR proporcionada
   - Referencia cualquier issue relacionado (#número-de-issue)
   - Proporciona una descripción clara de tus cambios
   - Incluye capturas de pantalla para cambios visuales

8. **Responde a las revisiones** y realiza los cambios solicitados.

## 💻 Estándares de Código

### Convenciones de Estilo

Usamos ESLint y Prettier para mantener un estilo de código consistente:

- **TypeScript**: Seguimos las [guías de estilo de TypeScript de Google](https://github.com/google/gts)
- **Indentación**: 2 espacios
- **Longitud máxima de línea**: 100 caracteres
- **Punto y coma**: Requeridos
- **Comillas**: Simples para strings

Puedes aplicar automáticamente estos estándares con:
```bash
npm run lint
npm run format
```

### Convenciones de Commits

Seguimos el formato de [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[nota(s) de pie opcional]
```

**Tipos comunes**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el código (formato, espacios, etc.)
- `refactor`: Refactorización de código
- `test`: Añadir/modificar tests
- `chore`: Cambios en el proceso de build, herramientas, etc.

**Ejemplos**:
```
feat(auth): implementar autenticación con Google
fix(resources): corregir cálculo de producción de deuterio
docs(api): actualizar documentación del endpoint de flotas
```

### Testing

- **Tests unitarios**: Obligatorios para toda nueva funcionalidad
- **Tests de integración**: Necesarios para cambios que afecten múltiples componentes
- **Cobertura mínima**: 80% para nuevo código

Usamos Jest como framework de testing:
```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests de un archivo específico
npm test -- services/auth-service/tests/unit/auth.test.ts
```

## 📚 Documentación

- **Código**: Usa JSDoc para documentar funciones, clases y métodos
- **API**: Actualiza la documentación `api_documentation`
- **README**: Actualiza el README principal si añades nuevas funcionalidades importantes
- **Changelog**: Todos los cambios notables se deben reflejar en CHANGELOG.md

## 🧩 Microservicios

### Trabajando con Servicios Existentes

1. **Comprender la responsabilidad** del servicio antes de modificarlo
2. **Mantener la independencia** evitando dependencias innecesarias entre servicios
3. **Respetar los contratos API** y mantener la compatibilidad con versiones anteriores
4. **Actualizar documentación** específica del servicio

### Creando Nuevos Servicios

Si necesitas crear un nuevo microservicio:

1. **Justifica la necesidad** de un nuevo servicio vs. extender uno existente
2. **Implementa todos los componentes necesarios**:
   - Dockerfile
   - Tests
   - Documentación
   - Esquemas de base de datos
3. **Integra con API Gateway** si es necesario

## 🗄️ Base de Datos

- Usamos PostgreSQL con TypeORM
- Cada servicio gestiona su propia base de datos
- Para cambios en esquemas:
  1. Crea una nueva migración:
     ```bash
     cd services/nombre-servicio
     npm run migration:create MiNuevaMigracion
     ```
  2. Implementa los cambios necesarios (up/down)
  3. Prueba la migración localmente
  4. Incluye la migración en tu PR

## ❓ Preguntas Frecuentes

**P: ¿Cómo puedo probar cambios en múltiples servicios?**
R: Usa `docker-compose -f docker-compose.dev.yml up` para levantar todo el entorno y probar la integración completa.

**P: Encontré un bug pero no tengo tiempo para arreglarlo**
R: Abre un issue detallado con pasos para reproducir. Agradecemos la identificación de problemas aunque no puedas resolverlos.

**P: ¿Puedo contribuir con documentación aunque no sepa programar?**
R: ¡Absolutamente! La documentación es una contribución valiosa. Sigue el mismo proceso de PR.

**P: ¿Cómo manejo las credenciales para desarrollo?**
R: Nunca incluyas credenciales reales en el código. Usa el archivo `.env` (que está en `.gitignore`) para configuraciones locales.

---

## 🎉 ¡Gracias por contribuir!

Tu tiempo y esfuerzo son muy valorados. Si tienes preguntas que no están cubiertas aquí, no dudes en abrir un issue o contactar a los mantenedores.

¡Juntos construiremos un juego de estrategia increíble!