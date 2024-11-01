import React, { Component } from 'react';

class Team extends Component {
    render() {
        const teamMembers = [
            {
                name: 'Josphine Otieno',
                position: 'Chief Executive Officer',
                qualification: 'BA in Community Development',
                description: 'As the CEO, Josphine drives the strategic vision of the organization, ensuring that all operations align with our core business objectives. Her leadership fosters innovation and collaboration within the team.',
                image: 'assets/img/team/josphine.jpg',
                socialLinks: [
                    { platform: 'twitter', url: 'https://www.twitter.com' },
                    { platform: 'facebook', url: 'https://www.facebook.com' },
                    { platform: 'instagram', url: 'https://www.instagram.com' },
                    { platform: 'linkedin', url: 'https://www.linkedin.com' }
                ]
            },
            {
                name: 'Michael Kasuku',
                position: 'Project Manager',
                qualification: 'BSc in Computer Science',
                description: 'Michael is instrumental in coordinating project activities and managing timelines. His expertise ensures the successful delivery of projects while adhering to budget constraints, fostering a culture of excellence in project management.',
                image: 'assets/img/team/kasuku.jpg',
                socialLinks: [
                    { platform: 'twitter', url: 'https://www.twitter.com' },
                    { platform: 'facebook', url: 'https://www.facebook.com' },
                    { platform: 'instagram', url: 'https://www.instagram.com' },
                    { platform: 'linkedin', url: 'https://www.linkedin.com' }
                ]
            },
            {
                name: 'Daisy Lopez',
                position: 'Chief Technology Officer',
                qualification: 'BSc in Information Technology',
                description: 'Daisy spearheads the technological advancement of the company, overseeing the implementation of innovative solutions. Her strategic insights drive operational efficiency and enhance our technological capabilities.',
                image: 'assets/img/team/lopez.jpg',
                socialLinks: [
                    { platform: 'twitter', url: 'https://www.twitter.com' },
                    { platform: 'facebook', url: 'https://www.facebook.com' },
                    { platform: 'instagram', url: 'https://www.instagram.com' },
                    { platform: 'linkedin', url: 'https://www.linkedin.com' }
                ]
            }
        ];

        const sectionStyle = {
            backgroundColor: '#f8f9fa',
            padding: '3rem 0'
        };

        const titleStyle = {
            color: '#007bff',
            fontSize: '2.5rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textAlign: 'center'
        };

        const leadStyle = {
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: '#555',
            textAlign: 'center'
        };

        const cardStyle = {
            transition: 'transform 0.3s, box-shadow 0.3s',
            border: 'none',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative'
        };

        const cardHoverStyle = {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        };

        const titleTextStyle = {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        };

        const qualificationStyle = {
            fontSize: '1rem',
            color: '#777',
            marginBottom: '1rem',
            fontStyle: 'italic'
        };

        const descriptionStyle = {
            fontSize: '0.9rem',
            color: '#333',
            lineHeight: '1.5'
        };

        const socialStyle = {
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            textAlign: 'center', // Center align the social icons
            width: '100%' // Take full width for centering
        };

        const socialIconStyle = {
            color: '#ffffff',
            margin: '0 5px',
            fontSize: '1.2rem',
            transition: 'color 0.3s'
        };

        const socialIconHoverStyle = {
            color: 'amber' // Change to amber on hover
        };

        return (
            <section id="team" style={sectionStyle}>
                {/* Section Title */}
                <div className="container section-title mb-5" data-aos="fade-up">
                    <h2 style={titleStyle}>Our Team</h2>
                    <p style={leadStyle}>Meet the dedicated professionals driving our success.</p>
                </div>
                {/* End Section Title */}

                <div className="container">
                    <div className="row gy-5">
                        {teamMembers.map((member, index) => (
                            <div
                                className="col-lg-4 col-md-6 member"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                key={member.name}
                            >
                                <div
                                    className="card"
                                    style={cardStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
                                    onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
                                >
                                    <div className="member-img">
                                        <img src={member.image} className="card-img-top" alt={member.name} />
                                        <div style={socialStyle}>
                                            {member.socialLinks.map(link => (
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={socialIconStyle}
                                                    key={link.platform}
                                                    className="social-icon"
                                                    onMouseEnter={(e) => e.currentTarget.style.color = 'amber'} // Change color on hover
                                                    onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'} // Reset color on mouse leave
                                                >
                                                    <i className={`fab fa-${link.platform}`}></i>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-body text-center">
                                        <h4 style={titleTextStyle}>{member.name}</h4>
                                        <span className="text-muted d-block">{member.position}</span>
                                        <p style={qualificationStyle}>{member.qualification}</p>
                                        <p style={descriptionStyle}>{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Team;
