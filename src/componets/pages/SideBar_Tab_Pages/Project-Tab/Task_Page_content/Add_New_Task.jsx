import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, FormControl, Modal, Form, FormLabel } from "react-bootstrap";
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// 
import $ from "jquery";

// 
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import checkiconimg from "../../../../../assets/images/checkicon.svg";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const Add_New_Task = () => {

    const [colorbox, setcolorbox] = useState('#000000');
    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');
    function setaddress123(a) { setcolorbox(a); }
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var id = obj.id;
    const [modalShow, setModalShow] = React.useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');
    const [modalShowTaskLabel, setModalShowTaskLabel] = React.useState(false);
    const [modalShowAssign, setModalShowAssign] = React.useState(false);
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [title, settitle] = useState('');
    const [projectid, setprojectid] = useState('');
    const [taskcatid, settaskcatid] = useState('');
    const [description, setdescription] = useState('');
    const [startdate, setstartdate] = useState('');
    const [duedate, setduedate] = useState('');
        // for estimate
        const [set_time_estimate, setset_time_estimate] = useState(false);
        const updateset_time_estimate = () => setset_time_estimate(!set_time_estimate);
        // for billable
        const [billable, setbillable] = useState(false);
        const updatebillable = () => setbillable(!billable);
        // for make private
        const [is_private, setis_private] = useState(false);
        const updateis_private = () => setis_private(!is_private);
        // for dependent
        const [dependent, setdependent] = useState(false);
        const updatedependent = () => setdependent(!dependent);
        // for repeated
        const [repeated, setrepeated] = useState(false);
        const updaterepeated = () => setrepeated(!repeated);
    const [selectedEmpolyee, setselectedEmpolyee] = useState('');
    const [tasklabels, settasklabels] = useState();
    const [estimate_hours, setestimate_hours] = useState('');
    const [estimate_minutes, setestimate_minutes] = useState('');
    const [repeat_count, setrepeat_count] = useState('');
    const [repeat_type, setrepeat_type] = useState('');
    const [repeat_cycles, setrepeat_cycles] = useState('');
    const [priority, setpriority] = useState('');
    const [dependent_task_id, setdependent_task_id] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    const [projectlist, setprojectlist] = useState({
        projectlist_Array: []
    });
    const [taskcatist, settaskcatist] = useState({
        taskcatist_Array: []
    });
    const [labellist, setlabellist] = useState({
        labellist_Array: []
    });
    const [allTasks, setallTasks] = useState({
        allTasks_Array: []
    });
    const [employees, setemployees] = useState({
        employees_Array: []
    });
    const [global, setglobal] = useState({
        global_Array: []
    });
    const handleChange = (evt) => {
        settasklabels({multiValue: Array.isArray(evt)?evt.map(o => o.value):[]}); 
    }
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/all-tasks/create/'+companyid+'/'+obj.id)
            .then((response) => {
                setprojectlist({ projectlist_Array: response.data.data.projects ? response.data.data.projects : [], });
                settaskcatist({ taskcatist_Array: response.data.data.categories ? response.data.data.categories : [], });
                setlabellist({ labellist_Array: response.data.data.taskLabels ? response.data.data.taskLabels : [], });
                setemployees({ employees_Array: response.data.data.employees ? response.data.data.employees : [], });
                setallTasks({ allTasks_Array: response.data.data.allTasks ? response.data.data.allTasks : [], });
                setglobal({ global_Array: response.data.data.global ? response.data.data.global : [], });
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
        axios.get(Globalsettings.url + 'api/admin/taskCategory/create-cat/'+companyid+'/'+id)
        .then((response) => {
            setCatList({ CatList_Array: response.data.categories ? response.data.categories : [], });
            setLoading(false);
            setModalShow(true)
        })
        .catch((error) => {
            setLoading(false);
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
            settaskcatist({ taskcatist_Array: response.data.categories ? response.data.categories : [], });
            setModalShow(false);
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
    const FormSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/task-label/store-label', {
            label_name: name,
            description: desc,
            color: colorbox,
            company_id: companyid
        }).then((response) => {
            setlabellist({ labellist_Array: response.data.labels ? response.data.labels : [], });
            setModalShowTaskLabel(false);
            window.location.reload();
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    }   
    
    const FormSubmitTask = (evt) => {
        setLoading(true);     
        const data = new FormData();
        data.append('company_id', companyid);
        data.append('project_id', projectid);
        data.append('category_id', taskcatid);
        data.append('title', title);
        data.append('description', description);
        data.append('billable', billable);
        data.append('estimate_hours', estimate_hours);
        data.append('estimate_minutes', estimate_minutes);
        data.append('dependent', dependent);
        data.append('dependent_task_id', dependent_task_id);
        if(tasklabels != null){
        tasklabels.multiValue.map((o) => {
            return(
                data.append('task_labels[]', o)
            )
        })}
        data.append('start_date', startdate);
        data.append('due_date', duedate);
        data.append('repeat_count', repeat_count);
        data.append('repeat_type', repeat_type);
        data.append('repeat_cycles', repeat_cycles);
        data.append('user_id[]', selectedEmpolyee);
        data.append('priority', priority);
        data.append('image_url', selectedImage);
        axios.post(Globalsettings.url + 'api/member/task/all-tasks/store/'+companyid+'/'+id, data).then((response) => {
            toast.success("Task Save Successfully!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/task`);
            }, 3000);
        })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    }  
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">New Task</h4>
            </div>
            {/*  */}
            <Form onSubmit={FormSubmitTask}>
            <div className="card card_dashboard card-body mb-4 whitecolorbg">
                {/* <div className="card-header mb-4 p-0"><h4 className="main_title fontsize18 mb-3">New Task</h4></div> */}
                <div className="row align-items-center mb-4">
                    <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Title</Form.Label>
                        <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="subject" required value={title} onChange={(e) => settitle(e.target.value)}  />
                    </div>
                    <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Project </Form.Label>
                        <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" required value={projectid} onChange={(e) => setprojectid(e.target.value)}>
                                <option value="">Select Project</option>
                                {projectlist.projectlist_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.project_name}</option>
                                    )
                                })}
                        </Form.Control>
                    </div>
                    <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Task Category <NavLink onClick={() => CategoryModel()} to="#" className="badge ml-3 border-radius-100 lasercolorbg px-2 py-1 text-white"><img className="img-fluid mr-1" width="10" src={plusiconimg} alt="plusicon" /> Task Category</NavLink></Form.Label>
                        <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" required value={taskcatid} onChange={(e) => settaskcatid(e.target.value)}>
                            <option value="">Select Task Category</option>
                                {taskcatist.taskcatist_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.category_name}</option>
                                    )
                                })}
                        </Form.Control>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 mb-4">
                    <Form.Label className="mb-2 fontsize14 fontweightregular">Description</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setdescription(data);
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
                <div class="row mb-3">
                    <div className="col-xl-4 col-lg-12">
                            <div className="">
                                <Form.Check name="a" label="Make Private" checked={is_private} required onChange={updateis_private} />
                            </div>
                    </div>
                    <div className="col-xl-4 col-lg-12">
                            <div className="">
                                <Form.Check name="a" label="Billable" checked={billable} required onChange={updatebillable} />
                            </div>
                    </div>
                    <div className="col-xl-4 col-lg-12">
                            <div className="d-flex align-items-center">
                                <div>
                                    <div className="mb-0">
                                        <Form.Check name="a" label="Set time estimate" required checked={set_time_estimate} onChange={updateset_time_estimate} />
                                    </div>
                                </div>
                                {set_time_estimate === true &&
                                <div className="ml-3">
                                    <div class="form-group d-flex align-items-center">
                                            <Form.Control type="number" min="0"  className="w-80px h-40px" value={estimate_hours} onChange={(e) => setestimate_hours(e.target.value)}  name="estimate_hours"/> <span className="ml-2">Hrs</span>
                                            <Form.Control  type="number" min="0"  className="ml-2 w-80px h-40px" value={estimate_minutes} onChange={(e) => setestimate_minutes(e.target.value)} name="estimate_minutes"/> <span className="ml-2">Mins</span>
                                    </div>
                                </div>}
                            </div>
                    </div>
                </div>                
                <div className="col-xl-12 col-lg-12 mb-4">
                    <Form.Check name="dependent" label="Task is dependent on another task" required checked={dependent} onChange={updatedependent} />
                </div>   
                {dependent === true &&               
                <div className="col-xl-12 col-lg-12 mb-4">
                    <Form.Label className="mb-2 fontsize14 fontweightregular">Dependent Task</Form.Label>
                    <Form.Select type="number" min="0"  className="" value={dependent_task_id} onChange={(e) => setdependent_task_id(e.target.value)}  name="">
                            <option value="">Select Task</option>
                            {allTasks.allTasks_Array.map((val) =>{
                                    return(
                                        <option value={val.id}>{val.heading}</option>
                                    )
                                })
                            }
                    </Form.Select>
                </div>   
                }           
                <div className="col-xl-12 col-lg-12 mb-4">
                    <Form.Label className="mb-2 fontsize14 fontweightregular">Label <NavLink onClick={() => setModalShowTaskLabel(true)} to="#" className="badge ml-3 border-radius-100 lasercolorbg px-2 py-1 text-white"><img className="img-fluid mr-1" width="10" src={plusiconimg} alt="plusicon" /> Add Task Lable</NavLink></Form.Label>
                    <Select name="task_labels" options={labellist.labellist_Array.map((val) => { return({ label: val.label_name, value: val.id }) })} components={animatedComponents} isMulti onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Start Date* </Form.Label>
                        <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="date" required value={startdate} onChange={(e) => setstartdate(e.target.value)} />
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Due Date* </Form.Label>
                        <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="date" required value={duedate} onChange={(e) => setduedate(e.target.value)} />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 mb-4">
                    <Form.Label className="mb-2 fontsize14 fontweightregular">Priority</Form.Label>
                    <Form.Check type="radio" name="priority" label="High" value="high" checked={priority == "high"} onClick={(e) => setpriority(e.target.value)} />
                    <Form.Check type="radio" name="priority" label="Medium" value="medium" checked={priority == "medium"} onClick={(e) => setpriority(e.target.value)} />
                    <Form.Check type="radio" name="priority" label="Low" value="low" checked={priority == "low"} onClick={(e) => setpriority(e.target.value)} />
                </div> 
                <div class="row align-items-center mb-3">
                    <div className="col-xl-3 col-lg-12">
                            <Form.Check name="dependent" label="Repeat" checked={repeated} onChange={updaterepeated} />  
                    </div>
                    {repeated === true &&
                    <>
                    <div className="col-xl-3 col-lg-12">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Repeat Every</Form.Label>        
                            <Form.Control type="number" min="0"  className="" value={repeat_count} onChange={(e) => setrepeat_count(e.target.value)}  name="estimate_hours"/> 
                    </div>
                    <div className="col-xl-3 col-lg-12">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Repeat Type</Form.Label>        
                            <Form.Select type="number" min="0"  className="" value={repeat_type} onChange={(e) => setrepeat_type(e.target.value)}  name="">
                                    <option value="">Select Type</option>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                            </Form.Select>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Cycles</Form.Label>        
                            <Form.Control type="number" min="0"  className="" value={repeat_cycles} onChange={(e) => setrepeat_cycles(e.target.value)}  name="estimate_hours"/>
                    </div>
                    </>}
                </div>    
                <div className="col-xl-4 col-lg-12 mb-4">
                        <Form.Label className="mb-2 fontsize14 fontweightregular">Assigned To </Form.Label>
                        <Form.Select as="select" required value={selectedEmpolyee} onChange={(e) => setselectedEmpolyee(e.target.value)}>
                            <option value="">Select member</option>
                            {employees.employees_Array.map((val) => {
                                return(
                                    <option value={val.id}>{val.name}</option>
                                )
                            })
                            }
                        </Form.Select>
                        
                    </div>             
                <div className="col-lg-4 mb-4">
                    <div className="p-3 border-radius-15 bodycolorbg">
                        <div className="file-drop-area">
                            {(() => {
                                if (selectedImage) {
                                    return (
                                        <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage)} alt="" />
                                    )
                                } else {
                                    return (
                                        <>
                                        <span className="fake-btn">Choose files</span>
                                        <span className="file-msg">Drop files here OR click to upload</span>
                                        </>
                                    )
                                }
                            })()}
                            <input className="file-input" onChange={imageChange} name="getFile[]" type="file" required="" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <Button variant="" type="submit" className="w-100px btn btn_blue mr-2"><img className="img-fluid mr-2" src={checkiconimg} alt="checkicon" /> Save</Button>
                </div>
            </div>
            </Form>
            {/* task categor */}
            <Modal  show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
                            <Form.Control className="transparent_form h-45px" type="text" required placeholder="Enter Categoty Name" value={ShowcategoryNameInput} onChange={e => setShowcategoryNameInput(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShow(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>            

            {/* task categor */}
            <Modal show={modalShowTaskLabel} onHide={() => setModalShowTaskLabel(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Task Label</Modal.Title>
                </Modal.Header>
                <Form onSubmit={FormSubmit}>
                <Modal.Body className="p-0 my-4">
                    <div className="table-sm-responsive">
                            <div className="mb-4">
                                <FormLabel className="mb-2">Label Name*</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={name} onChange={(e) => setname(e.target.value)}  />
                            </div>
                            <div className="mb-4">
                                <FormLabel className="mb-2">Description</FormLabel>
                                <FormControl as="textarea" rows={3} className="transparent_form" required value={desc} onChange={(e) => setdesc(e.target.value)} />
                            </div>
                            <div className="">
                                <FormLabel className="mb-2">Color*</FormLabel>
                                <div className="d-flex align-items-center mb-2">
                                    <Form.Control className="transparent_form h-40px mr-3" type="text" name="" value={colorbox} placeholder="" />
                                    <div className="ml-auto p-3 border-radius-5" value={colorbox} style={{ background: colorbox }}></div>
                                </div>
                                <small>Choose any color. Or you can choose one of the suggested colors below.</small>
                                <div className="suggest-colors my-4">
                                    <NavLink onClick={() => setaddress123('#000000')} style={{ background: "#000000" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#3546AB')} style={{ background: "#3546AB" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#FFBB54')} style={{ background: "#FFBB54" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#7590FE')} style={{ background: "#7590FE" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#727ec4')} style={{ background: "#727ec4" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#FC6098')} style={{ background: "#FC6098" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#58D7FF')} style={{ background: "#58D7FF" }} to="#"></NavLink>
                                    <NavLink onClick={() => setaddress123('#00A389')} style={{ background: "#00A389" }} to="#"></NavLink>
                                </div>
                            </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowTaskLabel(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>            
            {/* task categor */}
            <MyVerticallyCenteredModalAssign
                show={modalShowAssign}
                onHide={() => setModalShowAssign(false)}
            />
        </>
    )
}

export default Add_New_Task;

// Assign Task modal
function MyVerticallyCenteredModalAssign(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Employee Info</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form className="row">
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Employee ID*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" placeholder="" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Employee Name*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" placeholder="" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Employee Email*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="email" placeholder="" />
                        <small>Employee will login using this email.</small>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Password*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="password" placeholder="" />
                        <small>Employee will login using this password.</small>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Designation*</FormLabel>
                        <Form.Control className="transparent_form h-45px" as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Department*</FormLabel>
                        <Form.Control className="transparent_form h-45px" as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Joining Date*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="date" placeholder="" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <FormLabel className="mb-2">Gender*</FormLabel>
                        <Form.Control className="transparent_form h-45px" as="select">
                            <option>mail</option>
                            <option>femail</option>
                        </Form.Control>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg fontsize14 w-100px" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

