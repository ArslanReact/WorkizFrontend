import React from 'react';
import { NavLink } from "react-router-dom";
import { Modal, Button, Form, Col, Accordion, FormLabel } from "react-bootstrap";

// 
import DataTableLoopModalOne from "../Events_Page/DataTableLoopModalOne";
import DataTableLoopModalOneArray from "../Events_Page/DataTableLoopModalOneArray";
import DataTableLoopModalTwo from "../Events_Page/DataTableLoopModalTwo";
import DataTableLoopModalTwoArray from "../Events_Page/DataTableLoopModalTwoArray";

// 
import plusicon from "../../../../assets/images/plusicon.svg";
import checkicon from "../../../../assets/images/checkicon.svg";
import filtericon from "../../../../assets/images/filtericon.svg";
import cogiconimg from "../../../../assets/images/cogimg.svg";

const Events = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Accordion defaultActiveKey="0" className="w-100">
                <div className="container-fluid p-0 mb-4">
                    <div className="d-flex align-items-center">
                        <h4 className="main_title">Events</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink onClick={() => setModalShow(true)} to="#" className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Event</NavLink>
                            <Accordion.Toggle as={Button} variant="" eventKey="0" className="btn whitecolorbg blusecolortext fontsize14"><img className="img-fluid" src={filtericon} alt="" /></Accordion.Toggle>
                        </div>
                    </div>
                    <Accordion.Collapse eventKey="0" className="mt-4">
                        <Form>
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-12">
                                        <FormLabel className="mb-2">Select Employees</FormLabel>
                                        <Form.Control as="select" className="transparent_form h-45px">
                                            <option>All</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-xl-3 col-lg-12">
                                        <FormLabel className="mb-2">Select Client</FormLabel>
                                        <Form.Control as="select" className="transparent_form h-45px">
                                            <option>All</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-xl-3 col-lg-12">
                                        <FormLabel className="mb-2">Category</FormLabel>
                                        <Form.Control as="select" className="transparent_form h-45px">
                                            <option>All</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-xl-3 col-lg-12">
                                        <FormLabel className="mb-2">Event Type</FormLabel>
                                        <Form.Control as="select" className="transparent_form h-45px">
                                            <option>All</option>
                                        </Form.Control>
                                    </div>
                                </div>
                                <div className="btn-group d-inline-block mt-4">
                                    <Button variant="" className="w-100px mr-2 btn_blue"><img className="img-fluid ml-2" width="15" src={checkicon} alt="" /> Apply</Button>
                                    <Button variant="" className="w-100px paragraphcolor1bg btn_blue">Reset</Button>
                                </div>
                            </div>
                        </Form>
                    </Accordion.Collapse>
                </div>
            </Accordion>
            {/*  */}
            <div className="main-cotainer">
                <div className="card card-body">
                    calendar
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Events;

// task category modal
function MyVerticallyCenteredModal(props) {
    const [modalShowInner1, setModalShowInner1] = React.useState(false);
    const [modalShowInner2, setModalShowInner2] = React.useState(false);
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-5 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Event Name</FormLabel>
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                        </div>
                        <div className="col-xl-2 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Color</FormLabel>
                            color
                        </div>
                        <div className="col-xl-5 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Where</FormLabel>
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Category <NavLink onClick={() => setModalShowInner1(true)} to="#"><img className="img-fluid ml-2" width="15" src={cogiconimg} alt="" /></NavLink></FormLabel>
                            <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                <option>Select Category</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Event Type <NavLink onClick={() => setModalShowInner2(true)} to="#"><img className="img-fluid ml-2" width="15" src={cogiconimg} alt="" /></NavLink></FormLabel>
                            <Form.Control as="select" className="transparent_form fontsize14 h-45px">
                                <option>Select Event Type</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Starts On</FormLabel>
                            <Form.Row>
                                <Col>
                                    <Form.Control type="date" className="transparent_form h-45px" placeholder="" />
                                </Col>
                                <Col>
                                    <Form.Control type="time" className="transparent_form h-45px" placeholder="" />
                                </Col>
                            </Form.Row>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Ends On</FormLabel>
                            <Form.Row>
                                <Col>
                                    <Form.Control type="date" className="transparent_form h-45px" placeholder="" />
                                </Col>
                                <Col>
                                    <Form.Control type="time" className="transparent_form h-45px" placeholder="" />
                                </Col>
                            </Form.Row>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} />
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <Form.Row className="mb-3">
                                <Col>
                                    <FormLabel className="mb-2">Add Attendees</FormLabel>
                                </Col>
                                <Col>
                                    <Form.Check type="checkbox" className=" d-flex align-items-center" label="All Clients" />
                                </Col>
                            </Form.Row>
                            <Form.Control type="text" className="transparent_form h-45px" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                            <FormLabel className="mb-2">Repeat Every</FormLabel>
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                            <FormLabel className="mb-2">Date</FormLabel>
                            <Form.Control type="date" className="transparent_form fontsize14 h-45px" placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                            <FormLabel className="mb-2">Cycles</FormLabel>
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                        </div>
                    </div>
                    {/* task categor */}
                    <MyVerticallyCenteredModalInner1
                        show={modalShowInner1}
                        onHide={() => setModalShowInner1(false)}
                    />
                    {/* task categor */}
                    <MyVerticallyCenteredModalInner2
                        show={modalShowInner2}
                        onHide={() => setModalShowInner2(false)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Submitt</Button>
            </Modal.Footer>
        </Modal >
    );
}
// task category modal
function MyVerticallyCenteredModalInner1(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Event Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div class="table-sm-responsive">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataTableLoopModalTwoArray.map((val) => {
                                    return (
                                        <DataTableLoopModalTwo
                                            key={val.key}
                                            countnumber={val.countnumber}
                                            name={val.name}
                                            remove={val.remove}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Add Category Name</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// task category modal
function MyVerticallyCenteredModalInner2(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Event Type</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div class="table-sm-responsive">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataTableLoopModalOneArray.map((val) => {
                                    return (
                                        <DataTableLoopModalOne
                                            key={val.key}
                                            countnumber={val.countnumber}
                                            name={val.name}
                                            remove={val.remove}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
