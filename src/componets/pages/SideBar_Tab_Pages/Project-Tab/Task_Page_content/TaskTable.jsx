import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";

import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import avatariconimg from "../../../../../assets/images/avatar_05.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
import down_arrow_red from "../../../../../assets/images/down_arrow_red.svg";
import down_arrow_green from "../../../../../assets/images/down_arrow_green.svg";
import { Form } from 'react-bootstrap';


const TaskTable = (props) => {
    const ChangeStatus = (id, sid) => {
        props.Updatestatus(id,sid);
    }
    return (
        <>
            <tr className="mb-2">
                <td>{props.count}</td>
                <td>{props.title}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.pid}>{props.shoplist}</NavLink></td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/employee_detail`} className="d-dlex align-items-center"><img className="img-fluid mr-2" src={props.avatariconimg} alt="" /> <span>{props.assignlist}</span></NavLink></td>
                <td>{props.duedatelist}</td>
                <td className="dropdown dropdown_table">
                    <Form.Select className="form-control" value={props.prestatus} onChange={(e) => ChangeStatus(props.taskid,e.target.value)}>
                        {props.statuslist.map((val)=>{
                            return(
                                <option value={val.column_name}>{val.column_name}</option>
                            )
                        })}
                    </Form.Select>
                </td>
                <td className="dropdown dropdown_table">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/task_edit/`+props.taskid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink onClick={() => ChangeStatus(props.taskid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TaskTable;


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