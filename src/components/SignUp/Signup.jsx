import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Bounce, toast } from 'react-toastify';
import signUpAuth from '../../api/signUp';
import { AuthContext } from '../../App';
import setAuthTokenCookie from '../../helper/authCookie';
const Signup = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const passwordLength = /^.{8,32}$/; //regex
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        ;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [errorMsg, setErrorMsg] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleErrorMessage = (msg) => {
        setErrorMsg(msg);
        setFormData({
            ...formData,
            password: "",
            cpassword: ""
        });
    }
    const inputValidator = () => {
        if (!emailPattern.test(formData.email)) {
            handleErrorMessage("Please enter a valid email");
            return false;
        }
        else if (!passwordLength.test(formData.password)) {
            handleErrorMessage("Password must have at least 8 characters");
            return false;
        }
        else if (!passwordPattern.test(formData.password)) {
            handleErrorMessage("Password must include atleast one uppercase, lowercase, digit and a special character.");
            return false;

        }
        else if (formData.password !== formData.cpassword) {
            handleErrorMessage("Passwords do not match");
            return false;
        }
        else {
            return true;
        }

    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const isValid = inputValidator();
        if (isValid) {
            setLoader(true);
            try {
                //means all good
                setErrorMsg("");

                const response = await signUpAuth({
                    "name": formData.name,
                    "email": formData.email,
                    "password": formData.password
                });

                if (response?.status === 200) {
                    console.log(response);

                    setAuthTokenCookie(response?.data?.token, response?.data?.userId);
                    setIsAuthenticated(true);

                    //clear form data after the api is called successfully
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        cpassword: "",
                    });

                    const btnClose = document.querySelector('#close-signup-modal');//give unique id to div with className btn-close
                    btnClose.click(); //close modal
                    navigate('/');
                }
                else {
                    console.log(response?.data?.message);
                    toast.error("Something Went Wrong", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
            catch (error) {
                console.log(error);
                
                //handling non-network error
                setErrorMsg(error?.response?.data); //show error messag present in data variable
                setFormData(
                    {
                        ...formData,
                        password: '',
                        cpassword: '', //clear password
                    }
                )

                if (error?.code === 'ERR_NETWORK') {  //handling connection Timeout or network error
                    // toast.error(error?.message,{
                    //     transition: Slide,
                    // }
                    // );
                    toast.error("Something Went Wrong", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
            finally {
                setLoader(false);
            }
        }
    }
    return (
        <>
            <div className="modal fade" id="signupModal" aria-labelledby="signupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="signupModalLabel">Sign Up</h5>
                            <button type="button" className="btn-close" id="close-signup-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="#" method="POST" onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label htmlFor="signup-name" className="form-label" >Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="John Doe" required
                                        onChange={handleChange}
                                        value={formData?.name || ''}
                                        autoComplete="username"
                                        id="signup-name"
                                    // change id name otherwise it will match with the login input making two component with same id (should have unique id)
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signup-email" className="form-label" >Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="xyz@gmail.com" required
                                        onChange={handleChange}
                                        value={formData?.email || ''}
                                        autoComplete="email"
                                        id="signup-email"
                                    // change id name otherwise it will match with the login input making two component with same id (should have unique id)
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signup-password" className="form-label" >Password</label>
                                    <input type="text" className="form-control" name="password" placeholder="johndoe" required
                                        onChange={handleChange}
                                        value={formData?.password || ''}
                                        id="signup-password"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
                                    <input type="text" className="form-control" id="cpassword" name="cpassword" placeholder="johndoe" required
                                        onChange={handleChange}
                                        value={formData?.cpassword || ''}
                                        autoComplete="off"
                                    />
                                </div>
                                {/* error message */}
                                {errorMsg && <p className="fs-6 text-danger" id="login-error">{errorMsg}</p>}

                                <div className="mb-2">
                                    <small className="text-secondary">Already hava an account?</small>
                                    <span className="text-primary text-decoration-underline ms-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#loginModal"
                                        data-bs-dismiss="modal"
                                        aria-label='Login' //close the current modal 
                                        id="login-link"
                                        style={{ cursor: 'pointer' }}
                                    >Login</span>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Loader isActive={loader} />
        </>
    )
}

export default Signup