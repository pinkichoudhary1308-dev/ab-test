package com.main.service;

import com.main.model.Experiment;
import java.util.List;
import java.util.Optional;

public interface ExperimentService {
    Experiment saveExperiment(Experiment experiment);
    List<Experiment> getAllExperiments();
	Optional<Experiment> getExperimentById(int id);
}
