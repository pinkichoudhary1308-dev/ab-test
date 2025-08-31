import React, { useState } from 'react';

import './LoginPage.css';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signUp, signInWithGoogle } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await signUp(name, email, password);
        }
        if (!result.success) {
            setError(result.message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-page-container">
            <div className="auth-card card">
                <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                <p>{isLogin ? "Welcome back!" : "Create your account"}</p>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                    )}
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button onClick={signInWithGoogle} className="btn btn-google btn-block">
                    <img src="https://th.bing.com/th/id/OIP.Y2rxC3_cXwXQioty4coiZwHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Google logo"/>
                    Continue with Google
                </button>

                <p className="toggle-form-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleForm} className="toggle-form-btn">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;