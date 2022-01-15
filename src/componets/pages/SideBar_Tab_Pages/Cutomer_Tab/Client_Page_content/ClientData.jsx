import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import PhoneNumber from 'react-phone-number';

import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
const ClientData = (props) => {
    const DeleteClient = (id) => {
        props.DeleteClient(id);
    }
    return (
        <>
            <tr className="mb-2">
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/client_detail/`+props.userid+"/"+props.cid}>{props.name}</NavLink></td>
                <td>{props.company}</td>
                <td>{props.email}</td>
                <td>{props.date}</td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/edit_client/`+props.cid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/client_detail/`+props.userid+`/`+props.cid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink onClick={() => DeleteClient(props.userid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ClientData;