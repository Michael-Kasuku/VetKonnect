import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

class PrivacyPolicy extends React.Component {
    render() {
        return (
            <Box component="section" id="privacy" sx={{ py: 5, backgroundColor: '#f8f9fa' }}>
                <Container data-aos="fade-up" data-aos-delay="100">
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h2" color="primary" gutterBottom>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.25rem', lineHeight: 1.8, textAlign: 'justify', mb: 4 }}>
                            At Vet Konnect, we recognize the importance of safeguarding the personal information of our users. This Privacy Policy outlines how we collect, use, protect, and share your information in compliance with applicable data protection laws, including the Data Protection Act, 2019 (Kenya). By using our services, you consent to the terms outlined in this Privacy Policy.
                        </Typography>

                        {/* Section 1 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            1. Information We Collect
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We may collect the following categories of personal information to facilitate the use of our platform:
                        </Typography>
                        <ul>
                            <li><strong>Personal Identification Information</strong>: Your full name, email address, phone number, and other contact details provided during registration.</li>
                            <li><strong>Veterinary and Animal Information</strong>: Information related to your animals, appointment history, and veterinary services requested.</li>
                            <li><strong>Financial Information</strong>: Payment details for transactions processed via the platform.</li>
                            <li><strong>Usage Information</strong>: Data on how you interact with the platform, including access times, device information, IP addresses, and browser types.</li>
                            <li><strong>Location Data</strong>: Geographic location data to enhance service delivery for location-based requests (such as nearby veterinarians).</li>
                        </ul>

                        {/* Section 2 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            2. Use of Your Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We use your personal information to provide, maintain, and improve our services. This includes:
                        </Typography>
                        <ul>
                            <li>Facilitating communication and appointments between users and certified veterinarians.</li>
                            <li>Processing payments securely and maintaining accurate transaction records.</li>
                            <li>Enhancing the platform's performance and user experience by analyzing usage patterns and preferences.</li>
                            <li>Complying with legal obligations and responding to lawful requests from public authorities.</li>
                            <li>Protecting the security and integrity of our platform, including fraud detection and prevention.</li>
                        </ul>

                        {/* Section 3 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            3. Disclosure of Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
                        </Typography>
                        <ul>
                            <li>With <strong>service providers and business partners</strong> who perform services on our behalf, such as payment processing, customer support, and data analytics, provided they adhere to strict confidentiality agreements.</li>
                            <li>In response to a <strong>legal process</strong> or when required by law to cooperate with law enforcement agencies or regulatory authorities.</li>
                            <li>To <strong>protect our rights, privacy, safety, or property</strong>, and that of our users or third parties, when necessary to enforce our terms of service or pursue remedies for any violations.</li>
                        </ul>

                        {/* Section 4 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            4. Data Security
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We implement robust administrative, technical, and physical security measures designed to protect your personal information from unauthorized access, loss, misuse, or alteration. These measures include encryption protocols, secure servers, and regular security audits. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security given the nature of internet technologies.
                        </Typography>

                        {/* Section 5 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            5. Cookies and Tracking Technologies
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            Vet Konnect uses cookies and similar tracking technologies to personalize your experience and gather data on website traffic and usage trends. Cookies are small data files stored on your device. You may modify your browser settings to reject cookies, but doing so may limit your ability to fully use some features of our platform.
                        </Typography>

                        {/* Section 6 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            6. Retention of Personal Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We retain personal information for as long as is necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. When your information is no longer required, we will take appropriate steps to securely delete or anonymize it.
                        </Typography>

                        {/* Section 7 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            7. Your Data Protection Rights
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            You have rights regarding your personal data under applicable data protection laws. These include:
                        </Typography>
                        <ul>
                            <li>The right to access and obtain a copy of your personal data.</li>
                            <li>The right to request rectification of inaccurate or incomplete data.</li>
                            <li>The right to erasure of your data under certain conditions, also known as the "right to be forgotten."</li>
                            <li>The right to restrict or object to the processing of your personal data in certain circumstances.</li>
                            <li>The right to data portability, allowing you to request a copy of your data in a structured, commonly used format.</li>
                        </ul>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            To exercise these rights, or if you have any concerns regarding how we handle your data, please contact us at <Link href="mailto:vetkonnect@gmail.com">vetkonnect@gmail.com</Link>.
                        </Typography>

                        {/* Section 8 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            8. Third-Party Links
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            Our platform may contain links to third-party websites or services that are not controlled by Vet Konnect. We are not responsible for the privacy practices or content of such websites. We encourage users to read the privacy policies of any third-party websites they visit.
                        </Typography>

                        {/* Section 9 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            9. Changes to this Privacy Policy
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            We reserve the right to modify or update this Privacy Policy at any time. Any changes will be posted on this page, and we will notify you of significant updates via email or platform notifications. Your continued use of our services after any changes to this policy constitutes your acceptance of the revised terms.
                        </Typography>

                        {/* Section 10 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            10. Contact Us
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please reach out to us at <Link href="mailto:vetkonnect@gmail.com">vetkonnect@gmail.com</Link>.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default PrivacyPolicy;
