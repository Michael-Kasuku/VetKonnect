import React from 'react';
import { Container, Typography, Link } from '@mui/material';

class Terms extends React.Component {
    render() {
        return (
            <section
                id="terms"
                style={{
                    backgroundImage: "url('assets/img/terms-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '40px 0',
                    backgroundColor: '#f8f9fa'
                }}
            >
                <Container>
                    <div className="content">
                        <Typography variant="h3" color="primary" gutterBottom>
                            Terms of Service
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', lineHeight: '1.8', textAlign: 'justify' }}>
                            Welcome to Vet Konnect! By accessing or using our platform, including our mobile app, web platform, and USSD services, you agree to comply with the following terms and conditions. Please review them carefully.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            1. Acceptance of Terms
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            By using Vet Konnect, you agree to these Terms of Service. If you do not agree with any of these terms, you must refrain from using our platform and its services.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            2. Eligibility to Use the Platform
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Users must be at least 18 years old to use Vet Konnect. If you are under 18, you may only use the platform with the involvement of a parent or guardian. You are responsible for ensuring that the information you provide is accurate and complete.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            3. User Responsibilities
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            You are responsible for safeguarding the confidentiality of your account credentials and for all activities that occur under your account. Ensure that your use of the platform complies with all applicable laws and these Terms of Service.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            4. Booking Veterinary Services
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Vet Konnect provides a platform to connect users with veterinarians for service bookings. The availability of services depends on the veterinarians listed on the platform. Vet Konnect does not guarantee the provision or quality of services by any veterinarian.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            5. Payment and Fees
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Some services provided through Vet Konnect may require payment. Payments processed through the platform are subject to our payment terms. Any disputes related to payments should be resolved through the provided support channels.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            6. Limitation of Liability
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Vet Konnect is a platform facilitating connections between users and veterinarians. We do not take responsibility for any actions, outcomes, or issues arising from services rendered by veterinarians using the platform. Vet Konnect disclaims all liability for any damages, direct or indirect, resulting from the use of services.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            7. Termination of Service
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            We reserve the right to suspend or terminate your access to Vet Konnect at our discretion, without prior notice, if you violate these Terms of Service or engage in unlawful behavior. Termination may also occur if your activities pose risks to the platform or its users.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            8. Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. By using Vet Konnect, you agree to the practices described in our Privacy Policy.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            9. Changes to Terms
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Vet Konnect reserves the right to amend or update these Terms of Service at any time. We will notify users of any changes by updating the terms on our website. Continued use of the platform after changes have been posted signifies your acceptance of the modified terms.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            10. Contact Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            If you have any questions or concerns regarding these Terms of Service, please contact us at{' '}
                            <Link href="mailto:vetkonnect@gmail.com">vetkonnect@gmail.com</Link>.
                        </Typography>
                    </div>
                </Container>
            </section>
        );
    }
}

export default Terms;
