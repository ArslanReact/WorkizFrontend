import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink,useHistory } from 'react-router-dom';
import { Form, Modal, Button, FormLabel } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 
import DataTableLoopModalOne from "../../Project-Tab/Contract_Page_content/DataTableLoopModalOne";
import DataTableLoopModalOneArray from "../../Project-Tab/Contract_Page_content/DataTableLoopModalOneArray";


// 
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import checkiconimg from "../../../../../assets/images/checkicon.svg";

const Create_Contract = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [contracttypename, setcontracttypename] = useState('');

    const [subject, setsubject] = useState('');
    const [contracttype, setcontracttype] = useState('');
    const [amount, setamount] = useState('');
    const [address, setaddress] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [officenumber, setofficenumber] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [postalcode, setpostalcode] = useState('');
    const [clientname, setclientname] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [projectsummary, setprojectsummary] = useState('');
    const [note, setnote] = useState('');
    const [contractname, setcontractname] = useState('');
    const [images, setimages] = useState({ images_array: [] });
    const fileObj = [];
    const fileArray = [];
    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setimages({ images_array: fileArray })
    }
    const [contractTypelist, setcontractTypelist] = useState({
        contractTypelist_array: []
    });
    const [clientlist, setclientlist] = useState({
        clientlist_array: []
    });
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(async () => {
        await axios.get(Globalsettings.url + 'api/admin/contracts/create/' + companyid)
            .then((response) => {
                setcontractTypelist({ contractTypelist_array: response.data.contractType ? response.data.contractType : [], });
                setclientlist({ clientlist_array: response.data.clients ? response.data.clients : [], });
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    // Insert Lead
    const handleSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('client', clientname);
        data.append('subject', subject);
        data.append('amount', amount);
        data.append('original_amount', amount);
        data.append('contract_name', contractname);
        data.append('alternate_address', address);
        data.append('mobile', mobilenumber);
        data.append('office_phone', officenumber);
        data.append('city', city);
        data.append('state', state);
        data.append('country', country);
        data.append('postal_code', postalcode);
        data.append('contract_type', contracttype);
        data.append('start_date', startdate);
        data.append('original_start_date', startdate);
        data.append('end_date', enddate);
        data.append('original_end_date', enddate);
        data.append('description', note);
        data.append('company_logo', note);
        axios.post(Globalsettings.url + 'api/admin/contracts/store/'+companyid, data).then((response) => {
            toast.success("Contract Successfully Inserted!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/contract`);
            }, 3000);
        });
        evt.preventDefault();
    }    
    //Insert Contract Type
    const SubmitContractTypeForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/contract-type/type-store/'+companyid, {
            name: contracttypename,
            company_id: companyid
        })
            .then(response => {
                toast.success("Contract Category Successfully Inserted!");
                setModalShow(false);
                setcontractTypelist({ contractTypelist_array: response.data.contractType ? response.data.contractType : [], });
            });
        evt.preventDefault();
    }
    // Delete Contract Category
    const DeleteContracyType = (id) => {
        axios.get(Globalsettings.url + 'api/admin/contract-type/destroy/' + id)
            .then(response => {
                toast.success("Contract Category Delete Successfully");
                setcontractTypelist({ contractTypelist_array: contractTypelist.contractTypelist_array.filter(item => item.id !== id) });
            });
    }    
    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <ToastContainer />
            <div className="card_dashboard card card-body whitecolorbg px-4">
                <h4 className="main_title fontsize18 mb-4 px-0">Create Contract</h4>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Client*</Form.Label>
                            <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" required value={clientname} onChange={(e) => setclientname(e.target.value)}>
                            <option value=""> Choose Client</option>
                            {clientlist.clientlist_array.map((val, index) => {

                                return (
                                    <option value={val.id} key={index}>{val.name}</option>
                                )
                            })}
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Subject</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="subject" required value={subject} onChange={(e) => setsubject(e.target.value)} />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Amount ($) *</Form.Label>
                            
                                <Form.Control className="h-50px mr-4 border_lightparagraphcolor_1 border-radius-15" type="text" required value={amount} onChange={(e) => setamount(e.target.value)} />
                               
                            
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Contract Type <NavLink to="#" onClick={() => setModalShow(true)} className="badge ml-3 border-radius-100 purplecolorbg px-2 py-2 text-white"><img className="img-fluid mr-1" width="10" src={plusiconimg} alt="plusicon" /> Add Contract Type</NavLink></Form.Label>
                            <Form.Control name="" className="h-50px border_lightparagraphcolor_1 border-radius-15" as="select" required value={contracttype} onChange={(e) => setcontracttype(e.target.value)}>
                                <option value=""> Choose Contract</option>
                                {contractTypelist.contractTypelist_array.map((val, index) => {

                                    return (
                                        <option value={val.id} key={index}>{val.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Start Date</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="date" required value={startdate} onChange={(e) => setstartdate(e.target.value)} />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">End Date*</Form.Label>

                                <Form.Control className="h-50px mr-4 border_lightparagraphcolor_1 border-radius-15" type="date" required value={enddate} onChange={(e) => setenddate(e.target.value)} />
                           
                
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Contract Name</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" required value={contractname} onChange={(e) => setcontractname(e.target.value)} />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Alternate Address</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="address" required value={address} onChange={(e) => setaddress(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Mobile</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="number" required value={mobilenumber} onChange={(e) => setmobilenumber(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Office Phone Number</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="number" required value={officenumber} onChange={(e) => setofficenumber(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">City</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="Country" required value={city} onChange={(e) => setcity(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">State</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="Country" required value={state} onChange={(e) => setstate(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Country</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="Country" required value={country} onChange={(e) => setcountry(e.target.value)} />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <Form.Label className="mb-2">Postal Code</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" required value={postalcode} onChange={(e) => setpostalcode(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <Form.Label className="mb-2">Note</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={note}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setnote(data);
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
                            <div className="form-group multi-preview">
                                {(images.images_array || []).map(url => (
                                    <img src={url} alt="..." style={{ width: '200px' }} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <div className="p-3 border-radius-15 bodycolorbg">
                                <div className="file-drop-area">
                                    <span className="fake-btn">Choose files</span>
                                    <span className="file-msg">Drop files here OR click to upload</span>
                                    <input className="file-input" name="getFile[]" onChange={uploadMultipleFiles} type="file" multiple required="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <Button variant="" type="submit" className="btn btn_blue mr-2"><img className="img-fluid mr-2" src={checkiconimg} alt="checkicon" /> Save</Button>
                            <Button variant="" className="bodycolorbg btn">Reset</Button>
                        </div>
                    </div>
                </Form>
            </div>
            {/*  */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Contract Type</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitContractTypeForm}>
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
                                {contractTypelist.contractTypelist_array.map((val, index) => {
                                    let number = index + 1;
                                        return (
                                            <DataTableLoopModalOne
                                                key={index}
                                                contractid = {val.id}
                                                countnumber={number}
                                                name={val.name}
                                                remove="Remove"
                                                DeleteContracyType={DeleteContracyType}
                                            />
                                        )
                                })}
                            </tbody>
                        </table>
                            <FormLabel className="mb-2">Name</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={contracttypename} required onChange={e => setcontracttypename(e.target.value)} />        
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

export default Create_Contract;
