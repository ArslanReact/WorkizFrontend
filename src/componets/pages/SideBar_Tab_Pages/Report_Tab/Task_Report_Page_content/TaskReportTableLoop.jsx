import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Form, FormLabel, Button } from 'react-bootstrap';

// 
import HistoryLoop from "../Task_Report_Page_content/HistoryLoop";
import HistoryLoop_Array from "../Task_Report_Page_content/HistoryLoop_Array";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import edit_3_iconimg from "../../../../../assets/images/edit_3_iconimg.svg";
import uploadfileiconimg from "../../../../../assets/images/uploadfileiconimg.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";

const TaskReportTableLoop = (props) => {
    const [dragfilterTask, setdragfilterTask] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.projectid} className="blusecolortext">{props.projectname}</NavLink>{props.peojectname}</td>
                <td>{props.invoicename}</td>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/employee_detail`} className="d-flex align-items-center">
                        <img className="img-fluid mr-3" src={props.avatarimg} alt="" />
                        <h6 className="fontsize14">{props.title}</h6>
                    </NavLink>
                </td>
                <td className="redcolortext">{props.date}</td>
                <td><span className={"border-radius-100 px-3 py-1 " + props.badgebgcolor}>{props.badgetext}</span></td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModaldragfilter
                show={dragfilterTask}
                onHide={() => setdragfilterTask(false)}
            />
        </>
    )
}

export default TaskReportTableLoop;

// drag filter modal
function MyVerticallyCenteredModaldragfilter(props) {
    const [dragTask, setdragTask] = React.useState(false);
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="dragfilter" centered>
                <Modal.Header closeButton className="d-flex px-3 align-items-center">
                    <Modal.Title id="contained-modal-title-vcenter">Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="d-flex vh-100">
                        <div className="card-body px-3 h-100">
                            <h4 className="fontsize20 mb-3 blackcolortext">Revisit Homepage Wickrpark.io</h4>
                            <p className="fontsize14 paragraphcolor1text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            <span className="badge badgeredbg p-2 px-3 border-radius-100">Priority <samp className="lightredcolortext">High</samp></span>
                            <Tabs className="mt-4 filter-tabs">
                                <TabList>
                                    <Tab>Task</Tab>
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
                                        <table class="table">
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
                                        {HistoryLoop_Array.map((val) => {
                                            return (
                                                <HistoryLoop
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
                    <Button variant="" className="graycolorbg px-4 fontsize14 border_bodycolor_0">Reset</Button>
                    <Button variant="" className="px-4 btn_blue">Apply</Button>
                </Modal.Footer>
            </Modal>
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
                    <Button variant="" className="graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                    <Button variant="" className="btn_blue">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}