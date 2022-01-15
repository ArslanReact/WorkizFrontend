import React from 'react';
import { Modal, Button } from "react-bootstrap";

const FaqAdminLoop = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="col-xl-3 col-lg-6 mb-3">
                <div className="bodycolorbg border_radius_10 mb-3">
                    <h4 className="fontsize16 p-4 paragraph_grey1_text_color">{props.title}</h4>
                </div>
                <div className="d-xl-flex px-3 d-block align-items-center" onClick={() => setModalShow(true)}><img className="img-fluid mr-3" src={props.file} alt="file" /> {props.name}</div>
            </div>
            {/*  */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default FaqAdminLoop;
// task category modal
function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">l;k;lk</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <p>l;k;lk</p>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Submitt</Button>
            </Modal.Footer>
        </Modal >
    );
}