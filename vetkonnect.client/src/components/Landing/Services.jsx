import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Services extends React.Component {
    render() {
        const sectionStyle = {
            backgroundColor: '#f8f9fa',
            padding: '3rem 0',
        };

        const titleStyle = {
            fontSize: '2.5rem',
            color: '#007bff',
            marginBottom: '1.5rem',
        };

        const leadStyle = {
            fontSize: '1.25rem',
            color: '#6c757d',
            marginBottom: '3rem',
        };

        const serviceItemStyle = {
            backgroundColor: '#ffffff',
            padding: '2rem',
            border: '1px solid #dee2e6',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Ensure content is spaced out
            height: '100%', // Make all cards equal height
        };

        const titleStyleInner = {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '0.5rem',
        };

        const descriptionStyle = {
            fontSize: '1rem',
            color: '#6c757d',
        };

        return (
            <section id="services" style={sectionStyle}>
                <div className="container text-center section-title" data-aos="fade-up">
                    <h2 style={titleStyle}>Our Services</h2>
                    <p style={leadStyle}>
                        Discover our comprehensive solutions designed to enhance animal health and ensure their well-being.
                    </p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
                            <div style={serviceItemStyle} className="service-item">
                                <i className="fas fa-user-md fa-3x mb-3" style={{ color: '#007bff' }}></i>
                                <div className="content">
                                    <h4 style={titleStyleInner}>Vet Directory</h4>
                                    <p style={descriptionStyle}>Quickly locate certified veterinarians near you and book appointments with confidence.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                            <div style={serviceItemStyle} className="service-item">
                                <i className="fas fa-store fa-3x mb-3" style={{ color: '#007bff' }}></i>
                                <div className="content">
                                    <h4 style={titleStyleInner}>Agrovet Hub</h4>
                                    <p style={descriptionStyle}>Access a wide range of veterinary products and animal care essentials at competitive prices.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div style={serviceItemStyle} className="service-item">
                                <i className="fas fa-book-open fa-3x mb-3" style={{ color: '#007bff' }}></i>
                                <div className="content">
                                    <h4 style={titleStyleInner}>Educational Resources</h4>
                                    <p style={descriptionStyle}>Stay informed with our in-depth blogs and webinars on the latest veterinary practices.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="400">
                            <div style={serviceItemStyle} className="service-item">
                                <i className="fas fa-comments fa-3x mb-3" style={{ color: '#007bff' }}></i>
                                <div className="content">
                                    <h4 style={titleStyleInner}>Community Forum</h4>
                                    <p style={descriptionStyle}>Join a vibrant community of fellow farmers and pet owners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Services;
