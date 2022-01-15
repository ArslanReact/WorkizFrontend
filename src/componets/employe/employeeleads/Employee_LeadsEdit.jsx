import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl, Dropdown, DropdownButton, Form, FormLabel } from "react-bootstrap";

// 
import plusicon from "../../../assets/images/plusiconblue.svg";
import checkicon from "../../../assets/images/checkicon.svg";


const Employee_LeadsEdit = () => {
    const [modalShowLeadAgent, setModalShowLeadAgent] = React.useState(false);
    const [modalShowLeadCategory, setModalShowLeadCategory] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Leads Info</h4>
            </div>
            {/*  */}
            <Form>
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard px-3 py-4">
                        <h4 className="main_title mb-4 fontsize16">Company Detail</h4>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Company Name*</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" placeholder="" />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Website*</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" placeholder="" />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-2">Address*</FormLabel>
                                <Form.Control name="" className="transparent_form" as="textarea" rows={3} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Phone Number*</FormLabel>
                                <InputGroup className="for_all">
                                    <DropdownButton
                                        as={InputGroup.Prepend}
                                        variant=""
                                        className="bodycolorbg"
                                        title="+93 (AF)"
                                    >
                                        <Dropdown.Item href="#">+355 (AL)</Dropdown.Item>
                                        <Dropdown.Item href="#">+213 (DZ)</Dropdown.Item>
                                        <Dropdown.Item href="#">+1684 (AS)</Dropdown.Item>
                                    </DropdownButton>
                                    <FormControl className="transparent_form h-45px fontsize14" aria-describedby="basic-addon1" />
                                </InputGroup>
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Office Phone Number*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" placeholder="" />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">City*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">State*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Country*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Postal Code*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" placeholder="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            {/*  */}
            <Form>
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard px-3 py-4">
                        <h4 className="main_title mb-4 fontsize16">Leads Detail</h4>
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Choose Agents* <NavLink onClick={() => setModalShowLeadAgent(true)} to="#" className="ml-2 fontsize14 border-radius-5 border_blusecolor_1 p-1">Add Leads Agents</NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                    <option>Choose Agent</option>
                                    <option>2</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Lead Category* <NavLink onClick={() => setModalShowLeadCategory(true)} to="#" className="ml-2 fontsize14 border-radius-5 border_blusecolor_1 p-1"><img className="img-fluid" width="15" src={plusicon} alt="" /></NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                    <option>No Category added</option>
                                    <option>2</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Client Name*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="Verdie Grimes DVM" />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Client Email*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="email" placeholder="" />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Lead Value*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" placeholder="" />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Next Follow Up*</FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                    <option>Yes</option>
                                    <option>No</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Status*</FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                    <option>Pending</option>
                                    <option>Inprocess</option>
                                    <option>Converted</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Source*</FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                    <option value="1"> Email</option>
                                    <option value="2"> Google</option>
                                    <option value="3"> Facebook</option>
                                    <option value="4"> Friend</option>
                                    <option value="5"> Direct visit</option>
                                    <option value="6"> Tv ad</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-3">None*</FormLabel>
                                <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} />
                            </div>
                            <div className="col mt-3">
                                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            {/* task categor */}
            <MyVerticallyCenteredModalLeadAgent
                show={modalShowLeadAgent}
                onHide={() => setModalShowLeadAgent(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalLeadCategory
                show={modalShowLeadCategory}
                onHide={() => setModalShowLeadCategory(false)}
            />
        </>
    )
}

export default Employee_LeadsEdit;

// Lead Agent modal
function MyVerticallyCenteredModalLeadAgent(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Lead Agent</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">No task category found.</td>
                            </tr>
                        </tbody>
                    </table>
                    <Form>
                        <FormLabel className="mb-2">Choose Agents*</FormLabel>
                        <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                            <option>Choose Agent</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// Lead Category modal
function MyVerticallyCenteredModalLeadCategory(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Lead Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">No task category found.</td>
                            </tr>
                        </tbody>
                    </table>
                    <Form>
                        <FormLabel className="mb-2">Add Category Name*</FormLabel>
                        <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}