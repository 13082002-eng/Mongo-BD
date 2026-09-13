# 🛍️ Mi E-commerce

Aplicación web de e-commerce desarrollada con React, Redux, Node.js, Express y MongoDB.

El proyecto incluye catálogo de productos, autenticación de usuarios, carrito de compra, wishlist, panel de administración, CRUD de productos, subida de imágenes mediante Cloudinary e integración de pagos con Stripe.

---

## 🚀 Demo

### Frontend

https://luxury-kataifi-42cd6f.netlify.app

### Backend / API

https://mongo-bd.onrender.com

### Repositorio

https://github.com/13082002-eng/Mongo-BD

---

## 🧰 Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- JavaScript
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookies HTTP-only
- Cookie Parser
- CORS
- Multer

### Servicios externos

- Cloudinary → almacenamiento de imágenes
- Stripe → pagos
- MongoDB Atlas → base de datos
- Render → despliegue del backend
- Netlify → despliegue del frontend

---

## 📋 Funcionalidades

### 👤 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Autenticación mediante JWT.
- Token almacenado en cookie HTTP-only.
- Persistencia de sesión.
- Rutas protegidas.
- Protección de rutas de administración según el rol del usuario.

---

### 🛍️ Catálogo

- Listado de productos desde una API real.
- Página de detalle de producto.
- Buscador de productos.
- Filtros.
- Control de cantidad.
- Información de precio y stock.
- Estados de carga y error.
- Imágenes de productos.

---

### 🛒 Carrito

- Añadir productos.
- Aumentar cantidad.
- Disminuir cantidad.
- Eliminar productos.
- Cálculo de subtotales.
- Cálculo del total.
- Persistencia del carrito asociado al usuario.
- Checkout mediante Stripe.

---

### ❤️ Wishlist

- Añadir productos a favoritos.
- Eliminar productos de favoritos.
- Página de favoritos.
- Persistencia de favoritos.

---

### 👑 Panel de administración

El acceso al panel está protegido y únicamente pueden acceder usuarios con rol `ADMIN`.

Funcionalidades:

- Listar productos.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Validaciones.
- Formularios reutilizables.
- Gestión del stock y precio.
- Subida de imágenes.

---

### ☁️ Cloudinary

Las imágenes de los nuevos productos se envían:

1. Desde el frontend.
2. Al backend mediante `multipart/form-data`.
3. El backend utiliza Multer para recibir la imagen.
4. La imagen se sube a Cloudinary.
5. Se guarda la URL de Cloudinary en MongoDB.
6. La aplicación utiliza esa URL para mostrar la imagen.

---

### 💳 Stripe

Se ha integrado Stripe para realizar pagos.

Flujo:

```text
Usuario
   ↓
Carrito
   ↓
Checkout
   ↓
Stripe
   ↓
Pago
   ↓
Página de confirmación

Tarjeta de prueba utilizada: 4242 4242 4242 4242
