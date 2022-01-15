import React from 'react';
import { Button, Form, FormLabel, Modal } from "react-bootstrap";

//
import ManageRoleModalLoop from "../Setting_Page/ManageRoleModalLoop";
import ManageRoleModalLoop_Array from "../Setting_Page/ManageRoleModalLoop_Array";
import ManageRoleListLoop from "../Setting_Page/ManageRoleListLoop";
import ManageRoleListLoop_Array from "../Setting_Page/ManageRoleListLoop_Array";

// 
import lockicon from "../../../../assets/images/lockicon.svg";
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const RolePermissionLoop = (props) => {
    const [modalShowAddPurpose, setModalShowAddPurpose] = React.useState(false);
    if (props.managebtn === "Manage Role") {
        return (
            <>
            <div className="card card-body">
                <div className="card-header d-flex align-items-center mb-3 pb-3">
                    <h4 className="fontsize18">Roles Permissions</h4>
                    <Button onClick={() => setModalShowAddPurpose(true)} type="button" className="ml-auto btn_blue h-40px" variant="">{props.managebtn}</Button>
                </div>
                <div className="table-sm-responsive clent_data_table">
                    <table className="table m-0">
                        <tbody>
                            {ManageRoleListLoop_Array.map((val) => {
                                return (
                                    <ManageRoleListLoop
                                        key={val.key}
                                        name={val.name}
                                        badgetext={val.badgetext}
                                        badgebg={val.badgebg}
                                        perbadgetext={val.perbadgetext}
                                        perbadgebg={val.perbadgebg}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalAddPurpose
                show={modalShowAddPurpose}
                onHide={() => setModalShowAddPurpose(false)}
            />
        </>
        )
    }
    else if (props.managebtn === "Manage Role") {

        return (
            <>
            <div className="card card-body">
                <div className="card-header mb-3 pb-3">
                    <h4 className="fontsize18">Roles Permissions</h4>
                </div>
                <div className="py-4 text-center">
                    <div className="my-3"><img className="img-fluid" src={lockicon} alt="lockicon" /></div>
                    <p className="m-0 fontzize14 paragraphcolor1text mb-3">Admin, Client and Employee roles are default roles and Default roles can not be deleted.</p>
                    <Button onClick={() => setModalShowAddPurpose(true)} type="button" className="btn_blue h-40px" variant="">{props.managebtn}</Button>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalAddPurpose
                show={modalShowAddPurpose}
                onHide={() => setModalShowAddPurpose(false)}
            />
        </>
        )
    }
}

export default RolePermissionLoop;


// task category modal
function MyVerticallyCenteredModalAddPurpose(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Manage Role</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
                <div className="table-sm-responsive clent_data_table mb-3">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">User Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ManageRoleModalLoop_Array.map((val) => {
                                return (
                                    <ManageRoleModalLoop
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        name={val.name}
                                        default_text={val.default_text}
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
                <Button variant="" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}