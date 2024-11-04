// VetDashboard.js
import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HorizontalNavBar from './HorizontalNavBar';
import Dashboard from './Dashboard';
import VetProfiles from '../VetDirectory/VetProfiles';
import AppointmentHistory from '../VetDirectory/AppointmentHistory';
import Products from '../AgrovetHub/Products';
import OrderManagement from '../AgrovetHub/OrderManagement';
import Blogs from '../EduContent/Blogs';
import Webinars from '../EduContent/Webinars';
import Discussions from '../CommunityForum/Discussions';

class VetDashboard extends Component {
    state = {
        isSidebarOpen: true,
    };

    toggleSidebar = () => {
        this.setState((prevState) => ({
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };

    render() {
        const { isSidebarOpen } = this.state;

        const styles = {
            container: {
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                margin: 0,
            },
            header: {
                position: 'fixed',
                top: 0,
                left: 0,
                height: '64px',
                width: '100%',
                backgroundColor: '#FFC107',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                zIndex: 1000,
                boxSizing: 'border-box',
            },
            mainContent: {
                marginTop: '64px', // Matches the header height
                padding: '16px',    // Additional padding for main content
                flexGrow: 1,
                height: 'calc(100vh - 64px)', // Adjust height to prevent overlap
                overflowY: 'auto',   // Allows vertical scrolling if content exceeds viewport
                overflowX: 'hidden', // Prevents horizontal overflow
                boxSizing: 'border-box',
            },
        };

        return (
            <div style={styles.container}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <header style={styles.header}>
                        <HorizontalNavBar toggleSidebar={this.toggleSidebar} />
                    </header>

                    <main style={styles.mainContent}>
                        <Routes>
                            <Route path="home" element={<Dashboard />} />
                            <Route path="vet-profiles" element={<VetProfiles />} />
                            <Route path="appointments" element={<AppointmentHistory />} />
                            <Route path="products" element={<Products />} />
                            <Route path="order-management" element={<OrderManagement />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="webinars" element={<Webinars />} />
                            <Route path="discussions" element={<Discussions />} />
                        </Routes>
                    </main>
                </div>
            </div>
        );
    }
}

export default VetDashboard;
