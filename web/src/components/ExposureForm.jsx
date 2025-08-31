import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ExposureForm.css';

// --- Hardcoded IDs based on your database schema ---
const CTA_EXPERIMENT_ID = 2;
const BLUE_VARIANT_ID = 3;
const GREEN_VARIANT_ID = 4;

const ExposureForm = ({ onSubmissionSuccess }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!user) return;

        const checkUserExposure = async () => {
            setIsLoading(true);
            try {
                // Fetch the exposure status for the current user and experiment
                const response = await axios.get(`http://localhost:8080/api/exposures/check`, {
                    params: { experimentId: CTA_EXPERIMENT_ID, userId: user.id }
                });

                // --- THIS IS THE CORRECTED LOGIC ---
                // We check if the response.data object is not empty. An empty object
                // means the backend found no record. A populated object means the user has voted.
                if (response.data && response.data.id) {
                    // The user has a record in the exposure table, so they have already voted.
                    setHasVoted(true);
                } else {
                    // The backend returned an empty response, meaning the user has NOT voted yet.
                    setHasVoted(false);
                }

            } catch (error) {
                // This catch block will now only handle genuine network or server errors.
                console.error("Error checking user exposure:", error);
                setMessage('Could not check your participation status.');
            } finally {
                setIsLoading(false);
            }
        };

        checkUserExposure();
    }, [user]); // Re-run this check if the user object changes

    // Handle the user's vote submission
    const handleVote = async (variantId) => {
        setIsLoading(true);
        const exposureData = {
            experiment: { id: CTA_EXPERIMENT_ID },
            variant: { id: variantId },
            user: { id: user.id }
        };
        
        try {
            // POSTing this data will insert a new row into your `exposure` table
            await axios.post('http://localhost:8080/api/exposures', exposureData);
            
            setHasVoted(true); // Lock the form after a successful vote
            onSubmissionSuccess(); // Notify the dashboard to refresh the chart
        } catch (error) {
            setMessage('Failed to record your vote. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="exposure-form-container card">
            <h2>CTA Button Color Test</h2>
            
            {isLoading && <div className="loader"></div>}
            
            {!isLoading && hasVoted && (
                <p className="form-message">Thank you for participating!</p>
            )}

            {!isLoading && !hasVoted && (
                <div className="variants-selection">
                    <p>Which button color do you find more appealing?</p>
                    <div className="variants-grid">
                        <button className="btn-variant blue" onClick={() => handleVote(BLUE_VARIANT_ID)}>
                            Blue Button
                        </button>
                        <button className="btn-variant green" onClick={() => handleVote(GREEN_VARIANT_ID)}>
                            Green Button
                        </button>
                    </div>
                </div>
            )}
            
            {message && <p className="form-message error">{message}</p>}
        </div>
    );
};

export default ExposureForm;