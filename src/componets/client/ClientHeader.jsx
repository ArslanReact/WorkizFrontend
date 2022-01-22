import React, { useState,useEffect } from "react";
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { withRouter, useHistory } from "react-router";
import { Form, Button, Offcanvas, NavItem, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import searchimg from "../../assets/images/searchicon.svg";
import chaticon from "../../assets/images/chaticon.svg";
import notificationicon from "../../assets/images/notificationicon.svg";
import profileimg from "../../assets/images/profileimg.jpg";
import logoutimg from "../../assets/images/logout.svg";
import loginimg from "../../assets/images/login.svg";
import profile_icon from "../../assets/images/profile_icon.svg";
import notificationimg from "../../assets/images/profileimg.jpg";
import logo from "../../assets/images/logo.svg";
import affcanvas_arrow from "../../assets/images/double-right-arrows-angles.svg";
import sidebar_inventory from "../../assets/images/sidebar_icon_inventory.svg";
import sidebar_noticeboard from "../../assets/images/sidebar_icon_noticeboard.svg";
import sidebar_admin from "../../assets/images/sidebar_icon_admin.svg";
import sidebar_map from "../../assets/images/sidebar_icon_map.svg";
import sidebar_dashboard from "../../assets/images/sidebar_icon_home.svg";
import sidebar_contract from "../../assets/images/sidebar_icon_contract.svg";
import sidebar_invoice from "../../assets/images/sidebar_icon_invoice.svg";
import sidebar_events from "../../assets/images/sidebar_icon_events.svg";
import sidebar_estimate from "../../assets/images/sidebar_icon_estimate.svg";
import sidebar_payment from "../../assets/images/sidebar_icon_payment.svg";
import arrowdown from "../../assets/images/arrowdown.svg";

function ClientHeader(props) {
    var userdata = JSON.parse(localStorage.getItem('data'));
    // larftbar canvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // login canvas
    const [showlogin, setShowlogin] = useState(false);
    const handleloginClose = () => setShowlogin(false);
    const handleloginShow = () => setShowlogin(true);
    // Notification Counter
    const [unreadMessageCount, setunreadMessageCount] = useState(0);
    const [unreadNotificationCount, setunreadNotificationCount] = useState(0);
    
    const [unread_notificationsarray, setunread_notificationsarray] = useState({
        unread_notificationsarray_Array: []
    });
    //
    useEffect(() => {
        if (localStorage.getItem("data") === null) {
        } else {
            document.title = "Client Dashboard";
            let obj = JSON.parse(localStorage.getItem('data'));
            var companyid = obj.company_id;
            var userid = obj.id;
            function getAlerts() {
                axios.get(Globalsettings.url + 'api/show-client-notifications/' + companyid + '/' + userid)
                .then((response) => {
                    setunreadNotificationCount(response.data.html.unreadNotificationCount);
                    setunreadMessageCount(response.data.html.unreadMessageCount);
                    setunread_notificationsarray({ unread_notificationsarray_Array: response.data.html.user.unread_notifications ? response.data.html.user.unread_notifications : [], });
                });
            }
            getAlerts()
            const interval = setInterval(() => getAlerts(), 6000)
            return () => {
              clearInterval(interval);
            }
        }

    }, [])

    const history = useHistory();
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    const Logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push(`${process.env.PUBLIC_URL}/signin`);
    }
    // 
    // var defualtactiveid = localStorage.getItem('ative-tab');
    // const activetabHandler = (eventkeyid) => {
    //     localStorage.setItem('ative-tab', eventkeyid);
    // }
    return (
        <>
            <div className="header header_dashboard navbar-expand-dashboard navbardashboard mb-4">
                <nav className="navbar m-0 px-lg-0">
                    <Button variant="" className="offcanvas_btn" onClick={handleShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    <div className="d-lg-none d-block logo_mobile"><NavLink exact to={`${process.env.PUBLIC_URL}/`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
                    {/*  */}
                    <div className="d-flex align-items-center">
                        <div className="d-none d-lg-block div_space ml-3 ml-lg-0">
                            <div className="border_radius_10 body_bg_color p-2">
                                <Dropdown className="p-0" autoClose="outside">
                                    <Dropdown.Toggle variant="" className="dropdown-toggle-none p-0 paragraph_blue_text_color fontsize14 w-170px d-flex align-items-center justify-content-between" id="dropdown-autoclose-outside">Clickable Inside <span><img className="img-fluid" src={arrowdown} alt="icon" /></span></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/clientdashboard`}>Client Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/clientproject`}>Project</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_inventory`}>Inventory</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_invoice`}>Invoice</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_credit_note`}>Credit Note</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_estimate`}>Estimate</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_payment`}>Payment</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_contract`}>Contract</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/client_noticeboard`}>Notice Board</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Button variant="" className="offcanvas_btn_login" onClick={handleloginShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    </div>
                    {/*  */}
                    <div className="list-unstyled d-lg-flex align-items-center header_button d-none">
                        <NavItem className="mr-2 mr-sm-4">
                            <NavLink to={`${process.env.PUBLIC_URL}/client_chabot`} className="nav-link"><img className="img-fluid w-100" src={chaticon} alt="chaticon" /><span className="d-block noti_up lightredcolorbg">{unreadMessageCount}</span></NavLink>
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
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/viewallnotification`} className="p-2 text-center red_bg_color text-white sticky-bottom">View All Notifications</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="nav-items" autoClose="outside">
                            <Dropdown.Toggle variant="" className="nav-link dropdown-toggle-none w-50px p-1 nav-link border-radius-100 border_lightredcolor_2" id="dropdown-basic"><img className="img-fluid w-100 border-radius-100" src={userdata.image_url} alt="profileimg" /></Dropdown.Toggle>
                            <Dropdown.Menu align="end" className="mailbox">
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/clientdashboard`} className="list__item"><img className="img-fluid w-20px mr-2" src={profile_icon} alt="logoutimg" /> Client</Dropdown.Item>
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/profile/1`} className="list__item"><img className="img-fluid w-20px mr-2" src={loginimg} alt="logoutimg" /> Profile</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={Logout} className="list__item"><img className="img-fluid w-20px mr-2" src={logoutimg} alt="logoutimg" /> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </div>
            {/*  */}
            <Offcanvas show={show} onHide={handleClose} className="header_dashboard">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><NavLink exact to={`${process.env.PUBLIC_URL}/`}><img className="img-fluid" src={logo} alt="" /></NavLink></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="navbar_dashboard navbar navbar-nav p-0 d-block">
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/clientdashboard`} className="px-3 nav-link"><span className="d-inline-block img-icon mr-3"><img className="img-fluid" src={sidebar_dashboard} alt="sidebar_dashboard" /></span><span className="text-hidee">Client Dashboard</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/clientproject`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_map} alt="sidebar_map" /></span><span className="text-hidee">Project</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_inventory`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_inventory} alt="sidebar_inventory" /></span><span className="text-hidee">Inventory</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_invoice`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_invoice} alt="sidebar_invoice" /></span><span className="text-hidee">Invoice</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_credit_note`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_invoice} alt="sidebar_invoice" /></span><span className="text-hidee">Credit Note</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_estimate`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_estimate} alt="sidebar_estimate" /></span><span className="text-hidee">Estimate</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_payment`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_payment} alt="sidebar_payment" /></span><span className="text-hidee">Payment</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_contract`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_contract} alt="sidebar_contract" /></span><span className="text-hidee">Contract</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/client_noticeboard`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_noticeboard} alt="sidebar_noticeboard" /></span><span className="text-hidee">Notice Board</span></NavLink></li>
                        {/*  */}

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
                            <NavLink to={`${process.env.PUBLIC_URL}/client_chabot`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={chaticon} alt="chaticon" />Chatboat <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadMessageCount}</span></NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to="#" data-bs-toggle="dropdown" className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={notificationicon} alt="notificationicon" />Notification <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadNotificationCount}</span></NavLink>
                            <div className="dropdown-menu dropdown-menu-right mailbox p-0 w-100">
                                <ul className="notification__list list-unstyled">
                                    <li className="list__item px-3 py-3">
                                        <NavLink to="#" className="d-flex align-items-center">
                                            <img width="30" src={notificationimg} alt="notificationimg" className="user-image" />
                                            <span className="messages"><b>Ross Gellar </b> posted a photo on your wall.</span>
                                        </NavLink>
                                    </li>
                                    <li className="list__item px-3 py-3">
                                        <NavLink to="#" className="d-flex align-items-center">
                                            <img width="30" src={notificationimg} alt="notificationimg" className="user-image" />
                                            <span className="messages"><b>Ross Gellar </b> posted a photo on your wall.</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/client_chabot`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={logoutimg} alt="logoutimg" />Logout</NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/client_chabot`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={loginimg} alt="loginimg" />Profile</NavLink>
                        </NavItem>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default withRouter(ClientHeader);
