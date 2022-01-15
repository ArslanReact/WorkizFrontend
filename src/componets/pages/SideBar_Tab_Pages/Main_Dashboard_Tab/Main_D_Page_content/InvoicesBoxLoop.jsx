import React from 'react';
import { NavLink } from "react-router-dom";

// 
import invoiceimg1 from "../../../../../assets/images/invoiceimg1.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";


const InvoicesBoxLoop = (props) => {
    if (props.viewall === "View All") {
        return (
            <>
                <div className="text-center">
                    <p><img width="200" className="img-fluid" src={invoiceimg1} alt="" /></p>
                    <p className="paragraphcolor1text">Track your invoice and past due payments</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <NavLink to={`${process.env.PUBLIC_URL}/invoice`} className="m-0 btn viewall">{props.viewall}</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_invoice`} className="m-0 btn viewall blusecolorbg"><img className="img-fluid" src={plusicon} alt="" /></NavLink>
                    </div>
                </div>
            </>
        )
    }
    else if (props.viewall === "View All") {
        return (
            <>
                <li className="p-3">
                    <h4 className="fontsize16 blackcolortext">{props.title}</h4>
                    <span className="d-flex align-items-center mt-2">
                        <div className="badge blusecolortext badgebluebg border-radius-100 fontsize12 px-2">{props.clientname}</div>
                        <small className="ml-auto">{props.projectname}</small>
                    </span>
                </li>
                <div className="d-flex mt-3 align-items-center justify-content-between">
                    <NavLink to={`${process.env.PUBLIC_URL}/invoice`} className="m-0 btn viewall">{props.viewall}</NavLink>
                    {/* <NavLink to="#" className="m-0 btn viewall blusecolorbg"><img className="img-fluid" src={plusicon} alt="" /></NavLink> */}
                </div>
            </>
        )
    }
}

export default InvoicesBoxLoop;
