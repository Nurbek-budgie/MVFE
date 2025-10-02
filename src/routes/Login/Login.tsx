import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login, type LoginRequest } from '../../api/auth';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const payload: LoginRequest = { email, password };

        try {
            const data = await login(payload);

            // Save tokens & user info
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('roles', JSON.stringify(data.roles));

            // Redirect based on roles
            const roles = (data.roles ?? []).map(r => r.toLowerCase());

            console.log('Full backend response:', data);
            console.log('Roles from backend:', data.roles);

            if (roles.includes('admin')) {
                navigate('/admin');
            } else if (roles.includes('manager')) {
                navigate('/manager');
            } else {
                navigate('/');
            }

        } catch (err: any) {
            setError(err.message || 'Something went wrong.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
