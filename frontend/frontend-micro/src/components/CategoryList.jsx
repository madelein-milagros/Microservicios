// src/components/CategoryList.jsx
import { useEffect, useState } from 'react';
import { getCategorias, deleteCategoria } from '../api/api';

const CategoryList = ({ reloadFlag, onEdit }) => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const resp = await getCategorias();
      setCategorias(resp.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al cargar categorías');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, [reloadFlag]);

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
      return;
    }

    setEliminando(id);
    try {
      await deleteCategoria(id);
      await cargarCategorias();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar la categoría. Puede que tenga productos asociados.');
    } finally {
      setEliminando(null);
    }
  };

  if (cargando) return <div className="card"><p className="loading">⏳ Cargando categorías...</p></div>;

  return (
    <div className="card">
      <h3>📋 Listado de Categorías ({categorias.length})</h3>
      {error && <p className="error">❌ {error}</p>}
      {categorias.length === 0 ? (
        <p className="empty-state">No hay categorías registradas. ¡Crea la primera!</p>
      ) : (
        <div className="table-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id}>
                  <td>#{cat.id}</td>
                  <td><strong>{cat.nombre}</strong></td>
                  <td className="acciones">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(cat)}
                      disabled={eliminando === cat.id}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(cat.id, cat.nombre)}
                      disabled={eliminando === cat.id}
                    >
                      {eliminando === cat.id ? '⏳' : '🗑️'} Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryList;