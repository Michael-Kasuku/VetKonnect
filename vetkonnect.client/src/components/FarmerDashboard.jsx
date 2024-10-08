import React, { Component } from 'react';
import HorizontalNavBar from './Farmer/HorizontalNavBar';
import VerticalNavBar from './Farmer/VerticalNavBar';
import Dashboard from './Farmer/Dashboard'

class FarmerDashboard extends Component {
    render() {
        // Inline CSS styles
        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh', // Full height for the container
        };

        const headerStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Ensure it stays on top
        };

        const sidebarStyle = {
            position: 'fixed',
            top: '64px', // Adjust based on the height of the horizontal nav bar
            left: 0,
            width: '240px', // Width of the vertical nav bar
            height: 'calc(100vh - 64px)', // Full height minus the header
            overflowY: 'scroll', // Allow scrolling if content overflows
            backgroundColor: '#f8f8f8', // Background color for the sidebar
            // Hide scrollbar styles
            scrollbarWidth: 'none', // For Firefox
            '-ms-overflow-style': 'none', // For Internet Explorer and Edge
        };

        const mainContentStyle = {
            marginLeft: '240px', // Same as sidebar width
            marginTop: '64px', // Same as header height
            padding: '16px', // Optional padding
            flexGrow: 1, // Allow this section to take remaining space
            overflowY: 'auto', // Allow scrolling in the main content
            height: 'calc(100vh - 64px)', // Full height minus the header
            // Hide scrollbar styles
            scrollbarWidth: 'none', // For Firefox
            '-ms-overflow-style': 'none', // For Internet Explorer and Edge
        };

        const footerStyle = {
            marginTop: 'auto', // Push footer to the bottom
            backgroundColor: '#f1f1f1', // Background color for the footer
        };

        return (
            <div style={containerStyle}>
                <header style={headerStyle}>
                    <HorizontalNavBar />
                </header>
                <aside style={sidebarStyle}>
                    <VerticalNavBar />
                </aside>
                <main style={mainContentStyle}>
                    <Dashboard />
                </main>
            </div>
        );
    }
}

export default FarmerDashboard;
