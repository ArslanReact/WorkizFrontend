import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import { Editor, editorState } from "react-draft-wysiwyg";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import dateFormat from 'dateformat';
//
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import filtericon from "../../../../../assets/images/filtericon.svg";
import addiconimg from "../../../../../assets/images/addicon.svg";
import edit_2_iconimg from "../../../../../assets/images/edit_2_iconimg.svg";

// 
import OnGoingContent from "../../Project-Tab/TaskBoard_Page_content/OnGoingContent";
import OnGoingContentArray from "../../Project-Tab/TaskBoard_Page_content/OnGoingContentArray";
import InprogressContent from "../../Project-Tab/TaskBoard_Page_content/InprogressContent";
import InprogressContentArray from "../../Project-Tab/TaskBoard_Page_content/InprogressContentArray";
import InReviewContent from "../../Project-Tab/TaskBoard_Page_content/InReviewContent";
import InReviewContentArray from "../../Project-Tab/TaskBoard_Page_content/InReviewContentArray";
import CompletedContent from "../../Project-Tab/TaskBoard_Page_content/CompletedContent";
import CompletedContentArray from "../../Project-Tab/TaskBoard_Page_content/CompletedContentArray";
import checkicon from "../../../../../assets/images/checkicon.svg";


// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import OnGoingHistoryLoop from "../../Project-Tab/TaskBoard_Page_content/OnGoingHistoryLoop";
import OnGoingHistoryLoopArray from "../../Project-Tab/TaskBoard_Page_content/OnGoingHistoryLoopArray";


// 
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import edit_3_iconimg from "../../../../../assets/images/edit_3_iconimg.svg";
import uploadfileiconimg from "../../../../../assets/images/uploadfileiconimg.svg";

import vertical_bars from "../../../../../assets/images/vertical_bars.svg";
import homeiconimg from "../../../../../assets/images/home.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import icon_18 from "../../../../../assets/images/icon_18.svg";
import icon_19 from "../../../../../assets/images/icon_19.svg";
import icon_20 from "../../../../../assets/images/icon_20.svg";
const TaskBoard = (props) => {
    const [dragfilterTask, setdragfilterTask] = React.useState(false);
    const [AddModal, setAddModal] = React.useState(false);
    const [EditModal, setEditModal] = React.useState(false);
    const [HomeworkModal, setHomeworkModal] = React.useState(false);
    const [modalShowTaskCategory, setModalShowTaskCategory] = React.useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    const [AddTask, setAddTask] = React.useState(false);
    const [EditTask, setEditTask] = React.useState(false);
    const [filterTask, setfilterTask] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [boardColumns, setboardColumns] = useState({
        boardColumnsArray: []
    });
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/taskboard/'+companyid+'/'+obj.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.tasklabels ? response.data.tasklabels : [], });
                setboardColumns({ boardColumnsArray: response.data.data.boardColumns ? response.data.data.boardColumns : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something Went wrong!");
            });
    }, []); 
    const [CatList, setCatList] = useState({
        CatList_Array: []
    });

    const CategoryModel = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/taskCategory/create-cat/'+companyid+'/'+obj.id)
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
    //update column
    const [columnid, setcolumnid] = useState('');
    const [columnname, setcolumnname] = useState('');
    const [columncolor, setcolumncolor] = useState('');
    const [columnposition, setcolumnposition] = useState('');
    const [maxposition, setmaxposition] = useState('');
    const UpdateTaskStatusColumn = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/taskboard/edit/'+companyid+'/'+obj.id+'/'+id)
        .then((response) => {
            setcolumnid(response.data.data.boardColumn.id);
            setcolumnname(response.data.data.boardColumn.column_name);
            setcolumncolor(response.data.data.boardColumn.label_color);
            setcolumnposition(response.data.data.boardColumn.priority);
            setmaxposition(response.data.data.maxPriority);
            setLoading(false);
            setEditTask(true);
        })
        .catch((error) => {
            setLoading(false);
           toast.error("Something went wrong!")
        }); 
    } 
    
    //Update Column 
    const SubmitEditColumn = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/taskboard/update/'+companyid+'/'+obj.id+'/'+columnid, {
            column_name: columnname,
            label_color: columncolor,
            priority: columnposition,
            company_id: companyid
        }).then((response) => {
            toast.success("Task Status Successfully Updated!");
            setEditTask(false);
            setLoading(false);
            axios.get(Globalsettings.url + 'api/admin/taskboard/'+companyid+'/'+obj.id)
                    .then((response) => {
                        setTableData({ TableData_Array: response.data.tasklabels ? response.data.tasklabels : [], });
                        setboardColumns({ boardColumnsArray: response.data.data.boardColumns ? response.data.data.boardColumns : [], });
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                    });
                })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!");
         });
        evt.preventDefault();
    }         
    //Add Column 
    const [addcolumnname, setaddcolumnname] = useState('');
    const [addcolumncolor, setaddcolumncolor] = useState('');
    const SubmitAddColumn = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/taskboard/store/'+companyid+'/'+obj.id, {
            column_name: addcolumnname,
            label_color: addcolumncolor,
            company_id: companyid
        }).then((response) => {
            toast.success("Task Status Successfully Added!");
            setEditTask(false);
            setLoading(false);
            axios.get(Globalsettings.url + 'api/admin/taskboard/'+companyid+'/'+obj.id)
                    .then((response) => {
                        setTableData({ TableData_Array: response.data.tasklabels ? response.data.tasklabels : [], });
                        setboardColumns({ boardColumnsArray: response.data.data.boardColumns ? response.data.data.boardColumns : [], });
                        setAddModal(false);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                    });
                })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!");
         });
        evt.preventDefault();
    }         
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Task Board</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to="#" onClick={() => setAddModal(true)} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Coulum</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_new_task`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Task</NavLink>
                        <NavLink to="#" onClick={() => CategoryModel()} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Category</NavLink>
                        {/* <NavLink to="#" onClick={() => setfilterTask(true)} className="btn btn_white whitecolorbg fontsize14"><img className="img-fluid" src={filtericon} alt="" /> </NavLink> */}
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    {boardColumns.boardColumnsArray.map((val) => {
                        return(
                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                        <div className="card-body mb-3 px-3 whitecolorbg d-flex align-items-center">
                            <h5 className="main_title fontsize18">{val.column_name} <small>({val.tasks.length})</small></h5>
                            <div className="ml-auto">
                                <NavLink to={`${process.env.PUBLIC_URL}/add_new_task`} className=""><img className="img-fluid mr-3 w-20px" src={addiconimg} alt="" /></NavLink>
                                <NavLink to="#" onClick={() => UpdateTaskStatusColumn(val.id)} className=""><img className="img-fluid w-20px" src={edit_2_iconimg} alt="" /></NavLink>
                            </div>
                        </div>
                            {val.tasks.length > 0 ?
                                val.tasks.map((vals) => {
                                    return (
                                        <div className="card-body card_dashboard card whitecolorbg px-0 position-relative mb-4">
                                            <div className="d-flex align-items-center px-4 dropdown for_all">
                                                <NavLink to="#" data-bs-toggle="dropdown" className="ml-auto position-absolute px-3 top-0 right-0" data-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                                                <h6 className="main_title mb-3">{vals.heading}</h6>
                                                <div className="dropdown-menu m-0 dropdown-menu-right">
                                                    <NavLink to={`${process.env.PUBLIC_URL}/task_edit/`+val.id} className="dropdown-item fontsize14"><img className="img-fluid mr-2" src={editiconimg} alt="" /> Edit</NavLink>
                                                </div>
                                            </div>
                                            <p className="m-0 px-4 paragraphcolor1text fontsize14">{vals.project.project_name}</p>
                                            <div className="d-flex px-4 mt-4 align-items-center">
                                                <span className="badgegreenbg badgegreencolor badge border-radius-100 py-1 px-3 cursurpointer" onClick={() => setdragfilterTask(true)}>{props.badge_text}</span>
                                                <div className="ml-auto d-flex align-items-center">
                                                    {vals.users.length > 0 &&
                                                        vals.users.map((valss) => {
                                                            return (
                                                                <span><img className="m-minus-left-15 avatar" width="35" src={valss.image_url} alt="" /></span>
                                                            )
                                                        })
                                                    }
                                                    {/* <NavLink to="#" className="ml-2 lasercolorbg border-radius-100 p-1 text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink> */}
                                                </div>
                                            </div>
                                            <div className="card-footer p-0 px-4 mt-4 pt-3 d-flex justify-content-between">
                                                <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_18} alt="icon_18" /> {vals.comments.length}</NavLink>
                                                <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_19} alt="icon_18" /> {vals.files.length}</NavLink>
                                                <NavLink to="#" className="d-flex align-items-center fontsize14"><img className="img-fluid mr-2" src={icon_20} alt="icon_18" /> {(dateFormat(vals.due_date, 'yyyy-mm-dd'))}</NavLink>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="card-body mb-3 px-3 whitecolorbg d-flex align-items-center">
                                    <h5 className="main_title fontsize18">No Task Found!</h5>
                                </div>
                            }
                    </div>
                        )
                    })
                    }
                </div>
            </div>
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
            {/* task categor */}
            <MyVerticallyCenteredModalShow
                show={AddTask}
                onHide={() => setAddTask(false)}
            />
            {/* task categor */}
            <Modal show={EditTask} onHide={() => setEditTask(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Task Status</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitEditColumn}>
                <Modal.Body className="p-0 my-4">
                        <div className="mb-3">
                            <FormLabel className="mb-2">Column Name</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" required value={columnname} onChange={(e) =>setcolumnname(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-3 mb-lg-0">
                                <FormLabel className="mb-2">Label Color</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" required value={columncolor} onChange={(e) =>setcolumncolor(e.target.value)} />
                            </div>
                            <div className="col-xl-6 col-lg-12">
                                <FormLabel className="mb-2">Position</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" as="select" required value={columnposition} onChange={(e) =>setcolumnposition(e.target.value)}>
                                    {(() => {
                                        const options = [];
                                        for (let i = 1; i <= maxposition; i++) {
                                            options.push(<option value={i}>{i}</option>);
                                        }
                                        return options;
                                    })()}
                                </Form.Control>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setEditTask(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Update</Button>
                </Modal.Footer>
                </Form>
            </Modal>            
            {/* task categor */}
            <Modal show={AddModal} onHide={() => setAddModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Task Status</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitAddColumn}>
                <Modal.Body className="p-0 my-4">
                        <div className="mb-3">
                            <FormLabel className="mb-2">Column Name</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" required value={addcolumnname} onChange={(e) =>setaddcolumnname(e.target.value)} />
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-3 mb-lg-0">
                                <FormLabel className="mb-2">Label Color</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" required value={addcolumncolor} onChange={(e) =>setaddcolumncolor(e.target.value)} />
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setAddModal(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>            
            {/* task categor */}
            <MyVerticallyCenteredModalfilter
                show={filterTask} onHide={() => setfilterTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModaldragfilter
                show={dragfilterTask}
                onHide={() => setdragfilterTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalHomeworkModal
                show={HomeworkModal}
                onHide={() => setHomeworkModal(false)}
            />            
        </>
    );
}

export default TaskBoard;
























// task category modal
function MyVerticallyCenteredModalShow(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-3 mb-lg-0">
                            <FormLabel className="mb-2">Project</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Title</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="email" placeholder="title" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Make Private" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Billable" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Set time estimate" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-6 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Task is dependent on another task" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <FormLabel className="mb-2">Start Date*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <FormLabel className="mb-2">Due Date*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="" placeholder="" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <FormLabel className="mb-2">Assigned To</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="Choose Assignee" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Status</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Task Category</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-3">
                            <div className="p-3 border-radius-15 bodycolorbg">
                                <div class="file-drop-area">
                                    <span class="fake-btn">Choose files</span>
                                    <span class="file-msg">Drop files here OR click to upload</span>
                                    <input class="file-input" name="getFile[]" type="file" multiple="" required="" />
                                </div>
                            </div>
                        </div>
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

// filter modal
function MyVerticallyCenteredModalfilter(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="right modal_dashboard" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Filter By</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <label className="mb-4 blackcolortext fontsize14 fontweightregular">Select Date Range</label>
                <div className="mb-4">
                    <div className="all_calendar">
                        <RangeDatePicker
                            startDate={new Date(2020, 0, 15)}
                            endDate={new Date(2020, 1, 1)}
                            startDatePlaceholder="From"
                            endDatePlaceholder="To"
                            highlightToday
                        />
                    </div>
                </div>
                <Form>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Select Project</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Select Assigned To</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Select Client</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Select Assigned By</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Task Category</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Select Label</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-60px" as="select">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg w-100px fontsize14 border_bodycolor_0">Reset</Button>
                <Button variant="" className="w-100px btn_blue">Apply</Button>
            </Modal.Footer>
        </Modal>
    );
}


// drag filter modal
function MyVerticallyCenteredModaldragfilter(props) {
    const [dragTask, setdragTask] = React.useState(false);
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="dragfilter modal_dashboard" centered>
                <Modal.Header closeButton className="d-flex px-3 align-items-center">
                    <Modal.Title id="contained-modal-title-vcenter">Home Work</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="d-flex vh-100">
                        <div className="card-body px-3 h-100">
                            <h4 className="fontsize20 mb-3 blackcolortext">Revisit Homepage Wickrpark.io</h4>
                            <p className="fontsize14 paragraphcolor1text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            <span className="badge badgeredbg p-2 px-3 border-radius-100">Priority <samp className="lightredcolortext">High</samp></span>
                            <Tabs className="mt-4 filter-tabs">
                                <TabList>
                                    <Tab>Homework</Tab>
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
                                        <table className="table">
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
                                        {OnGoingHistoryLoopArray.map((val) => {
                                            return (
                                                <OnGoingHistoryLoop
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

// Sub Task modal
function MyVerticallyCenteredModalHomeworkModal(props) {
    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">New homework</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <Form>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">The Project</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>--</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Title</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="title" />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Title</FormLabel>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Make Private</FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Billable</FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-3 col-lg-12 mb-4">
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Set time estimate</FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Check type="checkbox" />
                                    <FormLabel className="">Task is dependent on another task</FormLabel>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Start Date</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" name="" placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Due Date</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="" />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Assign to</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>--</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Task Category</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>No Task Category added</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Repeat Every</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" name="" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Day</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>Day</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Cycle</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" name="" placeholder="" />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                    <Button variant="" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}