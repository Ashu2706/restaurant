import React from 'react'

export const TeamCard = ({ designation, name, social, delay, image,}) => {
    return (
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={delay * 0.2 + 0.1 + "s"}>
            <div className="team-item text-center">
                <div className="rounded-circle overflow-hidden m-4">
                    <img className="img-fluid rounded-circle" src={image} alt="" />
                </div>
                <h5 className="mb-0">{name}</h5>
                <small>{designation}</small>
                <div className="d-flex justify-content-center mt-3">
                    <a className="btn btn-square btn-primary mx-1" target="_blank" rel="noopener noreferrer" href={social[0]?.link}><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square btn-primary mx-1" target="_blank" rel="noopener noreferrer" href={social[1]?.link}><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square btn-primary mx-1" target="_blank" rel="noopener noreferrer" href={social[2]?.link}><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
         /**
         * noopener: This prevents the newly opened tab from gaining control over the original tab 
         * via window.opener. Without this, a malicious site could manipulate your current page,
         * potentially redirecting users or stealing sensitive data.

         * noreferrer: This prevents the browser from passing the referrer (the source page's URL) to 
         * the new tab. This is useful if you don’t want external sites to track where their traffic is coming from.
         */
    )
}
