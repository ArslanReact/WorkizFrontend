import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";

const PaymentTableData = (props) => {
    const ViewPayment = (id) => {
        props.ViewPayment(id);
    }
    const DeletePayment = (id) => {
        props.DeletePayment(id);
    }
    return (
        <>
            <tr>
                <td>{props.count_number}</td>
                <td><NavLink onClick={() => ViewPayment(props.paymentid)} to="#" className="fontsize14 text_decoration_none blusecolortext">{props.invoicenumber}</NavLink></td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.project_id} className="fontsize14 text_decoration_none blusecolortext">{props.projectname}</NavLink></td>
                <td>{props.amounttext}</td>
                <td>{props.paidontext}</td>
                <td>{props.dashes}</td>
                <td><span className={"px-3 py-1  fontsize12 border-radius-100 "+props.badgebg}>{props.badgetext}</span></td>
                
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => ViewPayment(props.paymentid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/edit_payment/`+props.paymentid} className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink onClick={() => DeletePayment(props.paymentid)} to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default PaymentTableData;