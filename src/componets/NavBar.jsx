import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
// import Chevron from "./Chevron";
import { Accordion } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import sidebar_dashboard from "../assets/images/sidebar_icon_home.svg";
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
// sidebar inner dropdown icon
// import dashboard_inner_icn from "../assets/images/l-nav-inner-01.svg";


function Navbar(props) {
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    var defualtactiveid = localStorage.getItem('ative-tab');
    const activetabHandler = (eventkeyid) => {
        localStorage.setItem('ative-tab', eventkeyid);
    }
    return (
        <>
                <nav className="sidebar_dashboard border-radius-15" id="sidebar_dashboard">
                    <div className="navbar-brand py-0 px-sm-3 text-left m-0"><NavLink exact to={`${process.env.PUBLIC_URL}/dashboard`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
                    <ul className="scroll navbar_dashboard navbar navbar-nav py-4 px-lg-0 pr-0 mb-5">
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
                                        <li className="nav-items"><NavLink to={`${process.env.PUBLIC_URL}/time-logs`} className="nav-link"><span className="text-hidee">Time Logs</span></NavLink></li>
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
                            <li className="nav-itemss py-0 my-3"><NavLink to={`${process.env.PUBLIC_URL}/faq_admin`} className="border-radius-10 h-50px align-items-center d-flex justify-content-center w-100 px-3 btn btn_blue text-center"><span className="img-icon mr-3"><img className="img-fluid" src={sidebar_admin} alt="sidebar_admin" /></span><span className="text-hidee">FAQ Admin</span></NavLink></li>
                        </Accordion>
                    </ul>
                </nav>
        </>
    );
}
export default withRouter(Navbar);