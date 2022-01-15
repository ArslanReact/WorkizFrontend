import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, Form, FormLabel } from "react-bootstrap";

// 
import EmployeeLogTable from "../../Project-Tab/TimeLogs_Page_content/EmployeeLogTable";
import EmployeeLogTable_Array from "../../Project-Tab/TimeLogs_Page_content/EmployeeLogTable_Array";
import EmployeeModalTableLoop from "../../Project-Tab/TimeLogs_Page_content/EmployeeModalTableLoop";
import EmployeeModalTableLoop_Array from "../../Project-Tab/TimeLogs_Page_content/EmployeeModalTableLoop_Array";


// 
import activityicon from "../../../../../assets/images/activityicon.svg";
import watchicon from "../../../../../assets/images/watchicon.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";



const Employe_Time_Log = () => {
    const [ActiveTask, setActiveTask] = React.useState(false);
    const [EditTask, setEditTask] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Employe Time Log</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink onClick={() => setActiveTask(true)} to="#" className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Active Timers <span className="w-20px ml-2 d-inline-block h-20px text-white border-radius-100 lightbluecolorbg">0</span></NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/time-logs`} exact className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={activityicon} alt="" /> Time Log Activity</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/log_time`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Log Time</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <ul className="">
                    {EmployeeLogTable_Array.map((val) => {
                        return (
                            <EmployeeLogTable
                                key={val.key}
                                avatarimg={val.avatarimg}
                                title={val.title}
                                smalltitle={val.smalltitle}
                                hourscount={val.hourscount}
                                dolortext={val.dolortext}

                                task_name={val.task_name}
                                time_name={val.time_name}
                                hours_name={val.hours_name}
                                eearnings_name={val.eearnings_name}
                                editimg={val.editimg}
                                deleteimg={val.deleteimg}
                            />
                        )
                    })}
                </ul>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalActive
                show={ActiveTask}
                onHide={() => setActiveTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={EditTask}
                onHide={() => setEditTask(false)}
            />
        </>
    )
}

export default Employe_Time_Log;

// Active task modal
function MyVerticallyCenteredModalActive(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0 mb-4">
                <Modal.Title id="contained-modal-title-vcenter">Active Timers</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mb-4">
                <div className="table-resonsive clent_data_table">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Who's Working</th>
                                <th scope="col">Task</th>
                                <th scope="col">Memo</th>
                                <th scope="col">Active Since</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {EmployeeModalTableLoop_Array.map((val) => {
                                return (
                                    <EmployeeModalTableLoop
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        employename={val.employename}
                                        taskname={val.taskname}
                                        smallname={val.smallname}
                                        memoname={val.memoname}
                                        badgetext={val.badgetext}
                                        badgebgcolor={val.badgebgcolor}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal >
    );
}


// Edit task modal
function MyVerticallyCenteredModalEdit(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Log Time</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Select Project*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>select</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Select Task*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>select</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Employee Name*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>select</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Start Date</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="09-04-2021" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-2">End Date</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="09-04-2021" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Start Time</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="10:00 AM" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">End Time</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="10:00 AM" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Total Hours</FormLabel>
                            <p className="p-0 fontsize14 paragraphcolor1text">0Hrs 0Mins</p>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <FormLabel className="mb-2">Memo*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="" />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}