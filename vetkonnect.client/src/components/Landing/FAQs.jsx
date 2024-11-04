import React, { Component } from 'react';
import { Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

class FAQs extends Component {
    constructor(props) {
        super(props);
        // Initialize state to track the currently expanded FAQ
        this.state = {
            openIndex: null,
        };
    }

    // Toggles the expanded state of the FAQ item
    toggleFAQ = (index) => {
        this.setState((prevState) => ({
            openIndex: prevState.openIndex === index ? null : index, // Collapse if already open
        }));
    };

    render() {
        // Array of FAQ items with questions and corresponding answers
        const faqItems = [
            {
                question: "How do I book an appointment with a veterinarian?",
                answer: "Booking is straightforward! Simply log into your Vetkonnect account, browse certified veterinarians, and select a time that suits you. A confirmation email will be sent immediately.",
            },
            {
                question: "Can I reschedule or cancel an appointment?",
                answer: "Absolutely! Navigate to 'My Appointments' to reschedule or cancel. Please ensure you cancel at least 24 hours in advance to avoid any cancellation fees.",
            },
            {
                question: "How can I track my pet's treatment progress?",
                answer: "Stay informed with real-time updates on your pet's treatment! Log into Vetkonnect to view your pet's status, which is continuously updated by your veterinarian. You'll also receive notifications via email or SMS.",
            },
            {
                question: "What services do veterinarians offer on Vetkonnect?",
                answer: "Vetkonnect provides a comprehensive range of services, including routine check-ups, vaccinations, surgeries, emergency care, nutritional counseling, and behavior consultations. Each veterinarian profile details their specific specialties.",
            },
            {
                question: "How do I choose the right veterinarian for my pet?",
                answer: "Review each profile to understand the veterinarian's qualifications, specialties, and feedback from other pet owners. Don't hesitate to reach out with any questions to ensure you make the best choice for your pet.",
            },
            {
                question: "Is my pet's information kept confidential?",
                answer: "Your privacy is our top priority! All information regarding your pet is securely stored and shared only with authorized personnel involved in their care.",
            },
            {
                question: "What should I do in case of an emergency?",
                answer: "In the event of an emergency, contact the nearest veterinary clinic immediately or use Vetkonnect to find emergency services in your vicinity.",
            },
            {
                question: "Can I leave a review for a veterinarian?",
                answer: "Yes! After your appointment, we encourage you to leave a review to assist others in finding the right veterinarian and to help us enhance our services.",
            },
            {
                question: "What payment methods are accepted on Vetkonnect?",
                answer: "We offer various payment options, including credit/debit cards, mobile money, and bank transfers, to facilitate seamless transactions.",
            },
            {
                question: "How can I contact Vetkonnect for further assistance?",
                answer: "For additional support, please visit our 'Contact Us' page or reach out to our support team via email or phone.",
            },
        ];

        return (
            <section
                id="faq"
                style={{
                    backgroundColor: '#f4f6fa',
                    padding: '3rem 0',
                    fontFamily: 'Arial, sans-serif',
                    color: '#333',
                }}
            >
                <Container>
                    {/* FAQ Introduction */}
                    <div className="faq-intro" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Typography variant="h3" style={{ color: '#0d6efd', fontWeight: 700 }}>
                            Have Questions? We've Got Answers!
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                marginTop: '1rem',
                                lineHeight: 1.7,
                                color: '#555',
                            }}
                        >
                            At Vetkonnect, we are dedicated to making pet care accessible and stress-free. Below, you can find answers to frequently asked questions.
                        </Typography>
                    </div>

                    {/* FAQ Accordion */}
                    {faqItems.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={this.state.openIndex === index}
                            onChange={() => this.toggleFAQ(index)}
                            style={{ marginBottom: '1rem' }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}
                            >
                                <Typography style={{ fontWeight: 600 }}>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </section>
        );
    }
}

export default FAQs;
