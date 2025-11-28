// src/pages/HomePage.jsx
import { useState } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const HomePage = () => {
  const [tab, setTab] = useState('categorias');
  const [reloadCategorias, setReloadCategorias] = useState(0);
  const [reloadProductos, setReloadProductos] = useState(0);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleCategoryCreatedOrUpdated = () => {
    setReloadCategorias((v) => v + 1);
    setEditingCategory(null);
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>🛍️ Sistema de Gestión</h1>
        <p>Frontend React + Vite consumiendo microservicios vía API Gateway</p>
      </header>

      <div className="tabs">
        <button
          className={tab === 'categorias' ? 'active' : ''}
          onClick={() => {
            setTab('categorias');
            setEditingCategory(null);
          }}
        >
          📋 Categorías
        </button>
        <button
          className={tab === 'productos' ? 'active' : ''}
          onClick={() => setTab('productos')}
        >
          📦 Productos
        </button>
      </div>

      {tab === 'categorias' && (
        <div className="grid">
          <CategoryForm
            onCreated={handleCategoryCreatedOrUpdated}
            editingCategory={editingCategory}
            onCancelEdit={handleCancelEdit}
          />
          <CategoryList
            reloadFlag={reloadCategorias}
            onEdit={handleCategoryEdit}
          />
        </div>
      )}

      {tab === 'productos' && (
        <div className="grid-productos">
          <ProductForm
            onCreated={() => setReloadProductos((v) => v + 1)}
          />
          <ProductList reloadFlag={reloadProductos} />
        </div>
      )}

      <footer className="page-footer">
        <p>💡 Conectado al API Gateway en <strong>localhost:8080</strong></p>
      </footer>
    </div>
  );
};

export default HomePage;