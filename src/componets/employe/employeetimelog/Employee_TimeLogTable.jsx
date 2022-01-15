import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import checkimggreen from "../../../assets/images/checkimggreen.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import editiconimg from "../../../assets/images/editiconimg.svg";
import deleteiconimg from "../../../assets/images/deleteiconimg.svg";

import checkiconimg from "../../../assets/images/checkblackicon.svg";

const TimeLogTable = (props) => {
    const [EditModal, setEditModal] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.serialnumber}</td>
                <td>{props.taskname}</td>
                <td>{props.starttime}</td>
                <td>{props.endtime}</td>
                <td><span className="d-inline-block border_greencolor_1 px-3 py-2 border-radius-100 greencolortext">{props.hrscount} <img className="img-fluid ml-3" src={checkimggreen} alt="" /></span></td>
                <td>{props.memo}</td>
                <td className="dropdown dropdown_table">
                    No Access
                    {/* <NavLink to="#" role="button" className="btn_dropdown_table d-inline-block" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => setEditModal(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                            <li><NavLink onClick={() => sweatapprove(true)} to="#" className="nav-link text_decoration_none"><img width="13" className="img-fluid mr-1" src={checkiconimg} alt="" /> Approve</NavLink></li>
                        </ul>
                    </div> */}
                </td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalEditModal
                show={EditModal}
                onHide={() => setEditModal(false)}
            />
        </>
    )
}

export default TimeLogTable;

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
// 
function sweatapprove() {
    swal({
        title: "Are you sure?",
        // text: "You will not be able to recover the deleted recurring invoice!",
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


// Sub Task modal
function MyVerticallyCenteredModalEditModal(props) {
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Time Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <Form>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Project</FormLabel>
                                {/* <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="Completed" /> */}
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>two</option>
                                    <option>one</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Task</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>two</option>
                                    <option>one</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2"> Employee Name</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>two</option>
                                    <option>one</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-3">
                                <FormLabel className="mb-2">Start date</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-3">
                                <FormLabel className="mb-2">End Date</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <FormLabel className="mb-2">Start Time</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" name="" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <FormLabel className="mb-2">End Time</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" name="" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <FormLabel className="mb-2">Total Hours</FormLabel>
                                <p className="m-0">8Hrs 0Mins</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-3">
                                <FormLabel className="mb-2">Memo</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="Working on demo" />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                    <Button variant="" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}