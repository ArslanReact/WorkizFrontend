import React,{useState,useEffect,useMemo} from 'react';
import { NavLink } from 'react-router-dom';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import {Button, Modal } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";

// 

import csv_file from "../../../assets/images/csv_file.svg";
import excel_file from "../../../assets/images/excel_file.svg";
import formtable_img from "../../../assets/images/formtable_img.svg";
import plusicon from "../../../assets/images/plusicon.svg";
import exporticon from "../../../assets/images/icon_16.svg";
import checkicon from "../../../assets/images/checkicon.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import editiconimg from "../../../assets/images/editiconimg.svg";
import avatariconimg from "../../../assets/images/avatar_05.svg";
import deleteiconimg from "../../../assets/images/deleteiconimg.svg";
import down_arrow_red from "../../../assets/images/down_arrow_red.svg";
import down_arrow_green from "../../../assets/images/down_arrow_green.svg";
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
const EmployeeTask = () => {
    var counter1 = -1;
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [globalarray, setglobalarray] = useState({
        globalarray_Array: []
    });
    const [taskBoardColumns, settaskBoardColumns] = useState({
        taskBoardColumns_Array: []
    });

        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var userid = obj.id;
        useEffect(() => {
            axios.get(Globalsettings.url + 'api/member/task/all-tasks/data/1/all/' + companyid+'/'+userid)
                .then((response) => {
                    setTableData({ TableData_Array: response.data.data.tasks ? response.data.data.tasks : [], });
                    setglobalarray({ globalarray_Array: response.data.data.globalarray ? response.data.data.globalarray : [], });
                    settaskBoardColumns({ taskBoardColumns_Array: response.data.data.taskBoardColumns ? response.data.data.taskBoardColumns : [], });
                    setLoading(false);
                });
        }, []);

        const headers = [
            { name: "Sr No", field: "id", sortable: false },
            { name: "Task", field: "heading", sortable: true },
            { name: "Project", field: "project_name", sortable: true },
            { name: "Assign to", field: "amount", sortable: false },
            { name: "Due Date", field: "start_date", sortable: false },
            { name: "Status", field: "end_date", sortable: false },
        ];
        const FinalTableData = useMemo(() => {
            let tabledata = TableData.TableData_Array;
            // Searching
            if (search) {
                tabledata = tabledata.filter(
                    comment =>
                        comment.heading.toLowerCase().includes(search.toLowerCase()) ||
                        comment.project_name.toLowerCase().includes(search.toLowerCase()) 
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



    const [modalShow, setModalShow] = React.useState(false);
    // 
    const deletetask = (id) => {

    }
    // Update Task Status
    const Updatestatus = (id, status) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/member/task/change-status/'+ companyid+'/'+userid, {
            taskId: id,
            status: status,
            sortBy: 'id'
        })
        .then(response => {
            toast.success("Task Status Successfully Update!");
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
            axios.get(Globalsettings.url + 'api/member/task/all-tasks/data/1/all/' + companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.tasks ? response.data.data.tasks : [], });
                setglobalarray({ globalarray_Array: response.data.data.globalarray ? response.data.data.globalarray : [], });
                settaskBoardColumns({ taskBoardColumns_Array: response.data.data.taskBoardColumns ? response.data.data.taskBoardColumns : [], });
                setLoading(false);
            });
        });
    }
    return (
        <>
            {/*  */}
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title mb-0 mb-xl-0">Task</h4>
                        <div className="ml-auto d-md-flex d-block">
                            
                            <NavLink onClick={() => setModalShow(true)} to="#" className="btn btn_white mr-3 d-flex align-items-center justify-content-center w-100">Pinned Task</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/employee_add_new_task`} className="btn btn_blue mr-3 w-100 d-flex align-items-center justify-content-center"><img className="img-fluid" src={plusicon} alt="" /> Add New Task</NavLink>
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
                    <table className="table m-0">
                        <TableHeader
                                        headers={headers}
                                        onSorting={(field, order) =>
                                            setSorting({ field, order })
                                        }
                        />
                        <tbody>
                        {FinalTableData.length > 0 ?
                                    FinalTableData.map((val,index) => {
                                        counter1=counter1+1;
                                return (
                                    <tr className="mb-2">
                                        <td>{(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}</td>
                                        <td>
                                            {val.heading}
                                            {val.is_private == 1 && 
                                                <span style={{color:"#ea4c89"}}> (Private)</span>
                                            }
                                        </td>
                                        <td><NavLink to={`${process.env.PUBLIC_URL}/view_projectdetails/`+val.project_id}>{val.project_name}</NavLink></td>
                                        <td>
                                            {val.users.map((vals)=>{
                                                return(
                                                    <NavLink to="#" className="d-flex align-items-center">
                                                        <div className="avatar mr-2"><img className="img-fluid" src={vals.image_url} alt="" /></div>
                                                        <span>{vals.name}</span>
                                                    </NavLink>
                                                )
                                            })}
                                        </td>
                                        <td>{dateFormat(val.due_date,globalarray.globalarray_Array.date_format)}</td>
                                        <td className="">
                                            <select className="form-select" value={val.board_column} onChange={(e) => Updatestatus(val.id,e.target.value)}>
                                                {taskBoardColumns.taskBoardColumns_Array.map((val)=>{
                                                    return(
                                                        <option value={val.column_name}>{val.column_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                    </tr>   
                                )
                            })
                            :
                            <tr>
                                <td colSpan="7" className="text-center">No Record Found!</td>
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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default EmployeeTask;

// Pinned Task modal
function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Pinned Task</Modal.Title>
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
                            <tr>
                                <td colspan="3">No task category found.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}