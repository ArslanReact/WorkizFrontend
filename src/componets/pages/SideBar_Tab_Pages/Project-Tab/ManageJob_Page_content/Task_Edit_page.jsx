import React from 'react';
import { Form, Button, FormLabel } from "react-bootstrap";
import { Editor, editorState } from "react-draft-wysiwyg";
import { NavLink } from 'react-router-dom';

// 
import tooltipicon from "../../../../../assets/images/tootipicon.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";

const Task_Edit_page = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title d-flex px-0">Update Task</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form>
                    <div className="card_dashboard card card-body">
                        <Form.Group>
                            <FormLabel className="mb-2">Title</FormLabel>
                            <Form.Control type="text" className="transparent_form h-40px" placeholder="" />
                        </Form.Group>
                        <Form.Group>
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </Form.Group>
                        <div className="row mt-3 align-items-center">
                            <div className="col-xl-3 mb-4 mb-xl-0">
                                <div className="d-flex align-items-center">
                                    <Form.Group className="d-flex align-items-center mr-4 mb-0">
                                        <Form.Check type="checkbox" />
                                        <FormLabel className="">Make Private
                                            <span className="mytooltip ml-2">
                                                <img className="img-fluid" src={tooltipicon} alt="" />
                                                <p className="tooltip-content5 blusecolortext fontsize12">Private tasks are only visible to admin, assignor and assignee.</p>
                                            </span>
                                        </FormLabel>
                                    </Form.Group>
                                    <Form.Group className="d-flex align-items-center mb-0">
                                        <Form.Check type="checkbox" />
                                        <FormLabel className="">Billable
                                            <span className="mytooltip ml-2">
                                                <img className="img-fluid" src={tooltipicon} alt="" />
                                                <p className="tooltip-content5 blusecolortext fontsize12">Invoice can be generated for this task's time log.</p>
                                            </span>
                                        </FormLabel>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-xl-3 mb-4 mb-xl-0">
                                <Form.Group className="d-lg-flex align-items-center mb-0">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Set time estimate</FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-3 mb-4 mb-xl-0">
                                <Form.Group className="d-flex align-items-center mb-0">
                                    <div className="mr-2">
                                        <FormLabel className="mb-2">HRS</FormLabel>
                                        <Form.Control type="number" className="transparent_form h-40px" placeholder="2" />
                                    </div>
                                    <div>
                                        <FormLabel className="mb-2">Min</FormLabel>
                                        <Form.Control type="number" className="transparent_form h-40px" placeholder="5" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-xl-3 mb-4 mb-xl-0">
                                <Form.Group className="d-flex align-items-center mb-0">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Task is dependent on another task</FormLabel>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Start Date</FormLabel>
                                    <Form.Control type="date" className="transparent_form h-40px" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Due Date</FormLabel>
                                    <Form.Control type="date" className="transparent_form h-40px" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Milestones</FormLabel>
                                    <select className="form-control transparent_form">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Assigned To</FormLabel>
                                    <select className="form-control transparent_form">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </Form.Group>
                            </div>
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Task Category <NavLink className="px-3 py-1 greencolortext fontsize14 badgegreenbg border-radius-100" to="#">Task Category</NavLink></FormLabel>
                                    <select className="form-control transparent_form">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </Form.Group>
                            </div>
                            <div className="col-xl-4 mb-4 mb-xl-0">
                                <Form.Group>
                                    <FormLabel className="mb-2">Status</FormLabel>
                                    <select className="form-control transparent_form">
                                        <option>Complete</option>
                                        <option>Incomplete</option>
                                    </select>
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 mb-4 mb-xl-0">
                                <Form.Group>
                                    <div className="d-flex">
                                        <Form.Check type="radio" name="radiotable" />
                                        <FormLabel className="mb-2">High</FormLabel>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="d-flex">
                                        <Form.Check type="radio" name="radiotable" />
                                        <FormLabel className="mb-2">Medium</FormLabel>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="d-flex">
                                        <Form.Check type="radio" name="radiotable" />
                                        <FormLabel className="mb-2">Low</FormLabel>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 mb-4 mb-xl-0">
                                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Task_Edit_page;
