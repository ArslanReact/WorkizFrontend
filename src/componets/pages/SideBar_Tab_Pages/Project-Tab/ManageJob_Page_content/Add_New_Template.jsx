import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { InputGroup, Button, Modal, FormControl, Form, FormLabel, } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 
import ProjectCategoryModalLoop from "../../Project-Tab/ManageJob_Page_content/ProjectCategoryModalLoop";

// 
import checkiconimg from "../../../../../assets/images/checkicon.svg";


const Add_New_Template = () => {
    const history = useHistory();
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    // Company

    // Show Category
    const [modalShow, setModalShow] = useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');

    // input State 
    const [projectname, setprojectname] = useState('');
    const [projectcat, setprojectcat] = useState('');
    const [clientcanmanage, setclientcanmanage] = useState(false);
    const [sendtasknotification, setsendtasknotification] = useState(false);
    const [allowmanual, setallowmanual] = useState(false);
    const [summary, setsummary] = useState('');
    const [note, setnote] = useState('');
    // Pre Load Data
    const [pcat, setpcat] = useState({
        pcat_Array: []
    });
    // Load Data
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/project-template/create')
            .then((response) => {
                setpcat({ pcat_Array: response.data.categories ? response.data.categories : [], });
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
            setModalShow(false);
            axios.post(Globalsettings.url + 'api/admin/projects/create', {
                companyid: companyid
            })
                .then(response => {
                    setpcat({ pcat_Array: response.data.categories ? response.data.categories : [], });
                    setShowcategoryNameInput('');
                });
        }
        evt.preventDefault();
    }
    // Insert Inventory
    const handleSubmit = (evt) => {
        const data = new FormData();
        data.append('project_name', projectname);
        data.append('category_id', projectcat);
        data.append('client_view_task', clientcanmanage);
        data.append('client_task_notification', sendtasknotification);
        data.append('manual_timelog', allowmanual);
        data.append('project_summary', summary);
        data.append('notes', note);
        axios.post(Globalsettings.url + 'api/admin/project-template/store', data).then((response) => {
            toast.success("Project Template Successfully Inserted!");
            history.push("/project_template");
        }).catch(function (error) {
            history.push("/project_template");
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
            <ToastContainer />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title px-0">Add New Template</h4>
                </div>
            </div>
            {/*  */}
            <Form onSubmit={handleSubmit}>
                <div className="card_dashboard card card-body whitecolorbg">
                    <div className="d-flex align-items-center">
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-3">Job Name</FormLabel>
                            <div className="grey_form">
                                <InputGroup>
                                    <FormControl className="h-50px" placeholder="Job Name" aria-describedby="basic-addon1" value={projectname} onChange={e => setprojectname(e.target.value)} />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <FormLabel className="mb-3">Job Category <NavLink to="#" onClick={() => setModalShow(true)} className="d-inline-block border-radius-100 fontsize12 ml-2 purplecolorbg text-white py-1 px-3">Add Job Category</NavLink></FormLabel>
                            <div className="grey_form">
                                <Form.Group className="m-0" controlId="exampleForm.ControlSelect1">
                                    {/* <Form.Label>Example select</Form.Label> */}
                                    <Form.Control className="h-50px" as="select" value={projectcat} onChange={e => setprojectcat(e.target.value)}>
                                        <option>Select Category</option>
                                        {pcat.pcat_Array.map((val, index) => {
                                            return (
                                                <option value={val.id} key={index}>{val.category_name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="d-flex align-items-center mb-5">
                        <div className="col-xl-4 col-lg-12">
                            <div>
                                <Form.Check inline label="Client can manage tasks of this Job" id="clientcanmanage" value={clientcanmanage} onChange={(e) => { setclientcanmanage(e.target.checked); }} />
                            </div>
                        </div>
                        {clientcanmanage &&
                            <div className="col-xl-4 col-lg-12">
                                <div>
                                    <Form.Check inline label="Send task notification to client?" id="sendtasknotification" value={sendtasknotification} onChange={e => setsendtasknotification(e.target.value)} />
                                </div>
                            </div>
                        }
                        <div className="col-xl-4 col-lg-12">
                            <div>
                                <Form.Check inline label="Allow manual time logs?" id="allowmanual" value={allowmanual} onChange={e => setallowmanual(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mb-5">
                        <h4 className="main_title mb-3 px-0">Job Summary</h4>
                        <CKEditor
                            className="h-100"
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
                    <div className="col-lg-12 mb-5">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="mb-3 fontsize16">Note</Form.Label>
                            <Form.Control className="bodycolorbg" as="textarea" rows={5} value={note} onChange={e => setnote(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-lg-12 mb-5">
                        <Button variant="" type="submit" className="blusecolorbg text-white"><img className="img-fluid mr-2" src={checkiconimg} alt="checkicon" /> Save</Button>
                    </div>
                </div>
            </Form>
            {/* task categor */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Pinned Project</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitPcatform}>
                    <Modal.Body className="p-0 my-4">
                        <div class="table-sm-responsive">
                            <table class="table table-borderless">
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
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShow(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Add_New_Template;