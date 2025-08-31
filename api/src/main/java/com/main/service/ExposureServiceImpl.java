package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.model.Exposure;
import com.main.repository.ExposureRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ExposureServiceImpl implements ExposureService {

    @Autowired
    private ExposureRepository exposureRepository;

    @Override
    public Exposure saveExposure(Exposure exposure) {
        return exposureRepository.save(exposure);
    }

    @Override
    public Optional<Exposure> getExposure(int experimentId, int userId) {
        return exposureRepository.findByExperimentIdAndUserId(experimentId, userId);
    }

    @Override
    public List<Exposure> getExposuresByExperimentId(int experimentId) {
        return exposureRepository.findByExperimentId(experimentId);
    }
}
