package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.main.model.Exposure;
import com.main.service.ExposureService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exposures")
@CrossOrigin(origins = "http://localhost:5173")
public class ExposureController {

    @Autowired
    private ExposureService exposureService;

    @PostMapping
    public Exposure createExposure(@RequestBody Exposure exposure) {
        return exposureService.saveExposure(exposure);
    }

    @GetMapping("/check")
    public ResponseEntity<Exposure> checkExposure(@RequestParam int experimentId,
                                                  @RequestParam int userId) {
        Optional<Exposure> exposure = exposureService.getExposure(experimentId, userId);
        return exposure.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/experiment/{experimentId}")
    public List<Exposure> getExposuresByExperiment(@PathVariable int experimentId) {
        return exposureService.getExposuresByExperimentId(experimentId);
    }
}
