import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { Form, Modal, FormLabel, Button } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import dateFormat from 'dateformat';
// 
import ProjectCategoryModalLoop from "../../Project-Tab/ManageJob_Page_content/ProjectCategoryModalLoop";

// 
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import checkiconimg from "../../../../../assets/images/checkicon.svg";
import cogimg from "../../../../../assets/images/cogimg.svg";

const Edit = (props) => {
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    // Company

    // Show Category
    const [modalShowcategory, setModalShowcategory] = useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');
    // Employee Modal
    const [modalShowAssign, setModalShowAssign] = useState(false);
    const [empid, setempid] = useState('');
    const [empname, setempname] = useState('');
    const [empemail, setempemail] = useState('');
    const [emppassword, setemppassword] = useState('');
    const [empdesignation, setempdesignation] = useState('');
    const [empdepartment, setempdepartment] = useState('');
    const [empdob, setempdob] = useState('');
    const [empgender, setempgender] = useState('');
    // Client Modal
    const [modalShowClient, setModalShowClient] = useState(false);
    const [clientname, setclientname] = useState('');
    const [clientemail, setclientemail] = useState('');
    const [clientpassword, setclientpassword] = useState('');

    // input State 
    const [projectname, setprojectname] = useState('');
    const [projectcat, setprojectcat] = useState('');
    const [projectaddress, setprojectaddress] = useState('');
    const [deadlinecheck, setdeadlinecheck] = useState(false);
    const [deadline, setdeadline] = useState('');
    const [startdate, setstartdate] = useState('');
    const [jobmember, setjobmember] = useState('');
    const [summary, setsummary] = useState('');
    const [note, setnote] = useState('');
    const [clients, setclients] = useState('');
    const [projectbudjet, setprojectbudjet] = useState('');
    const [currency, setcurrency] = useState('');
    const [hourallocated, sethourallocated] = useState('');
    const [projectstatus, setprojectstatus] = useState('');
    // const [images, setimages] = useState({ images_array: [] });
    // const fileObj = [];
    // const fileArray = [];
    // const uploadMultipleFiles = (e) => {
    //     fileObj.push(e.target.files)
    //     for (let i = 0; i < fileObj[0].length; i++) {
    //         fileArray.push(URL.createObjectURL(fileObj[0][i]))
    //     }
    //     setimages({ images_array: fileArray })
    // }
    // Pre Load Data
    const [pcat, setpcat] = useState({
        pcat_Array: []
    });
    const [memberslist, setmemberslist] = useState({
        memberslist_Array: []
    });
    const [clientslist, setclientslist] = useState({
        clientslist_Array: []
    });
    const [currencylist, setcurrencylist] = useState({
        currencylist_Array: []
    });
    const [departments, setdepartments] = useState({
        departments_Array: []
    });
    const [designation, setdesignation] = useState({
        designation_Array: []
    });
    // Load Data
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/projects/edit/'+companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setpcat({ pcat_Array: response.data.data.categories ? response.data.data.categories : [], });
                setmemberslist({ memberslist_Array: response.data.data.employees ? response.data.data.employees : [], });
                setclientslist({ clientslist_Array: response.data.data.clients ? response.data.data.clients : [], });
                setcurrencylist({ currencylist_Array: response.data.data.currencies ? response.data.data.currencies : [], });
                setprojectname(response.data.data.project.project_name);
                setprojectcat(response.data.data.project.category_id);
                setprojectaddress(response.data.data.project.project_address);
                setdeadline(response.data.data.project.deadline);
                if(response.data.data.project.project_summary == null){
                    setsummary('');
                }else{
                    setsummary(response.data.data.project.project_summary);
                }
                if(response.data.data.project.notes == null){
                    setnote('');
                }else{
                    setnote(response.data.data.project.notes);
                }
                setclients(response.data.data.project.client_id);
                setprojectbudjet(response.data.data.project.project_budget);
                sethourallocated(response.data.data.project.hours_allocated);
                if(response.data.data.project.deadline == null){
                    setdeadlinecheck(true)
                }else{
                    setdeadlinecheck(false)
                }
                setdeadline(dateFormat(response.data.data.project.deadline,'yyyy-mm-dd'));
                setstartdate(dateFormat(response.data.data.project.start_date,'yyyy-mm-dd'));
                setprojectstatus(response.data.data.project.status);
                setcurrency(response.data.data.project.currency_id);
            })
            .catch((error) => {
 
            });
    }, [])
    //Insert Project cat
    const SubmitPcatform = (evt) => {
        const updated = axios.post(Globalsettings.url + 'api/admin/projectCategory/store-cat', {
            category_name: ShowcategoryNameInput,
            company_id: companyid
        });

        if (updated) {
            toast.success("Project Category Successfully Inserted!");
            setModalShowcategory(false);
            axios.post(Globalsettings.url + 'api/admin/projects/create', {
                companyid: companyid
            })
                .then(response => {
                    setpcat({ pcat_Array: response.data.categories ? response.data.categories : [], });
                    setmemberslist({ memberslist_Array: response.data.employees ? response.data.employees : [], });
                    setclientslist({ clientslist_Array: response.data.clients ? response.data.clients : [], });
                    setcurrencylist({ currencylist_Array: response.data.currencies ? response.data.currencies : [], });
                    setShowcategoryNameInput('');
                });
        }
        evt.preventDefault();
    }
    //Insert Employee
    const SubmitEmpForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/employees/store', {
            employee_id: empid,
            name: empname,
            email: empemail,
            password: emppassword,
            designation: empdesignation,
            department: empdepartment,
            joining_date: empdob,
            gender: empgender,
            companyid: companyid,
        }).then(response => {
            toast.success("Employee Added Successfully!");
            setModalShowAssign(false);
            axios.post(Globalsettings.url + 'api/admin/projects/create', {
                companyid: companyid
            })
                .then(response => {
                    setpcat({ pcat_Array: response.data.categories ? response.data.categories : [], });
                    setmemberslist({ memberslist_Array: response.data.employees ? response.data.employees : [], });
                    setclientslist({ clientslist_Array: response.data.clients ? response.data.clients : [], });
                    setcurrencylist({ currencylist_Array: response.data.currencies ? response.data.currencies : [], });
                    setempid('');
                    setempname('');
                    setempemail('');
                    setemppassword('');
                    setempdesignation('');
                    setempdepartment('');
                    setempdob('');
                    setempgender('');
                });
        }).catch(function (error) {

            if (error.response.data.errors) {
                var errorarray = [];
                errorarray.push(error.response.data.errors);

            }
        });
        evt.preventDefault();
    }
    //Insert Client
    const SubmitClientForm = (evt) => {
        const updated = axios.post(Globalsettings.url + 'api/admin/clients/store', {
            name: clientname,
            email: clientemail,
            password: clientpassword,
        });

        if (updated) {
            toast.success("Client Successfully Inserted!");
            setModalShowClient(false);
            axios.post(Globalsettings.url + 'api/admin/projects/create', {
                companyid: companyid
            })
                .then(response => {
                    setpcat({ pcat_Array: response.data.categories ? response.data.categories : [], });
                    setmemberslist({ memberslist_Array: response.data.employees ? response.data.employees : [], });
                    setclientslist({ clientslist_Array: response.data.clients ? response.data.clients : [], });
                    setcurrencylist({ currencylist_Array: response.data.currencies ? response.data.currencies : [], });
                    setclientname('');
                    setclientemail('');
                    setclientpassword('');
                });
        }
        evt.preventDefault();
    }

    // Insert Inventory
    const handleSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('project_name', projectname);
        data.append('category_id', projectcat);
        data.append('start_date', startdate);
        data.append('deadline', deadline);
        data.append('project_address', projectaddress);
        data.append('project_summary', summary);
        data.append('notes', note);
        data.append('client_id', clients);
        data.append('project_budget', projectbudjet);
        data.append('currency_id', currency);
        data.append('hours_allocated', hourallocated);
        data.append('status', projectstatus);
        data.append('without_deadline', deadlinecheck);
        data.append('companyid', companyid);
        axios.post(Globalsettings.url + 'api/admin/projects/update/'+props.match.params.id, data).then((response) => {
            toast.success("Project Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/manage-job`);
            }, 3000);
        }).catch(function (error) {
            setLoading(false);
            toast.error("Some things went wrong!");
        });
        evt.preventDefault();
    }

    // Delete Project Category
    const DeleteProjectCategory = (id) => {
        axios.get(Globalsettings.url + 'api/admin/projectCategory/destroy/' + id)
            .then(response => {
                toast.success("Project Category Delete Successfully");
                setpcat({ pcat_Array: pcat.pcat_Array.filter(item => item.id !== id) });
            });
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <h4 className="main_title fontsize18 mb-4 px-0">Update Project Detail</h4>
            <Form onSubmit={handleSubmit}>
                <div className="card_dashboard card card-body whitecolorbg px-4 mb-4">
                    <h4 className="main_title fontsize18 mb-4 px-0">Project Info</h4>

                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Name*</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="subject" value={projectname} onChange={e => setprojectname(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Category* <NavLink to="#" onClick={() => setModalShowcategory(true)}><img width="15" className="img-fluid ml-2" src={cogimg} alt="plusicon" /></NavLink></Form.Label>
                            <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" value={projectcat} onChange={e => setprojectcat(e.target.value)}>
                                {pcat.pcat_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.category_name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Deadline *</Form.Label>
                            <div className="d-flex align-items-center">
                                {deadlinecheck === true &&
                                <Form.Control className="w-75 h-50px mr-4 border_lightparagraphcolor_1 border-radius-15" type="date" value={deadline} onChange={e => setdeadline(e.target.value)} placeholder="" />}
                                <div key='inline-checkbox' className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" value={deadlinecheck} onChange={(e) => setdeadlinecheck(!deadlinecheck)} inline label="Without deadline" type='checkbox' id='inline-checkbox-1' />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Start Date</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="date" value={startdate} onChange={e => setstartdate(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Address</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" value={projectaddress} onChange={e => setprojectaddress(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Summary</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={summary}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setsummary(data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Note</Form.Label>
                            <Form.Control className="border-radius-15 bodycolorbg" as="textarea" rows={5} value={note} onChange={e => setnote(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="card_dashboard card card-body whitecolorbg px-4 mb-4">
                    <h4 className="main_title fontsize18 mb-4 px-0">Client Info</h4>
                    <div className="row">
                        <div className="col-lg-12">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Select Client* <NavLink onClick={() => setModalShowClient(true)} to="#" className="blusecolorbg p-1 border-radius-5 ml-2"><img className="img-fluid" src={plusiconimg} alt="" /></NavLink></Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" value={clients} onChange={e => setclients(e.target.value)}>
                                    <option>Choose Client</option>
                                    {clientslist.clientslist_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.name}</option>
                                        )
                                    })}
                                </Form.Control>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-0 ml-3">
                                        <Form.Check className="fontsize14 fontweightregular" inline label="Allow manual time logs?" type={type} id={`inline-${type}-1`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_dashboard card card-body whitecolorbg px-4">
                    <h4 className="main_title fontsize18 mb-4 px-0">Budget Info</h4>
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Budget</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" value={projectbudjet} onChange={e => setprojectbudjet(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Currency</Form.Label>
                            <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" value={currency} onChange={e => setcurrency(e.target.value)}>
                                {currencylist.currencylist_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.currency_name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Hours Allocated</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" value={hourallocated} onChange={e => sethourallocated(e.target.value)} placeholder="" />
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4">
                            <Form.Label className="mb-2 fontsize14 fontweightregular">Project Status</Form.Label>
                            <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" value={projectstatus} onChange={e => setprojectstatus(e.target.value)}>
                                <option
                                    value="not started">Not Started
                                </option>
                                <option
                                    value="in progress">In Progress
                                </option>
                                <option
                                    value="on hold">on Hold
                                </option>
                                <option
                                    value="canceled">Canceled
                                </option>
                                <option
                                    value="finished">Finished
                                </option>
                            </Form.Control>
                        </div>
                        <div className="col-lg-12">
                            <Button variant="" type="submit" className="w-100px btn btn_blue mr-2"><img className="img-fluid mr-2" src={checkiconimg} alt="checkicon" /> Update</Button>
                        </div>
                    </div>

                </div>
            </Form>
            {/*  */}
            <Modal show={modalShowcategory} onHide={() => setModalShowcategory(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter"> Project Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitPcatform}>
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
                                    {pcat.pcat_Array.map((val, index) => {
                                        let number = index + 1;
                                        return (
                                            <ProjectCategoryModalLoop
                                                key={index}
                                                cid={val.id}
                                                countnumer={number}
                                                name={val.category_name}
                                                remove="Remove"
                                                DeleteProjectCategory={DeleteProjectCategory}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>

                            <FormLabel className="mb-3">Category Name</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={ShowcategoryNameInput} onChange={e => setShowcategoryNameInput(e.target.value)} placeholder="" />

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowcategory(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* task categor */}
            <Modal show={modalShowAssign} onHide={() => setModalShowAssign(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Employee Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitEmpForm}>
                    <Modal.Body className="p-0 my-4">
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Employee ID*</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={empid} onChange={e => setempid(e.target.value)} />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Employee Name*</FormLabel>
                                <Form.Control className="transparent_form h-50px" type="text" required value={empname} onChange={e => setempname(e.target.value)} />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Employee Email*</FormLabel>
                                <Form.Control className="transparent_form h-50px" type="email" required value={empemail} onChange={e => setempemail(e.target.value)} />
                                <small>Employee will login using this email.</small>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Password*</FormLabel>
                                <Form.Control className="transparent_form h-50px" required minlength="6" type="password" value={emppassword} onChange={e => setemppassword(e.target.value)} />
                                <small>Employee will login using this password.</small>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Designation*</FormLabel>
                                <Form.Control className="transparent_form h-50px" required as="select" value={empdesignation} onChange={e => setempdesignation(e.target.value)}>
                                    <option value="" selected>Select Designation</option>
                                    {designation.designation_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Department*</FormLabel>
                                <Form.Control className="transparent_form h-50px" required as="select" value={empdepartment} onChange={e => setempdepartment(e.target.value)}>
                                    <option value="" selected>Select Department</option>
                                    {departments.departments_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.team_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Joining Date*</FormLabel>
                                <Form.Control className="transparent_form h-50px" type="date" required value={empdob} onChange={e => setempdob(e.target.value)} />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Gender*</FormLabel>
                                <Form.Control className="transparent_form h-50px" required as="select" value={empgender} onChange={e => setempgender(e.target.value)}>
                                    <option value="" selected>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg w-100px" onClick={() => setModalShowAssign(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={modalShowClient} onHide={() => setModalShowClient(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Client Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitClientForm}>
                    <Modal.Body className="p-0 my-4">
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Client Name*</FormLabel>
                                <Form.Control className="transparent_form h-50px" required type="text" value={clientname} onChange={e => setclientname(e.target.value)} />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Client Email*</FormLabel>
                                <Form.Control className="transparent_form h-50px" type="email" required value={clientemail} onChange={e => setclientemail(e.target.value)} />
                                <small>Client will login using this email.</small>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Password*</FormLabel>
                                <Form.Control className="transparent_form h-50px" type="password" required minlength="6" value={clientpassword} onChange={e => setclientpassword(e.target.value)} />
                                <small>Client will login using this password.</small>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg w-100px" onClick={() => setModalShowClient(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default Edit;

