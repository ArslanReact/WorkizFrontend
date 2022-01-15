import React from 'react';
import swal from 'sweetalert';
import { Modal, Button, Form, FormLabel, } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TimeLogDataLoop = (props) => {
    const [modalShowEditLog, setModalShowEditLog] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                        <h4 className="ml-3 fontsize14 blackcolortext">{props.titlename}</h4>
                </td>
                <td>{props.starttime}</td>
                <td>{props.endtime}</td>
                <td><span className="greencolortext">{props.hourtime}</span></td>
                <td>{props.memoname}</td>
                <td>{props.adminname}</td>
                {/* <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={props.iconimg} alt={props.imgalt} /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink onClick={() => setModalShowEditLog(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.editiconimg} alt={props.editimgalt} /> Edit</NavLink></li>
                            <li><NavLink onClick={() => sweattest(true)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.deleteiconimg} alt={props.deleteimgalt} /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td> */}
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalEditLog
                show={modalShowEditLog}
                onHide={() => setModalShowEditLog(false)}
            />
        </>
    )
}

export default TimeLogDataLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted record!",
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


// Client Category modal
function MyVerticallyCenteredModalEditLog(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Update Time Logs</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Project*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Task*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Employee Name*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Start Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">End Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Start Time*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">End Time*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Total Hours*</FormLabel>
                                <p className="m-0">0 Hours 0 Minutes</p>
                            </Form.Group>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <Form.Group>
                                <FormLabel className="mb-2">Memo*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}