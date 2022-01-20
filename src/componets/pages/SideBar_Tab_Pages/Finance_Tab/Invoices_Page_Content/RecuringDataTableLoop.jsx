import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Form } from "react-bootstrap";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
const RecuringDataTableLoop = (props) => {
    const ChangeStatus = (id, status) => {
        props.Updatestatus(id,status);
    }
    const DeleteInv = (id) => {
        props.DeleteInv(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.clientname}</td>
                <td>
                    <NavLink to="#" className="text_decoration_none">
                      {props.projectname}      
                    </NavLink></td>
                <td>{props.totaltext}</td>
                <td>{props.invoicedate}</td>
                <td className="dropdown dropdown_table">
                    <Form.Select value={props.status} onChange={(e) => ChangeStatus(props.invid,e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                </td>
                <td className="dropdown dropdown_table" width="110">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            
                            {/* <li><NavLink to={`${process.env.PUBLIC_URL}/leads_view`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li> */}
                            <li><NavLink onClick={() => DeleteInv(props.invid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default RecuringDataTableLoop;

