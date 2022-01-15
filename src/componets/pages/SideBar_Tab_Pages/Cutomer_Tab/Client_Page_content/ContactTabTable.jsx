import React from 'react';
import { NavLink } from "react-router-dom";
import PhoneNumber from 'react-phone-number';

const ContactTabTable = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/client`}>{props.name}</NavLink></td>
                <td><PhoneNumber className="text_decoration_none" number={props.phone} isLinked={true} /></td>
                <td>{props.email}</td>
                <td className="dropdown dropdown_table" width="110">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={props.iconimg} alt={props.imgalt} /></NavLink>
                    <div class="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_edit`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_view`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ContactTabTable;
