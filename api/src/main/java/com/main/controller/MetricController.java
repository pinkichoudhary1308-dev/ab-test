package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.main.model.Metric;
import com.main.service.MetricService;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "http://localhost:5173")
public class MetricController {

    @Autowired
    private MetricService metricService;

    @PostMapping
    public Metric createMetric(@RequestBody Metric metric) {
        return metricService.saveMetric(metric);
    }
}
