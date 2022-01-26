import React from 'react';
import Globalsettings from "../../../../Globalsettings";
import DOMPurify from 'dompurify';
import { Button, Form, FormLabel, Modal } from "react-bootstrap";

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";

const InvoiveTableData = (props) => {
    const [EditTask, setEditTask] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{<a href={Globalsettings.url+"api/all-invoices/download/"+props.id} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.invoicenumber) }} />}</td>
                {<td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.projectname) }} />}
                <td className="">
                    <img className="img-fluid mr-3" src={props.client_avatar} alt="" />
                    <h4 className="fontsize14 blackcolortext">{props.client_name}</h4>
                </td>
                {<td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.price) }} />}
                <td>{props.invioce_date}</td>
                {<td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.status) }} />}

                {<td className="dropdown dropdown_table" width="80" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.action) }} />}
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={EditTask}
                onHide={() => setEditTask(false)}
            />
        </>
    )
}

export default InvoiveTableData;

// 
// function sweattest() {
//     swal({
//         title: "Are you sure that you want to create the credit note?",
//         text: "When creating credit note from non paid invoice, the credit note amount will get applied for this invoice.",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//     })
//         .then((willDelete) => {
//             if (willDelete) {
//                 swal("Poof! Your imaginary file has been deleted!", {
//                     icon: "success",
//                 });
//             } else {
//                 swal("Your imaginary file is safe!");
//             }
//         });
// }

// Edit task modal
function MyVerticallyCenteredModalEdit(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Shipping Address</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row align-items-center">
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Shipping Address</FormLabel>
                            <Form.Control className="transparent_form" as="textarea" rows={5} />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}