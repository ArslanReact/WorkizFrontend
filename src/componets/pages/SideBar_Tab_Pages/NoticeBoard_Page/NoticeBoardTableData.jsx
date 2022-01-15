import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import iconimg from "../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../../assets/images/deleteiconimg.svg";
const NoticeBoardTableData = (props) => {
    const [modalShowAddDepartment, setModalShowAddDepartment] = React.useState(false);
    const DeleteNotice = (id) => {
        props.DeleteNoticeBoard(id);
    }
    const ShowNotice = (id) => {
        props.ShowNotice(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td>{props.date}</td>
                <td>{props.to}</td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" role="button" data-bs-toggle="dropdown" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={"edit_notice/" + props.nid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink onClick={() => ShowNotice(props.nid)} to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                            <li><NavLink onClick={() => DeleteNotice(props.nid)} to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalAddDepartment
                show={modalShowAddDepartment}
                onHide={() => setModalShowAddDepartment(false)}
            />
        </>
    )
}

export default NoticeBoardTableData;

// Update Department modal
function MyVerticallyCenteredModalAddDepartment(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Notice:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <h4 className="mb-2 fontsize18 blackcolortext">Alice, swallowing down her anger as well as she swam nearer to make.</h4>
                <h6 className="mb-2 fontsize14 blackcolortext">Description</h6>
                <p className="paragraphcolor1text">King said to itself 'The Duchess! The Duchess! Oh my dear paws! Oh my fur and whiskers! She'll get me executed, as sure as ferrets are ferrets! Where CAN I have done that?' she thought. 'But everything's curious today. I think I can creep under the window, and on both sides at once. 'Give your evidence,' said the Duchess: 'and the moral of that is--"Be what you would seem to put down yet, before the end of your nose-- What made you so awfully clever?' 'I have answered three questions, and that he shook both his shoes off. 'Give your evidence,' the King triumphantly, pointing to Alice to herself. 'I dare say you're wondering why I don't want to be?' it asked. 'Oh, I'm not used to come yet, please your Majesty,' said Alice very politely; but she felt that it felt quite strange at first; but she could not taste theirs, and the pattern on their slates, when the White Rabbit with pink eyes ran close by her. There was a different person then.' 'Explain all that,' he said do. Alice looked.</p>
                <hr className="mb-2 border_bodycolor_1" />
                <h6 className="mb-2 fontsize14 blackcolortext">Read By</h6>
                <p className="paragraphcolor1text">No user found.</p>
                <hr className="mb-2 border_bodycolor_1" />
                <h6 className="mb-2 fontsize14 blackcolortext">Waiting for Read</h6>
                <p className="paragraphcolor1text">No user found.</p>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}