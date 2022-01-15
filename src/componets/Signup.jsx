import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { Form, FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
import logo from "../assets/images/logo.svg";
import framevector from "../assets/images/framevector.svg";
import invisible from "../assets/images/invisible.svg";
import openeye from "../assets/images/open-eye.svg";
import Globalsettings from "../componets/Globalsettings";
import axios from 'axios';
const Signup = () => {
    const history = useHistory();
    const [active, setactive] = useState(false);
    const [email, setemail] = useState("");
    const [companyname, setcompanyname] = useState("");
    const [pass, setpass] = useState("");
    const [passconfirm, setpassconfirm] = useState("");
    const onSubmitButton = (e) => {
        setactive(true);
        e.preventDefault();
        axios.post(Globalsettings.url + 'api/signup/store', {
            email: email,
            company_name: companyname,
            password: pass,
            password_confirmation: passconfirm,
        })
            .then((response) => {
                toast.success(response.data.message);
                setactive(false);
                // history.push("/signin");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setactive(false);
            });

    }
    const onPasswordClickShow = (e) => {
        var x = document.getElementById("pass");
        var y = document.getElementById("imgpass");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onPasswordConfirmClickShow = (e) => {
        var x = document.getElementById("confirmpassword");
        var y = document.getElementById("imgpassconfirm");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    return (
        <>
            <LoadingOverlay
                active={active}
                spinner
                text='Please Wait...'
            />
            <ToastContainer />
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form">
                            <Form className="validate-form w-100" onSubmit={onSubmitButton}>
                                <span className="logo"><NavLink to={`${process.env.PUBLIC_URL}/`}><img width="260" alt="logo" className="img-fluid" src={logo} /></NavLink></span>
                                <span className="login100-form-title pb-4">Sign Up</span>
                                <Form.Group>
                                    <FormLabel htmlFor="username" className="mb-2">Company Name</FormLabel>
                                    <div className="wrap-input100 validate-input mb-4" data-validate="Name">
                                        <input className="input100" placeholder="Username" type="text" autoComplete="off" value={companyname} onChange={e => setcompanyname(e.target.value)} />
                                        <span className="focus-input100"></span>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <FormLabel htmlFor="email" className="mb-2">Your Email Address</FormLabel>
                                    <div className="wrap-input100 validate-input mb-4" data-validate="eazy-manage@gmail.com">
                                        <input className="input100" placeholder="eazy-manage@gmail.com" type="text" autoComplete="off" value={email} onChange={e => setemail(e.target.value)} />
                                        <span className="focus-input100"></span>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <FormLabel htmlFor="password" className="mb-2">Password</FormLabel>
                                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" id="pass" placeholder="**************" name="password" value={pass} onChange={e => setpass(e.target.value)} />
                                        <span className="focus-input100"></span>
                                        <span className="focus-input100-img" onClick={onPasswordClickShow}><img id="imgpass" className="img-fluid" src={invisible} alt="eye" width="23" /></span>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <FormLabel htmlFor="confirmpassword" className="mb-2">Confirm Password</FormLabel>
                                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" id="confirmpassword" placeholder="**************" name="password" value={passconfirm} onChange={e => setpassconfirm(e.target.value)} />
                                        <span className="focus-input100"></span>
                                        <span className="focus-input100-img" onClick={onPasswordConfirmClickShow}><img id="imgpassconfirm" className="img-fluid" src={invisible} alt="eye" width="23" /></span>
                                    </div>
                                </Form.Group>
                                <div className="d-flex align-items-center mb-4">
                                    {/* <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <FormLabel className="label-checkbox100" htmlFor="ckb1">Stay Logged In</FormLabel>
                                    </div> */}
                                    <p className="m-0">Don't have an account?<NavLink to={`${process.env.PUBLIC_URL}/signin`} className="txt1"> Sign In</NavLink></p>
                                    {/* <p className="m-0 ml-auto"><NavLink to="/forgot" className="txt1">Forgot password?</NavLink></p> */}
                                </div>
                                <button type="submit" id="submit" className="login100-form-btn">Sign Up</button>
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

export default Signup;
