package com.main.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "exposures", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"experiment_id", "user_id"})
})
public class Exposure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "experiment_id", nullable = false)
    private Experiment experiment;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private Variant variant;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "timestamp", insertable = false, updatable = false)
    private Timestamp timestamp;

    public Exposure() {}

   
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Experiment getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiment experiment) {
        this.experiment = experiment;
    }

    public Variant getVariant() {
        return variant;
    }

    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
