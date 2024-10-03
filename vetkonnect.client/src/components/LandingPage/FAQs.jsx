import React, { Component } from 'react';
import { Typography, Container } from '@mui/material';

class FAQs extends Component {
    render() {
        return (
            <section id="faq" className="faq section light-background py-5">
                <Container>
                    <div className="row gy-4">
                        {/* FAQ Introduction */}
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="content px-xl-5">
                                <Typography variant="h3" className="text-primary">Frequently Asked Questions</Typography>
                                <Typography variant="body1" className="mt-3">
                                    Find answers to some of the most common questions about our platform, services, and policies. We're here to ensure you have the best experience with Vet Konnect.
                                </Typography>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                            <div className="faq-container">
                                <div className="accordion accordion-flush" id="faqAccordion">

                                    {/* FAQ Item 1 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="false"
                                                aria-controls="collapseOne"
                                            >
                                                How do I book an appointment with a veterinarian?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Booking an appointment is simple. Log into your Vet Konnect account, browse available veterinarians, and choose a suitable one. Select a time slot, confirm, and you'll receive a confirmation email.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 2 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                Can I reschedule or cancel an appointment?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Yes, you can reschedule or cancel an appointment by logging into your account. Go to "My Appointments," select the one you wish to adjust, and follow the prompts. Ensure cancellations are made 24 hours in advance to avoid any charges.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 3 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                How can I track my pet's treatment progress?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Track your pet's treatment through your Vet Konnect account. Veterinarians will update the treatment status, and you'll receive timely email or SMS notifications with relevant updates.
                                            </div>
                                        </div>
                                    </div>

                                </div> {/* End FAQ Accordion */}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default FAQs;
