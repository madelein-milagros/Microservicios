// src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import { getProductos } from '../api/api';

const ProductList = ({ reloadFlag }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const resp = await getProductos();
      setProductos(resp.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al cargar productos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [reloadFlag]);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(precio);
  };

  if (cargando) return <div className="card"><p className="loading">⏳ Cargando productos...</p></div>;

  return (
    <div className="card card-full">
      <h3>📦 Listado de Productos ({productos.length})</h3>
      {error && <p className="error">❌ {error}</p>}
      {productos.length === 0 ? (
        <p className="empty-state">No hay productos registrados. ¡Crea el primero!</p>
      ) : (
        <div className="productos-grid">
          {productos.map((prod) => (
            <div key={prod.id} className="producto-card">
              <div className="producto-header">
                <h4>{prod.nombre}</h4>
                <span className="producto-id">#{prod.id}</span>
              </div>
              <div className="producto-body">
                <div className="producto-precio">
                  {formatearPrecio(prod.precio)}
                </div>
                {prod.categoria && (
                  <div className="producto-categoria">
                    <span className="categoria-badge">
                      {prod.categoria.nombre}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;