import React from 'react';
import { Modal, Button } from "react-bootstrap";
import DOMPurify from 'dompurify';
const FaqAdminLoop = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="col-xl-12 col-lg-12 mb-3">
                <div className="bodycolorbg border_radius_10 mb-3">
                    <h4 className="fontsize16 p-4 paragraph_grey1_text_color">{props.title}</h4>
                </div>
                <div className="d-xl-flex px-3 d-block align-items-center">
                    {/* <img className="img-fluid mr-3" src={props.file} alt="file" />  */}
                    {<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.description) }} />}
                </div>
            </div>
            {/*  */}
         
        </>
    )
}

export default FaqAdminLoop;
// // task category modal
// function MyVerticallyCenteredModal(props) {
//     return (
//         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//             <Modal.Header closeButton className="d-flex align-items-center p-0">
//                 <Modal.Title id="contained-modal-title-vcenter">l;k;lk</Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="p-0 my-4">
//                 <p>l;k;lk</p>
//             </Modal.Body>
//             <Modal.Footer className="p-0">
//                 <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
//                 <Button variant="" className="w-100px btn_blue">Submitt</Button>
//             </Modal.Footer>
//         </Modal >
//     );
// }