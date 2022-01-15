import React from 'react';
import { Button, Modal } from "react-bootstrap";
import swal from 'sweetalert';

// 
import ckeckimgicon from "../../../../assets/images/checkicon.svg";
import editiconimg from "../../../../assets/images/editimgicon.svg";
import crossimg from "../../../../assets/images/crossiconimg.svg";
const PurposeTableLoop = (props) => {
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.noticename}</td>
                <td>{props.discription}</td>
                <td>{props.date}</td>
                <td>
                    <Button onClick={() => setModalShowAgent(true)} variant="" className="w-40px h-40px mr-3 badgelightbluebg"><img src={editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => sweattest(true)} variant="" className="w-40px h-40px badgeredbg"><img src={crossimg} className="img-fluid" alt="" /></Button>
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

export default PurposeTableLoop;


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
                <Modal.Title id="contained-modal-title-vcenter">New consent purpose</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
                <p>Loading...</p>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}