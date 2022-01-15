import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, FormControl, InputGroup, Dropdown, DropdownButton, Modal, Form, FormLabel } from "react-bootstrap";
import ReactTagInput from "@pathofdev/react-tag-input";
import LoadingOverlay from 'react-loading-overlay';
// 
import checkiconimg from "../../../../../assets/images/checkicon.svg";
import cogimg from "../../../../../assets/images/cogimg.svg";
import avatarprofile from "../../../../../assets/images/avatar_dummy.svg";
import dateFormat from 'dateformat';

const Edit_Employe = (props) => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    // For Image
    const [selectedImage, setSelectedImage] = useState('');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    const [modalShowDesignation, setModalShowDesignation] = React.useState(false);
    const [designationinput, setdesignationinput] = useState('');
    const [modalShowDepartment, setModalShowDepartment] = React.useState(false);
    const [departmentinput, setdepartmentinput] = useState('');

    const [empid, setempid] = useState('');
    const [empname, setempname] = useState('');
    const [empemail, setempemail] = useState('');
    const [emppassword, setemppassword] = useState('');
    const [empdesignation, setempdesignation] = useState('');
    const [empdepartment, setempdepartment] = useState('');
    const [gender, setgender] = useState('');
    const [empslack, setempslack] = useState('');
    const [doj, setdoj] = useState('');
    const [dox, setdox] = useState('');
    const [address, setaddress] = useState('');
    const [skills, setskills] = useState([]);
    const [empphonecode, setempphonecode] = useState('');
    const [number, setnumber] = useState('');
    const [hourrate, sethourrate] = useState('');
    const [status, setstatus] = useState('');
    const [loginstatus, setloginstatus] = useState('');
    const [language, setlanguage] = useState('');
    const [emailnoti, setemailnoti] = useState('');
    const handleChangeEmailNotification = e => {
        const value = e.target.value;
        setemailnoti(value)
    };
    const [departments, setdepartments] = useState({
        departments_Array: []
    });
    const [designation, setdesignation] = useState({
        designation_Array: []
    });
    const [countries, setcountries] = useState({
        countries_Array: []
    });
    const [empdata, setempdata] = useState({
        empdata_Array: []
    });
    // Load Data
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/edit/'+props.match.params.id+'/'+companyid)
            .then((response) => {
                setempid(response.data.data.employeeDetail.employee_id);
                setempname(response.data.data.userDetail.name);
                setempemail(response.data.data.userDetail.email);
                setempdesignation(response.data.data.employeeDetail.designation_id);
                setempdepartment(response.data.data.employeeDetail.department_id);
                setgender(response.data.data.userDetail.gender);
                setempslack(response.data.data.employeeDetail.slack_username);
                setdoj(dateFormat(response.data.data.employeeDetail.joining_date,'yyyy-mm-dd'));
                setdox(dateFormat(response.data.data.employeeDetail.last_date,'yyyy-mm-dd'));
                setaddress(response.data.data.employeeDetail.address);
               // setskills(response.data.data.userDetail.skills);
                setempphonecode(response.data.data.userDetail.country_id);
                setnumber(response.data.data.userDetail.mobile);
                sethourrate(response.data.data.employeeDetail.hourly_rate);
                setstatus(response.data.data.userDetail.status);
                setloginstatus(response.data.data.userDetail.login);
                setemailnoti(response.data.data.userDetail.email_notifications);
                setempdata({ empdata_Array: response.data.data.userDetail ? response.data.data.userDetail : [], });
                setdepartments({ departments_Array: response.data.data.teams ? response.data.data.teams : [], });
                setdesignation({ designation_Array: response.data.data.designations ? response.data.data.designations : [], });
                setcountries({ countries_Array: response.data.data.countries ? response.data.data.countries : [], });
            })
            .catch((error) => {

            });
    }, [])
    //Insert Employee
    const HandleSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('company_id', companyid);
        data.append('employee_id', empid);
        data.append('name', empname);
        data.append('email', empemail);
        data.append('password', emppassword);
        data.append('slack_username', empslack);
        data.append('designation', empdesignation);
        data.append('department', empdepartment);
        data.append('gender', gender);
        data.append('companyid', companyid);
        data.append('joining_date', doj);
        data.append('last_date', dox);
        data.append('address', address);
        data.append('tags', skills);
        data.append('phone_code', empphonecode);
        data.append('mobile', number);
        data.append('hourly_rate', hourrate);
        data.append('status', status);
        data.append('login', loginstatus);
        data.append('email_notifications', emailnoti);
        data.append('image', selectedImage);
        axios.post(Globalsettings.url + 'api/admin/employees/update/'+props.match.params.id+'/'+companyid, data).then(response => {
            if(response.data.type == 'success'){
                toast.success("Employee Updated Successfully!");
                setLoading(false);
                setTimeout(() => { 
                    history.push(`${process.env.PUBLIC_URL}/employee-list`);
                }, 3000);
            }else{
                setLoading(false);
                toast.error(response.data.message);
            }

        }).catch(function (error) {
            toast.error('something went wrong');
        });
        evt.preventDefault();
    }
    //Insert Department
    const SubmitDepartmentform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/department/quick-store', {
            department_name: departmentinput,
            company_id: companyid
        }).then(response => {
            toast.success("Department Successfully Inserted!");
            setModalShowDepartment(false);
            axios.get(Globalsettings.url + 'api/admin/employees/create/' + companyid)
                .then(response => {
                    setdepartments({ departments_Array: response.data.teams ? response.data.teams : [], });
                });
        });
        evt.preventDefault();
    }
    //Insert Designation
    const SubmitDesignationform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/designations/quick-store', {
            designation_name: designationinput,
            company_id: companyid
        }).then(response => {
            toast.success("Designation Successfully Inserted!");
            setModalShowDesignation(false);
            axios.get(Globalsettings.url + 'api/admin/employees/create/' + companyid)
                .then(response => {
                    setdesignation({ designation_Array: response.data.designations ? response.data.designations : [], });
                }); 
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Employee Info [ {empname} ]</h4>
            </div>
            {/*  */}
            <Form onSubmit={HandleSubmit}>
                <div className="card_dashboard card card-body mb-4 whitecolorbg">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Employee ID</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="id" required value={empid} onChange={e => setempid(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Employee Name </Form.Label>
                            <Form.Control className="h-45px transparent_form" type="text" required value={empname} onChange={e => setempname(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Employee Email</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="email" required value={empemail} onChange={e => setempemail(e.target.value)} />
                            <small>Employee will login using this email</small>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Password</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="password" minLength="6" value={emppassword} onChange={e => setemppassword(e.target.value)} />
                            <small>Employee will login using this password. (Leave blank to keep current password)</small>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Slack Username</Form.Label>
                            <InputGroup className="d-flex">
                                
                                <FormControl className="h-45px transparent_form" placeholder="" required value={empslack} onChange={e => setempslack(e.target.value)} />
                            </InputGroup>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Joining Date</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="date" required value={doj} onChange={e => setdoj(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Exit Date</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="date" value={dox} onChange={e => setdox(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Gender </Form.Label>
                            <Form.Control name="" className="h-45px transparent_form" as="select" required value={gender} onChange={e => setgender(e.target.value)}>
                                <option>Select Gender</option>
                                <option value="male">Male</option>
                                <option vlaue="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Address</Form.Label>
                            <Form.Control as="textarea" className="transparent_form" required rows={5} value={address} onChange={e => setaddress(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Skills</Form.Label>
                            <ReactTagInput
                                tags={skills}
                                onChange={(newTags) => setskills(newTags)}
                            />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Designation <NavLink onClick={() => setModalShowDesignation(true)} to="#" className=""><img className="img-fluid ml-1" width="15" src={cogimg} alt="plusicon" /></NavLink></Form.Label>
                            <Form.Control name="" className="h-45px transparent_form" required as="select" value={empdesignation} onChange={e => setempdesignation(e.target.value)}>
                                <option value="" selected>Select Designation</option>
                                {designation.designation_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Department <NavLink onClick={() => setModalShowDepartment(true)} to="#" className=""><img className="img-fluid ml-1" width="15" src={cogimg} alt="plusicon" /></NavLink></Form.Label>
                            <Form.Control name="" className="h-45px transparent_form" as="select" required value={empdepartment} onChange={e => setempdepartment(e.target.value)}>
                                <option value="" selected>Select Department</option>
                                {departments.departments_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.team_name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <FormLabel className="mb-2">Phone Number*</FormLabel>
                            <InputGroup className="for_all">
                            <Form.Control name="" className="h-45px transparent_form" as="select" required value={empphonecode} onChange={e => setempphonecode(e.target.value)}>
                            <option value="" selected>Select Code</option>
                                    {countries.countries_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.phonecode} ({val.iso})</option>
                                        )
                                    })}
                            </Form.Control>
                                <FormControl className="transparent_form h-45px fontsize14" aria-describedby="basic-addon1" value={number} onChange={e => setnumber(e.target.value)} />
                            </InputGroup>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Hourly Rate (USD)</Form.Label>
                            <Form.Control className="h-45px transparent_form" type="text" value={hourrate} onChange={e => sethourrate(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Status</Form.Label>
                            <Form.Control name="" className="h-45px transparent_form" as="select" value={status} onChange={e => setstatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Log In</Form.Label>
                            <Form.Control name="" className="h-45px transparent_form" required as="select" value={loginstatus} onChange={e => setloginstatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2 ">Email Notifications</Form.Label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <Form.Check type="radio" name="EmailNotification" checked={emailnoti == 1 && 'true'} required className="d-flex m-0 align-items-center" aria-label="radio 3" label=" Enable" value="1" onChange={handleChangeEmailNotification} />
                                </div>
                                <div className="ml-2">
                                    <Form.Check type="radio" name="EmailNotification" checked={emailnoti == 0 && 'true'} required className="d-flex align-items-center" aria-label="radio 3" label=" Disable" value="0" onChange={handleChangeEmailNotification} />
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 mb-4">
                            <div className="p-3 border-radius-15 bodycolorbg">
                                <div className="mb-3 p-2 bg-white text-center">
                                    {(() => {
                                        if (selectedImage) {
                                            return (
                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage)} alt="" />
                                            )
                                        } else {
                                            return (
                                                <img width="160" className="img-thumnail" src={empdata.empdata_Array.image_url} alt="" />
                                            )
                                        }
                                    })()}
                                </div>
                                <Form.Control
                                    className="w-100px btn"
                                    type="file"
                                    id="inputGroupFile01"
                                    label="Upload Boundary File"
                                    onChange={imageChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Button variant="" type="submit" className="w-100px btn btn_blue mr-2"><img className="img-fluid mr-2" src={checkiconimg} alt="checkicon" /> Update</Button>
                        </div>
                    </div>
                </div>
            </Form>
            {/* task categor */}
            <Modal show={modalShowDesignation} onHide={() => setModalShowDesignation(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Designation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitDesignationform}>
                    <Modal.Body className="p-0 my-4">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" required value={designationinput} onChange={e => setdesignationinput(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg w-100px" onClick={() => setModalShowDesignation(false)}>Close</Button>
                        <Button variant="" type="sunmit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* task categor */}
            <Modal show={modalShowDepartment} onHide={() => setModalShowDepartment(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Department</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitDepartmentform}>
                    <Modal.Body className="p-0 my-4">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" required value={departmentinput} onChange={e => setdepartmentinput(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg w-100px" onClick={() => setModalShowDepartment(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Edit_Employe;