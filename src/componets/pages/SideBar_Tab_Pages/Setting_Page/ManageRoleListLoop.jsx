import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";

// 
import DataTableLoopModal1 from "../Setting_Page/DataTableLoopModal1";
import DataTableLoopModal1Array from "../Setting_Page/DataTableLoopModal1Array";

// 
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const ManageRoleListLoop = (props) => {
    const [modalShowAddPurpose, setModalShowAddPurpose] = React.useState(false);
    return (
        <>
            <tr className="badgegreenbg">
                <td>{props.name}</td>
                <td><NavLink onClick={() => setModalShowAddPurpose(true)} to="#" className={"px-3 fontsize14 text_decoration_none py-1 border-radius-5 " + props.badgebg}>{props.badgetext}</NavLink></td>
                <td><NavLink to="#" className={"px-3 fontsize14 text_decoration_none py-1 border-radius-5 " + props.perbadgebg}>{props.perbadgetext}</NavLink></td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalAddPurpose
                show={modalShowAddPurpose}
                onHide={() => setModalShowAddPurpose(false)}
            />
        </>
    )
}

export default ManageRoleListLoop;

// task category modal
function MyVerticallyCenteredModalAddPurpose(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Manage Role Members</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
                <div className="table-sm-responsive clent_data_table mb-3">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTableLoopModal1Array.map((val) => {
                                return (
                                    <DataTableLoopModal1
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        name={val.name}
                                        role={val.role}
                                        remove={val.remove}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="form-group">
                    <FormLabel className="mb-2">Role Name</FormLabel>
                    <Form.Control type="text" className="h-45px transparent_form" placeholder="" />
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px h-40px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}