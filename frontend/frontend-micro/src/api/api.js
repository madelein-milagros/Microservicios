// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // API Gateway
});

// Categorías
export const getCategorias = () => api.get('/api/categorias');
export const getCategoria = (id) => api.get(`/api/categorias/${id}`);
export const createCategoria = (data) => api.post('/api/categorias', data);
export const updateCategoria = (id, data) => api.put(`/api/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/api/categorias/${id}`);

// Productos
export const getProductos = () => api.get('/api/productos');
export const getProducto = (id) => api.get(`/api/productos/${id}`);
export const createProducto = (data) => api.post('/api/productos', data);

export default api;