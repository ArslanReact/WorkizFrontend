import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Form, Button, FormLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
// import component
import MemberData from "../employeetimelog/MemberData";

// import image
import avatar_02img from "../../../assets/images/avatar_02.svg";
import avatar_01img from "../../../assets/images/avatar_01.svg";
import avatar_03img from "../../../assets/images/avatar_03.svg";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery";
const Employee_LogsTime = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [projectid, setprojectid] = useState('');
    const [taskid, settaskid] = useState('');
    const [empid, setempid] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [starttime, setstarttime] = useState('');
    const [endtime, setendtime] = useState('');
    const [memo, setmemo] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [ProjectsData, setProjectsData] = useState({
        ProjectsData_Array: []
    });
    const [TaskData, setTaskData] = useState({
        TaskData_Array: []
    });
    const [EmpData, setEmpData] = useState({
        EmpData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/all-time-logs/' + companyid+'/'+userid)
            .then((response) => {
                setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setTaskData({ TaskData_Array: response.data.data.tasks ? response.data.data.tasks : [], });
                setEmpData({ EmpData_Array: response.data.data.employees ? response.data.data.employees : [], });
                setLoading(false);

            });
    }, []);

    // Submit
    const SubmitTimeLog = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('project_id', projectid);
        data.append('task_id', taskid);
        data.append('user_id', empid);
        data.append('start_date', startdate);
        data.append('end_date', enddate);
        data.append('start_time', starttime);
        data.append('end_time', endtime);
        data.append('memo', memo);
        axios.post(Globalsettings.url + 'api/member/all-time-logs/store/' + companyid+'/'+userid, data).then((response) => {
            toast.success("Time Log Added Successfully!");
            setLoading(false);
            
            history.push(`${process.env.PUBLIC_URL}/employee_timelog`);
        });
        evt.preventDefault();
    }     



    $(".calc").change(function(){
        var startDate = $('#start_date').val();
        var endDate = $('#end_date').val();
        var startTime = $("#start_time").val();
        var endTime = $("#end_time").val();

        var timeStart = new Date(startDate + " " + startTime);
        var timeEnd = new Date(endDate + " " + endTime);

        var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds
        var minutes = diff % 60;
        var hours = (diff - minutes) / 60;

        if (hours < 0 || minutes < 0) {
            var numberOfDaysToAdd = 1;
            timeEnd.setDate(timeEnd.getDate() + numberOfDaysToAdd);
            var dd = timeEnd.getDate();

            if (dd < 10) {
                dd = "0" + dd;
            }

            var mm = timeEnd.getMonth() + 1;

            if (mm < 10) {
                mm = "0" + mm;
            }

            var y = timeEnd.getFullYear();

//            $('#end_date').val(mm + '/' + dd + '/' + y);
        } else {
            $('#total_time').html(hours + "Hrs " + minutes + "Mins");
        }
    });




    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Log Time</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form onSubmit={SubmitTimeLog}>
                    <div className="card card_dashboard card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Select Project*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={projectid} onChange={e => setprojectid(e.target.value)}>
                                    <option value="">Select Project</option>
                                    {ProjectsData.ProjectsData_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.project_name}</option>
                                        )
                                    })}
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Select Task*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={taskid} onChange={e => settaskid(e.target.value)}>
                                        <option value="">Select Task</option>
                                        {TaskData.TaskData_Array.map((val, index) => {
                                            return (
                                                <option value={val.id} key={index}>{val.heading}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Employee Name*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={empid} onChange={e => setempid(e.target.value)}>
                                        <option value="">Select Employee</option>
                                        {EmpData.EmpData_Array.map((val, index) => {
                                            return (
                                                <option value={val.id} key={index}>{val.name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Start Date</FormLabel>
                                    <Form.Control className="transparent_form h-45px calc" id="start_date" type="date" required value={startdate} onChange={e => setstartdate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">End Date</FormLabel>
                                    <Form.Control className="transparent_form h-45px calc" id="end_date" type="date" required value={enddate} onChange={e => setenddate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Start Time</FormLabel>
                                    <Form.Control className="transparent_form h-45px calc" id="start_time" type="time" required value={starttime} onChange={e => setstarttime(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">End Time</FormLabel>
                                    <Form.Control className="transparent_form h-45px calc" id="end_time" type="time" required value={endtime} onChange={e => setendtime(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Total Hours</FormLabel>
                                    <p className="m-0" id="total_time">0Hrs 0Mins</p>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Memo</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="text" required value={memo} onChange={e => setmemo(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Employee_LogsTime;
