import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import TaskTable from "../../Project-Tab/Task_Page_content/TaskTable";

// 
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";


const Task = () => {
    var counter1 = -1;
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowTaskCategory, setModalShowTaskCategory] = React.useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [alltasklist, setalltasklist] = useState({
        alltasklist_Array: []
    });
    const [Status, setStatus] = useState({
        Status_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var id = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/all-tasks/'+companyid+'/'+id)
            .then((response) => {
                setalltasklist({ alltasklist_Array: response.data.alltasklist ? response.data.alltasklist : [], });
                setStatus({ Status_Array: response.data.taskBoardStatus ? response.data.taskBoardStatus : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    // Delete Client
    const DeleteClient = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted client data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/clients/destroy/' + id)
                        .then(response => {
                            swal("Client Delete Successfully!", {
                                icon: "success",
                            });
                            setalltasklist({ alltasklist_Array: alltasklist.alltasklist_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }   
    // Update Task Status
    const Updatestatus = (taskid, statusid) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/projects/task/change-status', {
            taskId: taskid,
            status: statusid,
            company_id: companyid,
            sortBy: "id"
        })
            .then(response => {
                setLoading(false);
                toast.success("Task Status Successfully Update!");
                setTimeout(() => { 
                    window.location.reload();
                }, 3000)
            });
    }      
    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Task", field: "heading", sortable: true },
        { name: "Project", field: "project_name", sortable: true },
        { name: "Assign to", field: "assignlist", sortable: true },
        { name: "Status", field: "status_text", sortable: false },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = alltasklist.alltasklist_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.heading.toLowerCase().includes(search.toLowerCase())||
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

    }, [alltasklist.alltasklist_Array, currentPage, search, sorting]);     

    const [CatList, setCatList] = useState({
        CatList_Array: []
    });
    const CategoryModel = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/taskCategory/create-cat/'+companyid+'/'+id)
        .then((response) => {
            setCatList({ CatList_Array: response.data.categories ? response.data.categories : [], });
            setLoading(false);
            setModalShowTaskCategory(true)
        })
        .catch((error) => {
           toast.error("Something went wrong!")
        });
        
    }

    //Insert Task Cat
     const SubmitTaskform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/taskCategory/store-cat', {
            category_name: ShowcategoryNameInput,
            company_id: companyid
        }).then((response) => {
            toast.success("Project Category Successfully Inserted!");
            setCatList({ CatList_Array: response.data.categories ? response.data.categories : [], });
            setModalShowTaskCategory(false);
            setShowcategoryNameInput('');
        })
        .catch((error) => {
            toast.error("Something went wrong!")
         });
        evt.preventDefault();
    }   
    // Delete Task Category
    const DeleteTaskCategory = (id) => {
        axios.get(Globalsettings.url + 'api/admin/taskCategory/destroy/' + id)
            .then(response => {
                toast.success("Task Category Delete Successfully");
                setCatList({ CatList_Array: CatList.CatList_Array.filter(item => item.id !== id) });
            });
    }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Task</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink onClick={() => CategoryModel()} to="#" className="btn btn_white mr-3 whitecolorbg blackcolortext"><img className="img-fluid" src={plusblackicon} alt="" /> Task Category</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_new_task`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add New Task</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/task_label`} className="btn btn_white mr-3">Task Label</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn btn_white lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
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
                                let number = index +1;
                                return (
                                    <TaskTable
                                        key={index}
                                        count={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                        taskid={val.id}
                                        pid={val.project_id}
                                        title={val.heading}
                                        shoplist={val.project_name}
                                        assignlist={val.assignlist}
                                        duedatelist={val.due_date}
                                        status_text={val.status_text}
                                        status_color={val.status_color}
                                        prestatus={val.board_column}
                                        statuslist={Status.Status_Array}
                                        Updatestatus={Updatestatus}
                                    />
                                )
                            })
                            :                           
                            <tr>
                                <td colSpan="6" className="text-center">No Record Found</td>
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
            {/* task categor */}
            <Modal show={modalShowTaskCategory} onHide={() => setModalShowTaskCategory(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Task Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitTaskform}>
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
                            {CatList.CatList_Array.length > 0 ?
                                CatList.CatList_Array.map((val,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{val.category_name}</td>
                                            <td><NavLink onClick={() => DeleteTaskCategory(val.id)} to="#" className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
                                        </tr>
                                    )
                                })
                            :
                                <tr>
                                    <td colSpan="3">No Record Found!</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                        <Form.Control className="transparent_form h-55px" type="text" required placeholder="Enter Categoty Name" value={ShowcategoryNameInput} onChange={e => setShowcategoryNameInput(e.target.value)}  />
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShowTaskCategory(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>            
        </>
    );
}

export default Task;

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
