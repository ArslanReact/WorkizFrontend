import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Form, Button, FormLabel, Modal,InputGroup,FormControl } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

// 
import LeadAgentTableLoop from "../Setting_Page/LeadAgentTableLoop";
import LeadStatusTableLoop from "../Setting_Page/LeadStatusTableLoop";
import LeadSourceTableLoop from "../Setting_Page/LeadSourceTableLoop";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import backicon from "../../../../assets/images/arrowleft.svg";
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const LeadSettings = () => {
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    const [modalShowAgent1, setmodalShowAgent1] = React.useState(false);
    const [isLoading, setLoading] = useState(false);
    const [leadagentname, setleadagentname] = useState('');
    const [LeadSourceNameInput, setLeadSourceNameInput] = useState('');
    const [UpdateLeadSourceIdInput, setUpdateLeadSourceIdInput] = useState('');
    const [UpdateLeadSourceNameInput, setUpdateLeadSourceNameInput] = useState('');
    const [leadstatusname, setleadstatusname] = useState('');
    const [defaultstatus, setdefaultstatus] = useState('');
    const [link_color, setlink_color] = useState('');
    const [UpdateLeadStatusIdInput, setUpdateLeadStatusIdInput] = useState('');
    const [UpdateLeadStatusNameInput, setUpdateLeadStatusNameInput] = useState('');
    const [updatelink_color, setupdatelink_color] = useState('');
    const [maxPriority, setmaxPriority] = useState(0);
    const [priority, setpriority] = useState(0);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [LeadSourceData, setLeadSourceData] = useState({
        LeadSourceData_Array: []
    });
    const [LeadStatusData, setLeadStatusData] = useState({
        LeadStatusData_Array: []
    });
    const [LeadAgentData, setLeadAgentData] = useState({
        LeadAgentData_Array: []
    });
    const [EmpData, setEmpData] = useState({
        EmpData_Array: []
    });
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-source-settings/' + companyid)
            .then((response) => {
                setLeadSourceData({ LeadSourceData_Array: response.data.leadSources ? response.data.leadSources : [], });
                setLoading(false);
            });
    }, []);

    const LeadSourceSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-source-settings/' + companyid)
            .then((response) => {
                setLeadSourceData({ LeadSourceData_Array: response.data.leadSources ? response.data.leadSources : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }
    const LeadStatusSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-status-settings/' + companyid)
            .then((response) => {
                setLeadStatusData({ LeadStatusData_Array: response.data.leadStatus ? response.data.leadStatus : [], });
                setdefaultstatus(response.data.default);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }
    const LeadAgentSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-agent-settings/' + companyid)
            .then((response) => {
                setLeadAgentData({ LeadAgentData_Array: response.data.leadAgents ? response.data.leadAgents : [], });
                setEmpData({ EmpData_Array: response.data.employees ? response.data.employees : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }
    //Insert Lead Source
    const SubmitLeadSourceform = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/leadSource/store-cat', {
            type: LeadSourceNameInput,
            company_id: companyid
        })
            .then(response => {
                setLoading(false);
                toast.success("Lead Source Successfully Inserted!");
                setLeadSourceData({ LeadSourceData_Array: response.data.data ? response.data.data : [], });
            });
        evt.preventDefault();
    }
    // Delete Lead Sources
    const DeleteLeadSource = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-source-settings/destroy/' + id)
            .then(response => {
                setLoading(false);
                toast.success("Lead Source Delete Successfully");
                setLeadSourceData({ LeadSourceData_Array: LeadSourceData.LeadSourceData_Array.filter(item => item.id !== id) });
            });
    }
    // Update Lead Sources
    const UpdateLeadSource = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-source-settings/edit/' + id)
            .then(response => {
                setLoading(false);
                setModalShowAgent(true);
                setUpdateLeadSourceNameInput(response.data.source.type);
                setUpdateLeadSourceIdInput(response.data.source.id);
            });
    }
    //Update Lead Source InDB
    const UpdateleadSource = (evt) => {
        setLoading(true);
        setModalShowAgent(false);
        axios.post(Globalsettings.url + 'api/admin/settings/lead-source-settings/update', {
            id: UpdateLeadSourceIdInput,
            type: UpdateLeadSourceNameInput,
            companyid: companyid,
        })
            .then(response => {
                setLoading(false);
                toast.success("Lead Source Successfully Updated!");
                setLeadSourceData({ LeadSourceData_Array: response.data.leadSources ? response.data.leadSources : [], });
            });
        evt.preventDefault();
    }
    //Insert Lead Status
    const LeadStatusFormSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/settings/lead-status-settings/store', {
            type: leadstatusname,
            label_color: link_color,
            company_id: companyid
        })
            .then(response => {
                setLoading(false);
                toast.success("Lead Status Successfully Inserted!");
                setLeadStatusData({ LeadStatusData_Array: response.data.leadStatus ? response.data.leadStatus : [], });
                setdefaultstatus(response.data.default);
            });
        evt.preventDefault();
    }
    // Delete Lead Status
    const DeleteLeadStatus = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-status-settings/destroy/'+id)
            .then(response => {
                setLoading(false);
                toast.success("Lead Status Delete Successfully");
                setLeadStatusData({ LeadStatusData_Array: LeadStatusData.LeadStatusData_Array.filter(item => item.id !== id) });
            });
    }
    // Update Lead Status
    const UpdateLeadStatus = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/lead-status-settings/edit/' + id+'/'+companyid)
            .then(response => {
                setLoading(false);
                setmodalShowAgent1(true);
                setUpdateLeadStatusNameInput(response.data.status.type);
                setupdatelink_color(response.data.status.label_color);
                setUpdateLeadStatusIdInput(response.data.status.id);
                // setmaxPriority(response.data.maxPriority);
                // for (var i=0; i< response.data.maxPriority; i++) {
                //     lis.push(<option value={i}>{i}</option>);
                // }
            });
    }
    // Update Lead Status in db
    const UpdateleadStatusForm = (evt) => {
        setLoading(true);
        setmodalShowAgent1(false);
        axios.post(Globalsettings.url + 'api/admin/settings/lead-status-settings/update/'+UpdateLeadStatusIdInput, {
            type: UpdateLeadStatusNameInput,
            label_color: updatelink_color,
            company_id: companyid
        })
            .then(response => {
                setLoading(false);
                toast.success("Lead Status Successfully Updated!");
                setLeadStatusData({ LeadStatusData_Array: response.data.leadStatus ? response.data.leadStatus : [], });
                setdefaultstatus(response.data.default);
            });
        evt.preventDefault();
    }
    //Insert Lead Agent
    const SubmitLeadAgentForm = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/lead-agent-settings/create-agent', {
            agent_name: leadagentname,
            company_id: companyid
        })
            .then(response => {
                setLoading(false);
                toast.success("Lead Agent Successfully Inserted!");
                setLeadAgentData({ LeadAgentData_Array: response.data.leadAgents ? response.data.leadAgents : [], });
            });
        evt.preventDefault();
    }
    // Delete Lead Agent
    const DeleteLeadAgent = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/lead-agent-settings/destroy/' + id+'/'+companyid)
            .then(response => {
                setLoading(false);
                toast.success("Lead Agent Delete Successfully");
                setLeadAgentData({ LeadAgentData_Array: LeadAgentData.LeadAgentData_Array.filter(item => item.id !== id) });
                setEmpData({ EmpData_Array: response.data.employees ? response.data.employees : [], });
            });
    }
    return (
        <>
        <ToastContainer closeButton={true} position="top-right" />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="react_tabs_block">
                    <Tabs>
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="card card_dashboard card-body">
                                    <TabList className="react-tabs__tab-list">
                                        <li className=""><NavLink to={`${process.env.PUBLIC_URL}/setting`} className="w-100 bodycolorbg d-flex align-items-center"><img className="img-fluid mr-2" src={backicon} alt="backicon" /> Back</NavLink></li>
                                        <Tab onClick={() => LeadSourceSettingsDetails()}>Lead Source</Tab>
                                        <Tab onClick={() => LeadStatusSettingsDetails()}>Lead Status</Tab>
                                        <Tab onClick={() => LeadAgentSettingsDetails()}>Lead Agent</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Lead Source</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-3">
                                                <h4 className="">Add New Lead Source</h4>
                                            </div>
                                            <Form onSubmit={SubmitLeadSourceform}>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-2">Lead Source </FormLabel>
                                                <Form.Control type="text" className="transparent_form h-40px" value={LeadSourceNameInput} onChange={(e) => setLeadSourceNameInput(e.target.value)} required />
                                            </div>
                                            <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                            </Form>
                                            <div className="card-header mt-3 mb-3 pb-3">
                                                <h4 className="">Lead Source</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {LeadSourceData.LeadSourceData_Array.map((val,index) => {
                                                            let number  = index +1;
                                                            return (
                                                                <LeadSourceTableLoop
                                                                    key={index}
                                                                    countnumber={number}
                                                                    leadsourceid={val.id}
                                                                    name={val.type}
                                                                    DeleteLeadSource={DeleteLeadSource}
                                                                    UpdateLeadSource={UpdateLeadSource}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Lead Status</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-3">
                                                <h4 className="">Add New Lead Status</h4>
                                            </div>
                                            <Form onSubmit={LeadStatusFormSubmit}>
                                            <div className="form-group">
                                                <FormLabel className="mb-2">Lead Status</FormLabel>
                                                <Form.Control type="text" className="transparent_form h-40px" required value={leadstatusname} onChange={(e) => setleadstatusname(e.target.value) }  />
                                            </div>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-2">Color label* </FormLabel>
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={link_color} onChange={(e) => setlink_color(e.target.value)} id="ranachumi">{link_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={link_color} onChange={(e) => setlink_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 link_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                            </Form>
                                            <div className="card-header mt-5 mb-3 pb-3">
                                                <h4 className="">Update Default Lead Status</h4>
                                            </div>
                                            <div className="form-group">
                                                <FormLabel className="mb-2">Select Default Lead Status </FormLabel>
                                                <Form.Control className="transparent_form h-40px" as="select" value={defaultstatus} onChange={(e) => {
                                                    setdefaultstatus(e.target.value);
                                                    setLoading(true);
                                                    axios.get(Globalsettings.url + 'api/admin/settings/lead-status-update/'+ e.target.value)
                                                        .then(response => {
                                                            setLoading(false);
                                                            toast.success("Lead Status Updated Successfully");
                                                        });
                                                    
                                                }}>
                                                        {LeadStatusData.LeadStatusData_Array.map((val,index) => {
                                                            return (
                                                                <option value={val.id} key={index}>{val.type}</option>
                                                            )
                                                        })}
                                                </Form.Control>
                                            </div>
                                            <div className="card-header mt-3 mb-3 pb-3">
                                                <h4 className="">Lead Status</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Label Color</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {LeadStatusData.LeadStatusData_Array.map((val,index) => {
                                                            let number  = index +1;
                                                            return (
                                                                <LeadStatusTableLoop
                                                                    key={index}
                                                                    countnumber={number}
                                                                    lstatusid={val.id}
                                                                    name={val.type}
                                                                    crossimg={val.crossimg}
                                                                    editiconimg={val.editiconimg}
                                                                    badgecolor={val.label_color}
                                                                    DeleteLeadStatus={DeleteLeadStatus}
                                                                    UpdateLeadStatus={UpdateLeadStatus}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Lead Agent</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-3">
                                                <h4 className="">Add New Lead Agent</h4>
                                            </div>
                                            <Form onSubmit={SubmitLeadAgentForm}>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-2">Choose Agents </FormLabel>
                                                <Form.Control className="transparent_form h-40px" as="select" required value={leadagentname} onChange={e => setleadagentname(e.target.value)}>
                                                    <option value=""> Choose Agent</option>
                                                    {EmpData.EmpData_Array.map((val) => {

                                                        return (
                                                            <option value={val.id}>{val.name}</option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </div>
                                            <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                            </Form> 
                                            <div className="card-header my-3 pb-3">
                                                <h4 className="">Lead Agent</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {LeadAgentData.LeadAgentData_Array.map((val,index) => {
                                                            let number  = index +1;
                                                            return (
                                                                <LeadAgentTableLoop
                                                                    key={index}
                                                                    countnumber={number}
                                                                    leadAgentid={val.id}
                                                                    name={val.name}
                                                                    DeleteLeadAgent = {DeleteLeadAgent}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/*  */}
                                        </div>
                                    </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
            <Modal show={modalShowAgent} onHide={() => setModalShowAgent(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Lead Source</Modal.Title>
                </Modal.Header>
                <Form onSubmit={UpdateleadSource}>
                <Modal.Body className="p-0 mt-3">
                    <div className="from-group mb-3">
                        <FormLabel className="mb-2">Lead Source</FormLabel>
                        <Form.Control type="hidden" value={UpdateLeadSourceIdInput} onChange={(e) => setUpdateLeadSourceIdInput(e.target.value)} /> 
                        <Form.Control type="text" className="transparent_form h-40px" value={UpdateLeadSourceNameInput} onChange={(e) => setUpdateLeadSourceNameInput(e.target.value)} required />
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0 mt-4">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShowAgent(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>
            {/*  */}
            <Modal show={modalShowAgent1} onHide={() => setmodalShowAgent1(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Lead Status</Modal.Title>
                </Modal.Header>
                <Form onSubmit={UpdateleadStatusForm}>
                    <Modal.Body className="p-0 mt-3">
                        <div className="from-group mb-3">
                            <FormLabel className="mb-2">Lead Status</FormLabel>
                            <Form.Control type="hidden" value={UpdateLeadStatusIdInput} onChange={(e) => setUpdateLeadStatusIdInput(e.target.value)} /> 
                            <Form.Control type="text" className="transparent_form h-40px" value={UpdateLeadStatusNameInput} onChange={(e) => setUpdateLeadStatusNameInput(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <FormLabel className="mb-2">Color label* </FormLabel>
                            <InputGroup className="transparent_form d-flex">
                                <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={updatelink_color} onChange={(e) => setupdatelink_color(e.target.value)} id="ranachumi">{updatelink_color}</InputGroup.Text>
                                <div className="position-absolute right-0">
                                    <FormControl name="" type="color" value={updatelink_color} onChange={(e) => setupdatelink_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 link_color" />
                                </div>
                            </InputGroup>
                        </div>
                        {/* <div className="from-group">
                            <FormLabel className="mb-2">Position*</FormLabel>
                            <Form.Control className="transparent_form h-40px" as="select" value={priority} onChange={(e) => setpriority(e.target.value)} required>
                        
                            </Form.Control>
                        </div> */}
                    </Modal.Body>
                    <Modal.Footer className="p-0 mt-4">
                        <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setmodalShowAgent1(false)}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default LeadSettings;
