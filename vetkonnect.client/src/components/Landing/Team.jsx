import React, { Component } from 'react';

class Team extends Component {
    render() {
        const teamMembers = [
            {
                name: 'Josphine Otieno',
                position: 'Chief Executive Officer',
                qualification: 'BA. Community Development',
                description: 'Leads the company\'s strategic direction and oversees operations to ensure alignment with business goals.',
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
                qualification: 'BSc. Computer Science',
                description: 'Coordinates project activities, manages timelines, and ensures successful delivery of projects within budget.',
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
                qualification: 'BSc. Information Technology',
                description: 'Oversees the technology strategy and development processes to drive innovation and efficiency.',
                image: 'assets/img/team/lopez.jpg',
                socialLinks: [
                    { platform: 'twitter', url: 'https://www.twitter.com' },
                    { platform: 'facebook', url: 'https://www.facebook.com' },
                    { platform: 'instagram', url: 'https://www.instagram.com' },
                    { platform: 'linkedin', url: 'https://www.linkedin.com' }
                ]
            }
        ];

        return (
            <section id="team" className="team section light-background py-5">
                {/* Section Title */}
                <div className="container section-title text-center mb-5" data-aos="fade-up">
                    <h2 className="text-primary">Our Team</h2>
                    <p className="lead">Meet the dedicated individuals behind our success...</p>
                </div>
                {/* End Section Title */}

                <div className="container">
                    <div className="row gy-5">
                        {teamMembers.map((member, index) => (
                            <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay={index * 100} key={member.name}>
                                <div className="card shadow-sm border-0">
                                    <div className="member-img">
                                        <img src={member.image} className="card-img-top" alt={member.name} />
                                        <div className="social">
                                            {member.socialLinks.map(link => (
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="social-icon" key={link.platform}>
                                                    <i className={`fab fa-${link.platform}`}></i>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{member.name}</h4>
                                        <span className="text-muted">{member.position}</span>
                                        <p className="member-info">{member.qualification}</p>
                                        <p className="job-description">{member.description}</p>
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
