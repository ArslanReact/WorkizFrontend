import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink,useHistory } from 'react-router-dom';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";

// 
import DataTableLoopModalOne from "../../Cutomer_Tab/Leads_Page_Content/DataTableLoopModalOne";
import DataTableLoopModalTwo from "../../Cutomer_Tab/Leads_Page_Content/DataTableLoopModalTwo";

// 
import plusicon from "../../../../../assets/images/plusiconblue.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";

const Add_New_Lead = (props) => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [modalShowLeadAgent, setModalShowLeadAgent] = useState(false);
    const [leadagentname, setleadagentname] = useState('');
    const [modalShowLeadSource, setModalShowLeadSource] = useState(false);
    const [LeadSourceNameInput, setLeadSourceNameInput] = useState('');
    const [modalShowLeadCategory, setModalShowLeadCategory] = useState(false);
    const [ShowcategoryNameInput, setShowcategoryNameInput] = useState('');
    const [companyname, setcompanyname] = useState('');
    const [website, setwebsite] = useState('');
    const [address, setaddress] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [officenumber, setofficenumber] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [postalcode, setpostalcode] = useState('');
    const [clientname, setclientname] = useState('');
    const [clientemail, setclientemail] = useState('');
    const [nextfollowup, setnextfollowup] = useState('');
    const [leadvalue, setleadvalue] = useState('');
    const [agent, setagent] = useState('');
    const [source, setsource] = useState('');
    const [leadcat, setleadcat] = useState('');
    const [note, setnote] = useState('');
    const [sourceslist, setsourceslist] = useState({
        sourceslist_array: []
    });
    const [leadAgentslist, setleadAgentslist] = useState({
        leadAgentslist_array: []
    });
    const [leadcategory, setleadcategory] = useState({
        leadcategory_array: []
    });
    const [forleadableemployees, setforleadableemployees] = useState({
        forleadableemployees_array: []
    });
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(async () => {
        await axios.get(Globalsettings.url + 'api/admin/leads/create/' + companyid)
            .then((response) => {
                setsourceslist({ sourceslist_array: response.data.sources ? response.data.sources : [], });
                setleadAgentslist({ leadAgentslist_array: response.data.leadAgents ? response.data.leadAgents : [], });
                setleadcategory({ leadcategory_array: response.data.categories ? response.data.categories : [], });
                setforleadableemployees({ forleadableemployees_array: response.data.forleadableemployees ? response.data.forleadableemployees : [], });
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    // Insert Lead
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/leads/store', {
            companyid: companyid,
            company_name: companyname,
            website: website,
            address: address,
            client_name: clientname,
            client_email: clientemail,
            mobile: mobilenumber,
            office_phone: officenumber,
            city: city,
            state: state,
            country: country,
            postal_code: postalcode,
            note: note,
            category_id: leadcat,
            next_follow_up: nextfollowup,    
            agent_id: agent,
            source_id: source,
            value: leadvalue,
        }).then((response) => {
            if(response.data.type == 'success'){
                toast.success("Lead Successfully Inserted!");
                setLoading(false);
                setTimeout(() => { 
                    history.push(`${process.env.PUBLIC_URL}/leads`);
                }, 3000)
            }else{
                setLoading(false);
                toast.error(response.data.errormsg);
            }
        });
        evt.preventDefault();
    }    
    //Insert Lead Source
    const SubmitLeadSourceform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/leadSource/store-cat', {
            type: LeadSourceNameInput,
            company_id: companyid
        })
            .then(response => {
                toast.success("Lead Source Successfully Inserted!");
                setModalShowLeadSource(false);
                setsourceslist({ sourceslist_array: response.data.data ? response.data.data : [], });
            });
        evt.preventDefault();
    }
    //Insert Lead cat
    const SubmitLeaccatform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/leadCategory/store-cat', {
            category_name: ShowcategoryNameInput,
            company_id: companyid
        })
            .then(response => {
                toast.success("Lead Category Successfully Inserted!");
                setModalShowLeadCategory(false);
                setleadcategory({ leadcategory_array: response.data.data ? response.data.data : [], });
            });
        evt.preventDefault();
    }
    //Insert Lead Agent
    const SubmitLeadAgentForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/lead-agent-settings/create-agent', {
            agent_name: leadagentname,
            company_id: companyid
        })
            .then(response => {
                toast.success("Lead Agent Successfully Inserted!");
                setModalShowLeadAgent(false);
                setleadAgentslist({ leadAgentslist_array: response.data.leadAgents ? response.data.leadAgents : [], });
            });
        evt.preventDefault();
    }
    // Delete Lead Category
    const DeleteLeadCategory = (id) => {
        axios.get(Globalsettings.url + 'api/admin/leadCategory/destroy/' + id)
            .then(response => {
                toast.success("Lead Category Delete Successfully");
                setleadcategory({ leadcategory_array: leadcategory.leadcategory_array.filter(item => item.id !== id) });
            });
    }
    // Delete Lead Agent
    const DeleteLeadAgent = (id) => {
        axios.get(Globalsettings.url + 'api/admin/lead-agent-settings/destroy/' + id+'/'+companyid)
            .then(response => {
                toast.success("Lead Agent Delete Successfully");
                setleadAgentslist({ leadAgentslist_array: leadAgentslist.leadAgentslist_array.filter(item => item.id !== id) });
                setforleadableemployees({ forleadableemployees_array: response.data.forleadableemployees ? response.data.forleadableemployees : [], });
            });
    }
    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <ToastContainer />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Add Lead Info</h4>
            </div>
            {/*  */}
            <Form onSubmit={handleSubmit}>
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard px-3 py-4">
                        <h4 className="main_title mb-4 fontsize16">Company Details</h4>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Company Name*</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" value={companyname} onChange={e => setcompanyname(e.target.value)} required />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <FormLabel className="mb-2">Website*</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" value={website} onChange={e => setwebsite(e.target.value)} required />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-2">Address*</FormLabel>
                                <Form.Control name="" className="transparent_form" as="textarea" rows={3} value={address} onChange={e => setaddress(e.target.value)} required />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Phone Number*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" value={mobilenumber} onChange={e => setmobilenumber(e.target.value)} required />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">Office Phone Number*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" value={officenumber} onChange={e => setofficenumber(e.target.value)} required />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">City*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={city} onChange={e => setcity(e.target.value)} required />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <FormLabel className="mb-2">State*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={state} onChange={e => setstate(e.target.value)} required />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Country*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={country} onChange={e => setcountry(e.target.value)} required />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Postal Code*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" value={postalcode} onChange={e => setpostalcode(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard px-3 py-4">
                        <h4 className="main_title mb-4 fontsize16">Leads Detail</h4>
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Client Name*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={clientname} onChange={e => setclientname(e.target.value)} required />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Client Email*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="email" value={clientemail} onChange={e => setclientemail(e.target.value)} required />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Next Follow Up*</FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" value={nextfollowup} onChange={e => setnextfollowup(e.target.value)} required>
                                    <option value="">Select One</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Lead Value*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="number" value={leadvalue} onChange={e => setleadvalue(e.target.value)} required />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Choose Agents* <NavLink onClick={() => setModalShowLeadAgent(true)} to="#" className="ml-2 fontsize14 border-radius-5 border_blusecolor_1 p-1">Add Leads Agents</NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" value={agent} onChange={e => setagent(e.target.value)} required>
                                    <option value=""> Choose Agent</option>
                                    {leadAgentslist.leadAgentslist_array.map((val) => {

                                        return (
                                            <option value={val.id}>{val.name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-3">Lead Source * <NavLink onClick={() => setModalShowLeadSource(true)} to="#" className="ml-2 fontsize14 border-radius-5 border_blusecolor_1 p-1">Add Leads Source</NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" value={source} onChange={e => setsource(e.target.value)} required>
                                    <option value=""> Select Sources</option>
                                    {sourceslist.sourceslist_array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.type}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <FormLabel className="mb-2">Lead Category* <NavLink onClick={() => setModalShowLeadCategory(true)} to="#" className="ml-2 fontsize14 border-radius-5 border_blusecolor_1 p-1"><img className="img-fluid" width="15" src={plusicon} alt="" /></NavLink></FormLabel>
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" value={leadcat} onChange={e => setleadcat(e.target.value)} required>
                                    <option value=""> Select Category</option>
                                    {leadcategory.leadcategory_array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.category_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <FormLabel className="mb-3">Note*</FormLabel>
                                <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} value={note} onChange={e => setnote(e.target.value)} required />
                            </div>
                            <div className="col mt-3">
                                <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            {/*  */}
            {/* task categor */}
            <Modal show={modalShowLeadAgent} onHide={() => setModalShowLeadAgent(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Lead Agent</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitLeadAgentForm}>
                <Modal.Body className="p-0 my-4">
                    <div class="table-sm-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Agent Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leadAgentslist.leadAgentslist_array.map((val, index) => {
                                    let number = index + 1;
                                    return (
                                        <DataTableLoopModalTwo
                                            key={index}
                                            countnumber={number}
                                            leadAgentid={val.id}
                                            name={val.name}
                                            remove="Remove"
                                            DeleteLeadAgent = {DeleteLeadAgent}

                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                        
                            <FormLabel className="mb-2">Choose Agents*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" required as="select" value={leadagentname} onChange={e => setleadagentname(e.target.value)}>
                                <option value="">Choose Agent</option>
                                {forleadableemployees.forleadableemployees_array.map((val) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </Form.Control>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="graycolorbg fontsize14 w-100px" onClick={() => setModalShowLeadAgent(false)}>Close</Button>
                    <Button variant="" type="submit" className="btn_blue w-100px">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal >
            {/* task categor */}
            <Modal show={modalShowLeadSource} onHide={() => setModalShowLeadSource(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add New Lead Source</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitLeadSourceform}>
                    <Modal.Body className="p-0 my-4">

                        <FormLabel className="mb-2">Lead Source*</FormLabel>
                        <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={LeadSourceNameInput} onChange={(e) => setLeadSourceNameInput(e.target.value)} />

                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg fontsize14 w-100px" onClick={() => setModalShowLeadSource(false)} >Close</Button>
                        <Button variant="" type="submit" className="btn_blue w-100px">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
            {/* task categor */}
            <Modal show={modalShowLeadCategory} onHide={() => setModalShowLeadCategory(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Lead Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitLeaccatform}>
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
                                    {leadcategory.leadcategory_array.map((val, index) => {
                                        let number = index + 1;
                                        return (
                                            <DataTableLoopModalOne
                                                key={index}
                                                id={val.id}
                                                countnumber={number}
                                                name={val.category_name}
                                                DeleteLeadCategory={DeleteLeadCategory}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                            <FormLabel className="mb-2">Add Category Name*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" value={ShowcategoryNameInput} onChange={(e) => setShowcategoryNameInput(e.target.value)} />
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg w-100px fontsize14" onClick={() => setModalShowLeadCategory(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    )
}

export default Add_New_Lead;