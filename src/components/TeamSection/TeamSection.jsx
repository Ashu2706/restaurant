import React from 'react';
import './teamSection.scss';
import teamImage1 from '../../assets/images/team-1.jpg';
import teamImage2 from '../../assets/images/team-2.jpg';
import teamImage3 from '../../assets/images/team-3.jpg';
import teamImage4 from '../../assets/images/team-4.jpg';
import { TeamCard } from './TeamCard';
const TeamSection = () => {
    const response = {data: [
        {
            image: teamImage1,
            name: "Full Name",
            designation: "Designation",
            social: [
                {link: "#"},
                {link: "#"},
                {link: "#"},
            ]
        },
        {
            image: teamImage2,
            name: "Full Name",
            designation: "Designation",
            social: [
                {link: "#"},
                {link: "#"},        
                {link: "#"},
            ]
        },
        {
            image: teamImage3,
            name: "Full Name",
            designation: "Designation",
            social: [
                {link: "#"},
                {link: "#"},        
                {link: "#"},
            ]
        },
        {
            image: teamImage4,
            name: "Full Name",
            designation: "Designation",
            social: [
                {link: "#"},
                {link: "#"},        
                {link: "#"},
            ]
        },
    ]};
    return (
        <div className="my-container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
                <h1 className="mb-4 mb-md-5">Our Master Chefs</h1>
            </div>
            <div className="row g-2 g-md-4">
                {
                    // response.data.map((item, index) => {
                    //     // console.log(index * 0.2 + 0.1);
                        
                    //     return (
                    //         <TeamCard 
                    //         key={index} 
                    //         image={item.image} 
                    //         name={item.name} 
                    //         designation={item.designation} 
                    //         social={item.social} 
                    //         delay={index} />
                    //     )
                    // })

                    response.data.map((item, index) => (
                        // console.log(index * 0.2 + 0.1);
                            <TeamCard 
                            key={index} 
                            image={item.image} 
                            name={item.name} 
                            designation={item.designation} 
                            social={item.social} 
                            delay={index} />
                        )
                    )
                }
                {/* <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="team-item text-center">
                        <div className="rounded-circle overflow-hidden m-4">
                            <img className="img-fluid" src={teamImage2} alt="" />
                        </div>
                        <h5 className="mb-0">Full Name</h5>
                        <small>Designation</small>
                        <div className="d-flex justify-content-center mt-3">
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="team-item text-center">
                        <div className="rounded-circle overflow-hidden m-4">
                            <img className="img-fluid" src={teamImage3} alt="" />
                        </div>
                        <h5 className="mb-0">Full Name</h5>
                        <small>Designation</small>
                        <div className="d-flex justify-content-center mt-3">
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="team-item text-center">
                        <div className="rounded-circle overflow-hidden m-4">
                            <img className="img-fluid" src={teamImage4} alt="" />
                        </div>
                        <h5 className="mb-0">Full Name</h5>
                        <small>Designation</small>
                        <div className="d-flex justify-content-center mt-3">
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TeamSection