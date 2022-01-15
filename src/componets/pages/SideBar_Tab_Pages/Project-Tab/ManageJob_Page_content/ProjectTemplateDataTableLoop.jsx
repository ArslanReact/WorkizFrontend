import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";

// 
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
const ProjectTemplateDataTableLoop = (props) => {
    var users = [];
    {
        props.members.map((val) => {
            users.push(val.user);
        })
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.projectname}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <div className="d-inline-flex">
                            {users.map((val) => {
                                return (
                                    <span className="m-minus-left-15"><img className="img-fluid" width="35" src={val.image_url} alt="" /></span>
                                )
                            })}
                        </div>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_job_member`} className="ml-2 blusecolorbg border-radius-100 w-30px h-30px text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink>
                    </div>
                </td>
                <td>cccc</td>
                {/* {props.categoryname.map((val) => {
                    return (
                    <td>{val.category_name}</td>
                    )
                })} */}
                <td className="dropdown dropdown_table" width="110">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div class="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/project_edit`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/project_view`} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ProjectTemplateDataTableLoop;

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