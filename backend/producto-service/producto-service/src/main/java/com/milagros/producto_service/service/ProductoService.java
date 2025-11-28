package com.milagros.producto_service.service;

import com.milagros.producto_service.client.CategoriaClient;
import com.milagros.producto_service.dto.Categoria;
import com.milagros.producto_service.dto.ProductoResponse;
import com.milagros.producto_service.model.Producto;
import com.milagros.producto_service.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository repository;
    private final CategoriaClient categoriaClient;

    public ProductoService(ProductoRepository repository, CategoriaClient categoriaClient) {
        this.repository = repository;
        this.categoriaClient = categoriaClient;
    }

    public List<ProductoResponse> listar() {
        return repository.findAll()
                .stream()
                .map(this::mapearAResponse)
                .collect(Collectors.toList());
    }

    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    public ProductoResponse obtenerPorId(Long id) {
        return repository.findById(id)
                .map(this::mapearAResponse)
                .orElse(null);
    }

    private ProductoResponse mapearAResponse(Producto producto) {
        Categoria categoria = categoriaClient.obtenerCategoria(producto.getCategoriaId());

        ProductoResponse resp = new ProductoResponse();
        resp.setId(producto.getId());
        resp.setNombre(producto.getNombre());
        resp.setPrecio(producto.getPrecio());
        resp.setCategoria(categoria);

        return resp;
    }
}
