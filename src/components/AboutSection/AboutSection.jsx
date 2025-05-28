import React, { useEffect } from 'react'
import AboutOne from '../../assets/images/about-1.jpg';
import AboutTwo from '../../assets/images/about-2.jpg';
import AboutThree from '../../assets/images/about-3.jpg';
import AboutFour from '../../assets/images/about-4.jpg';
import counterUp from 'counterup2';
import 'waypoints/lib/jquery.waypoints.min.js';

const AboutSection = () => {
    useEffect(() => {
        
        const elements = document.querySelectorAll( '.counter' )
        // console.log(elements);
        
        elements.forEach( element => {
            const waypoint = new Waypoint(
                {
                    element: element,
                    handler: function() {
                        counterUp( element, {
                            duration: 2000,
                            delay: 40,
                        });
                        this.destroy(); //if you want to trigger only once                
                    },
                    offset: 'bottom-in-view'                    
                }
            )
            // counterUp( element, {
            //     duration: 2000,
            //     delay: 10,
            // })
        })
    }, [])

    return (
        <div className="my-container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                    <div className="row g-3">
                        <div className="col-6 text-start">
                            <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s"
                                src={AboutOne} />
                        </div>
                        <div className="col-6 text-start">
                            <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s"
                                src={AboutTwo} style={{ marginTop: '25%' }} />
                        </div>
                        <div className="col-6 text-end">
                            <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s"
                                src={AboutThree} />
                        </div>
                        <div className="col-6 text-end">
                            <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s"
                                src={AboutFour} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                    <h1 className="mb-2 mb-lg-4">Welcome to <i className="fa fa-utensils text-primary me-2"></i>Restoran</h1>
                    <p className="mb-2 mb-lg-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet
                        diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
                    <p className="mb-4 mb-lg-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet
                        diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna
                        dolore erat amet</p>
                    <div className="row g-4 mb-2 mb-lg-4">
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                <h1 className="counter flex-shrink-0 display-5 text-primary mb-0">15
                                </h1>
                                <div className="ps-4">
                                    <p className="mb-0">Years of</p>
                                    <h6 className="text-uppercase mb-0">Experience</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                <h1 className="counter flex-shrink-0 display-5 text-primary mb-0">50
                                </h1>
                                <div className="ps-4">
                                    <p className="mb-0">Popular</p>
                                    <h6 className="text-uppercase mb-0">Master Chefs</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="btn btn-primary py-2 px-4 py-lg-3 px-lg-5 mt-2" href="">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default AboutSection