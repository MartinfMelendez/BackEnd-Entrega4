CoderHouse - Backend

API REST desarrollada con Node.js y Express.js como parte del curso de Backend de CoderHouse.

El proyecto implementa una API para la gestión de servicios y reservas, utilizando persistencia de datos mediante archivos JSON y operaciones CRUD.

🚀 Tecnologías utilizadas

Node.js

Express.js

JavaScript

ES Modules

File System (fs/promises)

dotenv

npm

📁 Estructura del proyecto
CoderHouse-BackEnd/
│
├── src/
│   ├── data/
│   │   ├── bookings.json
│   │   └── services.json
│   │
│   ├── controllers/
│   │   ├── bookin.controller.js
│   │   └── services.controller.js
│   │
│   ├── managers/
│   │   ├── BookingManager.js
│   │   └── ServiceManager.js
│   │
│   ├── routes/
│   │   ├── routerBooking.js
│   │   ├── router.js
│   │   └── routerService.js
│   │
│   ├── utils/
│   │
│   └── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── Readme.md

⚙️ Instalación
1. Clonar el repositorio
git clone https://github.com/MartinfMelendez/BackEnd-Entrega4

2. Ingresar al proyecto
cd BackEnd-Entrega4

3. Instalar las dependencias
npm install

4. Configurar las variables de entorno

Crear un archivo .env en la raíz del proyecto tomando como referencia el archivo .env.example.

Ejemplo:

PORT=8080


El archivo .env no debe subirse al repositorio. Para esto se encuentra incluido en .gitignore.

5. Iniciar el servidor

Para iniciar el servidor en modo desarrollo:

npm run dev


El proyecto utiliza Nodemon, por lo que el servidor se reinicia automáticamente cuando se detectan cambios en los archivos.

Una vez iniciado, la API estará disponible en:

http://localhost:8080


El puerto utilizado depende del valor configurado en la variable PORT.

📌 API REST

La API cuenta actualmente con dos recursos principales:

/api/services — gestión de servicios.

/api/bookings — gestión de reservas.

Las rutas correspondientes a las reservas se configuran en el archivo routerBooking.js.

🔧 Recurso Services

La API permite realizar operaciones CRUD sobre los servicios.

🔎 Endpoints disponibles
Método	Endpoint	Descripción
GET	/api/services	Obtener todos los servicios
GET	/api/services/:id	Obtener un servicio por ID
POST	/api/services	Crear un nuevo servicio
PUT	/api/services/:id	Actualizar un servicio
DELETE	/api/services/:id	Eliminar un servicio
1. Obtener todos los servicios

GET

GET http://localhost:8080/api/services


Devuelve la lista de servicios registrados.

2. Obtener un servicio por ID

GET

GET http://localhost:8080/api/services/:id


Ejemplo:

GET http://localhost:8080/api/services/1


El valor 1 corresponde al ID del servicio que se desea consultar.

3. Crear un nuevo servicio

POST

POST http://localhost:8080/api/services


Enviar los datos mediante el Body en formato JSON.

Ejemplo:

{
  "name": "Servicio de prueba",
  "description": "Descripción del servicio",
  "duration": 60,
  "price": 15000,
  "category": "General",
  "available": true
}

Campos
Campo	Tipo	Descripción
name	String	Nombre del servicio
description	String	Descripción del servicio
duration	Number	Duración del servicio
price	Number	Precio del servicio
category	String	Categoría del servicio
available	Boolean	Indica si el servicio está disponible
4. Actualizar un servicio

PUT

PUT http://localhost:8080/api/services/:id


Ejemplo:

PUT http://localhost:8080/api/services/1


Body:

{
  "name": "Servicio actualizado",
  "description": "Nueva descripción",
  "duration": 90,
  "price": 20000,
  "category": "General",
  "available": true
}


El :id corresponde al servicio que se desea modificar.

5. Eliminar un servicio

DELETE

DELETE http://localhost:8080/api/services/:id


Ejemplo:

DELETE http://localhost:8080/api/services/1


El :id corresponde al servicio que se desea eliminar.

📅 Recurso Bookings

El recurso bookings permite administrar las reservas de los clientes y asociar servicios a cada reserva.

Cada reserva posee la siguiente estructura:

{
  "id": 1,
  "clientName": "Martin Biagi",
  "clientEmail": "Martin@email.com",
  "date": "2026-10-10",
  "time": "15:30",
  "status": "confirmada",
  "services": []
}


El campo id se genera automáticamente.

Los servicios asociados a una reserva se almacenan dentro del array services utilizando la siguiente estructura:

{
  "service": 1,
  "quantity": 1
}


Si el mismo servicio se agrega nuevamente a la reserva, no se crea un nuevo elemento. Se incrementa la propiedad quantity.

Por ejemplo:

"services": [
  {
    "service": 1,
    "quantity": 2
  }
]


Las rutas correspondientes a este recurso se configuran en el archivo:

routerBooking.js

🔎 Endpoints disponibles
Método	Endpoint	Descripción
POST	/api/bookings	Crear una nueva reserva
GET	/api/bookings/:bid	Obtener una reserva por ID
POST	/api/bookings/:bid/services/:sid	Agregar un servicio a una reserva
1. Crear una reserva

POST

POST http://localhost:8080/api/bookings


La reserva puede crearse inicialmente con el array services vacío.

Ejemplo:

{
  "clientName": "Martin Biagi",
  "clientEmail": "Martin@email.com",
  "date": "2026-10-10",
  "time": "15:30",
  "status": "confirmada",
  "services": []
}


El id de la reserva se genera automáticamente.

2. Obtener una reserva por ID

GET

GET http://localhost:8080/api/bookings/:bid


Ejemplo:

GET http://localhost:8080/api/bookings/1


El :bid corresponde al ID de la reserva que se desea consultar.

3. Agregar un servicio a una reserva

POST

POST http://localhost:8080/api/bookings/:bid/services/:sid


Ejemplo:

POST http://localhost:8080/api/bookings/1/services/2


Donde:

:bid corresponde al ID de la reserva.

:sid corresponde al ID del servicio.

Antes de agregar el servicio, la API valida que:

La reserva exista.

El servicio exista.

Si el servicio todavía no está asociado a la reserva, se agrega con:

{
  "service": 2,
  "quantity": 1
}


Si el servicio ya existe dentro de la reserva, se incrementa su cantidad:

{
  "service": 2,
  "quantity": 2
}

🧪 Pruebas de la API

Los endpoints pueden probarse utilizando herramientas como:

Postman

Insomnia

Thunder Client

REST Client para VS Code

Se recomienda probar los diferentes endpoints utilizando los métodos HTTP correspondientes:

GET
POST
PUT
DELETE


Para el recurso bookings:

POST /api/bookings
GET /api/bookings/:bid
POST /api/bookings/:bid/services/:sid

📦 Dependencias

El proyecto utiliza actualmente:

Express 5.2.1 — Framework para la creación del servidor y la API REST.

dotenv 17.4.2 — Gestión de variables de entorno.

El proyecto utiliza ES Modules, por lo que se trabaja con import y export.

La persistencia de los datos se realiza mediante archivos JSON utilizando el módulo fs/promises de Node.js.

🎯 Objetivo del proyecto

Este proyecto forma parte del aprendizaje de Backend con Node.js y tiene como objetivo aplicar conceptos fundamentales del desarrollo de APIs REST, incluyendo:

Creación de servidores con Node.js.

Uso del framework Express.

Manejo de rutas.

Organización de rutas mediante routers.

Métodos HTTP.

Creación de endpoints.

Manejo de parámetros.

Recepción de información mediante JSON.

Operaciones CRUD.

Gestión de reservas.

Asociación de servicios a reservas.

Manejo de cantidades de servicios.

Persistencia de datos mediante File System.

Uso de variables de entorno.

Organización básica de un proyecto backend.

👨‍💻 Autor

Martin F. Melendez

Repositorio:

https://github.com/MartinfMelendez/CoderHouse-BackEnd