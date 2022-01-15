import React, { useState } from 'react';
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody';
import { NavLink, Link } from "react-router-dom";
import PhoneNumber from 'react-phone-number';

// 
import logo from "../assets/images/website/logo.svg";
import logo_white from "../assets/images/website/logo_white.svg";
import bar from "../assets/images/website/bar.svg";
import call from "../assets/images/website/call.svg";
import arrow_right from "../assets/images/website/arrow_right.svg";

const Webheader = () => {
    const options = [
        {
            name: <img className="img-fluid" src={bar} alt="bar" />,
            scroll: true,
            backdrop: false,
        },
    ];
    return (
        <>
            <div className="body_bg_color header web_header h-100 sticky-top shadow-sm shadow-none">
                <div className="col-xl-11 col-10 mx-auto">
                    <Navbar collapseOnSelect expand="xl" className="navbarweb d-block d-lg-flex" bg="" variant="light">
                        <Navbar.Brand className="m-0 p-0" href={`${process.env.PUBLIC_URL}/`}><img className="img-fluid" src={logo} alt="" /></Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                        <Nav className="ms-auto d-none hide-nav align-items-center">
                            <Nav.Item><NavLink className="nav-link" activeclassName="activeclassName" to={`${process.env.PUBLIC_URL}/`}>Home</NavLink></Nav.Item>
                            <Nav.Item><NavLink className="nav-link" to="#">Features</NavLink>
                                <ul className="list-unstyled mega_dropdown">
                                    <div className="row">
                                        <div className="col-xl-3">
                                            <Nav.Item>
                                                <NavLink to={`${process.env.PUBLIC_URL}/job_management`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Job Management</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/webjob_scheduling`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Job Scheduling</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/invoicing`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Invoicing</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/estimate`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Estimate</NavLink>
                                            </Nav.Item>
                                        </div>
                                        <div className="col-xl-3">
                                            <Nav.Item>
                                                <NavLink to={`${process.env.PUBLIC_URL}/client_management`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Client Management</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/inventory_management`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Inventory Management</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/team_management`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Team Management</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/chatbot`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Chat Management</NavLink>
                                                 
                                                
                                            </Nav.Item>
                                        </div>
                                        <div className="col-xl-3">
                                            <Nav.Item>
                                                
                                                {/* <NavLink to={`${process.env.PUBLIC_URL}/webpayments`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Payments</NavLink> */}
                                                <NavLink to={`${process.env.PUBLIC_URL}/webattendance`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Attendance</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/tasks`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Tasks</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/webleaves`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Leaves</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/webtime_logs`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Time Logs</NavLink> 
                                                
                                            </Nav.Item>
                                        </div>
                                        <div className="col-xl-3">
                                            <Nav.Item>
                                                <NavLink to={`${process.env.PUBLIC_URL}/employees`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Employees</NavLink>
                                                
                                                {/* <NavLink to={`${process.env.PUBLIC_URL}/investors`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Investors</NavLink>
                                                <NavLink to={`${process.env.PUBLIC_URL}/careers`} className="nav-link"><span><img className="img-fluid" src={arrow_right} alt="arrow_right" /></span> Careers</NavLink> */}
                                            </Nav.Item>
                                        </div>
                                    </div>
                                </ul>
                            </Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/industries`} activeclassName="activeclassName" className="nav-link">Industries</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/pricing`} activeclassName="activeclassName" className="nav-link">Pricing</NavLink></Nav.Item>
                            <Nav.Item><Link to={`${process.env.PUBLIC_URL}/demo`} activeclassName="activeclassName" className="nav-link">Demo</Link></Nav.Item>
                            <Nav.Item><Link to={`${process.env.PUBLIC_URL}/academies`} activeclassName="activeclassName" className="nav-link">Academies</Link></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/reviews`} activeclassName="activeclassName" className="nav-link">Reviews</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/blog`} activeclassName="activeclassName" className="nav-link">Blog</NavLink></Nav.Item>
                            <Nav.Item className="me-3 ms-xl-4 phone">
                                <PhoneNumber className="text_decoration_none drkblue_text_color fontweightbold" number={"644-872-6482"} isLinked={true} />
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`${process.env.PUBLIC_URL}/signin`} className="btn lightparagraphcolorbg w-100px btn_web me-3">Log In</NavLink>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btn btn_web w-100px seablue_bg_color">Free Trail</NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </div>
            </div>
            {/*  */}
            {options.map((props, idx) => (
                <OffCanvasExample key={idx} {...props} />
            ))}
        </>
    )
}
// 
function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <Button variant="" onClick={toggleShow} className="bar_btn d-inline-block btn sticky-top">{name}</Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle><NavLink to={`${process.env.PUBLIC_URL}/`} className=""><img width="150" className="img-fluid" src={logo_white} alt="logo" /></NavLink></OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Navbar variant="light">
                        <Nav className="d-block list-unstyled">
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/`} className="nav-link"> Home</NavLink></Nav.Item>
                            {/* <Nav.Item>
                            <NavLink to="#" className="nav-link"> Features</NavLink>
                        </Nav.Item> */}
                            <NavDropdown title="Features" id="collasible-nav-dropdown">
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/job_management`} >Job Management</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/webjob_scheduling`} >Job Scheduling</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/invoicing`} >Invoicing</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/estimate`} >Estimate</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/client_management`} >Client Management (CRM)</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/inventory_management`} >Inventory Management</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/team_management`} >Team Management</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/chatbot`} >Chatbot</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/employees`} >Employees</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/payments`} >Payments</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/time_logs`} >Time Logs</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/tasks`} >Tasks</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/attendance`} >Attendance</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/webleaves`} >Leaves</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/events`} >Events</NavDropdown.Item>
                                <NavDropdown.Item to={`${process.env.PUBLIC_URL}/messages`} >Messages</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/industries`} className="nav-link">Industries</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/pricing`} className="nav-link"> Pricing</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/demo`} className="nav-link"> Demo</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/reviews`} className="nav-link"> Reviews</NavLink></Nav.Item>
                            <Nav.Item><NavLink to={`${process.env.PUBLIC_URL}/blog`} className="nav-link"> Blog</NavLink></Nav.Item>
                            <Nav.Item className="my-4 phone">
                                <img width="8" className="me-2 img-fluid" src={call} alt="call" />
                                <PhoneNumber className="text_decoration_none text-white fontweightbold" number={"644-872-6482"} isLinked={true} />
                            </Nav.Item>
                            <Nav.Item>
                                <Button type="button" variant="" className="btn btn_web w-100 mb-3">Log In</Button>
                                <Button type="button" variant="" className="btn btn_web w-100 seablue_bg_color">Free Trail</Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}

export default Webheader;
