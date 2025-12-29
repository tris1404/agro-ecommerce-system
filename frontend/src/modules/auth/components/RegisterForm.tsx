import React, { useState } from 'react';
import Input from '../../core/components/Input';
import Button from '../../core/components/Button';
import useAuth from '../hooks/useAuth';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<{ username?: string; email?: string; password?: string }>({});

    const { register, isLoading, error } = useAuth();

    const validate = (): boolean => {
        const errors: { username?: string; email?: string; password?: string } = {};

        if (!username) {
            errors.username = 'Username is required';
        } else if (username.length < 2) {
            errors.username = 'Username must be at least 2 characters';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await register(username, email, password);
        } catch (err) {
            // Error is handled by useAuth hook
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={validationErrors.username}
            />

            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validationErrors.email}
            />

            <Input
                type="password"
                label="Password"
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={validationErrors.password}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
