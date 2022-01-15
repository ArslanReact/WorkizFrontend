import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';

const RecuringDataTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.clientname}</td>
                <td><NavLink to="#" className="text_decoration_none">{props.projectname}</NavLink></td>
                <td>{props.totaltext}</td>
                <td>{props.invoicedate}</td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" data-toggle="dropdown" className={"d-flex align-items-center text_decoration_none justify-content-between py-2 px-3 fontsize14 border-radius-100 " + props.status_color}>{props.status_text} <img className="img-fluid" src={props.down_arrow} alt="" /></NavLink>
                    <ul className="list-unstyled dropdown-menu dropdown-menu-right">
                        <NavLink to="#" className="nav-link text_decoration_none">Active</NavLink>
                        <NavLink to="#" className="nav-link text_decoration_none">Inactive</NavLink>
                    </ul>
                </td>
                <td className="dropdown dropdown_table" width="110">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={props.iconimg} alt={props.imgalt} /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_edit`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_view`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default RecuringDataTableLoop;

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