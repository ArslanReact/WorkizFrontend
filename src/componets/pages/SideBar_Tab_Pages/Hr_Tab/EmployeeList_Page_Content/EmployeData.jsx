import React from 'react';
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
//
import arrowdown from "../../../../../assets/images/arrowdown.svg";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";

const EmployeData = (props) => {
    const Delete = (id) => {
        props.DeleteEmployee(id);
    }
    const UpdateStatusEmployee = (id, sid) => {
        props.UpdateStatusEmployee(id,sid);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/employee_detail/`+props.eid} className="text_decoration_none d-flex align-items-center">
                        <p className="position-relative m-0 mr-2">
                            <span className={"online_offline z-index-1 " + props.online_offline_color}></span>
                            <img className="avatar img-fluid" src={props.avatarimg} alt="" />
                        </p>
                        <span>
                            <h6 className="fontsize14 mb-2 blackcolortext">{props.title}</h6>
                            <span className="badge badgebluebg border-radius-100 px-2 py-1 blusecolortext">{props.badgetext}</span>
                        </span>
                    </NavLink>
                </td>
                <td>{props.email}</td>
                <td className="dropdown dropdown_table" width="250">
                    {props.eid != props.curuserid ? 
                    <Form.Select value={props.currentroleid} onChange={(e) => UpdateStatusEmployee(props.eid,e.target.value)}>
                        {props.roleslist.map((val)=>{
                            return(
                                <option value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                    :
                        <p>Role of this user cannot be changed.</p>
                    }
                </td>
                <td><span className={"border-radius-100 d-inline-block px-3 fontsize14 py-1 " + props.statusbadgecolor}>{props.statusbadge}</span></td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/edit_employe/`+props.eid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/employee_detail/`+props.eid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            {props.eid != props.curuserid && 
                            <li><NavLink onClick={() => Delete(props.eid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                            }
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default EmployeData;