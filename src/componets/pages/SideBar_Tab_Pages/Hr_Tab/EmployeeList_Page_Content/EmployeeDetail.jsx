import React, { useEffect, useState } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { InputGroup, Button, Modal, FormLabel, Form, FormControl } from "react-bootstrap";
import ReactTimeAgo from 'react-time-ago';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Ripple } from 'react-preloaders2';
// 
import TaskTabTable from "../../Hr_Tab/EmployeeList_Page_Content/TaskTabTable";
import TaskTabTableArray from "../../Hr_Tab/EmployeeList_Page_Content/TaskTabTableArray";
import JobLoop from "../../Hr_Tab/EmployeeList_Page_Content/JobLoop";
import JobLoop_Array from "../../Hr_Tab/EmployeeList_Page_Content//JobLoop_Array";
import LeavesTabLoop from "../../Hr_Tab/EmployeeList_Page_Content/LeavesTabLoop";
import LeavesTabLoop_Array from "../../Hr_Tab/EmployeeList_Page_Content//LeavesTabLoop_Array";
import LeaveTypeModalLoop from "../../Hr_Tab/EmployeeList_Page_Content/LeaveTypeModalLoop";
import LeaveTypeModalLoop_Array from "../../Hr_Tab/EmployeeList_Page_Content/LeaveTypeModalLoop_Array";


// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const EmployeeDetail = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [modalShowManaage, setModalShowManaage] = React.useState(false);
    const [modalShowAdd, setModalShowAdd] = React.useState(false);

    const [employeeId, setemployeeId] = useState('');
    const [employeeImg, setemployeeImg] = useState('');
    const [employeeName, setemployeeName] = useState('');
    const [employeeEmail, setemployeeEmail] = useState('');
    const [employeeMobile, setemployeeMobile] = useState('');
    const [employeeAddress, setemployeeAddress] = useState('');
    const [employeeDesignatin, setemployeeDesignatin] = useState('');
    const [employeeDept, setemployeeDept] = useState('');
    const [empslack_username, setempslack_username] = useState('');
    const [empjoining_date, setjoining_date] = useState('');
    const [empgender, setempgender] = useState('');
    const [empskills, setempskills] = useState('');
    const [emphourly_rate, setemphourly_rate] = useState('');
    //
    const [allowedLeaves, setallowedLeaves] = useState(0);
    const [taskCompleted, settaskCompleted] = useState(0);
    const [hoursLogged, sethoursLogged] = useState(0);
    const [leavesCount, setleavesCount] = useState(0);
    const [activities, setactivities] = useState({
        activities_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/show/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setallowedLeaves((response.data.allowedLeaves))

                setemployeeId((response.data.data.employeeDetail.employee_id))
                setemployeeMobile((response.data.data.employee.mobile))
                setemployeeImg((response.data.data.employee.image_url))
                setemployeeName(response.data.data.employee.name)
                setemployeeEmail(response.data.data.employee.email)
                setemployeeAddress(response.data.data.employeeDetail.address)
                if(response.data.data.employee.employee_detail.designation == null){
                    setemployeeDesignatin('--')
                }else{
                    setemployeeDesignatin(response.data.data.employee.employee_detail.designation.name)
                }
                if(response.data.data.employee.employee_detail.department == null){
                    setemployeeDept('--')
                }else{
                    setemployeeDept(response.data.data.employee.employee_detail.department.team_name)
                }
                
                setempslack_username(response.data.data.employeeDetail.slack_username)
                setjoining_date(response.data.data.employeeDetail.joining_date)
                setempgender(response.data.data.employee.gender)
                setempskills(response.data.data.employee.skills)
                setemphourly_rate(response.data.data.employee.employee_detail.hourly_rate)
                settaskCompleted(response.data.data.taskCompleted)
                sethoursLogged(response.data.data.hoursLogged)
                setleavesCount(response.data.data.leavesCount)
                setactivities({ activities_Array: response.data.data.activities ? response.data.data.activities : [], });
                setLoading(false);
            });
    }, [])
    return (
        <>
            <React.Fragment>
                <Ripple customLoading={isLoading} color={'#3546ab'} />
                <div className="container-fluid mb-4">
                    <h4 className="main_title">Employees Detail</h4>
                </div>
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                            <div className="card card-body">
                                <div className="text-center mb-3">
                                    <NavLink to="#" className="mx-auto w-100px avatar_picture border-radius-100 h-100px paragraphcolor1bg d-block"><img className="img-fluid object_fit w-100" src={employeeImg} alt="" /></NavLink>
                                    <h5 className="fontsize22 mb-2 mt-3 blackcolortext">{employeeName}</h5>
                                    <p className="paragraphcolor1text fontsize16">{employeeEmail}</p>
                                </div>
                                <div className="paragraphcolor2bg mb-3 border-radius-10 p-3">
                                    <h4 className="mb-2 fontsize22 blackcolortext">Accomplished tasks</h4>
                                    <p className="m-0 blusecolortext"><img className="img-fluid mr-2" src={Globalsettings.url + "/images/frameicon1.svg"} alt="" /> {taskCompleted}</p>
                                </div>
                                <div className="paragraphcolor2bg mb-3 border-radius-10 p-3">
                                    <h4 className="mb-2 fontsize22 blackcolortext">Hours Recorded</h4>
                                    <p className="m-0 blusecolortext"><img className="img-fluid mr-2" src={Globalsettings.url + "/images/frameicon2.svg"} alt="" /> {hoursLogged}</p>
                                </div>
                                <div className="paragraphcolor2bg mb-3 border-radius-10 p-3">
                                    <h4 className="mb-2 fontsize22 blackcolortext">Leaves Taken</h4>
                                    <p className="m-0 blusecolortext"><img className="img-fluid mr-2" src={Globalsettings.url + "/images/frameicon3.svg"} alt="" /> {leavesCount}</p>
                                </div>
                                <div className="paragraphcolor2bg mb-3 border-radius-10 p-3">
                                    <h4 className="mb-2 fontsize22 blackcolortext">Remaining Leaves</h4>
                                    <p className="m-0 blusecolortext"><img className="img-fluid mr-2" src={Globalsettings.url + "/images/frameicon4.svg"} alt="" /> {allowedLeaves}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-12 mb-4 mb-lg-0">
                            <div className="full_page_tabs">
                                <Tabs>
                                    <TabList className="react-tabs__tab-list d-flex justify-content-between">
                                        <Tab>Activity</Tab>
                                        <Tab>Profile</Tab>
                                        <Tab>Manage Jobs</Tab>
                                        <Tab>Tasks</Tab>
                                        <Tab>Leaves</Tab>
                                        <Tab>Time Log</Tab>
                                        <Tab>Documents</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
                                            <div className="row">
                                            <div class="steamline p-3">
                                                {activities.activities_Array.length > 0 ?
                                                    activities.activities_Array.map((val) => {
                                                        return(
                                                            <div class="sl-item">
                                                                <div class="sl-left">
                                                                    <img src={employeeImg} alt="user" class="img-circle avatar"/>
                                                                </div>
                                                                <div class="sl-right">
                                                                    <div class="m-l-40"><a href="#" class="text-info">{employeeName}</a> <span  class="sl-date"><ReactTimeAgo date={val.created_at} locale="en-US"/></span>
                                                                        <p>{val.activity}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                :
                                                    <p>No Activity Yet!</p>
                                                }
                                            </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
                                            <div className="row">
                                                <div className="col-lg-4 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Employee ID</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeId}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Full Name</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeName}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Mobile</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeMobile ?? '-'}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Email</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeEmail}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Address</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeAddress}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Designation</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeDesignatin}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Department</h4>
                                                        <p className="m-0 paragraphcolor1text">{employeeDept}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Slack Username</h4>
                                                        <p className="m-0 paragraphcolor1text">{empslack_username ?? '-'}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Joining Date</h4>
                                                        <p className="m-0 paragraphcolor1text">{empjoining_date}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Gender</h4>
                                                        <p className="m-0 paragraphcolor1text">{empgender}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Skills</h4>
                                                        <p className="m-0 paragraphcolor1text">{empskills ?? '--'}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="paragraphcolor2bg border-radius-10 p-3">
                                                        <h4 className="mb-2 fontsize16 blackcolortext">Hourly Rate</h4>
                                                        <p className="m-0 paragraphcolor1text">{emphourly_rate ?? '--'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
                                            <div className="row">
                                                {JobLoop_Array.map((val) => {
                                                    return (
                                                        <JobLoop
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
                                                            bg_color={val.bg_color}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
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
                                                                <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                                        </InputGroup>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*  */}
                                            <div className="table-sm-responsive clent_data_table">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Project</th>
                                                            <th scope="col">Task</th>
                                                            <th scope="col">Due Date</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {TaskTabTableArray.map((val) => {
                                                            return (
                                                                <TaskTabTable
                                                                    key={val.key}
                                                                    countnumber={val.countnumber}
                                                                    name={val.name}
                                                                    task={val.task}
                                                                    email={val.email}
                                                                    badgetext={val.badgetext}
                                                                    badgebgcolor={val.badgebgcolor}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
                                            <div className="d-flex align-items-center">
                                                <h4 className="fontsize16 blackcolortext">Leaves Taken</h4>
                                                <NavLink onClick={() => setModalShowManaage(true)} to="#" className="ml-2 fontsize12 lasercolorbg border-radius-100 px-3 py-1 text-white">Manaage</NavLink>
                                            </div>
                                            <div className="row my-5">
                                                {LeavesTabLoop_Array.map((val) => {
                                                    return (
                                                        <LeavesTabLoop
                                                            key={val.key}
                                                            text={val.text}
                                                            badgetext={val.badgetext}
                                                            badgebgcolor={val.badgebgcolor}
                                                        />
                                                    )
                                                })}
                                            </div>
                                            <div className="table-sm-responsive data_table_profile">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Leave Type</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Reson For Absence</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="3">No payment found</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
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
                                                                <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                                        </InputGroup>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*  */}
                                            <div className="table-sm-responsive data_table_profile">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Project</th>
                                                            <th scope="col">Start Time </th>
                                                            <th scope="col">End Time</th>
                                                            <th scope="col">Total Hours</th>
                                                            <th scope="col">Memo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="6">No payment found</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="card card-body vh-100">
                                            <div className="d-flex align-items-center mb-4">
                                                <NavLink onClick={() => setModalShowAdd(true)} to="#" className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add</NavLink>
                                            </div>
                                            <div className="table-sm-responsive data_table_profile">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="3">No payment found</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <MyVerticallyCenteredModalManaage
                    show={modalShowManaage}
                    onHide={() => setModalShowManaage(false)}
                />

                <MyVerticallyCenteredModalAdd
                    show={modalShowAdd}
                    onHide={() => setModalShowAdd(false)}
                />
            </React.Fragment>
        </>
    )
}

export default EmployeeDetail;

// AddNote modal
function MyVerticallyCenteredModalManaage(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Leave Type</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="table-sm-responsive data_table_profile">
                        <table className="table m-0 table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Leave Type</th>
                                    <th scope="col">No Of Leaves</th>
                                    <th scope="col">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {LeaveTypeModalLoop_Array.map((val) => {
                                    return (
                                        <LeaveTypeModalLoop
                                            key={val.key}
                                            badgetext={val.badgetext}
                                            badgebgcolor={val.badgebgcolor}
                                            checkicon={val.checkicon}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// Add modal
function MyVerticallyCenteredModalAdd(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Employee Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Name*</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <Form.Control type="file" name="img[]" className="input-file transparent_form fontsize14 h-45px" />
                        <div className="input-group col-xs-12">
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="Name" />
                            <span className="input-group-btn">
                                <Button variant="" className="upload-field btn h-45px bodycolorbg ml-2" type="button"> Select Files</Button>
                            </span>
                        </div>
                    </div>
                    <Button variant="" className="btn_blue"><img className="img-fluid" src={plusicon} alt="" /> Add More</Button>
                    <Form.Control type="text" className="transparent_form mt-3 fontsize14 h-45px" readOnly placeholder=" Allowed file formats: jpg, png, gif, doc, docx, xls, xlsx, pdf, txt." />
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}