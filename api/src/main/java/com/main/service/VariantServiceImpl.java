package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.model.Variant;
import com.main.repository.VariantRepository;
import java.util.List;

@Service
public class VariantServiceImpl implements VariantService {

    @Autowired
    private VariantRepository variantRepository;

    @Override
    public Variant saveVariant(Variant variant) {
        return variantRepository.save(variant);
    }

    @Override
    public List<Variant> getVariantsByExperimentId(int experimentId) {
        return variantRepository.findByExperimentId(experimentId);
    }
}
