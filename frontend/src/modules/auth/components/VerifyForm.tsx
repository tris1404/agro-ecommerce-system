import React, { useState } from 'react';
import Input from '../../core/components/Input';
import Button from '../../core/components/Button';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const VerifyForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ email?: string; verificationCode?: string }>({});

    const navigate = useNavigate();

    const validate = (): boolean => {
        const errors: { email?: string; verificationCode?: string } = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!verificationCode) {
            errors.verificationCode = 'Verification code is required';
        } else if (verificationCode.length !== 6) {
            errors.verificationCode = 'Verification code must be 6 digits';
        } else if (!/^\d+$/.test(verificationCode)) {
            errors.verificationCode = 'Verification code must contain only numbers';
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
            setIsLoading(true);
            setError(null);
            await authService.verify({ email, verificationCode });
            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">✅ Account Verified Successfully!</h3>
                <p>Redirecting to login page...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
                <p className="font-semibold mb-1">📧 Check your email</p>
                <p>We've sent a 6-digit verification code to your email address.</p>
            </div>

            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validationErrors.email}
            />

            <Input
                type="text"
                label="Verification Code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                error={validationErrors.verificationCode}
                maxLength={6}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
                Verify Account
            </Button>
        </form>
    );
};

export default VerifyForm;
