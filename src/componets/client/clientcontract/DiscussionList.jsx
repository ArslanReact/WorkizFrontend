import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";

// img import
import deleteiconimg from "../../../assets/images/deleteiconimg1.svg";
import edit_2_iconimg from "../../../assets/images/edit_2_iconimg.svg";



const DiscussionList = (props) => {
    const [modalShowcategory, setModalShowAssign] = React.useState(false);
    const DeleteMessage = (id) => {
        props.DeleteMessage(id);
    }
    const EditMessage = (id) => {
        props.EditMessage(id);
    }
    return (
        <>
            <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center mr-auto">
                    <div className="mr-3 avatar"><img className="img-gluid" src={props.avatarimg} alt="icon" /></div>
                    <div>
                        <h4 className="mb-1 fontsize18">{props.title}</h4>
                        <p className="m-0 paragraph_blue_text_color">{props.paragraph}</p>
                    </div>
                </div>
                <Button variant="" onClick={() => EditMessage(props.mid)} className="btn py-1 px-2"><img width="20" className="img-fluid" src={edit_2_iconimg} alt="icon" /></Button>
                <Button variant="" onClick={() => DeleteMessage(props.mid)} className="btn py-1 px-2"><img width="20" className="img-fluid" src={deleteiconimg} alt="icon" /></Button>
            </div>
            {/*  */}
        </>
    )
}
export default DiscussionList;
