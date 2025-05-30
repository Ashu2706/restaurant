import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <div className="my-container bg-dark text-light footer pt-md-5 pt-4 mt-md-5 mb-0 wow fadeIn" data-wow-delay="0.1s">

            <div className="row g-4 g-md-5 mb-2">
                <div className="col-lg-3 col-sm-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Company</h4>
                    <NavLink className="btn btn-link" to="/about">About Us</NavLink>
                    <NavLink className="btn btn-link" to="#">Contact Us</NavLink>
                    <NavLink className="btn btn-link" to="#">Reservation</NavLink>
                    <NavLink className="btn btn-link" to="#">Privacy Policy</NavLink>
                    <NavLink className="btn btn-link" to="#">Terms & Condition</NavLink>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-2">
                        {/* always use anchor tag for external links such as social media links and use NavLink for internal website links*/}
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
                    <h5 className="text-light fw-normal">Monday - Saturday</h5>
                    <p>09AM - 09PM</p>
                    <h5 className="text-light fw-normal">Sunday</h5>
                    <p>10AM - 08PM</p>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Newsletter</h4>
                    <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    <div className="position-relative" style={{ maxWidth: '400px' }}>
                        <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text"
                            placeholder="Your email" />
                        <button type="button"
                            className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="row">
                    <div className="col-sm-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <NavLink className="border-bottom" to="/">Restaurant</NavLink>, All Right Reserved.

                        {/* This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. */}
                        Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                    </div>
                    <div className="col-sm-6 text-center text-md-end">
                        <div className="footer-menu">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="#">Cookies</NavLink>
                            <NavLink to="#">Help</NavLink>
                            <NavLink to="#">FQAs</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer