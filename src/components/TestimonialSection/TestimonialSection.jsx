import testimonialImage1 from '../../assets/images/testimonial-1.jpg';
import testimonialImage2 from '../../assets/images/testimonial-2.jpg';
import testimonialImage3 from '../../assets/images/testimonial-3.jpg';
import testimonialImage4 from '../../assets/images/testimonial-4.jpg';
import { TestimonialCard } from './TestimonialCard';
import OwlCarousel from "react-owl-carousel"; // Ensure correct package
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import './testimonial.scss';

const TestimonialCarousel = () => {
  const options = {
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 16,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  };
  const response = { data: [testimonialImage1, testimonialImage2, testimonialImage3, testimonialImage4] };
  return (
    <div className="my-container wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Testimonial
          </h5>
          <h1 className="mb-4 mb-md-5">Our Clients Say!!!</h1>
        </div>
        <OwlCarousel className="testimonial-carousel" {...options}>
          {response.data.map((image, index) => (
            <TestimonialCard key={index} profileImage={image} />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default TestimonialCarousel;