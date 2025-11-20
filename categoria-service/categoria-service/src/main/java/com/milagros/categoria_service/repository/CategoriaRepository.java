package com.milagros.categoria_service.repository;

import com.milagros.categoria_service.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
