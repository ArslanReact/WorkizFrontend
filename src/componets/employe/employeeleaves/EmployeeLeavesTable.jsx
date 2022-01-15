import React from 'react';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";

import plusicon from "../../../assets/images/plusicon.svg";
import arrowdown from "../../../assets/images/arrowdown.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import viewiconimg from "../../../assets/images/viewiconimg.svg";
const EmployeeLeavesTable = (props) => {
    const ViewLeaveData = (id) => {
        props.ViewLeaveData(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.leavetype}</td>
                <td>{props.date}</td>
                <td><span className={"badge py-2 px-3 border_radius_100 " + props.badgebgcolor}>{props.badgetext}</span></td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => ViewLeaveData(props.lid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default EmployeeLeavesTable;