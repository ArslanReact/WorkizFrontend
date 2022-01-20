import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from 'react-router-dom';
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import $ from "jquery";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
// 
import watchicon from "../../../../../assets/images/watchicon.svg";
import exporticon from "../../../../../assets/images/exporticon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";
import checkimggreen from "../../../../../assets/images/checkimggreen.svg";
import checkiconimg from "../../../../../assets/images/checkblackicon.svg";
const Active_Timer = () => {
    var counter2 = -1;
    const history = useHistory();
    const [EditTask, setEditTask] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [projectid, setprojectid] = useState('');
    const [taskid, settaskid] = useState('');
    const [empid, setempid] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [starttime, setstarttime] = useState('');
    const [endtime, setendtime] = useState('');
    const [memo, setmemo] = useState('');
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
                setTimeLogTable({ TimeLogTableArray: response.data.data.activeTimers ? response.data.data.activeTimers : [], });
                setCurrencyData(response.data.data.currencydata.currency_symbol);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const addtimelog = () => {
        setLoading(false);
        axios.get(Globalsettings.url + 'api/admin/all-time-logs/create/' + companyid)
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
        { name: "Task", field: "project_name", sortable: true },
        { name: "Employees", field: "name", sortable: true },
        { name: "Start Time", field: "start_time", sortable: true },

        { name: "Total Hours", field: "hours", sortable: false },
        { name: "Eearnings", field: "earnings", sortable: false },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TimeLogTables.TimeLogTableArray;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.task.heading.toLowerCase().includes(search.toLowerCase())
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

        // Delete Time Log
        const StopTimeLog = (id) => {
            swal({
                title: "Are you sure?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/all-time-logs/stop-timer/'+companyid+'/'+uid+'/'+ id)
                            .then(response => {
                                swal("Time Log Stop Successfully!", {
                                    icon: "success",
                                });
                            });
                            setTimeLogTable({ TimeLogTableArray: TimeLogTables.TimeLogTableArray.filter(item => item.id !== id) });
                    } else {
                    }
                });
        }    
    return (
        <>
            <div className="container-fluid mb-4">
                {/*  */}
                <div className="d-block d-xl-flex align-items-center mb-4">
                    <h4 className="main_title mb-3 mb-xl-0">Active Timers</h4>
                    <div className="ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/time-logs`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Log Time</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn btn_blue lightbluecolorbg fontsize14"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
                {/*  */}
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
                    <table className="table m-0 table-borderless">
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
                        <tr>
                            <td>{(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}</td>
                            <td>{val.task.heading}</td>
                            <td>{val.name}</td>
                            <td>{val.start_time}</td>
                         
                            <td><span className="d-inline-block border_greencolor_1 px-3 py-2 border-radius-100 greencolortext">{val.hours} <img className="img-fluid ml-3" src={checkimggreen} alt="" /></span></td>
                            <td>{CurrencyData+""+val.total_hours * val.hourly_rate}</td>
                            <td className="dropdown dropdown_table">
                                <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table d-inline-block" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="list-unstyled">
                                        <li><NavLink onClick={() => StopTimeLog(val.id)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Stop</NavLink></li>     
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                            })  
                            :                           
                            <tr>
                                <td colSpan="8" className="text-center">No Record Found</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
            />
                </div>
            </div>
        </>
    )
}

export default Active_Timer;
