import React, { useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Form, FormLabel } from "react-bootstrap";
import Globalsettings from "../componets/Globalsettings";
import axios from 'axios';
// 
import logo from "../assets/images/logo.svg";
import framevector from "../assets/images/framevector.svg";

const Forgot = () => {
    const history = useHistory();
    const[active, setactive] = useState("");
    const[email, setemail] = useState("");
    const onSubmitButton = (e) => {
        setactive(true);
        e.preventDefault();
        axios.post(Globalsettings.url + 'api/password/email', {
            email: email
        })
        .then((response) =>{
            setemail('');
            toast.success(response.data.message);  
            setactive(false);
        })
        .catch((error) =>{
            setactive(false);
            toast.error(error.response.data.message);  
        });

       

    }    
    return (
        <>
            <LoadingOverlay active={active} spinner text='Please Wait...' />
            <ToastContainer closeButton={true} position="top-right" />
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form">
                            <Form className="validate-form w-100" onSubmit={onSubmitButton}>
                                <span className="logo"><NavLink to={`${process.env.PUBLIC_URL}/`}><img width="260" className="img-fluid" alt="logo" src={logo} /></NavLink></span>
                                <span className="login100-form-title">Recover Password</span>
                                <p className="pb-4">Enter your Email and instructions will be sent to you!</p>
                                <Form.Group>
                                    <FormLabel htmlFor="email" className="mb-2">Your Email Address</FormLabel>
                                    <div className="wrap-input100 validate-input mb-4" data-validate="eazy-manage@gmail.com">
                                        <input className="input100" placeholder="eazy-manage@gmail.com" type="text" autoComplete="off" value={email} onChange={e => setemail(e.target.value)} />
                                        <span className="focus-input100"></span>
                                    </div>
                                </Form.Group>
                                <div className="d-flex align-items-center mb-4">
                                    {/* <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <FormLabel className="label-checkbox100" htmlFor="ckb1">Stay Logged In</FormLabel>
                                    </div> */}
                                    <p className="m-0">Don't have an account?<NavLink to={`${process.env.PUBLIC_URL}/signin`} className="txt1"> Sign In</NavLink></p>
                                    {/* <p className="m-0 ml-auto"><NavLink to={`${process.env.PUBLIC_URL}/forgot`} className="txt1">Forgot password?</NavLink></p> */}
                                </div>
                                <button type="submit" id="submit" className="login100-form-btn">Send Reset Link</button>
                            </Form>
                        </div>
                        <div className="login100-more">
                            <div className="tecmyer-logo text-center">
                                <div>
                                    <h5 className="mb-4">Get <br />work done from <br />anywhere.</h5>
                                    <p className="m-0"><img className="img-fluid" src={framevector} alt="framevector" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot;
