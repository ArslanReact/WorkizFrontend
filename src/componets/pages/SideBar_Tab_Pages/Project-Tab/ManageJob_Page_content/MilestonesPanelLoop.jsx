import React from 'react';
import swal from 'sweetalert';
import { Button, FormLabel, Form, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// 
import checkicon from "../../../../../assets/images/checkicon.svg";

const MilestonesPanelLoop = (props) => {
    const [dragTask, setdragTask] = React.useState(false);
    const [dragTitleModal, setdragTitleModal] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                    <NavLink onClick={() => setdragTitleModal(true)} to="#" className="text_decoration_none d-flex align-items-center">
                        <img src={props.avatarimg} className="img-fluid mr-3" alt="" />
                        <div>
                            <h4 className="fontsize16 fontweightmeduim">{props.avatarname}</h4>
                            <p className="m-0 fontsize14 paragraphcolor1text">{props.smalltitle}</p>
                        </div>
                    </NavLink>
                </td>
                <td>{props.price}</td>
                <td><span className={"px-3 py-1 badgegreenbg greencolortext border-radius-100 fontsize14 " + props.badgebgcolor}>{props.badgetext}</span></td>
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
            <MyVerticallyCenteredModalSubTitleModal
                show={dragTitleModal}
                onHide={() => setdragTitleModal(false)}
            />
        </>
    )
}

export default MilestonesPanelLoop;

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
                    <Modal.Title id="contained-modal-title-vcenter">Sub Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <Form>
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <FormLabel className="mb-2">Milestone Title</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-40px" type="text" name="" placeholder="" />
                            </div>
                            <div className="col-lg-4 mb-3">
                                <FormLabel className="mb-2">Status</FormLabel>
                                <select className="form-control transparent_form h-40px">
                                    <option>Complete</option>
                                    <option>Incomplete</option>
                                </select>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <FormLabel className="mb-2">Milestone Cost</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-40px" type="number" name="" placeholder="" />
                            </div>
                            <div className="col-lg-12">
                                <FormLabel className="mb-2">Milestone Summary</FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={3} />
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
// Sub Task modal
function MyVerticallyCenteredModalSubTitleModal(props) {
    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Milestones Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 mt-4">
                    <div className="mb-3">
                        <h4 className="fontsize16 mb-2 blackcolortext">Milestone Title</h4>
                        <p className="fontsize14 paragraphcolor1text">Time</p>
                    </div>
                    <div className="mb-3">
                        <h4 className="fontsize16 mb-2 blackcolortext">Milestone Summary</h4>
                        <p className="fontsize14 paragraphcolor1text">Time</p>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-xl-6">
                            <h4 className="fontsize16 mb-2 blackcolortext">Milestone Cost</h4>
                            <p className="fontsize14 paragraphcolor1text">$0.01 <NavLink to={`${process.env.PUBLIC_URL}/invoice_page`} className="ml-2 border-radius-5 badge px-3 py-2 blusecolortext badgebluebg">View Invoice</NavLink></p>
                        </div>
                        <div className="col-xl-6">
                            <h4 className="fontsize16 mb-2 blackcolortext">Status</h4>
                            <p className="fontsize14 paragraphcolor1text"><span to="#" className=" border-radius-5 badge px-3 py-2 greencolortext badgegreenbg">Complete</span></p>
                        </div>
                    </div>
                    <div className="table-sm-responsive mt-4">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Assigned To</th>
                                    <th>Assigned By</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="6">No record found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                    {/* <Button variant="" className="w-100px btn_blue">Save</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}