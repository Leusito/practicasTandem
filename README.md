# practicasTandem

Repositorio de prácticas que contiene una aplicación dividida en frontend y backend, orientada a la integración con servicios externos (como Zoho) y gestión de datos mediante API.

## Descripción

Este proyecto está estructurado en dos partes principales:

- **Backend**: encargado de la lógica de negocio, conexión con base de datos y consumo de APIs externas.
- **Frontend**: interfaz de usuario que consume los servicios expuestos por el backend.

El objetivo del proyecto es practicar el desarrollo full stack separando responsabilidades entre cliente y servidor.

---

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- MySQL
- Axios
- dotenv

### Frontend
- JavaScript
- HTML
- TailwindCSS
- zustand

### Otras herramientas
- Git
- GitHub
- MySQL Workbench
- Postman (para pruebas de API)

---

## Estructura del proyecto

practicasTandem/
├── zoho_back/        # Backend (API, base de datos, lógica)
├── zoho_front/       # Frontend (interfaz de usuario)
└── .gitignore

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Leusito/practicasTandem.git
cd practicasTandem
```

### 2. Configurar el backend

```bash
cd zoho_back
npm install
```

Crear un archivo `.env` con las variables necesarias, por ejemplo:

```
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=nombre_base_datos
```

### 3. Iniciar el servidor

```bash
npm start
```

O si se usa nodemon:

```bash
npm run dev
```

El servidor debería ejecutarse en:

http://localhost:3000

---

## Uso

### Backend

El backend expone rutas API que permiten:

- Consultar datos
- Actualizar información
- Integrarse con servicios externos (por ejemplo Zoho)
- Gestionar información almacenada en MySQL

Las rutas pueden probarse mediante Postman o desde el frontend.

---

### Frontend

El frontend consume la API del backend para:

- Mostrar información al usuario
- Enviar formularios
- Actualizar datos dinámicamente

Para ejecutarlo, puede abrirse el archivo principal (`index.html`) directamente en el navegador o utilizar un servidor de desarrollo si está configurado.

---

## Objetivos del proyecto

- Practicar arquitectura cliente-servidor
- Integrar APIs externas
- Trabajar con bases de datos relacionales
- Gestionar variables de entorno
- Aplicar buenas prácticas con Git

---
