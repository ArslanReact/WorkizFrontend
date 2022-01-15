import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// 
import twitter from "../assets/images/website/twitter_vector.svg";
import linkedin from "../assets/images/website/linkedin_vector.svg";
import fb from "../assets/images/website/fb_vector.svg";
import youtube from "../assets/images/website/youtube_vector.svg";

const Webfooter = () => {
    return (
        <>
            <div className="footer">
                <div className="py-lg-5 py-4">
                    <div className="col-xl-11 col-10 mx-auto">
                        <div className="text-center py-lg-5 py-4 ready_part">
                            <h4 className="mb-4 text-white">Ready For Results? Request Access!</h4>
                            <p className="paragraph_grey1_text_color">We’ll help you get started, develop a custom outreach plan, and evaluate Respona’s features.</p>
                            <NavLink to={`${process.env.PUBLIC_URL}/signup`} variant="0" className="btn request-btn btn-lg">Request Access</NavLink>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="py-lg-5 py-4">
                    <div className="col-xl-11 col-10 mx-auto">
                        <div className="row">
                            <div className="col-xl-5 col-lg-6 col-md-6 col-md-12 mb-xl-0 mb-4">
                                <h5 className="fontsize20 fontweightbold text-white mb-4">Easymanage Features</h5>
                                <ul className="list-unstyled footer_nav m-0 d-flex justify-content-between">
                                    <div className="w-100">
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/job_management`} className="footer_link">Job Management</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/webjob_scheduling`} className="footer_link">Job Scheduling</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/invoicing`} className="footer_link">Invoicing</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/estimate`} className="footer_link">Estimate</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/client_management`} className="footer_link">Client Management (CRM)</NavLink></li>
                                    </div>
                                    <div className="w-100">
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/expenses_management`} className="footer_link">Expenses Management</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/chatbot`} className="footer_link">Chat Management</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/employees`} className="footer_link">Employees</NavLink></li>
                                        {/* <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/webpayments`} className="footer_link">Payments</NavLink></li> */}
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/inventory_management`} className="footer_link">Inventory Management</NavLink></li>
                                    </div>
                                    <div className="w-100">
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/webattendance`} className="footer_link">Attendance</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/webleaves`} className="footer_link">Leaves</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/webtime_logs`} className="footer_link">Time Logs</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/tasks`} className="footer_link">Tasks</NavLink></li>
                                    </div>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-lg-6 mb-4 col-md-6 mb-xl-0 mb-4">
                                <h5 className="fontsize20 fontweightbold text-white mb-4">Company</h5>
                                <ul className="list-unstyled footer_nav m-0">
                                    <div className="w-100">
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/about_us`} className="footer_link">About Us</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/investors`} className="footer_link">Investors</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/contact_us`} className="footer_link">Contact Us</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/careers`} className="footer_link">Careers</NavLink></li>
                                    </div>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-lg-6 mb-4 col-md-6 mb-xl-0 mb-4">
                                <h5 className="fontsize20 fontweightbold text-white mb-4">Resources</h5>
                                <ul className="list-unstyled footer_nav m-0">
                                    <div className="w-100">
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/industries`} className="footer_link">Industries</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/support`} className="footer_link">Support</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/pricing`} className="footer_link">Pricing</NavLink></li>
                                        <li className="footer_item"><NavLink to={`${process.env.PUBLIC_URL}/faq`} className="footer_link">FAQ</NavLink></li>
                                    </div>
                                </ul>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-12">
                                <h5 className="fontsize20 fontweightbold text-white mb-4">Get In Touch</h5>
                                <ul className="list-unstyled footer_nav m-0">
                                    <div className="w-100">
                                        <li className="footer_item mb-3 paragraph_grey1_text_color">Feel free to get in touch with us via email</li>
                                        <li className="footer_item mb-5"><NavLink to="#" className="fontsize20 seablue_text_color">support@easymanave.com</NavLink></li>
                                        <li className="footer_item d-flex soial align-items-center">
                                            <NavLink to="#" className="me-4 soial-link"><div className="tooltip_hvr">Twitter</div><img className="img-fluid" src={twitter} alt="Twitter" /></NavLink>
                                            <NavLink to="#" className="me-4 soial-link"><div className="tooltip_hvr">linkedin</div><img className="img-fluid" src={linkedin} alt="Linkedin" /></NavLink>
                                            <NavLink to="#" className="me-4 soial-link"><div className="tooltip_hvr">Facebook</div><img className="img-fluid" src={fb} alt="Facebook" /></NavLink>
                                            <NavLink to="#" className="me-4 soial-link"><div className="tooltip_hvr">Youtube</div><img className="img-fluid" src={youtube} alt="Youtube" /></NavLink>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="copyright py-4">
                    <div className="col-xl-11 col-10 mx-auto"><p>© Copyright 2021. Easymanage. All Rights Reserved | <NavLink to={`${process.env.PUBLIC_URL}/`} className="">Terms of Service</NavLink> | <NavLink to={`${process.env.PUBLIC_URL}/`} className="">Privacy Policy</NavLink> | <NavLink to={`${process.env.PUBLIC_URL}/`} className="">Trust Center</NavLink></p></div>
                </div>
            </div>
        </>
    )
}

export default Webfooter;
