import React from 'react';
import { NavLink } from "react-router-dom";

import iconimg from "../../../../../assets/images/dotoption.svg";
import coggreyimg from "../../../../../assets/images/coggreyimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";

const DepartmentData = (props) => {
    const DeleteDept = (id) => {
        props.DeleteDept(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.depart_title} <span className="px-3 fontsize12 py-1 ml-2 border-radius-100 badgegreenbg greencolortext">{props.totalmember} Members</span></td>
                <td className="d-flex align-items-center">
                    {props.allmemberdata.length > 0 ?
                    props.allmemberdata.map((val) => {
                        return (
                            <NavLink to="#" className="p-0"><img className="img-fluid avatar" src={val.user.image_url} alt="" /></NavLink>
                        )
                    })
                    :
                    "No Record Found"
                    }              
                </td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/manage_department/`+ props.did} className="nav-link text_decoration_none"><img width="12" className="img-fluid mr-1" src={coggreyimg} alt="" /> Manage</NavLink></li>
                            <li><NavLink onClick={() => DeleteDept(props.did)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default DepartmentData;

// 
