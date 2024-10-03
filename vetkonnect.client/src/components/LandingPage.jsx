import React, { Component } from 'react';
import Navbar from './LandingPage/Navbar';
import Hero from './LandingPage/Hero';
import About from './LandingPage/About';
import Services from './LandingPage/Services';
import Team from './LandingPage/Team';
import FAQs from './LandingPage/FAQs';
import Contact from './LandingPage/Contact';
import Footer from './LandingPage/Footer';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <main className="main">
                    <Hero />
                    <About />
                    <Services />
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
