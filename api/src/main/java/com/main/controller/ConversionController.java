package com.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.main.model.Conversion;
import com.main.service.ConversionService;

@RestController
@RequestMapping("/api/conversions")
@CrossOrigin(origins = "http://localhost:5173")
public class ConversionController {

    @Autowired
    private ConversionService conversionService;

    @PostMapping
    public Conversion createConversion(@RequestBody Conversion conversion) {
        return conversionService.saveConversion(conversion);
    }
}
