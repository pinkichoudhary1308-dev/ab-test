import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExperimentChart from '../components/ExperimentChart';
import ExposureForm from '../components/ExposureForm';
import './DashboardPage.css';

const CTA_EXPERIMENT_ID = 2;

const DashboardPage = () => {
    const [experiment, setExperiment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        const fetchExperiment = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/experiments/${CTA_EXPERIMENT_ID}`);
                setExperiment(response.data);
            } catch (err) {
                setError('Failed to fetch experiment data. Make sure the backend is running.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExperiment();
    }, []);

    const handleSubmissionSuccess = () => {
        setChartKey(prevKey => prevKey + 1);
    };

    if (isLoading) {
        return <div className="full-page-loader"><div className="loader"></div></div>;
    }
    
    if (error) {
        return <div className="full-page-error">{error}</div>;
    }

    return (
        <div className="dashboard-layout">
            <Navbar />
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Live Dashboard</h1>
                </header>
                <div className="dashboard-grid">
                    <div className="grid-item-large">
                        {experiment ? (
                            <ExperimentChart 
                                key={chartKey}
                                experiment={experiment} 
                            />
                        ) : (
                            <p>Could not load experiment chart.</p>
                        )}
                    </div>
                    <div className="grid-item-small">
                        <ExposureForm onSubmissionSuccess={handleSubmissionSuccess} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;