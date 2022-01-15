import React from 'react';
import { NavLink } from 'react-router-dom';
import { Editor, editorState } from "react-draft-wysiwyg";
import { Button, Modal, Form, FormControl, InputGroup, FormLabel } from 'react-bootstrap';

// 
import TitleUpdateLoop from "../../Project-Tab/ManageJob_Page_content/TitleUpdateLoop";
import TitleUpdateLoopArray from "../../Project-Tab/ManageJob_Page_content/TitleUpdateLoopArray";
import MemberDataLoop from "../../Project-Tab/ManageJob_Page_content/MemberDataLoop";
import MemberDataLoopArray from "../../Project-Tab/ManageJob_Page_content/MemberDataLoopArray";
import MemberDataTableLoop from "../../Project-Tab/ManageJob_Page_content/MemberDataTableLoop";
import MemberDataTableLoopArray from "../../Project-Tab/ManageJob_Page_content/MemberDataTableLoopArray";
import DataTableLoopModalTwo from "../../Project-Tab/ManageJob_Page_content/DataTableLoopModalTwo";
import DataTableLoopModalTwoArray from "../../Project-Tab/ManageJob_Page_content/DataTableLoopModalTwoArray";
import JobLoopTask from "../../Project-Tab/ManageJob_Page_content/JobLoopTask";
import JobLoopTask_Array from "../../Project-Tab/ManageJob_Page_content/JobLoopTask_Array";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import editicon from "../../../../../assets/images/edit_4_iconimg.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const Project_View = () => {
    const [NewTask, setNewTask] = React.useState(false);
    const [TaskCategory, setTaskCategory] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title px-0">Project View</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4 full_page_tabs">
                <Tabs>
                    <TabList className="react-tabs__tab-list d-flex">
                        <Tab>Overview</Tab>
                        <Tab>Members</Tab>
                        <Tab>Task</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="card_dashboard card card-body">
                            <div className="d-flex align-items-center mb-3">
                                <h4 className="main_title px-0 d-flex align-items-center">Project View
                                    {TitleUpdateLoopArray.map((val) => {
                                        return (
                                            <TitleUpdateLoop
                                                key={val.key}
                                                looptitle={val.looptitle}
                                                hashtitle={val.hashtitle}
                                            />
                                        )
                                    })}
                                    <NavLink to={`${process.env.PUBLIC_URL}/project_edit`} className=" ml-3 btn btn_blue lightbluecolorbg"><img className="img-fluid mr-1" src={editicon} alt="" /> Edit</NavLink>
                                </h4>
                            </div>
                            <p className="paragraphcolor1text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut  labore et dolore magna aliquyam erat, sed diam voluptua.  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            {/*  */}
                            <div className="mt-3">
                                <h4 className="main_title mb-3 px-0">Member</h4>
                                <ul className="d-flex list-unstyled">
                                    {MemberDataLoopArray.map((val) => {
                                        return (
                                            <MemberDataLoop
                                                key={val.key}
                                                avatarimg={val.avatarimg}
                                                title={val.title}
                                                paragraph={val.paragraph}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card_dashboard card card-body">
                            <Form>
                                <div className="row">
                                    <div className="col-xl-7">
                                        <h4 className="main_title mb-4 fontsize16 mb-3 px-0">Member</h4>
                                        <div className="table-sm-responsive">
                                            <table className="table table-borderless">
                                                <thead>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </thead>
                                                <tbody>
                                                    {MemberDataTableLoopArray.map((val) => {
                                                        return (
                                                            <MemberDataTableLoop
                                                                key={val.key}
                                                                avatarimg={val.avatarimg}
                                                                title={val.title}
                                                                paragraph={val.paragraph}
                                                                crossicon={val.crossicon}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-xl-5">
                                        <div className="mb-4">
                                            <Form.Group>
                                                <h4 className="main_title fontsize16 mb-3 px-0">Add Template Members</h4>
                                                <Form.Control type="text" className="h-40px transparent_form" name="" placeholder="Choose member" />
                                            </Form.Group>
                                            <Button variant="" type="button" className="btn btn_blue"><img className="img-fluid mr-1" src={checkicon} alt="" /> Save</Button>
                                        </div>
                                        <div className="">
                                            <Form.Group>
                                                <h4 className="main_title fontsize16 mb-3 px-0">Add Department</h4>
                                                <Form.Control type="text" className="h-40px transparent_form" name="" placeholder="Choose department" />
                                            </Form.Group>
                                            <Button variant="" type="button" className="btn btn_blue"><img className="img-fluid mr-1" src={checkicon} alt="" /> Save</Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card_dashboard card card-body">
                            <div className="d-flex align-items-center mb-4">
                                <h4 className="main_title px-0">Tasks</h4>
                                <div className="ml-auto">
                                    <NavLink onClick={() => setNewTask(true)} to="#" className="ml-auto btn mr-2 btn_blue"><img className="img-fluid mr-1" src={plusiconimg} alt="plusicon" /> New Task</NavLink>
                                    <NavLink onClick={() => setTaskCategory(true)} to="#" className="ml-auto lightbluecolorbg btn btn_blue"><img className="img-fluid mr-1" src={plusiconimg} alt="plusicon" /> Task Category</NavLink>
                                </div>
                            </div>
                            {/*  */}
                            <div className="d-flex align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                                    <select className="form-control transparent_form">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                    <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                                </div>
                                <div className="ml-auto">
                                    <form className="transparent_form">
                                        <InputGroup>
                                            <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                            <InputGroup.Prepend>
                                                <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </form>
                                </div>
                            </div>
                            {/*  */}
                            <div className="row">
                                {JobLoopTask_Array.map((val) => {
                                    return (
                                        <JobLoopTask
                                            key={val.key}
                                            top_date={val.top_date}
                                            title={val.title}
                                            title_small={val.title_small}
                                            badge_text={val.badge_text}
                                            badge_bg={val.badge_bg}

                                            pathcolor={val.pathcolor}
                                            percentage_update={val.percentage_update}
                                            text_color={val.text_color}
                                            tailbgcolor={val.tailbgcolor}

                                            avatariconimg_01={val.avatariconimg_01}
                                            avatariconimg_02={val.avatariconimg_02}
                                            avatariconimg_03={val.avatariconimg_03}
                                            bg_color={val.bg_color}
                                            weekly_text={val.weekly_text}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalNewTask
                show={NewTask}
                onHide={() => setNewTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalTaskCategory
                show={TaskCategory}
                onHide={() => setTaskCategory(false)}
            />
        </>
    )
}

export default Project_View;

// Edit task modal
function MyVerticallyCenteredModalNewTask(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <Form.Group>
                        <FormLabel className="mb-2">Heading</FormLabel>
                        <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                    </Form.Group>
                    <Form.Group>
                        <FormLabel className="mb-2">Task Category</FormLabel>
                        <select className="form-control transparent_form h-40px">
                            <option>No task category added.</option>
                        </select>
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
                    <Form.Group>
                        <FormLabel className="mb-2">Assigned To</FormLabel>
                        <select className="form-control transparent_form h-40px">
                            <option>No task category added.</option>
                        </select>
                    </Form.Group>
                    <div className="custom-radios align-items-center justify-content-between d-flex">
                        <FormLabel>High</FormLabel>
                        <div className="d-flex">
                            <input type="radio" id="color-1" name="color" value="color-1" checked />
                            <label for="color-1"><span><img className="img-fluid" src={checkicon_img} alt="" /></span></label>
                        </div>
                        <FormLabel>Medium</FormLabel>
                        <div className="d-flex">
                            <input type="radio" id="color-2" name="color" value="color-2" />
                            <label for="color-2"><span><img className="img-fluid" src={checkicon_img} alt="" /></span></label>
                        </div>
                        <FormLabel>Low</FormLabel>
                        <div className="d-flex">
                            <input type="radio" id="color-3" name="color" value="color-3" />
                            <label for="color-3"><span><img className="img-fluid" src={checkicon_img} alt="" /></span></label>
                        </div>
                        {/* <div className="d-flex">
                            <input type="radio" id="color-4" name="color" value="color-4" />
                            <label for="color-4"><span><img className="img-fluid" src={checkicon_img} alt="" /></span></label>
                        </div> */}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// Edit task modal
function MyVerticallyCenteredModalTaskCategory(props) {
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
                            {DataTableLoopModalTwoArray.map((val) => {
                                return (
                                    <DataTableLoopModalTwo
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
                    <Form.Group>
                        <FormLabel className="mb-2">Category Name</FormLabel>
                        <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}