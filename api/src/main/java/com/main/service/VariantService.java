package com.main.service;

import com.main.model.Variant;
import java.util.List;

public interface VariantService {
    Variant saveVariant(Variant variant);
	List<Variant> getVariantsByExperimentId(int experimentId);
}
