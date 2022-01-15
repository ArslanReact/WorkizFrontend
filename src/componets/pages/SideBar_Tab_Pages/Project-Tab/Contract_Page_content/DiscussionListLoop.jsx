import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Form, ButtonGroup, Button, Modal } from "react-bootstrap";

// 
import ckeckimgicon from "../../../../../assets/images/checkicon.svg";


const DiscussionListLoop = (props) => {
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    return (
        <>
            <li className="d-flex align-items-center p-2 border-radius-10 border_bodycolor_1">
                <NavLink to="#" className="d-flex align-items-center">
                    <p className="m-0"><img className="img-fluid" src={props.avatarimg} alt="" /></p>
                    <h4 className="fontsize16 ml-3 blackcolortext">{props.titlename} <small className="paragraphcolor1text">{props.time}</small></h4>
                </NavLink>
                <ButtonGroup className="ml-auto">
                    <Button onClick={() => setModalShowAgent(true)} variant="" className="w-40px h-40px mr-3 badgelightbluebg"><img src={props.editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => sweattest(true)} variant="" className="w-40px h-40px badgeredbg"><img src={props.crossimg} className="img-fluid" alt="" /></Button>
                </ButtonGroup>
            </li>
            {/* task categor */}
            <MyVerticallyCenteredModalAgent
                show={modalShowAgent}
                onHide={() => setModalShowAgent(false)}
            />
        </>
    )
}

export default DiscussionListLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted discussion!",
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
                <Modal.Title id="contained-modal-title-vcenter">Edit Discussion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
                <Form>
                    <Form.Control className="transparent_form" as="textarea" rows={4} />
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0 mt-3">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}