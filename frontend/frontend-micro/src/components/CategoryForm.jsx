// src/components/CategoryForm.jsx
import { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../api/api';

const CategoryForm = ({ onCreated, editingCategory, onCancelEdit }) => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setNombre(editingCategory.nombre);
    } else {
      setNombre('');
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setLoading(true);
    try {
      if (editingCategory) {
        await updateCategoria(editingCategory.id, { nombre });
        setMensaje('Categoría actualizada correctamente');
      } else {
        await createCategoria({ nombre });
        setMensaje('Categoría registrada correctamente');
      }
      
      setNombre('');
      setTimeout(() => setMensaje(''), 3000);
      if (onCreated) onCreated();
      if (onCancelEdit) onCancelEdit();
    } catch (err) {
      console.error(err);
      setError(editingCategory ? 'Error al actualizar la categoría' : 'Error al registrar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNombre('');
    setError('');
    setMensaje('');
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="card">
      <h3>{editingCategory ? '✏️ Editar Categoría' : '➕ Registrar Categoría'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Tecnología"
            disabled={loading}
          />
        </div>

        {error && <p className="error">❌ {error}</p>}
        {mensaje && <p className="success">✅ {mensaje}</p>}

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '⏳ Guardando...' : (editingCategory ? '💾 Actualizar' : '➕ Guardar')}
          </button>
          {editingCategory && (
            <button type="button" onClick={handleCancel} className="btn-secondary" disabled={loading}>
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;