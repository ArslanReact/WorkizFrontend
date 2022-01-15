import React from 'react';
import { NavLink } from "react-router-dom";
import { Form, FormLabel, Modal, Button } from "react-bootstrap";
import { Editor, editorState } from "react-draft-wysiwyg";

// 
import cogiconimg from "../../../assets/images/cogimg.svg";

// 
import ProjectCategoryModal from "../clientproject/ProjectCategoryModal";

const Edit = () => {
    const [modalShowcategory, setModalShowAssign] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title fontsize22">Update Project Details</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <h4 className="main_title fontsize18 mb-4">Project Info</h4>
                    <Form>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Name</FormLabel>
                                <Form.Control type="text" className="transparent_form h-45px" placeholder="Quas consequatur at." />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Category <NavLink onClick={() => setModalShowAssign(true)} to="#" className="d-inline-block p-0 ml-2"><img className="img-fluid" width="15" src={cogiconimg} alt="" /></NavLink></FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Start Date</FormLabel>
                                <div className="d-flex align-items-center">
                                    <div className="w-75"><Form.Control type="date" className="transparent_form h-45px" placeholder="" /></div>
                                    <div className="ml-auto">
                                        <Form.Check
                                            type="checkbox"
                                            className="mb-0"
                                            id="customControlAutosizing"
                                            label="Allow manual time logs?"
                                            custom
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Deadline</FormLabel>
                                <div className="d-flex align-items-center">
                                    <div className="w-75"><Form.Control type="date" className="transparent_form h-45px" placeholder="" /></div>
                                    <div className="ml-auto">
                                        <Form.Check
                                            type="checkbox"
                                            className="mb-0"
                                            id="customControlAutosizing"
                                            label="Without deadline"
                                            custom
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Summary</FormLabel>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Note</FormLabel>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Completion Status</FormLabel>
                                range slider
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <h4 className="main_title fontsize18 mb-4">Client Info</h4>
                    <Form>
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 mb-4">
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <Form.Check
                                    type="checkbox"
                                    className="mb-0"
                                    id="customControlAutosizinggg"
                                    label="Without deadline"
                                    custom
                                />
                            </div>
                            <div className="col-xl-12 col-lg-12">
                                <FormLabel className="mb-2">Client Feedback </FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={5} />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <h4 className="main_title fontsize18 mb-4">Budget Info</h4>
                    <Form>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Budget</FormLabel>
                                <Form.Control type="text" className="transparent_form h-45px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Currency </FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Hours Allocated</FormLabel>
                                <Form.Control type="text" className="transparent_form h-45px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project Status </FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-12">
                                <Button variant="" className="w-100px btn_blue">Save</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/*  */}
            <MyVerticallyCenteredModalcategory
                show={modalShowcategory}
                onHide={() => setModalShowAssign(false)}
            />
        </>
    )
}

export default Edit;

// category Task modal
function MyVerticallyCenteredModalcategory(props) {
    // 
    const ProjectCategoryModal_Array = [
        {
            key: "0",
            countnumber: "1",
            name: "DS",
            remove: "Remove",
        },
        {
            key: "1",
            countnumber: "2",
            name: "	Laravel",
            remove: "Remove",
        },
    ]
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter"> Project Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div class="table-sm-responsive">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProjectCategoryModal_Array.map((val) => {
                                return (
                                    <ProjectCategoryModal
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        name={val.name}
                                        remove={val.remove}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    <Form>
                        <FormLabel className="mb-2">Category Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" placeholder="" />
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}