import React from 'react';
import { Form, FormLabel, Button } from "react-bootstrap";
import { Editor, editorState } from "react-draft-wysiwyg";

// 
import checkicon from "../../../../assets/images/checkicon.svg";

const Edit_Notice = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Notice</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <Form>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Notice Heading</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" placeholder="Mock Turtle repeated thoughtfully. 'I should have croqueted the." />
                        </div>
                        <div className="form-group mb-4">
                            <div className="d-flex">
                                <div className="mr-3 d-flex">
                                    <Form.Check type="radio" name="radio" aria-label="radio 1" />
                                    <FormLabel>To Employees</FormLabel>
                                </div>
                                <div className="d-flex">
                                    <Form.Check type="radio" name="radio" aria-label="radio 1" />
                                    <FormLabel>To Client</FormLabel>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Department</FormLabel>
                            <Form.Control className="transparent_form h-45px" as="select">
                                <option>--</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Notice Details</FormLabel>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Attachment</FormLabel>
                            <Form.Control type="file" name="img[]" className="input-file transparent_form fontsize14 h-45px" />
                            <div className="input-group col-xs-12">
                                <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="Name" />
                                <span className="input-group-btn">
                                    <Button variant="" className="upload-field btn h-45px bodycolorbg ml-2" type="button"> Select Files</Button>
                                </span>
                            </div>
                        </div>
                        <div className="btn-group">
                            <Button type="button" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Edit_Notice;
