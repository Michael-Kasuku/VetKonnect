import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import TermsOfServicePage from './components/Landing/TermsOfServicePage';
import PrivacyPolicyPage from './components/Landing/PrivacyPolicyPage';
import VetLoginPage from './components/Vet/Authentication/VetLoginPage';
import VetSignUpPage from './components/Vet/Authentication/VetSignUpPage';
import VetForgotPasswordPage from './components/Vet/Authentication/VetForgotPasswordPage';
import VetDashboard from './components/Vet/Dashboard/VetDashboard';
import ProtectedRoute from './components/Vet/Authentication/ProtectedRoute'; // Import ProtectedRoute

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/vetlogin" element={<VetLoginPage />} />
                    <Route path="/vetsignup" element={<VetSignUpPage />} />
                    <Route path="/vetforgot" element={<VetForgotPasswordPage />} />
                    <Route path="/vetdashboard/*" element={<VetDashboard />} />
                </Routes>
            </BrowserRouter> 
    </React.StrictMode>
);
