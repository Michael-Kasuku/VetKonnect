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
import AdminLoginPage from './components/Admin/Authentication/AdminLoginPage';
import AdminSignUpPage from './components/Admin/Authentication/AdminSignUpPage';
import AdminForgotPasswordPage from './components/Admin/Authentication/AdminForgotPasswordPage';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import FarmerLoginPage from './components/Farmer/Authentication/FarmerLoginPage';
import FarmerSignUpPage from './components/Farmer/Authentication/FarmerSignUpPage';
import FarmerForgotPasswordPage from './components/Farmer/Authentication/FarmerForgotPasswordPage';
import FarmerDashboard from './components/Farmer/Dashboard/FarmerDashboard';

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
                    <Route path="/adminlogin" element={<AdminLoginPage />} />
                    <Route path="/adminsignup" element={<AdminSignUpPage />} />
                    <Route path="/adminforgot" element={<AdminForgotPasswordPage />} />
                    <Route path="/admindashboard/*" element={<AdminDashboard />} />
                    <Route path="/farmerlogin" element={<FarmerLoginPage />} />
                    <Route path="/farmersignup" element={<FarmerSignUpPage />} />
                    <Route path="/farmerforgot" element={<FarmerForgotPasswordPage />} />
                    <Route path="/farmerdashboard/*" element={<FarmerDashboard />} />
                </Routes>
            </BrowserRouter> 
    </React.StrictMode>
);
