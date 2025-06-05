import React, { useState, useEffect, useContext } from 'react';
import './navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../../App';

export const Navbar = ({ setIsSidebarOpen }) => {
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleHamburger = () => {
    //scroll adds sticky-top class, we need to remove it before adding(toggling),
    //because if we don't, it will remove the sticky-top class when clicked as we are using toggle
    //have to check for this condition when we scroll more than 45px.
    if (document.querySelector(".navbar").classList.contains("sticky-top") && window.scrollY > 45)
      document.querySelector(".navbar").classList.remove("sticky-top");
    document.querySelector(".navbar").classList.toggle("sticky-top");
  }

  useEffect(() => {

    // Sticky Navbar
    // Add the sticky-top and shadow-sm classes to the navbar when the user scrolls down
    // past a certain point (45px). This causes the navbar to be fixed to the top of the
    // page and have a subtle shadow.
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 45) {
        document.querySelector(".navbar").classList.add("sticky-top", "shadow-sm");
      }
      else {
        document.querySelector(".navbar").classList.remove("sticky-top", "shadow-sm");
      }
    }

    //handle dropdown
    // The dropdown is handled by the bootstrap library, but we need to add some custom
    // logic to make it work as desired.
    const dropdownElement = document.querySelector('.dropdown');
    const dropdownMenuElement = document.querySelector('.dropdown-menu');
    const dropdownToggleElement = document.querySelector('.dropdown-toggle');
    const showClass = "show";

    const handleMouseEnter = () => {
      // When the user hovers over the dropdown, add the show class to the dropdown
      // element. This makes the dropdown visible.
      dropdownElement.classList.add(showClass);
      // Also set the aria-expanded attribute of the toggle element to true,
      // so that screen readers know that the dropdown is visible.
      dropdownToggleElement.setAttribute("aria-expanded", "true");
      // Make the dropdown menu visible.
      dropdownMenuElement.classList.add(showClass);
    };

    const handleMouseLeave = () => {
      // When the user stops hovering over the dropdown, remove the show class from the
      // dropdown element. This makes the dropdown invisible.
      dropdownElement.classList.remove(showClass);
      // Also set the aria-expanded attribute of the toggle element to false,
      // so that screen readers know that the dropdown is invisible.
      dropdownToggleElement.setAttribute("aria-expanded", "false");
      // Hide the dropdown menu.
      dropdownMenuElement.classList.remove(showClass);
    };

    const handleWindowResize = () => {
      // When the window is resized, check if the screen is wide enough to use the
      // dropdown in hover mode. If it is, add the event listeners for mouseenter and
      // mouseleave. Otherwise, remove the event listeners.
      if (window.matchMedia("(min-width: 992px)").matches) {
        dropdownElement.addEventListener("mouseenter", handleMouseEnter);
        dropdownElement.addEventListener("mouseleave", handleMouseLeave);
      } else {
        dropdownElement.removeEventListener("mouseenter", handleMouseEnter);
        dropdownElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Run the resize logic on component mount and resize
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      dropdownElement.removeEventListener("mouseenter", handleMouseEnter);
      dropdownElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);//With [] useffect will run only when component mount or resize

  /*
* In React, the function you return from a useEffect hook serves as a cleanup function. 
* React automatically calls this cleanup function when:
   The component is unmounted.
   The useEffect dependency array changes, and the effect is re-run.
*/
  return (
    <nav className="nav-container navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand p-0">
        <h1 className="text-primary m-0">
          <i className="fa fa-utensils me-3"></i>Restaurant
        </h1>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        onClick={handleHamburger}
      >
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 pe-4">
          <NavLink to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link">
            About
          </NavLink>
          {
            isAuthenticated ?
              <div
                className="nav-item nav-link"
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
                id="cart-link"
              >
                Cart
              </div> :
              // open show login Msg Modal
              <div
                className="nav-item nav-link"
                data-bs-toggle="modal"
                data-bs-target="#loginMsgModal"
                id="cart-link"
              >
                Cart
              </div>
          }
          {
            isAuthenticated ?
              <div className="nav-item nav-link"
                onClick={() => {
                  setIsSidebarOpen(true) 
                }}
              >Order</div>
              :
              // open show login Msg Modal
              <div
                className="nav-item nav-link"
                data-bs-toggle="modal"
                data-bs-target="#loginMsgModal"
                id="order-link"
              >
                Order
              </div>
          }
          <div className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pages
            </button>
            <div className="dropdown-menu m-0">
              {isAuthenticated ?
                <>
                  <NavLink to="/team" className="dropdown-item">
                    Our Team
                  </NavLink>
                  <NavLink to="/testimonial" className="dropdown-item">
                    Testimonial
                  </NavLink>
                </>
                :
                // open show login Msg Modal
                <>
                  <div
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#loginMsgModal"
                    id="team-link"
                  >
                    Our Team
                  </div>
                  <div
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#loginMsgModal"
                    id="testimonial-link"
                  >
                    Testimonial
                  </div>
                </>
              }

            </div>
          </div>
        </div>
        {
          !isAuthenticated ?
            <button className="btn btn-primary py-2 px-4" data-bs-toggle="modal" data-bs-target="#loginModal" id="login-link">Login</button>
            :
            <button className="btn btn-primary py-2 px-4"
              onClick={() => {
                const cookie = new Cookies();
                cookie.remove('authToken', { path: '/' });
                cookie.remove('userId', { path: '/' });
                setIsAuthenticated(false);
                navigate('/');
              }}
            >Logout</button>
        }
      </div>
    </nav>
  );
}