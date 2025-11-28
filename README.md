# 🧁 Proyecto Microservicios - Semana 14
### Arquitectura con Spring Boot, Eureka, API Gateway, Feign Client y MySQL

Este proyecto implementa una arquitectura de **microservicios** utilizando herramientas del ecosistema de **Spring Cloud**, permitiendo comunicación distribuida entre servicios, balanceo, escalabilidad y descubrimiento dinámico mediante **Eureka Server**.

## 📌 Microservicios incluidos

| Servicio | Descripción | Puerto |
|----------|------------|--------|
| **Eureka Server** | Registro y descubrimiento de servicios | 8761 |
| **Categoria-Service** | CRUD de categorías | 8090 |
| **Producto-Service** | CRUD de productos + consumo de categorías via Feign | 8091 |
| **API Gateway** | Punto de entrada único para todas las APIs | 8080 |

---

## 🏗 Arquitectura General

           +--------------------+
           |    Eureka Server   |
           |      (8761)        |
           +---------+----------+
                     |
      ------------------------------
      |                            |
+------------------+ +----------------------+
| CategoriaService | | ProductoService |
| (8090) | | (8091) |                  |
+------------------+ +-----------+----------+
|
| Feign Client
|
+----------------+
| API Gateway |
| (8080) |
+----------------+



---

## 🛠 Tecnologías Utilizadas

- Java 21
- Spring Boot 3.5.7
- Spring Cloud 2025.0.0
- Eureka Server & Client
- Spring Cloud Gateway MVC
- Feign Client
- JPA / Hibernate
- MySQL
- Maven

---

## 🔗 Endpoints Disponibles

### 📍 A través del Gateway (recomendado)
| Método | Ruta | Servicio | Descripción |
|--------|------|----------|-------------|
| GET | `/api/categorias` | categoria-service | Listar categorías |
| POST | `/api/categorias` | categoria-service | Crear categoría |
| GET | `/api/productos` | producto-service | Listar productos + categoría |
| POST | `/api/productos` | producto-service | Crear producto |

---

## 🧪 Pruebas con Postman

### Crear categoría
```json
POST http://localhost:8080/api/categorias
{
  "nombre": "Tecnología"
}

Crear producto
POST http://localhost:8080/api/productos
{
  "nombre": "Laptop Lenovo",
  "precio": 3500,
  "categoriaId": 1
}

Respuesta esperada
[
  {
    "id": 1,
    "nombre": "Laptop Lenovo",
    "precio": 3500,
    "categoria": {
      "id": 1,
      "nombre": "Tecnología"
    }
  }
]

👩‍💻 Autora
Milagros Ramos
Proyecto académico – Tecsup
Microservicios – Desarrollo de Aplicaciones en Internet

⭐ Si este proyecto te sirvió, no olvides darle una estrella ⭐
