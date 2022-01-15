import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import iconimg from "../../../assets/images/dotoption.svg";
import viewiconimg from "../../../assets/images/viewiconimg.svg";
const NoticeBoardTableData = (props) => {
    const EditNotice = (id) => {
        props.EditNotice(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td>{props.date}</td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => EditNotice(props.nid)} to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default NoticeBoardTableData;