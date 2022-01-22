import React, { useState, useEffect } from 'react';
import Globalsettings from "./Globalsettings";
import axios from 'axios';
import { withRouter, useHistory } from "react-router";
import { Form, Button, Offcanvas,NavItem, Accordion,Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import searchimg from "../assets/images/searchicon.svg";
import chaticon from "../assets/images/chaticon.svg";
import notificationicon from "../assets/images/notificationicon.svg";
import profileimg from "../assets/images/profileimg.jpg";
import profile_icon from "../assets/images/profile_icon.svg";
import logoutimg from "../assets/images/logout.svg";
import loginimg from "../assets/images/login.svg";
import notificationimg from "../assets/images/profileimg.jpg";
import logo from "../assets/images/logo.svg";
import affcanvas_arrow from "../assets/images/double-right-arrows-angles.svg";

import sidebar_cutomer from "../assets/images/sidebar_icon_customer.svg";
import sidebar_job from "../assets/images/sidebar_icon_job.svg";
import sidebar_hr from "../assets/images/sidebar_icon_hr.svg";
import sidebar_finance from "../assets/images/sidebar_icon_finance.svg";
import sidebar_inventory from "../assets/images/sidebar_icon_inventory.svg";
import sidebar_noticeboard from "../assets/images/sidebar_icon_noticeboard.svg";
import sidebar_report from "../assets/images/sidebar_icon_report.svg";
import sidebar_admin from "../assets/images/sidebar_icon_admin.svg";
import sidebar_map from "../assets/images/sidebar_icon_map.svg";
import sidebar_setting from "../assets/images/sidebar_icon_setting.svg";
import sidebar_dashboard from "../assets/images/sidebar_icon_home.svg";
import arrowdown from "../assets/images/arrowdown.svg";
import $ from "jquery";
function Header(props) {
    var userdata= JSON.parse(localStorage.getItem('data'));
    const history = useHistory();
    // Notification Counter
    const [unreadMessageCount, setunreadMessageCount] = useState(0);
    const [unreadNotificationCount, setunreadNotificationCount] = useState(0);
    const [unread_notificationsarray, setunread_notificationsarray] = useState({
        unread_notificationsarray_Array: []
    });
    // get company id from session
    //
    useEffect(() => {
        if (localStorage.getItem("data") === null) {
        } else {
            document.title = "Admin Dashboard";
            let obj = JSON.parse(localStorage.getItem('data'));
            var companyid = obj.company_id;
            var userid = obj.id;
            function getAlerts() {
                axios.get(Globalsettings.url + 'api/admin/theme-settings/getsettingofadmintheme/' + companyid)
                    .then((response) => {
                        if(response.data.themename == 'custom'){
                            $("#sidebar_dashboard").css("background",response.data.admintheme.sidebar_color);
                            $(".accordion-button").attr("style", "background: "+response.data.admintheme.sidebar_color+" !important");
                            $(".accordion-item").css("background",response.data.admintheme.sidebar_color);
                            $(".accordion-body").css("background",response.data.admintheme.sidebar_color);
                            $(".sidebar_dashboard .navbar.navbar_dashboard .accordion .show > .accordion-button:not(.collapsed), .sidebar_dashboard .navbar.navbar_dashboard .accordion .accordion-button:not(.collapsed)").css("background",response.data.admintheme.sidebar_color+"!important");
                            $(".text-hidee").css("color",response.data.admintheme.sidebar_text_color);
                        }
                        axios.get(Globalsettings.url + 'api/show-admin-notifications/'+ companyid+'/'+userid)
                        .then((response) => {
                            setunreadNotificationCount(response.data.html.unreadNotificationCount);
                            setunreadMessageCount(response.data.html.unreadMessageCount);
                        });
                });
            }
            getAlerts()
            const interval = setInterval(() => getAlerts(), 6000)
            return () => {
              clearInterval(interval);
            }
        }

    }, []);

    // larftbar canvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // login canvas
    const [showlogin, setShowlogin] = useState(false);
    const handleloginClose = () => setShowlogin(false);
    const handleloginShow = () => setShowlogin(true);


    // 
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    const Logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push(`${process.env.PUBLIC_URL}/signin`);
    }
    // 
    var defualtactiveid = localStorage.getItem('ative-tab');
    const activetabHandler = (eventkeyid) => {
        localStorage.setItem('ative-tab', eventkeyid);
    }   
    return (
        <>
            <div className="header header_dashboard navbar-expand-dashboard navbardashboard mb-4">
                <nav className="navbar m-0 px-lg-0">
                    <Button variant="" className="offcanvas_btn" onClick={handleShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    <div className="d-lg-none d-md-block logo_mobile"><NavLink exact to={`${process.env.PUBLIC_URL}/dashboard`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
                    {/*  */}
                    <div className="d-flex align-items-center">
                        <div className="d-none d-lg-block div_space ml-3 ml-lg-0">
                            <div className="border_radius_10 body_bg_color p-2">
                                <Dropdown className="p-0" autoClose="outside">
                                    <Dropdown.Toggle variant="" className="dropdown-toggle-none p-0 paragraph_blue_text_color fontsize14 w-170px d-flex align-items-center justify-content-between" id="dropdown-autoclose-outside">Quick Access <span><img className="img-fluid" src={arrowdown} alt="icon" /></span></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/dashboard`}>Main Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/project-dashboard`}>Project Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client-dashboard`}>Client Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/hr-dashboard`}>HR Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/finnace-dashboard`}>Finance Dashboard</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Button variant="" className="offcanvas_btn_login" onClick={handleloginShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    </div>
                    {/*  */}
                    <div className="list-unstyled d-lg-flex align-items-center header_button d-none">
                        <NavItem className="mr-2 mr-sm-4">
                            <NavLink to={`${process.env.PUBLIC_URL}/chabot`} className="nav-link"><img className="img-fluid w-100" src={chaticon} alt="chaticon" /><span className="d-block noti_up lightredcolorbg">{unreadMessageCount}</span></NavLink>
                        </NavItem>
                        <Dropdown className="mr-2 mr-sm-4" autoClose="outside">
                            <Dropdown.Toggle variant="" className="nav-link dropdown-toggle-none" id="dropdown-basic"><img className="img-fluid" src={notificationicon} alt="notificationicon" /><span className="d-block noti_up yelowcolorbg">{unreadNotificationCount}</span></Dropdown.Toggle>
                            <Dropdown.Menu align="end" className="mailbox">
                                <Dropdown.Item className="p-2 text-center lightblue_bg_color text-white d-flex align-items-center sticky-top">
                                    <h4 className="fontsize14 m-0">Notification</h4>
                                    <p className="m-0 fontsize14 ml-auto">mark as read</p>
                                </Dropdown.Item>
                                <div className="overflow_dropdown">
                                    {unread_notificationsarray.unread_notificationsarray_Array.length > 0 ?
                                    unread_notificationsarray.unread_notificationsarray_Array.map((val) => {
                                            return(
                                                <Dropdown.Item href="#" className="list__item">
                                                    <span className="messages"><img src={notificationimg} alt="notificationimg" className="user-image" /></span>
                                                    <div className="ms-2">
                                                        <h4 className="m-0">Ross Gellar</h4>
                                                        <p className="m-0">posted a photo on your wall.</p>
                                                    </div>
                                                </Dropdown.Item>
                                            )
                                    })
                                    :
                                        <div className="text-center p-2">No Notification Yet!</div>
                                    }
                                </div>
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/aviewallnotification`} className="p-2 text-center red_bg_color text-white sticky-bottom">View All Notifications</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="nav-items" autoClose="outside">
                            <Dropdown.Toggle variant="" className="nav-link dropdown-toggle-none w-50px p-1 nav-link border-radius-100 border_lightredcolor_2" id="dropdown-basic"><img className="img-fluid w-100 border-radius-100" src={userdata.image_url} alt="profileimg" /></Dropdown.Toggle>
                            <Dropdown.Menu align="end" className="mailbox">
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/dashboard`} className="list__item"><img className="img-fluid w-20px mr-2" src={profile_icon} alt="logoutimg" /> Admin</Dropdown.Item>
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/setting/profile`} className="list__item"><img className="img-fluid w-20px mr-2" src={loginimg} alt="logoutimg" /> Profile</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={Logout} className="list__item"><img className="img-fluid w-20px mr-2" src={logoutimg} alt="logoutimg" /> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavItem className="me-2 ms-sm-2">
                        <NavLink to={`${process.env.PUBLIC_URL}/billing`} className="btn btn_blue border-radius-100 fontweightbold px-4">Billing</NavLink>
                        </NavItem>
                    </div>    
                </nav>
            </div>
            {/*  */}
            <Offcanvas show={show} onHide={handleClose} className="header_dashboard">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><NavLink exact to={`${process.env.PUBLIC_URL}/dashboard`}><img className="img-fluid" src={logo} alt="" /></NavLink></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="navbar_dashboard navbar navbar-nav py-4 px-lg-0 pr-0 mb-5">
                        <Accordion defaultActiveKey={defualtactiveid} className="w-100">
                            <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/dashboard`} className="px-3 nav-link"><span className="d-inline-block img-icon mr-3"><img className="img-fluid" src={sidebar_dashboard} alt="sidebar_dashboard" /></span><span className="text-hidee">Dashboard</span></NavLink></li>
                            <Accordion.Item eventKey="0" className="py-0">
                                <Accordion.Header onClick={() => activetabHandler(0)} className="nav-items accordion-headerdashboard border-radius-15"><span className="img-icon d-inline-block mr-3"><img className="img-fluid" src={sidebar_cutomer} alt="sidebar_cutomer" /></span><span className="text-hidee">Customer</span></Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled">
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/client-dashboard`} className="nav-link"><span className="text-hidee">Client Dashboard</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/client`} className="nav-link"><span className="text-hidee">Client</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/leads`} className="nav-link"><span className="text-hidee">Leads</span></NavLink></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/*  */}
                            <Accordion.Item eventKey="1" className="py-0">
                                <Accordion.Header onClick={() => activetabHandler(1)} className="nav-items accordion-headerdashboard border-radius-15"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_job} alt="sidebar_job" /></span><span className="text-hidee">Project</span></Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled">
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/project-dashboard`} className="nav-link"> <span className="text-hidee">Project Dashboard</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/contract`} className="nav-link"><span className="text-hidee">Contract</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/manage-job`} className="nav-link"><span className="text-hidee">Manage Job</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/task`} className="nav-link"><span className="text-hidee">Task</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/task-board`} className="nav-link"><span className="text-hidee">Task Board</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/job-scheduling`} className="nav-link"><span className="text-hidee">Job Scheduling</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/time-logs`} className="nav-link"><span className="text-hidee">Time Logs</span></NavLink></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/*  */}
                            <Accordion.Item eventKey="2" className="py-0">
                                <Accordion.Header onClick={() => activetabHandler(2)} className="nav-items accordion-headerdashboard border-radius-15"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_hr} alt="sidebar_hr" /></span><span className="text-hidee">HR</span></Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled">
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/hr-dashboard`} className="nav-link"><span className="text-hidee">HR Dashboard</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/employee-list`} className="nav-link"><span className="text-hidee">Employee List</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/deparment`} className="nav-link"><span className="text-hidee">Deparment</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/designation`} className="nav-link"><span className="text-hidee">Designation</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/attendance`} className="nav-link"><span className="text-hidee">Attendance</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/holiyday`} className="nav-link"><span className="text-hidee">Holiyday</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/leaves`} className="nav-link"><span className="text-hidee">Leaves</span></NavLink></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/*  */}
                            <Accordion.Item eventKey="3" className="py-0">
                                <Accordion.Header onClick={() => activetabHandler(3)} className="nav-items accordion-headerdashboard border-radius-15"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_finance} alt="sidebar_finance" /></span><span className="text-hidee">Finance</span></Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled">
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/finance-dashboard`} className="nav-link"><span className="text-hidee">Finance Dashboard</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/estimates`} className="nav-link"><span className="text-hidee">Estimates</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/invoice`} className="nav-link"><span className="text-hidee">Invoices</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/payments`} className="nav-link"><span className="text-hidee">Payments</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/expences`} className="nav-link"><span className="text-hidee">Expences</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/credit-note`} className="nav-link"><span className="text-hidee">Credit Note</span></NavLink></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/*  */}
                            <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/inventory`} className="px-3 mb-1 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_inventory} alt="sidebar_inventory" /></span><span className="text-hidee">Inventory</span></NavLink></li>
                            {/*  */}
                            <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/notice_board`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_noticeboard} alt="sidebar_noticeboard" /></span><span className="text-hidee">Notice Board</span></NavLink></li>
                            {/*  */}
                            <Accordion.Item eventKey="4" className="py-0">
                                <Accordion.Header onClick={() => activetabHandler(4)} className="nav-items accordion-headerdashboard border-radius-15"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_report} alt="sidebar_report" /></span><span className="text-hidee">Reports</span></Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled">
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/task-report`} className="nav-link"><span className="text-hidee">Task Report</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/time-log-report`} className="nav-link"><span className="text-hidee">Time Log Report</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/finance-report`} className="nav-link"><span className="text-hidee">Finance Report</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/income-expense-report`} className="nav-link"><span className="text-hidee">Income VS Expense Report</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/leave-report`} className="nav-link"><span className="text-hidee">Leave Report</span></NavLink></li>
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/attendance-report`} className="nav-link"><span className="text-hidee">Attendance Report</span></NavLink></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/*  */}
                            <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/map`} className="px-3 mb-1 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_map} alt="sidebar_map" /></span><span className="text-hidee">Map</span></NavLink></li>
                            <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/setting`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_setting} alt="sidebar_setting" /></span><span className="text-hidee">Setting</span></NavLink></li>
                            {/* <li className="nav-itemss py-0 my-3"><NavLink to={`${process.env.PUBLIC_URL}/faq_admin`} className="border-radius-10 h-50px align-items-center d-flex justify-content-center w-100 px-3 btn btn_blue text-center"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_admin} alt="sidebar_admin" /></span><span className="text-hidee">FAQ Admin</span></NavLink></li> */}
                        </Accordion>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
            {/*  */}
            <Offcanvas show={showlogin} placement="end" onHide={handleloginClose} className="header_dashboard">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-unstyled">
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/chabot`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={chaticon} alt="chaticon" />Chatboat <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadMessageCount}</span></NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/eviewallnotification`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={chaticon} alt="chaticon" />Notification <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadNotificationCount}</span></NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/setting/profile`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={loginimg} alt="loginimg" />Profile</NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to="#" onClick={Logout} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={logoutimg} alt="logoutimg" />Logout</NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/billing`} className="btn btn_blue w-100 border-radius-100 fontweightbold px-4">Billing</NavLink>
                        </NavItem>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default withRouter(Header);
