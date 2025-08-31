package com.main.repository;

import com.main.model.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperimentRepository extends JpaRepository<Experiment, Integer> {
}
