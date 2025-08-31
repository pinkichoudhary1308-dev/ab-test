package com.main.repository;

import com.main.model.Exposure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface ExposureRepository extends JpaRepository<Exposure, Integer> {
    Optional<Exposure> findByExperimentIdAndUserId(int experimentId, int userId);
    List<Exposure> findByExperimentId(int experimentId);
}
