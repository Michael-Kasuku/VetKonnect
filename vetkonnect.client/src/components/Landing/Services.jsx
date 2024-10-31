import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faShop, faBook, faComments } from '@fortawesome/free-solid-svg-icons';

class Services extends React.Component {
    render() {
        return (
            <section id="services" className="services section py-5 light-background">
                {/* Section Title */}
                <div className="container text-center section-title" data-aos="fade-up">
                    <h2 className="display-4 text-primary mb-4">Our Services</h2>
                    <p className="lead text-muted mb-5">We provide a diverse range of solutions to improve animal health and well-being.</p>
                </div>

                <div className="container">
                    <div className="row gy-5">
                        {/* Service Item 1 */}
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="service-item d-flex align-items-center p-5 shadow-sm border rounded hover-shadow">
                                <div className="icon-wrapper bg-primary text-white rounded-circle p-4 me-4">
                                    <FontAwesomeIcon icon={faBriefcase} className="fs-3" />
                                </div>
                                <div className="content">
                                    <h4 className="fw-bold text-dark mb-2">Vet Directory</h4>
                                    <p className="text-muted">Easily locate certified veterinarians near you and book appointments with confidence.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Item 2 */}
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="service-item d-flex align-items-center p-5 shadow-sm border rounded hover-shadow">
                                <div className="icon-wrapper bg-primary text-white rounded-circle p-4 me-4">
                                    <FontAwesomeIcon icon={faShop} className="fs-3" />
                                </div>
                                <div className="content">
                                    <h4 className="fw-bold text-dark mb-2">Agrovet Hub</h4>
                                    <p className="text-muted">Find the best veterinary products and animal care essentials at competitive prices.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Item 3 */}
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="service-item d-flex align-items-center p-5 shadow-sm border rounded hover-shadow">
                                <div className="icon-wrapper bg-primary text-white rounded-circle p-4 me-4">
                                    <FontAwesomeIcon icon={faBook} className="fs-3" />
                                </div>
                                <div className="content">
                                    <h4 className="fw-bold text-dark mb-2">Educational Resources</h4>
                                    <p className="text-muted">Explore in-depth blogs, webinars, and research articles to stay updated on the latest veterinary practices.</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Item 4 */}
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                            <div className="service-item d-flex align-items-center p-5 shadow-sm border rounded hover-shadow">
                                <div className="icon-wrapper bg-primary text-white rounded-circle p-4 me-4">
                                    <FontAwesomeIcon icon={faComments} className="fs-3" />
                                </div>
                                <div className="content">
                                    <h4 className="fw-bold text-dark mb-2">Community Forum</h4>
                                    <p className="text-muted">Connect with fellow farmers and pet owners, exchange ideas, and seek expert advice on animal care.</p>
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
