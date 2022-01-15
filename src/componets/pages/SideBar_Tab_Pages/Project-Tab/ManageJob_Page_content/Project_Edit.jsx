import React from 'react';
import { NavLink } from "react-router-dom";
import { Editor, editorState } from "react-draft-wysiwyg";
import { Form, Modal, Button, FormGroup, FormLabel } from "react-bootstrap";

// 
import DataTableLoopModalOne from "../../Project-Tab/ManageJob_Page_content/DataTableLoopModalOne";
import DataTableLoopModalOneArray from "../../Project-Tab/ManageJob_Page_content/DataTableLoopModalOneArray";

// 
import ckeckimgicon from "../../../../../assets/images/checkicon.svg";
import plueimgicon from "../../../../../assets/images/plusicon.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";

const Project_Edit = () => {
    const [EditTask, setEditTask] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title px-0"> Update Template Details</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form>
                    <div className="card_dashboard card card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                                <FormGroup>
                                    <FormLabel className="mb-2">Template Name</FormLabel>
                                    <Form.Control type="text" name="" className="h-45px transparent_form" placeholder="" />
                                </FormGroup>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                                <FormGroup>
                                    <FormLabel className="mb-2">Template Category <NavLink onClick={() => setEditTask(true)} to="#" className="px-3 py-1 ml-2 text-white fontsize12 border-radius-100 lasercolorbg"><img className="img-fluid mr-1" src={plueimgicon} alt="" /> Add Project Category</NavLink></FormLabel>
                                    <select className="form-control h-45px transparent_form">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </FormGroup>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                                <div className="d-flex align-items-center mb-3">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Client can manage tasks of this project</FormLabel>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Allow manual time logs?</FormLabel>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Template Summary</FormLabel>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormGroup>
                                    <FormLabel className="mb-2">Note </FormLabel>
                                    <Form.Control className="transparent_form" as="textarea" rows={4} />
                                </FormGroup>
                            </div>
                        </div>
                        <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Update</Button>
                    </div>
                </Form>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={EditTask}
                onHide={() => setEditTask(false)}
            />
        </>
    )
}

export default Project_Edit;

// Edit task modal
function MyVerticallyCenteredModalEdit(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Job Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTableLoopModalOneArray.map((val) => {
                                return (
                                    <DataTableLoopModalOne
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        name={val.name}
                                        remove={val.remove}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Form>
                    <FormLabel className="mb-2">Category Name*</FormLabel>
                    <Form.Control className="transparent_form h-45px" type="email" placeholder="Enter email" />
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg w-100px fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}