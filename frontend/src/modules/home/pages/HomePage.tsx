import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../core/components/Button';

const HomePage: React.FC = () => {
    const categories = [
        {
            id: 1,
            title: 'Fertilizer',
            description: 'High-quality fertilizers for optimal crop growth',
            icon: '🌱',
            bgColor: 'bg-green-100',
            iconBg: 'bg-green-500',
        },
        {
            id: 2,
            title: 'Pesticide',
            description: 'Effective pest control solutions for your farm',
            icon: '🛡️',
            bgColor: 'bg-blue-100',
            iconBg: 'bg-blue-500',
        },
        {
            id: 3,
            title: 'Seeds',
            description: 'Premium quality seeds for better harvest',
            icon: '🌾',
            bgColor: 'bg-yellow-100',
            iconBg: 'bg-yellow-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-green-600">Agro E-Commerce</h1>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Welcome to Agro E-Commerce
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Your one-stop solution for agricultural products. Get high-quality fertilizers,
                        pesticides, and seeds delivered right to your doorstep.
                    </p>
                    <Link to="/login">
                        <Button className="px-8 py-4 text-lg">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Category Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Our Categories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`${category.bgColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
                        >
                            <div className={`${category.iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4`}>
                                {category.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-3">
                                {category.title}
                            </h4>
                            <p className="text-gray-700">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">
                        © 2025 Agro E-Commerce System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
