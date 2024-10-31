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
