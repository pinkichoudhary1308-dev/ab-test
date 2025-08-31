import { useState } from "react";
import { auth } from "../firebase";

const ExperimentForm = () => {
  const [name, setName] = useState("");

  const createExperiment = async () => {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const res = await fetch("http://localhost:8080/api/experiments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        metricId: 1 // assuming metric exists
      })
    });

    const data = await res.json();
    console.log("Experiment created:", data);
  };


  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Experiment Name" />
      <button onClick={createExperiment}>Create Experiment</button>
    </div>
  );
};

export default ExperimentForm;
