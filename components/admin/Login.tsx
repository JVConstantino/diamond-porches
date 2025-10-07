import React, { useState } from 'react';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.0001 1.69226L3.92725 9.76511L12.0001 22.308L20.0729 9.76511L12.0001 1.69226ZM12.0001 4.33774L17.4272 9.76511H6.57294L12.0001 4.33774Z"></path>
    </svg>
);

interface LoginProps {
    onLoginSuccess: () => void;
}

const ADMIN_PASSWORD = 'diamondadmin'; // Hardcoded password for demonstration

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setError('');
            onLoginSuccess();
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-body">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <a href="#" className="inline-flex items-center gap-2 text-2xl font-bold text-brand-blue-800">
                        <DiamondIcon className="h-6 w-6 text-brand-blue-600" />
                        DIAMOND Admin
                    </a>
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">Admin Panel Access</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm"
                        />
                    </div>
                    
                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                 <div className="text-center border-t pt-4 mt-6">
                    <a href="#" className="text-sm font-medium text-brand-blue-600 hover:text-brand-blue-500">
                        &larr; Back to main site
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;