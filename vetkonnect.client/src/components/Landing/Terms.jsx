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
                            Welcome to VetKonnect! By accessing or using our platform, which includes our mobile application, web interface, and USSD services, you agree to abide by the following terms and conditions. We encourage you to read them thoroughly.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            1. Acceptance of Terms
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            By utilizing VetKonnect, you accept these Terms of Service. If you disagree with any part of these terms, you must refrain from using our platform and its associated services.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            2. Eligibility to Use the Platform
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Users must be at least 18 years of age to utilize VetKonnect. If you are under 18, you may only access the platform with the supervision of a parent or guardian. You are responsible for ensuring that the information you provide is accurate and complete.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            3. User Responsibilities
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. You must ensure that your use of the platform complies with all applicable laws, including the Constitution of Kenya (2010), and these Terms of Service.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            4. Booking Veterinary Services
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            VetKonnect serves as a platform connecting users with veterinarians for service bookings. The availability of services is contingent upon the veterinarians listed on the platform. VetKonnect does not guarantee the provision or quality of services offered by any veterinarian.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            5. Payment and Fees
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Certain services accessed through VetKonnect may require payment. Payments processed via the platform are subject to our payment terms. Any disputes concerning payments should be directed to the designated support channels. Users have the right to a refund in accordance with the Consumer Protection Act (2012) in Kenya.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            6. Limitation of Liability
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            VetKonnect is a platform facilitating connections between users and veterinarians. We assume no responsibility for any actions, outcomes, or issues arising from the services rendered by veterinarians using our platform. VetKonnect disclaims all liability for any damages, whether direct or indirect, resulting from the use of these services.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            7. Termination of Service
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            We reserve the right to suspend or terminate your access to VetKonnect at our discretion and without prior notice if you violate these Terms of Service or engage in unlawful conduct. Termination may also occur if your activities pose risks to the platform or its users.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            8. Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            Your privacy is of utmost importance to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. By using VetKonnect, you consent to the practices described in our Privacy Policy in accordance with the Data Protection Act (2019) of Kenya.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            9. Changes to Terms
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            VetKonnect reserves the right to amend or update these Terms of Service at any time. Users will be notified of any changes through updates on our website. Continued use of the platform following the posting of changes signifies your acceptance of the modified terms.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            10. Governing Law
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            These Terms of Service shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom>
                            11. Contact Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                            If you have any questions or concerns regarding these Terms of Service, please do not hesitate to contact us at{' '}
                            <Link href="mailto:vetkonnect@gmail.com">vetkonnect@gmail.com</Link>.
                        </Typography>
                    </div>
                </Container>
            </section>
        );
    }
}

export default Terms;