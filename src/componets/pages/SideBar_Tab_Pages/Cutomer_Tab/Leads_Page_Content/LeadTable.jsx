import React from "react";
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
import userimgiconimg from "../../../../../assets/images/userimgiconimg.svg";
import thumbsimgiconimg from "../../../../../assets/images/thumbsimgiconimg.svg";
import DOMPurify from 'dompurify'; 
const LeadTable = (props) => {
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    
    //const [leadStatus, setleadStatus] = React.useState('');
    const ChangeStatus = (id, sid) => {
        props.Updatestatus(id,sid);
    }
    const DeleteLead = (id) => {
        props.DeleteLead(id);
    }
    const AddFllow = (id) => {
        props.AddFllow(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/leads_view`}>{props.name}</NavLink><br /><span className="badge mt-2 d-inline-block badgebluecolor px-3 badgebluebg border-radius-100">{props.client_type}</span></td>
                <td>{props.company}</td>
                <td>{props.value}</td>
                <td>{props.created_at}</td>
                <td>{props.next_follow_up_date}</td>
                <td><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.agent_name) }} /></td>
                <td className="dropdown dropdown_table">
                    <Form.Select value={props.status} onChange={(e) => ChangeStatus(props.leadid,e.target.value)}>
                        {props.leadstatuslist.map((val)=>{
                            return(
                                <option value={val.id}>{val.type}</option>
                            )
                        })}
                    </Form.Select>
                </td>
                <td className="dropdown dropdown_table" width="110">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_edit/`+props.leadid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/leads_view/`+props.leadid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink onClick={() => DeleteLead(props.leadid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL}/add_new_clientfromlead/`+props.leadid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={userimgiconimg} alt="" />  Change To Client</NavLink></li>
                            <li><NavLink onClick={() => AddFllow(props.leadid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={thumbsimgiconimg} alt="" /> Add Follow Up</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default LeadTable;