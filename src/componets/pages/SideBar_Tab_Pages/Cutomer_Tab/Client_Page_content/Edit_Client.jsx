import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal, Button, InputGroup, FormControl, Dropdown, DropdownButton, Form, FormLabel } from "react-bootstrap";

// 
import DataTableLoopModalOne from "../../Cutomer_Tab/Client_Page_content/DataTableLoopModalOne";
import DataTableLoopModalTwo from "../../Cutomer_Tab/Client_Page_content/DataTableLoopModalTwo";


// 
import cogimg from "../../../../../assets/images/cogimg.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";

const Edit_Client = (props) => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // Client Category
    const [clientcatShow, setclientcatShow] = useState(false);
    const handleClientCatClose = () => setclientcatShow(false);
    const handleClientCatShow = () => setclientcatShow(true);
    const [ClientCatNameInput, setClientCatNameInput] = useState('');
    // Client Sub Category
    const [clientsubcatShow, setclientsubcatShow] = useState(false);
    const handleClientSubCatClose = () => setclientsubcatShow(false);
    const handleClientSubCatShow = () => setclientsubcatShow(true);
    const [ClientSubCatMainCatNameInput, setClientSubCatMainCatNameInput] = useState('');
    const [ClientSubCatNameInput, setClientSubCatNameInput] = useState('');

    // input State 
    const [clientname, setclientname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [companyname, setcompanyname] = useState('');
    const [website, setwebsite] = useState('');
    const [address, setaddress] = useState('');
    const [mobile, setmobile] = useState('');
    const [mobilecode, setmobilecode] = useState('');
    const [officephoneno, setofficephoneno] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [postalcode, setpostalcode] = useState('');
    const [clientcat, setclientcat] = useState('');
    const [clientsubcat, setclientsubcat] = useState('');
    const [skype, setskype] = useState('');
    const [Linkedin, setLinkedin] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [Facebook, setFacebook] = useState('');
    const [gstnumber, setgstnumber] = useState('');
    const [shippingaddress, setshippingaddress] = useState('');
    const [EmailNotification, setEmailNotification] = useState(0);
    const [Note, setNote] = useState('');
    const handleChangeEmailNotification = e => {
        const value = e.target.value;
        setEmailNotification(value);
    };
    // Pre Load Data
    const [clientcatarray, setclientcatarray] = useState({
        clientcatarray_Array: []
    });
    const [clientsubcatarray, setclientsubcatarray] = useState({
        clientsubcatarray_Array: []
    });
    const [countries, setcountries] = useState({
        countries_Array: []
    });
    // Load Data
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(async () => {
        setLoading(true);
        await axios.get(Globalsettings.url + 'api/admin/clients/edit/' + companyid + '/' + props.match.params.id)
            .then((response) => {
                setclientcatarray({ clientcatarray_Array: response.data.categories ? response.data.categories : [], });
                setclientsubcatarray({ clientsubcatarray_Array: response.data.subcategories ? response.data.subcategories : [], });
                setcountries({ countries_Array: response.data.countries ? response.data.countries : [], });
                setclientname(response.data.clientDetail.name);
                setemail(response.data.clientDetail.email);
                setcompanyname(response.data.clientDetail.company_name);
                setwebsite(response.data.clientDetail.website);
                setaddress(response.data.clientDetail.address);
                setmobile(response.data.clientDetail.mobile);
                setmobilecode(response.data.clientDetail.country_id);
                setofficephoneno(response.data.clientDetail.office_phone);
                setcity(response.data.clientDetail.city);
                setstate(response.data.clientDetail.state);
                setpostalcode(response.data.clientDetail.postal_code);
                setclientcat(response.data.clientDetail.category_id);
                setclientsubcat(response.data.clientDetail.sub_category_id);
                setskype(response.data.clientDetail.skype);
                setLinkedin(response.data.clientDetail.linkedin);
                setFacebook(response.data.clientDetail.facebook);
                setgstnumber(response.data.clientDetail.gst_number);
                setshippingaddress(response.data.clientDetail.shipping_address);
                setEmailNotification(response.data.clientDetail.email_notifications);
                if(response.data.clientDetail.note == null){
                    setNote('');
                }else{
                    setNote(response.data.clientDetail.note);
                }
                setLoading(false);
            })
            .catch((error) => {

            });
    }, [])
    //Insert Prod cat
    const SubmitClientCatForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/clientCategory', {
            category_name: ClientCatNameInput
        }).then((response1) => {
                toast.success("Category Successfully Inserted!");
                setclientcatarray({ clientcatarray_Array: response1.data.data ? response1.data.data : [], });
                setclientcatShow(false);
            });
        evt.preventDefault();
    }
    //Insert Prod Sub Cat
    const SubmitClientSubCatForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/clientSubCategory', {
            category_id: ClientSubCatMainCatNameInput,
            category_name: ClientSubCatNameInput
        }).then((response1) => {
                toast.success("Sub Category Successfully Inserted!");
                setclientsubcatarray({ clientsubcatarray_Array: response1.data.data ? response1.data.data : [], });
                setclientsubcatShow(false);
            });
        evt.preventDefault();
    }

    // Insert Client
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/clients/update/' + companyid + '/' + props.match.params.id, {
            id: props.match.params.id,
            name: clientname,
            email: email,
            password: password,
            company_name: companyname,
            company_id: companyid,
            website: website,
            address: address,
            phone_code: mobilecode,
            mobile: mobile,
            office_phone: officephoneno,
            city: city,
            state: state,
            postal_code: postalcode,
            category_id: clientcat,
            sub_category_id: clientsubcat,
            skype: skype,
            linkedin: Linkedin,
            twitter: Twitter,
            facebook: Facebook,
            gst_number: gstnumber,
            shipping_address: shippingaddress,
            note: Note,
            email_notifications: EmailNotification,
        }).then((response) => {
            toast.success("Client Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/client`);
            }, 3000);
        });
        evt.preventDefault();
    }

    const GetSubCatByMainCatId = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/getsubcat/'+id)
            .then(response => {
                setLoading(false);
                setclientsubcatarray({ clientsubcatarray_Array: response.data.subcategories ? response.data.subcategories : [], });
            });
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Client Info</h4>
            </div>
            {/*  */}
            <Form onSubmit={handleSubmit}>
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard p-3">
                        <h4 className="main_title fontsize18 mb-4">Client Detail</h4>
                        <div className="row">
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Client Name*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="text" placeholder="" value={clientname} onChange={e => setclientname(e.target.value)} />
                            </div>
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Client Email*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="email" placeholder="" value={email} onChange={e => setemail(e.target.value)} />
                                <small>Client will login using this email.</small>
                            </div>
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Password*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="password" minlength="8" placeholder="" value={password} onChange={e => setpassword(e.target.value)} />
                                <small>Client will login using this password.</small>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard p-3">
                        <h4 className="main_title fontsize18 mb-4">Company Detail</h4>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Company Name*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="text" placeholder="" value={companyname} onChange={e => setcompanyname(e.target.value)} />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Website*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" value={website} onChange={e => setwebsite(e.target.value)} />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-2">Address*</FormLabel>
                                <Form.Control className="transparent_form fontsize14" required as="textarea" rows={5} value={address} onChange={e => setaddress(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Phone Number*</FormLabel>
                                <InputGroup className="for_all">
                                    <select name="" className="h-45px transparent_form w-120px" required value={mobilecode} onChange={e => setmobilecode(e.target.value)}>
                                    <option value="" selected>Select Code</option>
                                            {countries.countries_Array.map((val) => {
                                                return (
                                                    <option value={val.id}>{val.phonecode} ({val.iso})</option>
                                                )
                                    })}                
                                    </select>
                                        <FormControl className="transparent_form h-45px fontsize14" aria-describedby="basic-addon1" value={mobile} onChange={e => setmobile(e.target.value)} />
                                </InputGroup>
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Office Phone Number*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" placeholder="" value={officephoneno} onChange={e => setofficephoneno(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">City*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="text" placeholder="" value={city} onChange={e => setcity(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">State*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="text" placeholder="" value={state} onChange={e => setstate(e.target.value)} />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Postal Code*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" required type="number" placeholder="" value={postalcode} onChange={e => setpostalcode(e.target.value)} />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Client Category* <NavLink onClick={() => handleClientCatShow(true)} to="#" className="ml-2"><img className="img-fluid" width="12" src={cogimg} alt="" /></NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" required value={clientcat} onChange={e => {setclientcat(e.target.value); GetSubCatByMainCatId(e.target.value)}}>
                                    <option value="">No Category Selected</option>
                                    {clientcatarray.clientcatarray_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.category_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Client SubCategory* <NavLink onClick={() => handleClientSubCatShow(true)} to="#" className="ml-2"><img className="img-fluid" width="12" src={cogimg} alt="" /></NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" required value={clientsubcat} onChange={e => setclientsubcat(e.target.value)}>
                                    <option value="">Select Sub Category</option>
                                    {clientsubcatarray.clientsubcatarray_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.category_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard p-3">
                        <h4 className="main_title fontsize18 mb-4">Client Other Details</h4>
                        <div className="row">
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Skype*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" value={skype} onChange={e => setskype(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Linkedin*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" value={Linkedin} onChange={e => setLinkedin(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Twitter*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" value={Twitter} onChange={e => setTwitter(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Facebook*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" value={Facebook} onChange={e => setFacebook(e.target.value)} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">GST Number*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" placeholder="" value={gstnumber} onChange={e => setgstnumber(e.target.value)} />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-2">Shipping Address*</FormLabel>
                                <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} value={shippingaddress} onChange={e => setshippingaddress(e.target.value)} />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-2">Note*</FormLabel>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={Note}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setNote(data);
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="mb-4 align-self-end col-4">
                                <FormLabel className="mb-3">Email Notifications*</FormLabel>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <Form.Check type="radio" name="EmailNotification" required checked={EmailNotification == 1} className="d-flex m-0 align-items-center" aria-label="radio 3" label=" Enable" value="1" onChange={handleChangeEmailNotification} />
                                    </div>
                                    <div className="ml-2">
                                        <Form.Check type="radio" name="EmailNotification" required checked={EmailNotification == 0} className="d-flex align-items-center" aria-label="radio 3" label=" Disable" value="0" onChange={handleChangeEmailNotification} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col p-0 mt-3">
                            <Button variant="" type="submit" className="px-2 btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                        </div>
                    </div>
                </div>
            </Form>
            {/* task categor */}
            <Modal show={clientcatShow} onHide={handleClientCatClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Client Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitClientCatForm}>
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
                                    {clientcatarray.clientcatarray_Array.map((val, index) => {
                                        let number = index + 1;
                                        return (
                                            <DataTableLoopModalOne
                                                key={index}
                                                countnumber={number}
                                                name={val.category_name}
                                                remove="Remove"
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                            <FormLabel className="mb-2">Add Category Name*</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" placeholder="Enter Category Name" value={ClientCatNameInput} onChange={e => setClientCatNameInput(e.target.value)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={handleClientCatClose}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* task categor */}
            <Modal show={clientsubcatShow} onHide={handleClientSubCatClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Client SubCategory</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitClientSubCatForm}>
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
                                    {clientsubcatarray.clientsubcatarray_Array.map((val, index) => {
                                        let number = index + 1;
                                        return (
                                            <DataTableLoopModalTwo
                                                key={index}
                                                countnumber={number}
                                                name={val.category_name}
                                                remove="Remove"
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>

                            <FormLabel className="mb-2">Client Category*</FormLabel>
                            <Form.Control as="select" className="transparent_form fontsize14 h-45px" value={ClientSubCatMainCatNameInput} onChange={e => setClientSubCatMainCatNameInput(e.target.value)}>
                                <option>Select Category</option>
                                {clientcatarray.clientcatarray_Array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.category_name}</option>
                                    )
                                })}
                            </Form.Control>
                            <div className="mt-4">
                                <FormLabel className="mb-2">Subcategory Name*</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" placeholder="" value={ClientSubCatNameInput} onChange={e => setClientSubCatNameInput(e.target.value)} />
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14" onClick={handleClientSubCatClose}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue"> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Edit_Client;