import React from 'react';
import { Form, Button, Modal, Row, Col, FormLabel } from "react-bootstrap";
import swal from 'sweetalert';

// 
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const CustomFieldsTableLoop = (props) => {
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.projectname}</td>
                <td>{props.label}</td>
                <td>{props.name}</td>
                <td>{props.type}</td>
                <td>{props.value}</td>
                <td><span className={"px-3 border-radius-100 " + props.badgebgcolor}>{props.requiredtext}</span></td>
                <td>
                    <Button onClick={() => setModalShowAgent(true)} variant="" className="w-40px h-40px mr-3 badgelightbluebg"><img src={props.editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => sweattest(true)} variant="" className="w-40px h-40px badgeredbg"><img src={props.crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalAgent
                show={modalShowAgent}
                onHide={() => setModalShowAgent(false)}
            />
        </>
    )
}

export default CustomFieldsTableLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure that you want to create the credit note?",
        text: "When creating credit note from non paid invoice, the credit note amount will get applied for this invoice.",
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

// task category modal
function MyVerticallyCenteredModalAgent(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Edit Field</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Type</Form.Label>
                        <Col sm="10">
                            <Form.Control className="transparent_form h-40px" as="select">
                                <option>client</option>
                                <option>Employee</option>
                                <option>Project</option>
                                <option>Invoice</option>
                                <option>Estimate</option>
                                <option>Task</option>
                                <option>Expense</option>
                                <option>Lead</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Label</Form.Label>
                        <Col sm="10">
                            <Form.Control className="transparent_form h-40px" name="" type="text" placeholder="" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control className="transparent_form h-40px" name="" type="text" placeholder="" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Required</Form.Label>
                        <Col sm="10">
                            <div className="d-flex mb-2">
                                <Form.Check type="radio" name="radio" aria-label="radio 1" />
                                <FormLabel>Yes</FormLabel>
                            </div>
                            <div className="d-flex">
                                <Form.Check type="radio" name="radio" aria-label="radio 1" />
                                <FormLabel>No</FormLabel>
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Type</Form.Label>
                        <Col sm="10">
                            <Form.Control className="transparent_form h-40px" as="select">
                                <option>Number</option>
                                <option>Text</option>
                                <option>Passwors</option>
                                <option>Select</option>
                                <option>Radio</option>
                                <option>Date</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}