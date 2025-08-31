package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.main.model.Experiment;
import com.main.service.ExperimentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/experiments")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperimentController {

    @Autowired
    private ExperimentService experimentService;

    @PostMapping
    public Experiment createExperiment(@RequestBody Experiment experiment) {
        return experimentService.saveExperiment(experiment);
    }

    @GetMapping
    public List<Experiment> getAllExperiments() {
        return experimentService.getAllExperiments();
    }

    @GetMapping("/{id}")
    public Optional<Experiment> getExperimentById(@PathVariable int id) {
        return experimentService.getExperimentById(id);
    }
}
