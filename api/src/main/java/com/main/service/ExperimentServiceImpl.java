package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.model.Experiment;
import com.main.repository.ExperimentRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ExperimentServiceImpl implements ExperimentService {

    @Autowired
    private ExperimentRepository experimentRepository;

    @Override
    public Experiment saveExperiment(Experiment experiment) {
        return experimentRepository.save(experiment);
    }

    @Override
    public Optional<Experiment> getExperimentById(int id) {
        return experimentRepository.findById(id);
    }

    @Override
    public List<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }
}
