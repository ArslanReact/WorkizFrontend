import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";

const CalendarJanuary = (props) => {
    return (
        <>
            <tr>
                <td>{props.ID_number}</td>
                <td>{props.datetext}</td>
                <td>{props.Occasiontext}</td>
                <td>{props.daytext}</td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={props.iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CalendarJanuary;

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