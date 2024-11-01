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
                                <Typography variant="h3" className="text-primary">
                                    Frequently Asked Questions
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Here, you will find answers to some of the most commonly asked questions regarding our platform, services, and policies. We are committed to providing you with an exceptional experience at Vetkonnect.
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
                                                Booking an appointment is a simple process. Log into your VetKonnect account, browse our list of available veterinarians, and select one that meets your needs. Choose an appropriate time slot, confirm your selection, and you will receive a confirmation email with all relevant appointment details.
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
                                                Yes, you can easily reschedule or cancel an appointment by logging into your account. Navigate to the "My Appointments" section, select the appointment you wish to modify, and follow the provided prompts. Please ensure that cancellations are made at least 24 hours in advance to avoid any potential charges.
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
                                                You can track your pet's treatment progress through your Vetkonnect account. Our veterinarians will update the treatment status, and you will receive timely email or SMS notifications with relevant updates about your pet's care.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 4 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                What types of services do veterinarians offer on Vetkonnect?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Our veterinarians offer a comprehensive range of services, including routine check-ups, vaccinations, surgical procedures, emergency care, nutritional counseling, and behavioral consultations. Detailed information about each veterinarian's specialties is available on their profile.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 5 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                How do I choose the right veterinarian for my pet?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                To select the right veterinarian, review their profiles, which include qualifications, specializations, ratings, and customer reviews. Consider your pet's specific needs and preferences, and feel free to contact the veterinarian directly with any inquiries before making your decision.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 6 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSix">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                            >
                                                Is my pet's information kept confidential?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSix"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSix"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Yes, we prioritize your pet's privacy. All personal and medical information is treated with the utmost confidentiality and will only be shared with authorized personnel as necessary for treatment purposes. We adhere to stringent privacy policies to safeguard your information.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 7 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSeven">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSeven"
                                                aria-expanded="false"
                                                aria-controls="collapseSeven"
                                            >
                                                What should I do in case of an emergency with my pet?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSeven"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSeven"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                If your pet is facing an emergency, please contact the nearest veterinary clinic immediately or utilize the Vetkonnect platform to locate available emergency services. Prompt action is essential in emergency situations to ensure the best outcome for your pet.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 8 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingEight">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseEight"
                                                aria-expanded="false"
                                                aria-controls="collapseEight"
                                            >
                                                Can I leave a review for a veterinarian I visited?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseEight"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingEight"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Yes, after your appointment, you are encouraged to leave a review and rate your experience with the veterinarian. Your feedback is invaluable in helping us enhance our services and assists other pet owners in making informed decisions.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 9 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingNine">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseNine"
                                                aria-expanded="false"
                                                aria-controls="collapseNine"
                                            >
                                                What payment methods are accepted on Vetkonnect?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseNine"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingNine"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                Vetkonnect accepts various payment methods, including credit/debit cards, mobile money, and bank transfers. We aim to provide a seamless payment experience for our users.
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQ Item 10 */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTen">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTen"
                                                aria-expanded="false"
                                                aria-controls="collapseTen"
                                            >
                                                How can I contact Vetkonnect for further inquiries?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTen"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTen"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                For any additional inquiries or support, please visit our 'Contact Us' page or reach out to our customer support team via email or phone. We are here to assist you with any questions or concerns you may have.
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default FAQs;
