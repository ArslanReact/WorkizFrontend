import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import OnGoingHistoryLoop from "../../Project-Tab/TaskBoard_Page_content/OnGoingHistoryLoop";
import OnGoingHistoryLoopArray from "../../Project-Tab/TaskBoard_Page_content/OnGoingHistoryLoopArray";


// 
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import edit_3_iconimg from "../../../../../assets/images/edit_3_iconimg.svg";
import uploadfileiconimg from "../../../../../assets/images/uploadfileiconimg.svg";

import vertical_bars from "../../../../../assets/images/vertical_bars.svg";
import deleteicon from "../../../../../assets/images/cross.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import icon_18 from "../../../../../assets/images/icon_18.svg";
import icon_19 from "../../../../../assets/images/icon_19.svg";
import icon_20 from "../../../../../assets/images/icon_20.svg";


const TaskContent = (props) => {
    const [dragfilterTask, setdragfilterTask] = React.useState(false);
    return (
        <>
            <div className="col-xl-3 col-lg-12 mb-4">
                <div className="card_dashboard card card-body paragraphcolor2bg px-0 position-relative mb-4">
                    <div className="d-flex align-items-center px-4 dropdown for_all">
                        <NavLink to="#" className="ml-auto position-absolute px-3 top-0 right-0" data-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                        <div className="dropdown-menu m-0 dropdown-menu-right">
                            <NavLink to={`${process.env.PUBLIC_URL}/task_edit_page`} className="dropdown-item fontsize14"><img className="img-fluid mr-2" src={editiconimg} alt="" /> Edit</NavLink>
                            <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={deleteicon} alt="" /> Delete</NavLink>
                        </div>
                    </div>
                    <h6 className="main_title px-4 mb-3">{props.main_title}</h6>
                    <p className="m-0 px-4 paragraphcolor1text fontsize14">{props.detail}</p>
                    <div className="d-flex px-4 mt-4 align-items-center">
                        <span className="badgegreenbg badgegreencolor badge border-radius-100 py-1 px-3 cursurpointer" onClick={() => setdragfilterTask(true)}>{props.badge_text}</span>
                        <div className="ml-auto d-flex align-items-center">
                            <span><img className="m-minus-left-15" width="35" src={props.avatariconimg_01} alt="" /></span>
                            <span><img className="m-minus-left-15" width="35" src={props.avatariconimg_02} alt="" /></span>
                            <NavLink to="#" className="ml-2 lasercolorbg border-radius-100 p-1 text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink>
                        </div>
                    </div>
                    <div className="card-footer p-0 px-4 mt-4 pt-3 d-flex justify-content-between">
                        <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_18} alt="icon_18" /> {props.comment_number}</NavLink>
                        <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_19} alt="icon_18" /> {props.attachfile_number}</NavLink>
                        <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_20} alt="icon_18" /> {props.time_number}</NavLink>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModaldragfilter
                show={dragfilterTask}
                onHide={() => setdragfilterTask(false)}
            />
        </>
    )
}

export default TaskContent;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}

// drag filter modal
function MyVerticallyCenteredModaldragfilter(props) {
    const [dragTask, setdragTask] = React.useState(false);
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="dragfilter" centered>
                <Modal.Header closeButton className="d-flex px-3 align-items-center">
                    <Modal.Title id="contained-modal-title-vcenter">Home Work</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="d-flex vh-100">
                        <div className="card_dashboard card card-body px-3 h-100">
                            <h4 className="fontsize20 mb-3 blackcolortext">Revisit Homepage Wickrpark.io</h4>
                            <p className="fontsize14 paragraphcolor1text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            <span className="badge badgeredbg p-2 px-3 border-radius-100">Priority <samp className="lightredcolortext">High</samp></span>
                            <Tabs className="mt-4 filter-tabs">
                                <TabList>
                                    <Tab>Homework</Tab>
                                    <Tab>Sub Task (0)</Tab>
                                    <Tab>File ( 0 )</Tab>
                                    <Tab>Time records</Tab>
                                    <Tab>Comment (0)</Tab>
                                    <Tab>Notes (0)</Tab>
                                    <Tab>History</Tab>
                                </TabList>
                                <TabPanel className="mt-4">
                                    <h5 className="mb-3 blackcolortext">The description</h5>
                                    <p className="fontsize14 paragraphcolor1text">Notification</p>
                                </TabPanel>
                                {/* onClick={() => setdragTask(true)} */}
                                <TabPanel className="mt-4">
                                    <NavLink to="#" onClick={() => setdragTask(true)} className="blusecolorbg mb-4 fontsize14 text-white border-radius-100 btn"><img className="img-fluid mr-1" src={plusiconimg} alt="" /> Add Sub Task</NavLink>
                                    <p className="fontsize14 paragraphcolor1text"><img className="img-fluid mr-1" src={edit_3_iconimg} alt="" /> Sub Task</p>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <NavLink to="#" className="blusecolorbg mb-4 fontsize14 text-white border-radius-100 btn"><img className="img-fluid mr-1" src={uploadfileiconimg} alt="" /> Upload File</NavLink>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <div className="table-sm-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Employee</th>
                                                    <th>Hours Logged</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="2">No record found.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <h5 className="mb-3 blackcolortext">Comment</h5>
                                    <p className="fontsize14 paragraphcolor1text">No record found.</p>
                                    <p className="fontsize14 paragraphcolor1text">editor</p>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <h5 className="mb-3 blackcolortext">Notes</h5>
                                    <p className="fontsize14 paragraphcolor1text">No record found.</p>
                                    <p className="fontsize14 paragraphcolor1text">editor</p>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <h5 className="mb-3 blackcolortext">History</h5>
                                    <ul className="list-unstyled history-loop">
                                        {OnGoingHistoryLoopArray.map((val) => {
                                            return (
                                                <OnGoingHistoryLoop
                                                    key={val.key}
                                                    title={val.title}
                                                    time={val.time}
                                                    avatar={val.avatar}
                                                    colorupdate={val.colorupdate}
                                                    completeincomplete={val.completeincomplete}
                                                />
                                            )
                                        })}
                                    </ul>
                                </TabPanel>
                            </Tabs>
                        </div>
                        <div className="bodycolorbg h-100 p-2 w-50">
                            <div className="table-sm-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>The state</td>
                                            <td><span className="m-0 p-1 mr-2 redcolorbg d-inline-block border-radius-100"></span> Incomplete</td>
                                        </tr>
                                        <tr>
                                            <td>Assign to</td>
                                            <td>zxc</td>
                                        </tr>
                                        <tr>
                                            <td>Due date</td>
                                            <td className="redcolortext"> 03-25-2021</td>
                                        </tr>
                                        <tr>
                                            <td>Hours logged</td>
                                            <td className=""> 22 hrs</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0">Reset</Button>
                    <Button variant="" className="w-100px btn_blue">Apply</Button>
                </Modal.Footer>
            </Modal>
            {/*  */}
            <MyVerticallyCenteredModalSubTask
                show={dragTask}
                onHide={() => setdragTask(false)}
            />
        </>
    );
}
// Sub Task modal
function MyVerticallyCenteredModalSubTask(props) {
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Sub Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <Form>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Name</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="Completed" />
                            </div>
                            <div className="col-lg-12 mb-3">
                                <FormLabel className="mb-2">Due Date</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="Completed" />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                    <Button variant="" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}