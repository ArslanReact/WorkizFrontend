import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { Form, FormLabel, Button } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
// 
import checkicon from "../../../../assets/images/checkicon.svg";

const EditNotice = (props) => {
    const [title, settitle] = useState('');
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const [nto, setnto] = useState('');
    const [description, setdescription] = useState("");
    const [departmentid, setdepartmentid] = useState('');
    const [preimage, setpreimage] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    // Pre Load Data Department
    const [departments, setdepartments] = useState({
        departments_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/notices/edit/' + props.match.params.id)
            .then((response) => {
                setdepartments({ departments_Array: response.data.teams ? response.data.teams : [], });
                settitle(response.data.notice.heading);
                settitle(response.data.notice.heading);
                setdepartmentid(response.data.notice.department_id);
                if (response.data.notice.description) {
                    setdescription(response.data.notice.description);
                }
                setpreimage(response.data.notice.file_url);
                setnto(response.data.notice.to);


            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    // Update Notice
    const handleSubmit = (evt) => {
        const data = new FormData();
        data.append('heading', title);
        data.append('to', nto);
        data.append('description', description);
        data.append('team_id', departmentid);
        data.append('file', selectedImage);
        axios.post(Globalsettings.url + 'api/admin/notices/update/' + props.match.params.id, data).then((response) => {
            toast.success("Notice Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/notice_board`);
            }, 3000)
        });
        evt.preventDefault();
    }
    return (
        <>
                    <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Notice</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Notice Heading</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={title} onChange={e => settitle(e.target.value)} />
                        </div>
                        <div className="form-group mb-4">
                            <div className="d-flex">
                                <div className="mr-3 d-flex">
                                    <Form.Check type="radio" name="radio" aria-label="radio 1" label="To Employees" value="employee" checked={nto === 'employee'} onChange={e => setnto(e.target.value)} />
                                </div>
                                <div className="d-flex">
                                    <Form.Check type="radio" name="radio" aria-label="radio 1" label="To Client" value="client" checked={nto === 'client'} onChange={e => setnto(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <FormLabel className="mb-2">Department</FormLabel>
                            <Form.Control className="transparent_form h-45px" as="select" value={departmentid} onChange={e => setdepartmentid(e.target.value)}>
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
                            <div className="p-3 border-radius-15 bodycolorbg">
                                <div className="mb-3 p-2 bg-white text-center">
                                    {(() => {
                                        if (selectedImage) {
                                            return (
                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage)} alt="" />
                                            )
                                        } else {
                                            return (
                                                <img width="160" className="img-thumnail" src={preimage} alt="" />
                                            )
                                        }
                                    })()}
                                </div>
                                {/* <Form.File
                                    className="w-100px btn btn_blue"
                                    type="file"
                                    id="inputGroupFile01"
                                    label="Upload Boundary File"
                                    custom
                                    onChange={imageChange}
                                /> */}
                            </div>
                        </div>
                        <div className="btn-group">
                            <Button type="submit" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditNotice;
