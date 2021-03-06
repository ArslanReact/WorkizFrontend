import React, { useState,useEffect } from "react";
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { withRouter, useHistory } from "react-router";
import { Form, Button, Offcanvas, NavItem,Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink } from "react-router-dom";
import searchimg from "../../assets/images/searchicon.svg";
import chaticon from "../../assets/images/chaticon.svg";
import notificationicon from "../../assets/images/notificationicon.svg";
import profileimg from "../../assets/images/profileimg.jpg";
import logoutimg from "../../assets/images/logout.svg";
import loginimg from "../../assets/images/login.svg";
import notificationimg from "../../assets/images/profileimg.jpg";
import logo from "../../assets/images/logo.svg";
import affcanvas_arrow from "../../assets/images/double-right-arrows-angles.svg";

import sidebar_admin from "../../assets/images/sidebar_icon_admin.svg";
import sidebar_map from "../../assets/images/sidebar_icon_map.svg";
import sidebar_dashboard from "../../assets/images/sidebar_icon_home.svg";
import profile_icon from "../../assets/images/profile_icon.svg";
import sidebar_events from "../../assets/images/sidebar_icon_events.svg";
import sidebar_leaves from "../../assets/images/sidebar_icon_leaves.svg";
import sidebar_noticeboard from "../../assets/images/sidebar_icon_noticeboard.svg";
import sidebar_leads from "../../assets/images/sidebar_icon_leads.svg";
import sidebar_timelog from "../../assets/images/sidebar_icon_timelog.svg";
import sidebar_attendance from "../../assets/images/sidebar_icon_attendance.svg";
import sidebar_message from "../../assets/images/sidebar_icon_message.svg";
import sidebar_task from "../../assets/images/sidebar_icon_task.svg";
import sidebar_finance from "../../assets/images/sidebar_icon_finance.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import $ from "jquery";
function EmployeeHeader(props) {
    var userdata = JSON.parse(localStorage.getItem('data'));
    const [isLoading, setLoading] = useState(false);
    const [ip, setIP] = useState('');
    const [address, setaddress] = useState('');
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
    const [activetime, setactivetime] = useState({
        activetime_Array: []
    });
    //
    var userid;
    var companyid;
      //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4);
        getAddress(res.data.latitude, res.data.longitude)
    }
    const getAddress = async (latitude, longitude) => {
        const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?' +
        'latlng=' + latitude + ',' + longitude + '&key=AIzaSyDUFF3y2uMlHQm2JcKHXO6DGAWGrEJfHt4');
        console.log('User\'s Address Data is ', res)
        setaddress(res.data.results[0].formatted_address);
    }
    useEffect(() => {
        getData();
        if (localStorage.getItem("data") === null) {
        } else {
            document.title = "Employee Dashboard";
            let obj = JSON.parse(localStorage.getItem('data'));
            companyid = obj.company_id;
            userid = obj.id;
            function getAlerts() {
                axios.get(Globalsettings.url + 'api/show-user-notifications/'+ companyid+'/'+userid)
                    .then((response) => {
                        setunreadNotificationCount(response.data.html.unreadNotificationCount);
                        setunreadMessageCount(response.data.html.unreadMessageCount);
                        setactivetime({ activetime_Array: response.data.html.activetime ? response.data.html.activetime : [], });
                        setunread_notificationsarray({ unread_notificationsarray_Array: response.data.html.user.unread_notifications ? response.data.html.user.unread_notifications : [], });
                });
            }

            var $worked = $("#active-timer");
            function updateTimer() {
                
                var myTime = $worked.html();
                if(myTime != undefined){
                var ss = myTime.split(":");

                var hours = ss[0];
                var mins = ss[1];
                var secs = ss[2];
                secs = parseInt(secs)+1;

                if(secs > 59){
                    secs = '00';
                    mins = parseInt(mins)+1;
                }

                if(mins > 59){
                    secs = '00';
                    mins = '00';
                    hours = parseInt(hours)+1;
                }

                if(hours.toString().length < 2) {
                    hours = '0'+hours;
                }
                if(mins.toString().length < 2) {
                    mins = '0'+mins;
                }
                if(secs.toString().length < 2) {
                    secs = '0'+secs;
                }
                var ts = hours+':'+mins+':'+secs;

                $worked.html(ts);
                }
                
            }
            const interval = setInterval(() => getAlerts(), 6000)
            const interval2 = setInterval(() => updateTimer(), 1000)
            return () => {
              clearInterval(interval);
              clearInterval(interval2);
            }
        }

    }, [])    
    // 
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
    const starttime = () => {
        let obj = JSON.parse(localStorage.getItem('data'));
        setLoading(true);
        const data = new FormData();
        data.append('user_id', obj.id);
        data.append('company_id', obj.company_id);
        data.append('ip', ip);
        data.append('address', address);
        axios.post(Globalsettings.url + 'api/starttimer/'+ obj.company_id+'/'+obj.id, data).then((response) => {
            toast.success("Timer Started Successfully!");
            setLoading(false);
        });
    }
    const stoptime = () => {
        let obj = JSON.parse(localStorage.getItem('data'));
        setLoading(true);
        const data = new FormData();
        data.append('user_id', obj.id);
        data.append('company_id', obj.company_id);
        data.append('ip', ip);
        data.append('address', address);
        axios.post(Globalsettings.url + 'api/stoptimer/'+ obj.company_id+'/'+obj.id, data).then((response) => {
            toast.success("Timer Stop Successfully!");
            setLoading(false);
        });
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="header header_dashboard navbar-expand-dashboard navbardashboard mb-4">
                <nav className="navbar m-0 px-lg-0">
                    <Button variant="" className="offcanvas_btn" onClick={handleShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    <div className="d-lg-none d-md-block logo_mobile"><NavLink exact to={`${process.env.PUBLIC_URL}/`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
                    {/*  */}
                    <div className="d-flex align-items-center">
                        <div className="d-none d-lg-block div_space ml-3 ml-lg-0">
                            <div className="border_radius_10 body_bg_color p-2">
                                <Dropdown className="p-0" autoClose="outside">
                                    <Dropdown.Toggle variant="" className="dropdown-toggle-none p-0 paragraph_blue_text_color fontsize14 w-170px d-flex align-items-center justify-content-between" id="dropdown-autoclose-outside">Quick Access <span><img className="img-fluid" src={arrowdown} alt="icon" /></span></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employeedashboard`}>Employee Dashboard</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employeeproject`}>Project</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_task`}>Task</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_leads`}>Lead</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_timelog`}>Time Log</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_attendance`}>Attendance</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_leaves`}>Leave</Dropdown.Item>
                                        <Dropdown.Item href={`${process.env.PUBLIC_URL}/employee_noticeboard`}>Notice Board</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Button variant="" className="offcanvas_btn_login" onClick={handleloginShow}><img className="img-fluid" src={affcanvas_arrow} alt="arrow" /></Button>
                    </div>
                    {/*  */}
                    <div className="list-unstyled d-lg-flex align-items-center header_button d-none">
                        <span id="timer-section">     
                            {activetime.activetime_Array.length > 0 ?
                            <div class="nav navbar-top-links navbar-right pull-right m-t-10">
                                <a class="btn btn_gray stop-timer-modal mr-lg-3" href="javascript:;" data-timer-id="{{ $timer->id }}">
                                    <i class="ti-alarm-clock"></i>
                                    <span id="active-timer">{activetime.activetime_Array[0].start_time}</span>
                                    <label class="border-radius-100 ml-2 fontsize14 px-3 py-1 redcolortext badgeredbg" onClick={() => stoptime()}>Stop</label></a>
                            </div>
                            :
                            <div class="nav navbar-top-links navbar-right pull-right m-t-10">
                                <a class="btn btn_gray mr-lg-3" href="javascript:;" onClick={() => starttime()}>Start Timer <i class="fa fa-check-circle text-success"></i></a>
                            </div>  
                            } 
                        </span>
                        <NavItem className="mr-2 mr-sm-4">
                            <NavLink to={`${process.env.PUBLIC_URL}/employee_message`} className="nav-link"><img className="img-fluid w-100" src={chaticon} alt="chaticon" /><span className="d-block noti_up lightredcolorbg">{unreadMessageCount}</span></NavLink>
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
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/eviewallnotification`} className="p-2 text-center red_bg_color text-white sticky-bottom">View All Notifications</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="nav-items" autoClose="outside">
                            <Dropdown.Toggle variant="" className="nav-link dropdown-toggle-none w-50px p-1 nav-link border-radius-100 border_lightredcolor_2" id="dropdown-basic"><img className="img-fluid w-100 border-radius-100" src={userdata.image_url} alt="profileimg" /></Dropdown.Toggle>
                            <Dropdown.Menu align="end" className="mailbox">
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/employeedashboard`} className="list__item"><img className="img-fluid w-20px mr-2" src={profile_icon} alt="logoutimg" /> Employee</Dropdown.Item>
                                <Dropdown.Item href={`${process.env.PUBLIC_URL}/eprofile/`+userid} className="list__item"><img className="img-fluid w-20px mr-2" src={loginimg} alt="logoutimg" /> Profile</Dropdown.Item>
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
                <Offcanvas.Body className="p-0">
                    <ul className="navbar_dashboard navbar navbar-nav p-0 d-block">
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employeedashboard`} className="px-3 nav-link"><span className="d-inline-block img-icon mr-3"><img className="img-fluid" src={sidebar_dashboard} alt="sidebar_dashboard" /></span><span className="text-hidee">Dashboard</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employeeproject`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_map} alt="sidebar_map" /></span><span className="text-hidee">Project</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_task`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_task} alt="sidebar_task" /></span><span className="text-hidee">Task</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_leads`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_leads} alt="sidebar_leads" /></span><span className="text-hidee">Leads</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_timelog`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_timelog} alt="sidebar_timelog" /></span><span className="text-hidee">Time Log</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_attendance`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_attendance} alt="sidebar_attendance" /></span><span className="text-hidee">Attendance</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/finance_expanses`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_finance} alt="sidebar_finance" /></span><span className="text-hidee">Finance Expanses</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_message`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_message} alt="sidebar_message" /></span><span className="text-hidee">Message</span></NavLink></li>
                        {/* <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_event`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_events} alt="sidebar_events" /></span><span className="text-hidee">Event</span></NavLink></li> */}
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_leaves`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_leaves} alt="sidebar_leaves" /></span><span className="text-hidee">Leaves</span></NavLink></li>
                        <li className="nav-items py-0"><NavLink to={`${process.env.PUBLIC_URL}/employee_noticeboard`} className="px-3 nav-link"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_noticeboard} alt="sidebar_noticeboard" /></span><span className="text-hidee">Notice Board</span></NavLink></li>
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
                            <NavLink to={`${process.env.PUBLIC_URL}/employee_message`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={chaticon} alt="chaticon" />Chatboat <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadMessageCount}</span></NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/eviewallnotification`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" src={chaticon} alt="chaticon" />Notification <span className="d-block position-relative noti_up lightredcolorbg top-0 right-0 ml-auto">{unreadNotificationCount}</span></NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to={`${process.env.PUBLIC_URL}/eprofile/1`} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={loginimg} alt="loginimg" />Profile</NavLink>
                        </NavItem>
                        <NavItem className="position-relative">
                            <NavLink to="#" onClick={Logout} className="shadow_box2 blackcolortext mb-2 border_radius_15 nav-link d-flex"><img className="img-fluid mr-2" width="20" src={logoutimg} alt="logoutimg" />Logout</NavLink>
                        </NavItem>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default withRouter(EmployeeHeader);
