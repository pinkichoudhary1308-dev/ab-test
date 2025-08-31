package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.model.Metric;
import com.main.repository.MetricRepository;

@Service
public class MetricServiceImpl implements MetricService {

    @Autowired
    private MetricRepository metricRepository;

    @Override
    public Metric saveMetric(Metric metric) {
        return metricRepository.save(metric);
    }
}
