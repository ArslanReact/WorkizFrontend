import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import { NavLink } from "react-router-dom";
import { InputGroup, Button, Modal, Form, FormLabel, FormControl } from "react-bootstrap";

// 
import TimeLogTable from "../employeetimelog/Employee_TimeLogTable";
// 
import formtable_img from "../../../assets/images/formtable_img.svg";
import checkicon_img from "../../../assets/images/checkicon.svg";
import avatarimg from "../../../assets/images/avatar_01.svg";
import watchicon from "../../../assets/images/watchwhiteicon.svg";
import dateFormat from 'dateformat';


const TimeLogs = () => {
    const [EditTask, setEditTask] = React.useState(false);
    // 
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });    
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    useEffect(() => {
        axios.post(Globalsettings.url + 'api/member/all-time-logs/data/0/all/' + companyid+'/'+userid,{
            startDate : '01.01.2021',
            endDate : '10.11.2021',
        })
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.timelogs ? response.data.data.timelogs : [], });
                setGlobalData({ GlobalData_Array: response.data.data.globalarray[0] ? response.data.data.globalarray[0] : [], });
                setLoading(false);

            });
    }, []);
 
    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Task", field: "heading", sortable: true },
        { name: "Start Time", field: "start_time", sortable: true },
        { name: "End Time", field: "end_time", sortable: true },
        { name: "Total Hours", field: "total_hours", sortable: true },
        { name: "Memo", field: "memo", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.task.heading.toLowerCase().includes(search.toLowerCase()) ||
                    comment.memo.toLowerCase().includes(search.toLowerCase()) 
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);      
    return (
        <>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-flex align-items-center">
                        <h4 className="main_title mb-0">Time Logs</h4>
                        
                        <div className="ml-auto d-md-flex d-block">
                        <NavLink to={`${process.env.PUBLIC_URL}/employe_logtime`} className="btn btn_blue w-100 mr-2 d-flex align-items-center justify-content-center"><img className="img-fluid mr-2" src={watchicon} alt="watch" />Logs Time</NavLink>
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
                <div className="table-sm-responsive data_table_radius mt-4">
                    <table className="table m-0 table-borderless table-hover">
                                <TableHeader
                                            headers={headers}
                                            onSorting={(field, order) =>
                                                setSorting({ field, order })
                                            }
                                />
                        <tbody>
                            {FinalTableData.length > 0  ?
                            FinalTableData.map((val,index) => {
                                var format = GlobalData.GlobalData_Array.date_format+' '+GlobalData.GlobalData_Array.time_format;
                                return (
                                    <TimeLogTable
                                        key={val.key}
                                        serialnumber={index+1}
                                        taskname={val.task.heading}
                                        starttime={dateFormat(val.start_time, format)}
                                        endtime={dateFormat(val.end_time, format)}
                                        memo={val.memo}
                                        hrscount={val.total_hours}
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="8" className="text-center">No Record Found!</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    />
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={EditTask}
                onHide={() => setEditTask(false)}
            />
        </>
    );
}

export default TimeLogs;

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