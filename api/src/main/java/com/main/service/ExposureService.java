package com.main.service;

import com.main.model.Exposure;
import java.util.List;
import java.util.Optional;

public interface ExposureService {
    Exposure saveExposure(Exposure exposure);
    Optional<Exposure> getExposure(int experimentId, int userId);
    List<Exposure> getExposuresByExperimentId(int experimentId);
}
