import React, { useEffect, useState } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {  Button, Modal, FormLabel, Form, Nav } from "react-bootstrap";
import ReactTimeAgo from 'react-time-ago';
import { ToastContainer, toast } from 'react-toastify';
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
import dateFormat from 'dateformat';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import searchicon from "../../../../../assets/images/searchiconseablue.svg";
import uploadicon from "../../../../../assets/images/uploadicon.svg";
const EmployeeDetail = (props) => {
    var counter1 = -1;
    var counter2 = -1;
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
    const [tasks, settasks] = useState({
        tasks_Array: []
    });
    const [timelogs, settimelogs] = useState({
        timelogs_Array: []
    });
    const [employeeDocs, setemployeeDocs] = useState({
        employeeDocs_Array: []
    });
    const [leaves, setleaves] = useState({
        leaves_Array: []
    });
    const [leaveTypes, setleaveTypes] = useState({
        leaveTypes_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var uid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/show/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setallowedLeaves(response.data.data.allowedLeaves - response.data.data.leavesCount)

                setemployeeId(response.data.data.employeeDetail.employee_id)
                setemployeeMobile(response.data.data.employee.mobile)
                setemployeeImg(response.data.data.employee.image_url)
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
                settimelogs({ timelogs_Array: response.data.data.timeLogs ? response.data.data.timeLogs : [], });
                settasks({ tasks_Array: response.data.data.tasks ? response.data.data.tasks : [], });
                setemployeeDocs({ employeeDocs_Array: response.data.data.employeeDocs ? response.data.data.employeeDocs : [], });
                setleaves({ leaves_Array: response.data.data.leaves ? response.data.data.leaves : [], });
                setleaveTypes({ leaveTypes_Array: response.data.data.leaveTypes ? response.data.data.leaveTypes : [], });
                setLoading(false);
            });
    }, [])

    const [ProjectsArray, setProjectsArray] = useState({
        Projects_Array: []
    });
    const [dateformat, setdateformat] = useState('');
    const ManageProject = () => {
        axios.get(Globalsettings.url + 'api/member/projects/' + companyid + '/' + uid)
            .then((response) => {
                setProjectsArray({ Projects_Array: response.data.data.projects ? response.data.data.projects : [], });
                setdateformat(response.data.data.global.date_format)
            });
    }
    const [name, setname] = useState('');
    const [selectedImage1, setSelectedImage1] = useState('');
    const imageChange1 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage1(e.target.files[0]);
        }
    }
    const FormSubmit = (e) => {
        setLoading(true);
        const data = new FormData();
        data.append('name', name);
        data.append('file', selectedImage1);
        data.append('user_id', props.match.params.id);
        axios.post(Globalsettings.url + 'api/employee-docs/store/'+ companyid + '/' + uid, data).then((response) => {
            toast.success("Successfully Uploaded!");
            setLoading(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000);
    
            });
        e.preventDefault();
    }
    return (
        <>
            
            <React.Fragment>
                <Ripple customLoading={isLoading} color={'#3546ab'} />
                <ToastContainer/>
                <div className="container-fluid mb-4">
                    <h4 className="main_title">Employees Detail</h4>
                </div>
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                            <div className="card card-body">
                                <div className="text-center mb-3">
                                    <NavLink to="#" className="mx-auto w-100px avatar_picture border-radius-100 h-100px paragraphcolor1bg d-block overflow-hidden"><img className="img-fluid object_fit w-100 h-100" src={employeeImg} alt="" /></NavLink>
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
                                        <Tab onClick={() => ManageProject()}>Manage Jobs</Tab>
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
                                                                    <div class="m-l-40"><a href="#" class="text-info">{employeeName}</a> <span  class="sl-date">{val.created_at}</span>
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
                                    <div className="card card-body vh-100" style={{backgroundColor:"#f1f4f9"}}>
                                        <div className="row">
                                        {ProjectsArray.Projects_Array.length > 0 ?  
                                                ProjectsArray.Projects_Array.map((val, index) => {
                                                    var clientarray = [];
                                                    clientarray.push(val.client);
                                                    return (
                                                        <div className="col-xxl-4 col-xl-6 col-lg-12 mb-4">
                                                            <div className="card-body card card_dashboard whitecolorbg pb-2">
                                                                <div className="d-flex align-items-center dropdown for_all">
                                                                    <p className="fontsize14 m-0">{dateFormat(dateformat, val.deadline)}</p>
                                                                </div>
                                                                <div className="py-4 d-flex align-items-center">
                                                                    <div>
                                                                        <h4 className="mb-2"><NavLink to={"/view_projectdetails/"+val.id} className="fontsize22 mb-1 blackcolortext">{val.project_name}</NavLink></h4>
                                                                        <small>{val.title_small}</small>
                                                                        <span className={"d-flex justify-content-center mt-2 px-3 py-2 text-center fontsize12 fontweightmeduim border-radius-100 " + 
                                                            (() => {
                                                                if (val.status == 'in progress')
                                                                   return "badgelightbluebg badgelightbluecolor"
                                                                if (val.status == 'on hold')
                                                                    return "yelowcolortext badgeyellowbg"
                                                                if (val.status == 'not started')
                                                                    return "yelowcolortext badgeyellowbg"
                                                                if (val.status == 'canceled')
                                                                    return "redcolortext badgeredbg"
                                                                if (val.status == 'success')
                                                                    return "badgegreenbg badgegreencolor"
                                                            })()
                                                         }>{val.status}</span>
                                                                    </div>
                                                                    <div className="ml-auto w-100px">
                                                                        <CircularProgressbar
                                                                            value={val.completion_percent}
                                                                            text={`${val.completion_percent}%`}
                                                                            styles={buildStyles({
                                                                                rotation: 0.50,
                                                                                strokeLinecap: 'butt',
                                                                                textSize: '18px',
                                                                                fontWeight: 'bold',
                                                                                pathTransitionDuration: 0.5,
                                                                                pathColor: `rgba("0, 163, 137", ${val.completion_percent})`,
                                                                                textColor: "#00A389",
                                                                                trailColor:"#E1E3F3",
                                                                            })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer d-flex align-items-center py-2 px-0">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-inline-flex">
                                                                            {val.members.length > 0 ?
                                                                            val.members.map((vals,index) => {
                                                                                return (
                                                                                    <span className=" avatar" key={index}><img data-toggle="tooltip" data-original-title={vals.user.name} className="img-fluid" width="35" src={vals.user.image_url} alt="" /></span>
                                                                                )
                                                                            })
                                                                            :
                                                                            <span>No Member Added Yet!</span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                                        
                                                    )
                                                })
                                                :
                                                <div className="text-center">
                                                        No Project Found
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card-body vh-100">
                                        {/*  */}
                                        <div className="table-responsive clent_data_table">
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
                                                    {tasks.tasks_Array.length > 0 ?
                                                        tasks.tasks_Array.map((val,index) => {
                                                            return (
                                                                <TaskTabTable
                                                                    key={index}
                                                                    countnumber={index+1}
                                                                    name={val.project_name}
                                                                    task={val.heading}
                                                                    email={val.due_on}
                                                                    badgetext={val.column_name}
                                                                    badgebgcolor={val.badgebgcolor}
                                                                />
                                                            )
                                                        })
                                                    :
                                                        <tr>
                                                            <td colSpan="5">No Record Found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card-body vh-100">
                                        <div className="d-flex align-items-center">
                                            <h4 className="fontsize16 blackcolortext">Leaves Taken</h4>
                                            {/* <NavLink onClick={() => setModalShowManaage(true)} to="#" className="ml-2 fontsize12 lasercolorbg border-radius-100 px-3 py-1 text-white">Manaage</NavLink> */}
                                        </div>
                                        <div className="row my-5">
                                        {leaves.leaves_Array.length > 0 &&
                                            leaveTypes.leaveTypes_Array.map((val,index) => {
                                                var test = val.leaves_count
                                                var ttt = test.length > 0 ? test.map((vall)=> vall.count) : '0';
                                                return (
                                                    <LeavesTabLoop
                                                        key={index}
                                                        text={val.type_name}
                                                        badgetext={ttt +'/'+val.no_of_leaves}
                                                        badgebgcolor={val.badgebgcolor}
                                                    />
                                                )
                                            })}
                                        </div>
                                        <div className="table-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Leave Type</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Reson For Absence</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {leaves.leaves_Array.length > 0 ?
                                                            leaves.leaves_Array.map((val,index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{val.type_name}</td>
                                                                        <td>{val.leave_date}</td>
                                                                        <td>{val.reason}</td>
                                                                    </tr>
                                                            
                                                                )
                                                            })
                                                        :
                                                            <tr>
                                                                <td colSpan="4">No Record Found</td>
                                                            </tr>
                                                        }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card-body vh-100">
                                        {/*  */}
                                        <div className="table-responsive data_table_profile">
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
                                                    {timelogs.timelogs_Array.length > 0 ?
                                                        timelogs.timelogs_Array.map((val,index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index+1}</td>
                                                                    <td>{val.project_name}</td>
                                                                    <td>{val.start_time}</td>
                                                                    <td>{val.end_time ? val.end_time : "Active"}</td>
                                                                    <td>{val.hours}</td>
                                                                    <td>{val.memo}</td>
                                                                </tr>
                                                           
                                                            )
                                                        })
                                                    :
                                                        <tr>
                                                            <td colSpan="6">No Record Found</td>
                                                        </tr>
                                                    }
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
                                        <div className="table-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employeeDocs.employeeDocs_Array.length > 0 ?
                                                        employeeDocs.employeeDocs_Array.map((val,index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index+1}</td>
                                                                    <td>{val.name}</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <Nav.Link href={val.file_url} target="_blank" className="text_decoration_none border-radius-10 d-flex align-items-center justify-content-center mr-2 btn badgelightbluebg"><img width="15" className="img-flud" src={searchicon} alt="" /></Nav.Link>
                                                                        <Nav.Link href={Globalsettings.url+"api/employee-docs/download/"+val.id+'/'+companyid+'/'+uid} target="_blank" className="text_decoration_none border-radius-10  btn mr-2 paragraphcolor3bg"><img width="15" className="img-flud" src={uploadicon} alt="" /></Nav.Link>
                                                                    </td>
                                                                </tr>
                                                           
                                                            )
                                                        })
                                                    :
                                                        <tr>
                                                            <td colSpan="6">No Record Found</td>
                                                        </tr>
                                                    }
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
                <Modal show={modalShowAdd} onHide={() => setModalShowAdd(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton className="d-flex align-items-center p-0">
                        <Modal.Title id="contained-modal-title-vcenter">Employee Documents</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={FormSubmit}>
                    <Modal.Body className="p-0 my-4">
                            <div className="form-group">
                                <FormLabel className="mb-2">Name*</FormLabel>
                                <Form.Control type="text" className="transparent_form fontsize14 h-45px mb-2" value={name} onChange={(e) => setname(e.target.value)} placeholder="" />
                            </div>
                            <div className="form-group">
                                <Form.Control type="file" name="img" onChange={imageChange1} className="input-file transparent_form fontsize14 h-35px" />
                            </div>
                            
                            <Form.Control type="text" className="transparent_form mt-3 fontsize14 h-45px mb-2" readOnly placeholder=" Allowed file formats: jpg, png, gif, doc, docx, xls, xlsx, pdf, txt." />
                        
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAdd(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                    </Form>
                </Modal >
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