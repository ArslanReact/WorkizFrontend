import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Form, Button, Modal, FormLabel } from "react-bootstrap";


// 
import checkicon from "../../../assets/images/checkicon.svg";


const MembersPanelLoop = (props) => {
    const [dragTask, setdragTask] = React.useState(false);
    return (
        <>
            <tr>
                <td>
                    <NavLink to="#" className="text_decoration_none d-flex align-items-center">
                        <img src={props.avatarimg} className="img-fluid mr-3" alt="" />
                        <div>
                            <h4 className="fontsize16 fontweightmeduim">{props.avatarname}</h4>
                            <p className="m-0 fontsize14 paragraphcolor1text">{props.smalltitle}</p>
                        </div>
                    </NavLink>
                </td>
                <td>{props.rate}</td>
                <td>
                    <div className="from-group d-flex">
                        <Form.Check type="radio" name="radiotable" />
                        <FormLabel className="mb-2">Project Admin</FormLabel>
                    </div>
                </td>
                <td>
                    <div className="btn-group">
                        <Button onClick={() => setdragTask(true)} variant="" type="button" className={"badgelightbluebg w-40px h-40px border-radius-5 mr-2 " + props.buttonbg1}><img src={props.editimgicon} className="img-fluid" alt="" /></Button>
                        <Button onClick={() => sweattest(true)} variant="" type="button" className={"badgeredbg w-40px h-40px border-radius-5 " + props.buttonbg2}><img src={props.deleteimgicon} className="img-fluid" alt="" /></Button>
                    </div>
                </td>
            </tr>
            <MyVerticallyCenteredModalSubTask
                show={dragTask}
                onHide={() => setdragTask(false)}
            />
        </>
    )
}

export default MembersPanelLoop;

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

// Sub Task modal
function MyVerticallyCenteredModalSubTask(props) {
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Edit Members</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 mt-3">
                    <Form>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Employee</FormLabel>
                                <p className="m-0">Description</p>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Hourly Rate</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-40px" type="text" name="" placeholder="" />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                    <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}