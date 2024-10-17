import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HorizontalNavBar from './Vet/HorizontalNavBar';
import VerticalNavBar from './Vet/VerticalNavBar';
import Dashboard from './Vet/Dashboard';

class VetDashboard extends Component {
    render() {
        // Define styles for the layout components
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden', // Prevent overflow from the container
            },
            header: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            },
            sidebar: {
                position: 'fixed',
                top: '64px', // Adjust based on the height of the header
                left: 0,
                width: '240px',
                height: 'calc(100vh - 64px)',
                overflow: 'hidden', // Prevent scroll
                backgroundColor: '#f8f8f8',
                transition: 'transform 0.3s ease-in-out', // Smooth transition
                transform: 'translateX(0)', // Sidebar is visible by default
            },
            mainContent: {
                marginLeft: '240px',
                marginTop: '64px',
                padding: '16px',
                flexGrow: 1,
                overflow: 'hidden', // Prevent scroll
                height: 'calc(100vh - 64px)',
            },
            footer: {
                marginTop: 'auto',
                backgroundColor: '#f1f1f1',
            },
        };

        // Media query for mobile view
        const mobileStyles = `
            @media (max-width: 768px) {
                aside {
                    transform: translateX(-100%); /* Hide sidebar */
                }
                main {
                    margin-left: 0; /* Full-width content */
                }
            }
        `;

        return (
            <>
                {/* Inject styles for responsive design */}
                <style>{mobileStyles}</style>

                <div style={styles.container}>
                    <header style={styles.header}>
                        <HorizontalNavBar />
                    </header>
                    <aside style={styles.sidebar} id="sidebar">
                        <VerticalNavBar />
                    </aside>
                    <main style={styles.mainContent}>
                        <Routes>
                            <Route path="" element={<Dashboard />} />
                        </Routes>
                    </main>
                </div>
            </>
        );
    }
}

export default VetDashboard;
