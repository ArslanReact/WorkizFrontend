import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
import copyiconimg from "../../../../../assets/images/copyblackframeicon.svg";
import sendiconimg from "../../../../../assets/images/sendicon.svg";
import dateFormat from 'dateformat';
const TableContent = (props) => {
    return (
        <>
            <tr className="mb-2">
                <th scope="row">{props.count_number}</th>
                <td>{props.subject}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/client_detail/`+props.userid+"/"+props.cid} className="d-flex align-items-center">
                    <img className="avatar mr-3" width="50" src={props.image_url} alt="" />
                    <p>{props.clientname}</p>
                </NavLink>
                </td>
                <td><span className="d-block py-1 badgegreencolor">{props.currency + " " + props.amount}</span></td>
                <td>{dateFormat(props.start_date, props.date_format)}</td>
                <td>{dateFormat(props.end_date, props.date_format)}</td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" role="button" data-bs-toggle="dropdown" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/contract_view/`+props.id} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/contract_edit/`+props.id} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={copyiconimg} alt="" /> Copy</NavLink></li>
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                            <li><NavLink to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={sendiconimg} alt="" /> Send</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableContent;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted recurring invoice!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}