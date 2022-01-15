import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { Button, Accordion, Modal, Form, FormLabel } from 'react-bootstrap';
import { Toggle } from "react-toggle";

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";


const EmployeeLogTable = (props) => {
    const [Edit, setEdit] = React.useState(false);
    return (
        <>
            <Accordion className="w-100 bg-white border-radius-10">
                <li className=" d-flex justify-content-between px-3 py-2 mb-3 align-items-center w-100">
                    <div className="">
                        <NavLink to="#" className="text_decoration_none d-flex align-items-center">
                            <img className="img-fluid mr-3" src={props.avatarimg} alt="" />
                            <div className="">
                                <h6 className="fontsixe14 blackcolortext">{props.title}</h6>
                                <p className="m-0 fontsixe12">{props.smalltitle}</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className=""><span className="border_greencolor_1 greencolortext border-radius-100 px-3 py-1">{props.hourscount}</span></div>
                    <div className="">{props.dolortext}</div>
                    <div>
                        <Toggle as={Button} variant="" className="btn btn_blue" eventKey="0">Upload</Toggle>
                    </div>
                </li>
                <Accordion.Collapse eventKey="0" className="mb-3 px-3 py-3">
                    <div className="table-sm-responsive">
                        <table className="m-0 table table-vorderless">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Time</th>
                                    <th>Total Hours</th>
                                    <th>Eearnings</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.task_name}</td>
                                    <td>{props.time_name}</td>
                                    <td>{props.hours_name}</td>
                                    <td>{props.eearnings_name}</td>
                                    <td>
                                        <NavLink onClick={() => setEdit(true)} to="#" className="mr-3"><img className="img-fluid" src={props.editimg} alt="" /></NavLink>
                                        <NavLink onClick={() => sweattest(true)} to="#" className=""><img className="img-fluid" src={props.deleteimg} alt="" /></NavLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Accordion.Collapse>
            </Accordion>
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={Edit}
                onHide={() => setEdit(false)}
            />
        </>
    )
}

export default EmployeeLogTable;

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

// Edit modal
function MyVerticallyCenteredModalEdit(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0 mb-4">
                <Modal.Title id="contained-modal-title-vcenter">update time log</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mb-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">the project</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>Quia Odit.</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">task</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>-</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">task</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>Marcellus davis</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Start Date</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">End Date</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Start Time</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="time" name="" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">End time</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="time" name="" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Total Time</FormLabel>
                            <p className="m-0">8Hrs 0Mins</p>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <FormLabel className="mb-2">Note</FormLabel>
                            <Form.Control className="transparent_form" as="textarea" rows={5} />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}