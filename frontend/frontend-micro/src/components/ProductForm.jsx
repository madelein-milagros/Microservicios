// src/components/ProductForm.jsx
import { useEffect, useState } from 'react';
import { createProducto, getCategorias } from '../api/api';

const ProductForm = ({ onCreated }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar categorías para el select
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const resp = await getCategorias();
        setCategorias(resp.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las categorías');
      }
    };
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    const p = parseFloat(precio);
    if (isNaN(p) || p <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    if (!categoriaId) {
      setError('Debes seleccionar una categoría');
      return;
    }

    setLoading(true);
    try {
      await createProducto({
        nombre,
        precio: p,
        categoriaId: Number(categoriaId),
      });

      setMensaje('Producto registrado correctamente');
      setNombre('');
      setPrecio('');
      setCategoriaId('');

      setTimeout(() => setMensaje(''), 3000);
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      setError('Error al registrar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>➕ Registrar Producto</h3>
      {categorias.length === 0 && (
        <div className="warning-message">
          ⚠️ No hay categorías disponibles. Ve a "Categorías" para crear una primero.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Laptop Lenovo IdeaPad"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Precio (S/):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: 3500.00"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Seleccionar categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error">❌ {error}</p>}
        {mensaje && <p className="success">✅ {mensaje}</p>}

        <button type="submit" disabled={loading || categorias.length === 0} className="btn-primary">
          {loading ? '⏳ Guardando...' : '➕ Guardar Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;