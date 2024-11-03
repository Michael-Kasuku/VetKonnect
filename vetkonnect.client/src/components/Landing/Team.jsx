import React, { Component } from 'react';

class Team extends Component {
    render() {
        const teamMembers = [
            {
                name: 'Josphine Otieno',
                position: 'Chief Executive Officer',
                qualification: 'BA in Community Development',
                description: 'Josphine drives the strategic vision of the organization, ensuring all operations align with our core objectives. Her leadership fosters innovation and collaboration, empowering our team to excel.',
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
                description: 'Michael coordinates project activities with precision, managing timelines and budgets effectively. His dedication ensures the successful delivery of projects while cultivating a culture of excellence.',
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
                description: 'Daisy leads our technological advancements, implementing innovative solutions that enhance operational efficiency and strengthen our capabilities in a rapidly evolving industry.',
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
            backgroundColor: '#f9f9f9',
            padding: '50px 0',
            textAlign: 'center'
        };

        const cardStyle = {
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            cursor: 'pointer',
            margin: '20px', // Margin adjusted to create space between cards
            overflow: 'hidden',
            backgroundColor: '#fff',
            flex: '1 0 30%', // Allow cards to take up space proportionally
        };

        const memberImgStyle = {
            borderRadius: '50%',
            overflow: 'hidden',
            width: '150px',
            height: '150px',
            margin: '0 auto'
        };

        const imgStyle = {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        };

        const socialStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
        };

        const sectionTitleStyle = {
            fontSize: '2rem',
            marginBottom: '10px',
            color: '#007BFF',
            textTransform: 'uppercase'
        };

        const jobDescriptionStyle = {
            fontSize: '0.9rem',
            color: '#666',
            margin: '10px 0'
        };

        const positionStyle = {
            margin: '5px 0',
            color: '#777',
            fontSize: '1rem'
        };

        return (
            <section id="team" className="team" style={sectionStyle}>
                {/* Section Title */}
                <div className="container section-title mb-5" data-aos="fade-up">
                    <h2 style={sectionTitleStyle}>Meet Our Team</h2>
                    <p style={{ fontSize: '1rem', color: '#888' }}>Dedicated professionals driving our success.</p>
                </div>
                {/* End Section Title */}

                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {teamMembers.map((member, index) => (
                            <div key={index} style={cardStyle}>
                                <div className="member-img" style={memberImgStyle}>
                                    <img src={member.image} style={imgStyle} alt={member.name} />
                                </div>
                                <div className="card-body" style={{ padding: '20px' }}>
                                    <h4 className="section-title" style={{ margin: '10px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>{member.name}</h4>
                                    <span className="text-muted d-block" style={positionStyle}>{member.position}</span>
                                    <p className="qualification" style={{ fontWeight: 'bold' }}>{member.qualification}</p>
                                    <p className="job-description" style={jobDescriptionStyle}>{member.description}</p>
                                    <div className="social" style={socialStyle}>
                                        {member.socialLinks.map(link => (
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-icon"
                                                key={link.platform}
                                                style={{ margin: '0 5px' }}
                                            >
                                                <i className={`fab fa-${link.platform}`} style={{ fontSize: '1.5rem', color: '#007BFF' }}></i>
                                            </a>
                                        ))}
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
