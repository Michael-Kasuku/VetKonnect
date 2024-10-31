import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS
import 'jquery'; // Import jQuery
import '@popperjs/core'; // Import Popper.js
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import to use 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route components
/*User defined components*/
import LandingPage from './components/Landing/LandingPage';
import TermsOfServicePage from './components/Landing/TermsOfServicePage';
import PrivacyPolicyPage from './components/Landing/PrivacyPolicyPage';
import VetLoginPage from './components/Vet/Authentication/VetLoginPage';
import VetSignUpPage from './components/Vet/Authentication/VetSignUpPage';
import VetForgotPasswordPage from './components/Vet/Authentication/VetForgotPasswordPage';
import VetDashboard from './components/Vet/Dashboard/VetDashboard';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/vet/login" element={<VetLoginPage />} />
                <Route path="/vet/signup" element={<VetSignUpPage />} />
                <Route path="/vet/forgot" element={<VetForgotPasswordPage />} />
                <Route path="/vet/*" element={<VetDashboard />} /> {/* Use wildcard for nested routes */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
