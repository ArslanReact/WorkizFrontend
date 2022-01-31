import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from 'react-router-dom';
import { InputGroup, Button, Modal, Form, FormLabel, FormControl } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
import TimeLogTable from "../../Project-Tab/TimeLogs_Page_content/TimeLogTable";
// 
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";
import watchicon from "../../../../../assets/images/watchicon.svg";
import exporticon from "../../../../../assets/images/exporticon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import $ from "jquery";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import dateFormat from 'dateformat';
const TimeLogs = (props) => {
    var counter2 = -1;
    const history = useHistory();
    const [EditTask, setEditTask] = React.useState(false);
    const [EditModal, setEditModal] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [projectid, setprojectid] = useState('');
    const [taskid, settaskid] = useState('');
    const [empid, setempid] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [starttime, setstarttime] = useState('');
    const [endtime, setendtime] = useState('');
    const [memo, setmemo] = useState('');

    const [timelogupdateid, settimelogupdateid] = useState('');
    const [uprojectid, setuprojectid] = useState('');
    const [utaskid, setutaskid] = useState('');
    const [uempid, setuempid] = useState('');
    const [ustartdate, setustartdate] = useState('');
    const [uenddate, setuenddate] = useState('');
    const [ustarttime, setustarttime] = useState('');
    const [uendtime, setuendtime] = useState('');
    const [umemo, setumemo] = useState('');

    const [ProjectsData, setProjectsData] = useState({
        ProjectsData_Array: []
    });
    const [TaskData, setTaskData] = useState({
        TaskData_Array: []
    });
    const [EmpData, setEmpData] = useState({
        EmpData_Array: []
    });


    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TimeLogTables, setTimeLogTable] = useState({
        TimeLogTableArray: []
    });
    const [CurrencyData, setCurrencyData] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var uid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/all-time-logs/' + companyid+'/'+uid)
            .then((response) => {
                setLoading(false)
                setTimeLogTable({ TimeLogTableArray: response.data.data.membertimelogs ? response.data.data.membertimelogs : [], });
                setCurrencyData(response.data.data.currencydata.currency_symbol);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const addtimelog = () => {
        setLoading(false);
        axios.get(Globalsettings.url + 'api/admin/all-time-logs/create/' + companyid+'/'+uid)
        .then((response) => {
            setEditTask(true);
            setLoading(false);
            setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
            setTaskData({ TaskData_Array: response.data.data.tasks ? response.data.data.tasks : [], });
            setEmpData({ EmpData_Array: response.data.data.employees ? response.data.data.employees : [], });
        })
        .catch((error) => {
            // history.push('/signin');
        });
        
    }
    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Employees", field: "name", sortable: true },
        { name: "Start Time", field: "start_time", sortable: true },
        { name: "End Time", field: "end_time", sortable: false },
        { name: "Total Hours", field: "hours", sortable: false },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TimeLogTables.TimeLogTableArray;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.task.heading.toLowerCase().includes(search.toLowerCase())||
                    comment.project.project_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(tabledata.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            tabledata = tabledata.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        
        //Current Page slice
        return tabledata.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [TimeLogTables.TimeLogTableArray, currentPage, search, sorting]);     

        // Edit Time Log
        const EditTimeLog = (id) => {
            setLoading(true);
            axios.get(Globalsettings.url + 'api/admin/all-time-logs/edit/'+companyid+'/'+uid+'/'+ id)
            .then((response) => {
                setEditModal(true);
                setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setTaskData({ TaskData_Array: response.data.data.tasks ? response.data.data.tasks : [], });
                setEmpData({ EmpData_Array: response.data.data.employees ? response.data.data.employees : [], });
                settimelogupdateid(response.data.data.timeLog.id);
                setuprojectid(response.data.data.timeLog.project_id);
                setutaskid(response.data.data.timeLog.task_id);
                setuempid(response.data.data.timeLog.user_id);
                setumemo(response.data.data.timeLog.memo);
                setustartdate(dateFormat(response.data.data.timeLog.start_time,'yyyy-mm-dd'));
                setuenddate(dateFormat(response.data.data.timeLog.end_time,'yyyy-mm-dd'));
                setustarttime(dateFormat(response.data.data.timeLog.start_time,'hh:mm:ss'));
                setuendtime(dateFormat(response.data.data.timeLog.end_time,'hh:mm:ss'));
                setLoading(false);

            })
            .catch((error) => {
                toast.error("something went wrong");
                setLoading(false);
            });
            
        }
        // Delete Time Log
        const DeleteTimeLog = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the deleted time log data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/all-time-logs/destroy/' + id)
                            .then(response => {
                                swal("Time Log Delete Successfully!", {
                                    icon: "success",
                                });
                            });
                            setTimeLogTable({ TimeLogTableArray: TimeLogTables.TimeLogTableArray.filter(item => item.id !== id) });
                    } else {
                    }
                });
        }
        // Delete Time Log
        const ApproveTimeLog = (id) => {
            swal({
                title: "Are you sure?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.post(Globalsettings.url + 'api/admin/all-time-logs/approve-timelog',{
                            id: id,
                            userid : uid
                        })
                            .then(response => {
                                swal("Time Log Approved Successfully!", {
                                    icon: "success",
                                });
                                setTimeout(() => { 
                                    window.location.reload();
                                }, 3000)
                            });
                           
                    } else {
                    }
                });
        }



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
        axios.post(Globalsettings.url + 'api/admin/all-time-logs/time-logs/store/' + companyid+'/'+uid, data).then((response) => {
            toast.success("Time Log Added Successfully!");
            setLoading(false);
            setEditTask(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
        });
        evt.preventDefault();
    }     
    // Submit
    const SubmitUpdateTimeLog = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('project_id', uprojectid);
        data.append('task_id', utaskid);
        data.append('user_id', uempid);
        data.append('start_date', ustartdate);
        data.append('end_date', uenddate);
        data.append('start_time', ustarttime);
        data.append('end_time', uendtime);
        data.append('memo', umemo);
        axios.post(Globalsettings.url + 'api/admin/all-time-logs/update/' + companyid+'/'+uid+'/'+timelogupdateid, data).then((response) => {
            toast.success("Time Log Updated Successfully!");
            setLoading(false);
            setEditTask(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
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
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Time Logs</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/active_timer`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Active Timer</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/job-scheduling`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={calendaricon} alt="" /> Calendar View</NavLink>
                        {/* <NavLink to={`${process.env.PUBLIC_URL}/add_invoice`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={plusblackicon} alt="" /> Create Invoice</NavLink> */}
                        <NavLink to="#" onClick={() => addtimelog()} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Log Time</NavLink>
                        
                        <div className="ml-auto dropdown for_all">
                            <NavLink to="#" data-bs-toggle="dropdown" data-toggle="dropdown" className="btn btn_blue lightbluecolorbg fontsize14"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink onClick={() => exportTableToCSV('timelog.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink onClick={() => exportTableToCSV('timelog.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="ml-auto">
                                <Search
                                    onSearch={value => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                />
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0 table-borderless table-hover">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                        {FinalTableData.length > 0 ?  
                            FinalTableData.map((val,index) => {
                                let number = index +1;
                                counter2 = counter2+1;      
                                return (
                                    <TimeLogTable
                                        key={index}
                                        timelogid={val.id}
                                        serialnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                     
                                        employetitle={val.name}
                                        starttime={val.start_date+' '+val.start_time}
                                        enddate={val.end_date+' '+val.end_time}
                                        status={val.status}
                                        hrscount={val.total_hours+'h '+val.total_minutes+' m'}
                                        DeleteTimeLog={DeleteTimeLog}
                                        ApproveTimeLog={ApproveTimeLog}
                                        EditTimeLog={EditTimeLog}

                                    />
                                )
                            })  
                            :                           
                            <tr>
                                <td colSpan="8" className="text-center">No Record Found</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {/*  */}
            <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
            />
            {/* task categor */}
            <Modal show={EditTask} onHide={() => setEditTask(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Log Time</Modal.Title>
            </Modal.Header>
            <Form onSubmit={SubmitTimeLog}>
            <Modal.Body className="p-0 my-4">
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
                                    <p className="m-0" id="total_time"></p>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-3">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Memo</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="text" required value={memo} onChange={e => setmemo(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" type="submit" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
            </Form>
        </Modal>




            <Modal show={EditModal} onHide={() => setEditModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Time Logs</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitUpdateTimeLog}>
                <Modal.Body className="p-0 my-4">
                   
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">Select Project*</FormLabel>
                                        <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={uprojectid} onChange={e => setuprojectid(e.target.value)}>
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
                                        <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={utaskid} onChange={e => setutaskid(e.target.value)}>
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
                                        <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={uempid} onChange={e => setuempid(e.target.value)}>
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
                                        <Form.Control className="transparent_form h-45px calc" id="start_date" type="date" required value={ustartdate} onChange={e => setustartdate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">End Date</FormLabel>
                                        <Form.Control className="transparent_form h-45px calc" id="end_date" type="date" required value={uenddate} onChange={e => setuenddate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">Start Time</FormLabel>
                                        <Form.Control className="transparent_form h-45px calc" id="start_time" type="time" required value={ustarttime} onChange={e => setustarttime(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">End Time</FormLabel>
                                        <Form.Control className="transparent_form h-45px calc" id="end_time" type="time" required value={uendtime} onChange={e => setuendtime(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">Total Hours</FormLabel>
                                        <p className="m-0" id="total_time"></p>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 mb-3">
                                    <div className="form-group">
                                        <FormLabel className="mb-2">Memo</FormLabel>
                                        <Form.Control className="transparent_form h-45px" type="text" required value={umemo} onChange={e => setumemo(e.target.value)} />
                                    </div>
                                </div>
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setEditModal(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Update</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default TimeLogs;