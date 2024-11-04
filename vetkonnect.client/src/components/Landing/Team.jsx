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
            backgroundColor: '#f4f4f4',
            padding: '60px 0',
            textAlign: 'center'
        };

        const cardContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        };

        const cardStyle = {
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            margin: '15px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            width: '100%',
            maxWidth: '300px', // Ensures it looks good on mobile
            textAlign: 'center',
        };

        const memberImgStyle = {
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            margin: '0 auto',
            overflow: 'hidden'
        };

        const imgStyle = {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        };

        const socialStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px'
        };

        const sectionTitleStyle = {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#0056b3',
            textTransform: 'uppercase'
        };

        const jobDescriptionStyle = {
            fontSize: '1rem',
            color: '#555',
            margin: '15px 0'
        };

        const positionStyle = {
            margin: '5px 0',
            color: '#6c757d',
            fontSize: '1.1rem',
            fontStyle: 'italic'
        };

        return (
            <section id="team" className="team" style={sectionStyle}>
                <div className="container section-title mb-5" data-aos="fade-up">
                    <h2 style={sectionTitleStyle}>Meet Our Team</h2>
                    <p style={{ fontSize: '1.2rem', color: '#777' }}>A dedicated team of professionals driving our success.</p>
                </div>

                <div className="container" style={cardContainerStyle}>
                    {teamMembers.map((member, index) => (
                        <div key={index} style={cardStyle} className="team-card">
                            <div style={memberImgStyle}>
                                <img src={member.image} style={imgStyle} alt={member.name} />
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h4 style={{ margin: '10px 0', fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}>{member.name}</h4>
                                <span style={positionStyle}>{member.position}</span>
                                <p style={{ fontWeight: '500', color: '#007BFF', margin: '10px 0' }}>{member.qualification}</p>
                                <p style={jobDescriptionStyle}>{member.description}</p>
                                <div style={socialStyle}>
                                    {member.socialLinks.map(link => (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={link.platform}
                                            style={{ margin: '0 10px' }}
                                        >
                                            <i className={`fab fa-${link.platform}`} style={{ fontSize: '1.3rem', color: '#0056b3' }}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}

export default Team;
