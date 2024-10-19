import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HorizontalNavBar from './Vet/HorizontalNavBar';
import VerticalNavBar from './Vet/VerticalNavBar';
import Dashboard from './Vet/Dashboard';
import Appointments from './Vet/Appointments';
import VetProfiles from './Vet/VetProfiles';
import AvailableServices from './Vet/AvailableServices';
import Products from './Vet/Products';
import OrderManagement from './Vet/OrderManagement';
import Blogs from './Vet/Blogs';
import Webinars from './Vet/Webinars';
import Discussions from './Vet/Discussions';

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
                overflow: 'hidden', // Prevent overflow of the container
                margin: 0, // Ensure no outer space
            },
            sidebar: {
                width: '240px',
                backgroundColor: '#f8f8f8',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
                overflowY: 'auto',
                boxSizing: 'border-box', // Ensures padding doesn't affect width
            },
            header: {
                position: 'fixed',
                top: 0,
                left: isSidebarOpen ? '240px' : '0',
                height: '64px',
                width: isSidebarOpen ? 'calc(100% - 240px)' : '100%',
                backgroundColor: '#FFC107', // Change the color to amber
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                zIndex: 1000,
                transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
                margin: 0,
                boxSizing: 'border-box', // Prevents overflow issues
            },
            mainContent: {
                marginLeft: isSidebarOpen ? '240px' : '0',
                marginTop: '64px',
                padding: '16px',
                flexGrow: 1,
                height: 'calc(100vh - 64px)', // Adjust to fit within viewport
                overflow: 'hidden', // Prevent scrollbars in the main section
                transition: 'margin-left 0.3s ease-in-out',
                boxSizing: 'border-box',
            },
        };

        const mobileStyles = `
            @media (max-width: 768px) {
                aside {
                    transform: ${isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
                }
                header {
                    left: 0;
                    width: 100%;
                }
                main {
                    margin-left: 0;
                }
            }
        `;

        return (
            <>
                <style>{mobileStyles}</style>

                <div style={styles.container}>
                    <aside style={styles.sidebar}>
                        <VerticalNavBar />
                    </aside>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <header style={styles.header}>
                            <HorizontalNavBar toggleSidebar={this.toggleSidebar} />
                        </header>

                        <main style={styles.mainContent}>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/appointments" element={<Appointments />} />
                                <Route path="/vet-profiles" element={<VetProfiles />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/order-management" element={<OrderManagement />} />
                                <Route path="/blogs" element={<Blogs />} />
                                <Route path="/webinars" element={<Webinars />} />
                                <Route path="/discussions" element={<Discussions />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

export default VetDashboard;
