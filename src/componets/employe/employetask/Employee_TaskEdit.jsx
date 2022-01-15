import React from 'react';
import { NavLink } from "react-router-dom";
import { FormLabel, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { Editor, editorState } from "react-draft-wysiwyg";
import Select from 'react-select';

// 
import DataTableLoopModal1 from "../employetask/DataTableLoopModal1";


// 
import pluseiconimg from "../../../assets/images/plusicon.svg";
import checkicon from "../../../assets/images/checkicon.svg";

const Employee_TaskEdit = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowLabel, setModalShowLabel] = React.useState(false);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Edit Task</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Title</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" name="" placeholder="Earum quia. Task 3" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project </FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>Select</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Task Category <NavLink onClick={() => setModalShow(true)} to="#" className="purplecolorbg border-radius-100 py-1 ml-2 text-white fontsize14 px-3"><img width="18" className="img-fluid" src={pluseiconimg} alt="" />Task Category</NavLink></FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>No task category added</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Description </FormLabel>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                                <Form.Group className="mt-4 d-flex">
                                    <Form.Check type="checkbox" />
                                    <FormLabel>Task is dependent on another task </FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-3">Label <NavLink onClick={() => setModalShowLabel(true)} to="#" className="purplecolorbg border-radius-100 py-1 ml-2 text-white fontsize14 px-3"><img width="18" className="img-fluid" src={pluseiconimg} alt="" />Add Task Lable</NavLink></FormLabel>
                                <Form.Control readOnly className="transparent_form h-45px" as="select">
                                    <option>Nothing Selected</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Start Date </FormLabel>
                                <Form.Control className="transparent_form h-45px" type="date" name="" placeholder="" />
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Due Date </FormLabel>
                                <Form.Control className="transparent_form h-45px" type="date" name="" placeholder="" />
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Assigned To </FormLabel>
                                <Select options={options} />
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Satus</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>Incomplete</option>
                                    <option>Complete</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Priority</FormLabel>
                                <InputGroup>
                                    zc
                                </InputGroup>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <Form.Control type="file" name="img[]" className="input-file transparent_form fontsize14 h-45px" />
                                <div className="input-group col-xs-12 mt-3">
                                    <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="Name" />
                                    <span className="input-group-btn">
                                        <Button variant="" className="upload-field btn h-45px bodycolorbg ml-2" type="button"> Select Files</Button>
                                    </span>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12">
                                <div className="btn-group">
                                    <Button type="button" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                                    <Button variant="" className="w-100px ml-2 paragraphcolor1bg btn_blue"> Back</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalLabel
                show={modalShowLabel}
                onHide={() => setModalShowLabel(false)}
            />
        </>
    )
}

export default Employee_TaskEdit;

// task category modal
function MyVerticallyCenteredModal(props) {
    const DataTableLoopModal1Array = [
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
                <Modal.Title id="contained-modal-title-vcenter">Task Category</Modal.Title>
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
                            {DataTableLoopModal1Array.map((val) => {
                                return (
                                    <DataTableLoopModal1
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
                        <FormLabel className="mb-2">Add Category Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" placeholder="" />
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// task category modal
function MyVerticallyCenteredModalLabel(props) {
    const [address, setAddress] = React.useState('');
    const [colorbox, setcolorbox] = React.useState('');
    function setaddress123(a) { setAddress(a); setcolorbox(a); }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Activity Label</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <Form.Label className="mb-2">Label Name*</Form.Label>
                        <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" name="" placeholder="" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <Form.Label className="mb-2">Description</Form.Label>
                        <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" name="" placeholder="" />
                    </div>
                </div>
                <div className="">
                    <FormLabel className="mb-2">Color*</FormLabel>
                    <div className="d-flex align-items-center mb-2">
                        <Form.Control className="transparent_form h-40px mr-3" type="text" name="" value={address} placeholder="" />
                        <div className="ml-auto p-3 border-radius-5" value={colorbox} style={{ background: colorbox }}></div>
                    </div>
                    <small>Choose any color. Or you can choose one of the suggested colors below.</small>
                    <div className="suggest-colors my-4">
                        <NavLink onClick={() => setaddress123('#000000')} style={{ background: "#000000" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#3546AB')} style={{ background: "#3546AB" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#FFBB54')} style={{ background: "#FFBB54" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#7590FE')} style={{ background: "#7590FE" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#727ec4')} style={{ background: "#727ec4" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#FC6098')} style={{ background: "#FC6098" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#58D7FF')} style={{ background: "#58D7FF" }} to="#"></NavLink>
                        <NavLink onClick={() => setaddress123('#00A389')} style={{ background: "#00A389" }} to="#"></NavLink>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}