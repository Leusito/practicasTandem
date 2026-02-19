# Proyecto de prácticas en Tandem Software

## Autor
Manuel Gavilán Torres | 1º DAM | CES Ramón y Cajal

## Descripción del proyecto
Realización de una aplicación web que integra una API para gestionar tareas y datos y automatizar la gestión de estos para la empresa.
El proyecto se divide principalmente en dos partes:
- Backend, lógica y peticiones a la API
- Frontend, interfaz visual y UI interactivo

---

Para la realización de este proyecto utilicé lo siguiente:
### Lenguaje
- **JavaScript**
### Entorno de ejecución
- **NodeJS**, entorno de ejecución de JavaScript asíncrono basado en eventos, diseñado para construir aplicaciones de red
### Frameworks
- **Express**, framework de NodeJS para realizar peticiones HTTP a APIs externas
- **React**, framework para construir interfaz de usuario de forma dinámica
- **TailwindCSS**, framework de utilidades para CSS
### Librerías
- **Axios**, librería cliente HTTP basada en promesas para realizar peticiones asíncronas desde navegadores y NodeJS
- **Zustand**, librería de gestión de estado en aplicaciones React
### Base de datos
- **MySQL**, sistema de gestión de bases de datos relacionales basado en SQL
### Herramientas
- **MySQL Workbench**, herramienta visual unificada para diseñar, modelar, administrar y desarrollar bases de datos MySQL
- **npm**, gestor de paquetes predeterminado de NodeJS
- **pnpm**, gestor de dependencias rápido y eficiente para NodeJS
- **nodemon**, herramienta de desarrollo para NodeJS que monitorea automáticamente los cambios en código y reinicia el servidor al instante
### Plataforma
- **Zoho**, ecosistema en la nube diseñado apra gestionar y automatizar las tareas de una empresa, *en el proyecto use su API*

## Tareas
1. Hacer endpoints para una colección de Postman
2. Hacer una aplicación web con React que muestre los datos obtenidos (Usando axios, pnpm, zustand, tailwind...)
3. Añadir paginación a la aplicación y mostrar campos concretos de los datos obtenidos (id, id_pedido)
4. Añadir interactibilidad a los datos obtenidos (proyectos) para que muestren sus tareas cuando se seleccionen
5. Actualizar campos de las tareas con PATCH
6. Automatizar la actualización de las tareas
7. Añadir los proyectos (id, ejercicio, serie, numero; teniendo que obtener los tres últimos del campo id_pedido) a una base de datos en MySQL
8. Mostrar el documento generado en Swagger con los datos obtenidos de Zoho, a partir de la id conseguía id_pedido, luego dividida en ejercicio, serie y numero. Estos datos se meten en la query del endpoint que accede a Swagger y obtiene el documento.

## Opinión
Esta ha sido una experiencia bastante enriquecedora bajo mi punto de vista. He aprendido a usar y familiarizarme con lenguajes y entornos a los que no estoy acostumbrado, como JavaScript, NodeJS o React.  
Los conocimientos adquiridos en el periodo de prácticas me serán de gran utilidad de cara al futuro, ya no solo durante la realización del ciclo superior en asignaturas como Lenguaje de Marcas o Programación, sino también para cuando me enfrente al mundo laboral al haber adiquirido cierta experiencia que me podrá ser de gran ayuda.  
También agradecer a la empresa Tandem Software por haberme acogido durante estas cuatro semanas, en especial a Joaquín del Río, quien se encargó de que siempre tuviese trabajo que hacer y asegurarse de estar realizándolo de manera correcta.