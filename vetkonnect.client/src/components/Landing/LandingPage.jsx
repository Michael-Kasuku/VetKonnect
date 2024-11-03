import React, { Component } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Team from './Team';
import FAQs from './FAQs';
import Contact from './Contact';
import Footer from './Footer';

class LandingPage extends Component {
    render() {
        // Define inline styles
        const mainStyle = {
            margin: 0,             // Remove default margins
            padding: 0,            // Remove default padding
            width: '100%',         // Ensure full width
            boxSizing: 'border-box' // Include padding and border in element's total width and height
        };

        // Apply body styles to remove default margins
        document.body.style.margin = '0'; // Ensures body has no margin

        return (
            <div style={{ margin: 0 }}>
                <Navbar />
                <main style={mainStyle}>
                    <Hero />
                    <Services />
                    <About />
                    <Team />
                    <FAQs />
                    <Contact />
                </main>
                <Footer />
            </div>
        );
    }
}

export default LandingPage;
