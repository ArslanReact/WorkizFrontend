import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import DOMPurify from 'dompurify';
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
import checkimggreen from "../../../../../assets/images/checkimggreen.svg";
import checkiconimg from "../../../../../assets/images/checkblackicon.svg";
const TimeLogTable = (props) => {
    
    const DeleteTimeLog = (id) => {
        props.DeleteTimeLog(id);
    }
    const EditTimeLog = (id) => {
        props.EditTimeLog(id);
    }
    const ApproveTimeLog = (id) => {
        props.ApproveTimeLog(id);
    }
    return (
        <>
            <tr>
                <td>{props.serialnumber}</td>
                {/* <td>{props.taskname}</td> */}
                <td><NavLink to={`${process.env.PUBLIC_URL}/employee-list`} className="d-flex align-items-center"> {props.employetitle}</NavLink></td>
                <td>{props.starttime}</td>
                <td>{props.enddate}</td>
                <td><span className="d-inline-block border_greencolor_1 px-3 py-2 border-radius-100 greencolortext">{props.hrscount} <img className="img-fluid ml-3" src={checkimggreen} alt="" /></span></td>
                {/* <td>{props.price}</td> */}
                <td className="dropdown dropdown_table">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table d-inline-block" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            {/* <li><NavLink onClick={() => EditTimeLog(props.timelogid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li> */}
                            <li><NavLink onClick={() => DeleteTimeLog(props.timelogid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                            {/* {props.status === "0" &&
                                 <li><NavLink onClick={() => ApproveTimeLog(props.timelogid)} to="#" className="nav-link text_decoration_none"><img width="13" className="img-fluid mr-1" src={checkiconimg} alt="" /> Approve</NavLink></li>
                            } */}
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TimeLogTable;
