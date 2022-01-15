import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
// import Chevron from "./Chevron";
import logo from "../../assets/images/logo.svg";
import sidebar_dashboard from "../../assets/images/sidebar_icon_home.svg";
import sidebar_contract from "../../assets/images/sidebar_icon_contract.svg";
import sidebar_noticeboard from "../../assets/images/sidebar_icon_noticeboard.svg";
import sidebar_invoice from "../../assets/images/sidebar_icon_invoice.svg";
import sidebar_inventory from "../../assets/images/sidebar_icon_inventory.svg";
import sidebar_events from "../../assets/images/sidebar_icon_events.svg";
import sidebar_estimate from "../../assets/images/sidebar_icon_estimate.svg";
import sidebar_admin from "../../assets/images/sidebar_icon_admin.svg";
import sidebar_map from "../../assets/images/sidebar_icon_map.svg";
import sidebar_payment from "../../assets/images/sidebar_icon_payment.svg";


function ClientNavbar(props) {
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    return (
        <>
            <nav className="sidebar_dashboard border-radius-15" id="sidebar_dashboard">
                <div className="navbar-brand p-0 text-left mb-3 mr-0"><NavLink exact to={`${process.env.PUBLIC_URL}/clientdashboard`}><img className="img-fluid" src={logo} alt="" /></NavLink></div>
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
            </nav>
        </>
    );
}
export default withRouter(ClientNavbar);