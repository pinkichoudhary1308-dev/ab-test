package com.main.repository;

import com.main.model.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConversionRepository extends JpaRepository<Conversion, Integer> {
    List<Conversion> findByExperimentId(int experimentId);
}
