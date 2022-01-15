import React, { useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
// import logo_black from "";
import logo from "../assets/images/logo.svg";
import framevector from "../assets/images/framevector.svg";
import eye from "../assets/images/eye.svg";
import hideeye from "../assets/images/eye_half.svg";
import Globalsettings from "../componets/Globalsettings";
import axios from 'axios';

const Signin = () => {
    const history = useHistory();
    const[name, setname] = useState("");
    const[active, setactive] = useState("");
    const[password, setpassword] = useState("");
    const[email, setemail] = useState("");
    const onSubmitButton = (e) => {
        setactive(true);
        e.preventDefault();
        axios.post(Globalsettings.url + 'api/adminlogin', {
            email: email,
            password: password
        })
        .then((response) =>{
            setactive(false);
            localStorage.setItem('data',JSON.stringify(response.data.data));
            if (localStorage.getItem("data") === null) {
                history.push(`${process.env.PUBLIC_URL}/signin`);
            }else{
                axios.post(Globalsettings.url + 'api/adminlogingetingrole', {
                    userid: response.data.data.id
                })
                .then((response) =>{
                    if(response.data == "admin"){
                        history.push(`${process.env.PUBLIC_URL}/dashboard`);
                    }else if(response.data == "employee"){
                        history.push(`${process.env.PUBLIC_URL}/employeedashboard`);
                    }else if(response.data == "client"){
                        localStorage.setItem("cart", "");
                        history.push(`${process.env.PUBLIC_URL}/clientdashboard`);
                    }
                    
                });
            }
        })
        .catch((error) =>{
            setactive(false);
            toast.error(error.response.data.message);  
        });

        setemail('');
        setpassword('');

    }
    const onPasswordClickShow= (e) => {
        var x=document.getElementById("pass");
        var y=document.getElementById("imgpass");
        if(x.type==="password")
        {
            x.type="text";
            y.src=eye;
        }else{
            x.type="password";
            y.src=hideeye;
        }
      }
    
    return (  
        
      <div className="limiter">
        <LoadingOverlay active={active} spinner text='Please Wait...' />
          <ToastContainer closeButton={true} position="top-right" />
      <div className="container-login100">
          <div className="wrap-login100">
              <div className="login100-form">
                  <Form className="validate-form w-100" onSubmit={onSubmitButton}>
                 
                      <span className="logo"><NavLink to={`${process.env.PUBLIC_URL}/`}><img width="260" className="img-fluid" src={logo} /></NavLink></span>
                      <span className="login100-form-title pb-4">Sign In</span>
                      <Form.Group>
                          <label htmlFor="username" className="mb-2">Your Email Address</label>
                          <div className="wrap-input100 validate-input mb-4" data-validate="eazy-manage@gmail.com">
                              <input className="input100" id="email" type="email" name="email" value={email} autoFocus="" required="" onChange={e => setemail(e.target.value)} placeholder="Email" />
                              <span className="focus-input100"></span>
                          </div>
                      </Form.Group>
                      <Form.Group>
                          <label htmlFor="password" className="mb-2">Password</label>
                          <div className="wrap-input100 validate-input" data-validate="Password is required">
                              <input className="input100" id="pass" type="password" name="password" required="" placeholder="Password" value={password} onChange={e => setpassword(e.target.value)} />
                              <span className="focus-input100"></span>
                              <span className="focus-input100-img" onClick={onPasswordClickShow}><img id="imgpass" className="img-fluid" src={hideeye} width="23" alt="" /></span>
                          </div>
                      </Form.Group>
                      <div className="d-flex align-items-center mb-4">
                          <div className="contact100-form-checkbox">
                              <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                              <label className="label-checkbox100" htmlFor="ckb1">Stay Logged In</label>
                          </div>
                          <p className="ml-auto"><NavLink to={`${process.env.PUBLIC_URL}/forgot`} className="txt1">Forgot password?</NavLink></p>
                      </div>
                      <button type="submit" id="submit" className="login100-form-btn">Sign In</button>
                      <p className="mt-4">Don't have an account?<NavLink to={`${process.env.PUBLIC_URL}/signup`} className="txt1"> Sign Up</NavLink></p>
                  </Form>
              </div>
              <div className="login100-more">
                  <div className="tecmyer-logo text-center">
                      <div>
                          <h5 className="mb-4">Get <br />work done from <br />anywhere.</h5>
                          <p className="m-0"><img className="img-fluid" src={framevector} alt="" /></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>     
    )

}


export default Signin;