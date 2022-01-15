import React from 'react';
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
const ExpencesRecurringDataTable = (props) => {
    const ChangeStatus = (id, sid) => {
        props.Updatestatus(id,sid);
    }
    const DeleteExpense = (id) => {
        props.DeleteExpense(id);
    }
    const ViewExpense = (id) => {
        props.ViewExpense(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><span className="badgebluebg blusecolortext border-radius-100 px-3 py-1 text_decoration_none">{props.itemname}</span></td>
                <td>{props.price}</td>
                <td>{props.employeesname}</td>
                <td>{props.createdon}</td>
                <td className="dropdown dropdown_table">
                    <Form.Select value={props.status_text} onChange={(e) => ChangeStatus(props.exid,e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                </td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/edit_recurring_expences/`+props.exid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            {/* <li><NavLink onClick={() => ViewExpense(props.exid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li> */}
                            <li><NavLink onClick={() => DeleteExpense(props.exid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ExpencesRecurringDataTable;
