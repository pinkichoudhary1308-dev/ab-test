package com.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.model.Conversion;
import com.main.repository.ConversionRepository;

@Service
public class ConversionServiceImpl implements ConversionService {

    @Autowired
    private ConversionRepository conversionRepository;

    @Override
    public Conversion saveConversion(Conversion conversion) {
        return conversionRepository.save(conversion);
    }
}
