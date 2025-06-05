import { createContext, useEffect, useState } from 'react'
import './assets/styles/style.scss';
import './assets/styles/theme.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import { ToastContainer } from 'react-toastify';
import About from './Pages/About';
import LoginMessage from './components/LoginMessage/LoginMessage';
import Footer from './components/Footer/Footer';
import PrivateRoute from './routes/PrivateRoute';
import Team from './Pages/Team';
import Testimonial from './Pages/Testimonial';
import { Cookies } from 'react-cookie';
import fetchCart from './api/fetchCart';
import AddToCart from './components/AddToCart/AddToCart';
import Order from './components/Order/Order';
export const AuthContext = createContext();
export const CartContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cart, setCart] = useState([]);

  const checkAuth = () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (authToken)
      setIsAuthenticated(true);
    else
      setIsAuthenticated(false); // Update state based on cookie
  };

  const initializeCart = async () => {
    if (!isAuthenticated) return null;

    const cartData = await fetchCart();
    if (cartData)
      setCart(cartData);
    console.log("Cart Data:", cartData);

  };

  useEffect(() => {
    const wow = new window.WOW();
    wow.init();
  }, [])//only run once to initialize when component mounts

  useEffect(() => {
    initializeCart();
  }, [isAuthenticated])

  useEffect(() => {

    // Check authentication status on load (first time) and periodically
    checkAuth();
    setInterval(checkAuth, 60000);//every 1 minute

    return () => { //whatever  function you return will be called when the component is unmounted
      clearInterval(); //clear interval when component is unmounted
    }
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <div className="container-xxl bg-white p-0">
            <div className="position-relative p-0">
              <Navbar setIsSidebarOpen={setIsSidebarOpen}/> {/*Keep things here that will be common in every page */}
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/team" element={<Team />} />
                  <Route path="/testimonial" element={<Testimonial />} />
                </Route>
                {/* Page not found */}
                <Route path="*" element={<h1>404 Page Not Found</h1>} />
              </Routes>
              {/*======== Modals and overlays ========  */}
              <Login />
              <LoginMessage />
              <Signup />
              <Order isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

              <ToastContainer
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <AddToCart />
              <Footer />
            </div>
          </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
