import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
// import Chevron from "./Chevron";
import logo from "../../assets/images/logo.svg";
import sidebar_dashboard from "../../assets/images/sidebar_icon_home.svg";
import sidebar_events from "../../assets/images/sidebar_icon_events.svg";
import sidebar_leaves from "../../assets/images/sidebar_icon_leaves.svg";
import sidebar_noticeboard from "../../assets/images/sidebar_icon_noticeboard.svg";
import sidebar_leads from "../../assets/images/sidebar_icon_leads.svg";
import sidebar_timelog from "../../assets/images/sidebar_icon_timelog.svg";
import sidebar_attendance from "../../assets/images/sidebar_icon_attendance.svg";
import sidebar_message from "../../assets/images/sidebar_icon_message.svg";
import sidebar_task from "../../assets/images/sidebar_icon_task.svg";
import sidebar_admin from "../../assets/images/sidebar_icon_admin.svg";
import sidebar_map from "../../assets/images/sidebar_icon_map.svg";
import sidebar_finance from "../../assets/images/sidebar_icon_finance.svg";


function EmployeSideBar(props) {
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    return (
        <>
            
                <nav className="sidebar_dashboard border-radius-15" id="sidebar_dashboard">
                    <div className="navbar-brand p-0 text-left mb-3 mr-0"><NavLink exact to={`${process.env.PUBLIC_URL}/employeedashboard`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
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
                </nav>
            
        </>
    );
}
export default withRouter(EmployeSideBar);