# Sistema de Registro y Gestión de Pasaportes

Este proyecto es un sistema básico de registro de usuarios y gestión de pasaportes, diseñado para medir conocimientos técnicos en el desarrollo de sistemas de información. El sistema cuenta con funcionalidades tanto para usuarios como para administradores.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requerimientos Funcionales](#requerimientos-funcionales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso y Ejecución](#uso-y-ejecución)
- [Documentación de la API](#documentación-de-la-api)

- [Autor ](#autor)

## Descripción General

El sistema permite:
- **Registro y autenticación de usuarios**: Formulario de registro y login (usando el ID único para login).
- **Gestión de datos personales**: Los usuarios pueden actualizar sus datos personales y cambiar su contraseña.
- **Gestión de pasaportes**: Cada usuario puede tener varios pasaportes, pero solo uno activo a la vez.
- **Panel Administrativo**: Un administrador puede:
  - Ver la lista de todos los usuarios y pasaportes.
  - Habilitar o deshabilitar usuarios y pasaportes.
  - Asociar nuevos pasaportes a usuarios.

## Requerimientos Funcionales

1. **Base de Datos**
   - Almacenar usuarios con nombre, correo electrónico, contraseña y rol (administrador o ciudadano).  
   - Cada usuario posee un ID único que se utiliza para login.
2. **Autenticación y Registro**
   - Formulario de registro y login para usuarios.
3. **Gestión de Pasaportes**
   - Crear una tabla de pasaportes que incluya: tipo de pasaporte, fecha de emisión, fecha de vencimiento, lugar y país de emisión, número de pasaporte y relación con el usuario.
   - Cada usuario puede tener uno o más pasaportes, pero solo uno activo a la vez.
4. **Modificación de Datos**
   - Los usuarios pueden modificar sus datos personales y actualizar su contraseña (no el ID único).
5. **Panel Administrativo**
   - Un usuario administrador puede visualizar listas de usuarios y pasaportes, ver detalles y realizar acciones como:
     - Habilitar o deshabilitar pasaportes.
     - Asociar nuevos pasaportes a usuarios.
     - Deshabilitar usuarios.

## Arquitectura del Sistema

El sistema se compone de dos capas principales usando la arquitectura cliente-servidor:

- **Backend**
  - Desarrollado con Node.js y Express.
   - **AWS RDS** para la base de datos MySQL
  - Función Lambda para la ejecución del script SQL (ubicado en la carpeta `db`)
  - Implementa una API REST para autenticación, registro, gestión de usuarios y pasaportes.
  - Middleware para autenticación y autorización (usando JWT).
  - Documentación de la API con Swagger.

- **Frontend**
  - Construido con Vite, React y TypeScript.
  - Sigue el patrón **view-container** para separar la lógica de la presentación.
  - Rutas protegidas con React Router.
  - Consumo de la API a través de Axios.
  - Estilos con módulos SCSS.
  - Notificaciones con SweetAlert2.

## Tecnologías Utilizadas

- **Backend:**
  - Node.js, Express
  - Sequelize (ORM)
  - MySQL / PostgreSQL / SQL Server
  - JWT para autenticación
  - Swagger para documentación de la API

- **Frontend:**
  - Vite, React, TypeScript
  - React Router DOM
  - react-hook-form para formularios
  - Axios para consumir la API
  - SweetAlert2 para notificaciones
  - SCSS Modules para estilos

## Estructura del Proyecto

### Backend
```txt
backend/
├── src/
│   ├── controllers/   # Controladores de la API
│   ├── models/        # Modelos de datos (usuarios, pasaportes, etc.)
│   ├── routes/        # Definición de rutas y endpoints
│   ├── services/      # Lógica de negocio y conexión a la base de datos
│   ├── middlewares/   # Middleware de autenticación y autorización
│   ├── config/        # Configuración de la base de datos y variables de entorno
│   └── server.js      # Punto de entrada de la aplicación
├── package.json
└── README.md (Backend)

```

### Frontend
```txt
frontend/
├── public/               # index.html y archivos estáticos
├── src/
│   ├── assets/           # Imágenes, fuentes y otros recursos
│   ├── components/       # Componentes de presentación (por ejemplo, LoginView, DashboardHeader)
│   ├── containers/       # Contenedores (LoginContainer, DashboardContainer, AdminPanelContainer)
│   ├── context/          # Contextos globales (AuthContext)
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Vistas completas (LoginPage, RegisterPage, DashboardPage, AdminPanelPage, NotFoundPage)
│   ├── routes/           # Configuración de rutas (AppRoutes.tsx, ProtectedRoute.tsx)
│   ├── services/         # Servicios para consumir la API (api.ts, auth.api.ts, passport.api.ts, admin.api.ts)
│   ├── styles/           # Estilos globales (global.scss)
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada de la aplicación
├── .env                  # Variables de entorno (VITE_API_URL, etc.)
├── package.json
└── README.md (Frontend)

```
## Instalación y Configuración

### Backend:
1. Clona el repositorio y navega al directorio `backend`.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno (por ejemplo, DB_HOST, DB_USER, DB_PASS, JWT_SECRET, etc.).

4. Inicia el servidor con `npm start` o `npm run dev`.

### Frontend:
1. Clona el repositorio y navega al directorio `frontend`.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` en la raíz y define:
VITE_API_URL=http://localhost:3000/api
4. Inicia el servidor de desarrollo con `npm run dev`.

## Uso y Ejecución

- **API REST:**  
Con el backend iniciado, puedes acceder a la documentación en `http://localhost:3000/api-docs`.

- **Frontend:**  
La aplicación frontend se conecta al backend a través de Axios.  
- Los usuarios pueden registrarse e iniciar sesión.
- Las rutas protegidas permiten el acceso a vistas como Dashboard y Perfil.
- El administrador tiene acceso a un panel de administración para gestionar usuarios y pasaportes.

## Documentación de la API

La documentación de la API se genera con Swagger.  
Accede a `http://localhost:3000/api-docs` para ver una descripción completa de los endpoints, parámetros y respuestas.



## Autor 

- **Autor:** Daniel Barrera


