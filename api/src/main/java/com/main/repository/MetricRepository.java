package com.main.repository;

import com.main.model.Metric;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricRepository extends JpaRepository<Metric, Integer> {
}
