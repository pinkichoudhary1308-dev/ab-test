package com.main.repository;

import com.main.model.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VariantRepository extends JpaRepository<Variant, Integer> {
    List<Variant> findByExperimentId(int experimentId);
}
