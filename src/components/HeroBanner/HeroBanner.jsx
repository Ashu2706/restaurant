import React from 'react'
import HeroImage from '../../assets/images/hero.png';
import './heroBanner.scss';
const HeroBanner = () => {
    return (
        <div className="hero-header my-container py-lg-5">
            <div className="mx-2 mx-lg-0 my-3 my-lg-5 py-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="display-5 display-lg-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
                        <p className="text-white w-85 animated slideInLeft  mx-auto mx-lg-0 mb-4 pb-2">Tempor erat elitr rebum at clita. Diam
                            dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed
                            stet lorem sit clita duo justo magna dolore erat amet</p>
                        <a href="#bookingTable" className="btn btn-primary py-2 py-lg-3 px-4 px-lg-5 animated slideInLeft">Book A
                            Table</a>
                    </div>
                    <div className="d-none d-lg-block col-lg-6 overflow-hidden">
                        <img className="img-fluid" src={HeroImage} alt="dish" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner