package com.main.dto;
import java.util.Map;
public class ExperimentResult {
    private double conversionRateA;
    private double conversionRateB;
    private double pValue;
    private double zScore;
    private String conclusion;
    private Map<String, Long> variantExposures;
    private Map<String, Long> variantConversions;
   
    public double getConversionRateA() {
        return conversionRateA;
    }
    public void setConversionRateA(double conversionRateA) {
        this.conversionRateA = conversionRateA;
    }
    public double getConversionRateB() {
        return conversionRateB;
    }
    public void setConversionRateB(double conversionRateB) {
        this.conversionRateB = conversionRateB;
    }
    public double getpValue() {
        return pValue;
    }
    public void setpValue(double pValue) {
        this.pValue = pValue;
    }
    public double getzScore() {
        return zScore;
    }
    public void setzScore(double zScore) {
        this.zScore = zScore;
    }
    public String getConclusion() {
        return conclusion;
    }
    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }
    public Map<String, Long> getVariantExposures() {
        return variantExposures;
    }
    public void setVariantExposures(Map<String, Long> variantExposures) {
        this.variantExposures = variantExposures;
    }
    public Map<String, Long> getVariantConversions() {
        return variantConversions;
    }
    public void setVariantConversions(Map<String, Long> variantConversions) {
        this.variantConversions = variantConversions;
    }
}