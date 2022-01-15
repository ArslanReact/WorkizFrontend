import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProgressBar, Button, Modal, FormLabel, Form } from 'react-bootstrap';
const LeavesBox = (props) => {
    const [modalShowRefuser, setModalShowRefuser] = useState(false);
    const [leavereason, setleavereason] = useState('');
    const leaveAccept = (id) => {
        props.leaveAccept(id);
    }
    const leaveReject = (id) => {
        props.leaveReject(id, leavereason);
    }
    return (
        <>

            <div className="col-xl-3 col-lg-12 mb-4">
                <div className="card card_dashboard card-body">
                    <h5 className="fontsize18 blackcolortext mb-3">
                        {props.title}
                        {props.type.map((val, index) => {
                            return (
                                <span>{val.type_name}</span>
                            )
                        })} Leave Request
                    </h5>
                    <div className="d-flex align-items-center mb-4">
                        <div className="avatar mr-2">
                            {props.user.map((val) => {
                                return (
                                    <img className="img-fluid" src={val.image_url} alt="" />
                                )
                            })}
                        </div>
                        <div className="">
                            <h4 className="fontsize14 blackcolortext mb-2">
                                <NavLink to={`${process.env.PUBLIC_URL}/employee_detail`}>
                                    {props.user.map((val) => {
                                        return (
                                            <span>{val.name}</span>
                                        )
                                    })}
                                </NavLink></h4>
                            {/* <span className="badgebluebg fontsize12 fontweightmeduim px-3 py-1 border-radius-100 badgebluecolor">{props.badgetext}</span> */}
                        </div>
                    </div>
                    {/*  */}
                    <div className="card-body p-3 border-radius-10 badgegreenbg mb-4">
                        <div className="d-flex align-items-center">
                            <span className="mb-2 d-block fontsize12 fontweightmeduim">{props.progress_heading}</span>
                            <span className="mb-2 d-block ml-auto fontsize10 fontweightmeduim greencolortext">
                                {props.type.map((val, index) => {
                                    return (
                                        <span>{val.no_of_leaves - props.leavetaken} Leave Remaining</span>
                                    )
                                })}
                            </span>
                        </div>
                        <ProgressBar variant={" " + props.variant} className={" " + props.color_progress} now={props.now_update} />
                    </div>
                    {/*  */}
                    <h5 className="fontsize18 blackcolortext mb-2">Reason</h5>
                    <p className="fontsize12 h-65px overflow-auto">{props.reason}</p>
                    <div className="d-flex align-items-center mt-2">
                        <NavLink onClick={() => leaveAccept(props.lid)} to="#" className="btn px-4 border_blusecolor_1 blusecolortext mr-3 border-radius-100">Accept</NavLink>
                        <NavLink onClick={() => setModalShowRefuser(true)} to="#" className="btn px-4 border_redcolor_1 redcolortext border-radius-100">Refuser</NavLink>
                    </div>
                </div>
            </div>
            {/* task categor */}
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

export default LeavesBox;