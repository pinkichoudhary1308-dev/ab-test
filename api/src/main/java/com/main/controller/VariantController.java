package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.main.model.Variant;
import com.main.service.VariantService;

import java.util.List;

@RestController
@RequestMapping("/api/variants")
@CrossOrigin(origins = "http://localhost:5173")
public class VariantController {

    @Autowired
    private VariantService variantService;

    @PostMapping
    public Variant createVariant(@RequestBody Variant variant) {
        return variantService.saveVariant(variant);
    }

    @GetMapping("/experiment/{experimentId}")
    public List<Variant> getVariantsByExperiment(@PathVariable int experimentId) {
        return variantService.getVariantsByExperimentId(experimentId);
    }
}
