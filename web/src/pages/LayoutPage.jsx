import React, { useEffect, useState } from "react";
import { getAllExperiments, getVariantsByExperiment, createExposure, getExperimentResults } from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chart from "../components/Chart";

const LayoutPage = ({ user, onLogout }) => {
  const [experiments, setExperiments] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    try {
      const data = await getAllExperiments();
      setExperiments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExperimentSelect = async (experimentId) => {
    setSelectedExperiment(experimentId);
    setSelectedVariant(null);
    setResults(null);
    try {
      const variantData = await getVariantsByExperiment(experimentId);
      setVariants(variantData);
      const resultData = await getExperimentResults(experimentId);
      setResults(resultData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async () => {
    if (!selectedExperiment || !selectedVariant) {
      setMessage("Please select an experiment and variant.");
      return;
    }
    try {
      await createExposure({
        experimentId: selectedExperiment,
        variantId: selectedVariant,
        userId: user.id
      });
      setMessage("Your vote has been recorded!");
      // Refresh results after vote
      const resultData = await getExperimentResults(selectedExperiment);
      setResults(resultData);
    } catch (err) {
      console.error(err);
      setMessage("You have already voted for this experiment.");
    }
  };

  return (
    <div className="layout-page">
      <Navbar onLogout={onLogout} user={user} />

      <div className="dashboard">
        <h2>AB Testing Dashboard</h2>

        <div className="experiment-selection">
          <label>Select Experiment: </label>
          <select onChange={(e) => handleExperimentSelect(e.target.value)} value={selectedExperiment || ""}>
            <option value="">--Choose--</option>
            {experiments.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.name}
              </option>
            ))}
          </select>
        </div>

        {variants.length > 0 && (
          <div className="variant-selection">
            <label>Select Variant to Vote: </label>
            <select onChange={(e) => setSelectedVariant(e.target.value)} value={selectedVariant || ""}>
              <option value="">--Choose--</option>
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <button onClick={handleVote}>Vote</button>
          </div>
        )}

        {results && (
          <div className="chart-section">
            <h3>Experiment Results</h3>
            <Chart data={results} />
            <p>Conclusion: {results.conclusion}</p>
          </div>
        )}

        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default LayoutPage;
