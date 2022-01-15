import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import iconimg from "../../../../../assets/images/dotoption.svg";
import checkgreyicon from "../../../../../assets/images/checkgreyicon.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import crossimg from "../../../../../assets/images/cross.svg";
import dateFormat from 'dateformat';
import { Button, Modal, FormLabel, Form } from 'react-bootstrap';
const AllLeavesData = (props) => {
    const [modalShowRefuser, setModalShowRefuser] = useState(false);
    const [leavereason, setleavereason] = useState('');
    const leaveAccept = (id) => {
        props.leaveAccept(id);
    }
    const leaveReject = (id) => {
        props.leaveReject(id, leavereason);
    }
    const leaveDelete = (id) => {
        props.leaveDelete(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/employee_detail`} className="text_decoration_none d-flex align-items-center">
                        <span>
                            <h6 className="fontsize14 mb-2 blackcolortext">{props.title}</h6>
                        </span>
                    </NavLink>
                </td>
                <td>{dateFormat(props.leavedate, props.date_format)}</td>
                <td><span className={"px-3 py-1 fontsize12 border-radius-100 " + props.leavestatus_badgebg}>{props.leavestatus_badgetext}</span></td>
                <td><span className={"px-3 py-1 fontsize12 border-radius-100 " + props.leavestype_badgebg}>{props.leavestype_badgetext}</span></td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div class="dropdown-menu dropdown-menu-right">
                        {props.leavestatus_badgetext === 'pending' ?
                            <ul className="list-unstyled">
                                <li><NavLink onClick={() => leaveAccept(props.lid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="10" src={checkgreyicon} alt="" /> Approved</NavLink></li>
                                <li><NavLink onClick={() => setModalShowRefuser(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="10" src={crossimg} alt="" /> Reject</NavLink></li>
                                <li><NavLink onClick={() => leaveDelete(props.lid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> Delete</NavLink></li>
                            </ul>
                            :
                            <ul className="list-unstyled">
                                <li><NavLink onClick={() => leaveDelete(props.lid)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> Delete</NavLink></li>
                            </ul>
                        }
                    </div>
                </td>
            </tr>
            {/*  */}
            <Modal show={modalShowRefuser} onHide={() => setModalShowRefuser(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Leaves refuser Raison</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body className="p-0 my-4">

                        <div className="form-group">
                            <FormLabel className="mb-2">Refuser Raison? (Optional)</FormLabel>
                            <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} value={leavereason} onChange={(e) => setleavereason(e.target.value)} />
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowRefuser(false)}>Close</Button>
                        <Button variant="" type="button" onClick={() => leaveReject(props.lid)} className="w-100px btn_blue">Refuser</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    )
}

export default AllLeavesData;