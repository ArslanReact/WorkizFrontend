import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { Form, FormLabel, Button } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
// 
import checkicon from "../../../../assets/images/checkicon.svg";
import LoadingOverlay from 'react-loading-overlay';
const AddNewNotice = (props) => {
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const [title, settitle] = useState('');
    const [nto, setnto] = useState('');
    const [description, setdescription] = useState("");
    const [departmentid, setdepartmentid] = useState('');
    const [attachfile, setattachfile] = useState(0);
    // Pre Load Data Department
    const [departments, setdepartments] = useState({
        departments_Array: []
    });
    // Load Data
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/employees/teams')
            .then((response) => {
                setLoading(false);
                setdepartments({ departments_Array: response.data.depts ? response.data.depts : [], });
            })
            .catch((error) => {
                toast.error("Error");
                setLoading(false);

            });
    }, [])
    // handle File Selected
    const HandleFileSelected = (e) => {

        setattachfile(e.target.files[0])
    }
    // Insert Notice
    const handleSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('comapny_id', companyid);
        data.append('heading', title);
        data.append('to', nto);
        data.append('description', description);
        data.append('team_id', departmentid);
        data.append('file', attachfile);
        axios.post(Globalsettings.url + 'api/admin/notices/store', data).then((response) => {
            toast.success("Notice Successfully Inserted!");
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/notice_board`);
            }, 5000)
            
            setLoading(false);
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title"> Add New Notice</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Notice Heading</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" required value={title} onChange={e => settitle(e.target.value)} placeholder="" />
                        </div>
                        <div className="form-group mb-4">
                            <div className="d-flex align-items-center">
                                <div>
                                    <Form.Check type="radio" name="Credential" required onChange={e => setnto(e.target.value)} value="employee" className="d-flex align-items-center" aria-label="radio 1" label=" To Employees"  />
                                </div>
                                <div className="ml-2">
                                    <Form.Check type="radio" name="Credential" required onChange={e => setnto(e.target.value)} value="client" className="d-flex align-items-center" aria-label="radio 1" label=" To Client" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Department</FormLabel>
                            <Form.Control className="transparent_form h-45px" as="select" value={departmentid} required onChange={e => setdepartmentid(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.departments_Array.map((val, index) => {
                                    return (
                                        <option value={val.id} key={index}>{val.team_name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Notice Details</FormLabel>
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
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Attachment</FormLabel>
                            <div className="input-group col-xs-12">
                                <Form.Control type="file" className="transparent_form fontsize14 " placeholder="Name" onChange={(e) => HandleFileSelected(e)} />
                              
                            </div>
                        </div>
                        <div className="btn-group">
                            <Button type="submit" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddNewNotice;
