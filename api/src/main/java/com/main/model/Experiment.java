package com.main.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "experiments")
public class Experiment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "metric_id", nullable = false)
    private Metric metric;

    @Column(name = "started_at", insertable = false, updatable = false)
    private Timestamp startedAt;

    @Column(name = "stopped_at")
    private Timestamp stoppedAt;

    public Experiment() {}

    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Metric getMetric() {
        return metric;
    }

    public void setMetric(Metric metric) {
        this.metric = metric;
    }

    public Timestamp getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Timestamp startedAt) {
        this.startedAt = startedAt;
    }

    public Timestamp getStoppedAt() {
        return stoppedAt;
    }

    public void setStoppedAt(Timestamp stoppedAt) {
        this.stoppedAt = stoppedAt;
    }
}
