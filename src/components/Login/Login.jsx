import React, { useContext, useEffect, useState } from 'react'
import setAuthTokenCookie from '../../helper/authCookie';
import { AuthContext } from '../../App';
import loginAuth from '../../api/loginAuth';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value //[name] is the name of the input field and //value is the value of the input field
        });              // example: [email]: xyz@gmail.com
    }

    useEffect(() => {
        const btnClose = document.querySelector('#close-login-modal');//give unique id to div with className btn-close
        const overlay = document.querySelector('#loginModal');
        const modalDialog = document.querySelector('#loginbody');

        modalDialog.addEventListener('click', (e) => {
            e.stopPropagation(); //prevent overlay event from triggering when clicking on the area of modal body
        })
        overlay.addEventListener('click', () => {

            setErrorMsg('');
            setFormData({
                email: '',
                password: ''
            })
        })
        btnClose.addEventListener('click', () => {
            setErrorMsg('');
            setFormData({
                email: '',
                password: ''
            })
        })

        return () => {
            overlay.removeEventListener('click', () => {
            })
            modalDialog.removeEventListener('click', (e) => {
            })
            btnClose.removeEventListener('click', () => {

            })
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        // const email = e.target.email.value;
        // const password = e.target.password.value;
        // console.log(email, password);

        //enable loader
        setLoader(true);
        try {
            const response = await loginAuth(formData);//promise to login and we are waiting for response
            if (response?.status === 200) {
                console.log(response);

                setAuthTokenCookie(response?.data?.token, response?.data?.userId);
                setIsAuthenticated(true);

                const btnClose = document.querySelector('#close-login-modal');//give unique id to div with className btn-close
                //because there with other modals with the same btn-close class and you only want to close this login modal
                btnClose.click();

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
            console.log(error?.response);
            //handling non-network error
            setErrorMsg(error?.response?.data); //show error messag present in data entity/key
            setFormData(
                {
                    ...formData,
                    password: '' //clear password
                }
            )
            if (error?.code === 'ERR_NETWORK') {  //handling connection Timeout or network error
                // toast.error(error?.message,{
                //     transition: Slide,
                // }
                // );
                console.log(error?.message);
                
                toast.error("Something Went Wrong", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
        finally {
            setLoader(false);//turn off the loader after the api executed

            // setLoader(false): Place this in the finally block. The finally
            //  block ensures the loader turns off regardless of whether the API call succeeds 
            // or fails (i.e., whether it resolves or rejects).
        }
    }

    return (
        <>
            <div className="modal fade" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" id="loginbody">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="loginModalLabel">Login</h5>
                            <button type="button" className="btn-close" id="close-login-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="#" method="POST" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" name="email">Email</label>
                                    <input type="email" className="form-control" name="email" id="email"
                                        placeholder="xyz@gmail.com"
                                        autoComplete="username"
                                        value={formData?.email || ''} onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label" >Password</label>
                                    <input type="text" className="form-control" name="password" id="password"
                                        placeholder="johndoe"
                                        autoComplete="current-password"
                                        value={formData?.password || ''} onChange={handleChange}
                                        required />
                                </div>

                                {errorMsg && <p className="fs-6 text-danger">{errorMsg}</p>}

                                <p className="text-danger" id="login-error"></p>
                                <div className="mb-2">
                                    <small className="text-secondary">Don't hava account?</small>
                                    <span className="text-primary text-decoration-underline ms-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#signupModal"
                                        data-bs-dismiss="modal" //close the current modal 
                                        id="signup-link"
                                        aria-label='Sign up'
                                        style={{ cursor: 'pointer' }}
                                    >Sign Up</span>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Loader isActive={loader} />
        </>
    )
}

export default Login