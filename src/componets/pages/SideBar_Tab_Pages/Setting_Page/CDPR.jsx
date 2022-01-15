import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Form, Modal, InputGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import PurposeTableLoop from "../Setting_Page/PurposeTableLoop";

// 
import backicon from "../../../../assets/images/arrowleft.svg";
import formtable_img from "../../../../assets/images/formtable_img.svg";
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const CDPR = () => {
    const [modalShowAddPurpose, setModalShowAddPurpose] = React.useState(false);
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // Inputa 
    const [description, setdescription] = useState('');
    const [enable_gdpr, setenable_gdpr] = useState(0);
    const [show_customer_area, setshow_customer_area] = useState(0);
    const [show_customer_footer, setshow_customer_footer] = useState(0);

    const [enable_export, setenable_export] = useState(0);

    const [data_removal, setdata_removal] = useState(0);
    const [lead_removal_public_form, setlead_removal_public_form] = useState(0);
    const [terms_customer_footer, setterms_customer_footer] = useState(0);
    const [public_lead_edit, setpublic_lead_edit] = useState(0);
    const [consent_customer, setconsent_customer] = useState(0);
    const [consent_leads, setconsent_leads] = useState(0);
    const [termandcondition, settermandcondition] = useState('');
    const [privacypolicy, setprivacypolicy] = useState('');
    const [consentinfo, setconsentinfo] = useState('');

    const [purposename, setpurposename] = useState('');
    const [purposedesc, setpurposedesc] = useState('');

    //
    const [purposelist, setpurposelist] = useState({
        purposelist_Array: []
    });

    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/gdpr/' + companyid)
            .then((response) => {
                setenable_gdpr(response.data.gdprSetting.enable_gdpr);
                setshow_customer_area(response.data.gdprSetting.show_customer_area);
                setshow_customer_footer(response.data.gdprSetting.show_customer_footer);
                setenable_export(response.data.gdprSetting.enable_export);
                setdata_removal(response.data.gdprSetting.data_removal);
                setlead_removal_public_form(response.data.gdprSetting.lead_removal_public_form);
                setterms_customer_footer(response.data.gdprSetting.terms_customer_footer);
                setpublic_lead_edit(response.data.gdprSetting.public_lead_edit);
                setconsent_customer(response.data.gdprSetting.consent_customer);
                setconsent_leads(response.data.gdprSetting.consent_leads);
                setdescription(response.data.gdprSetting.top_information_block === null ? "" : response.data.gdprSetting.top_information_block);
                settermandcondition(response.data.gdprSetting.terms === null ? "" : response.data.gdprSetting.terms);
                setprivacypolicy(response.data.gdprSetting.policy === null ? "" : response.data.gdprSetting.policy);
                setconsentinfo(response.data.gdprSetting.consent_block === null ? "" : response.data.gdprSetting.consent_block);
                setpurposelist({ purposelist_Array: response.data.purpose ? response.data.purpose : [], });
                setLoading(false);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, []);
    // Submit General Form
    const SubmitGeneralForm = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('enable_gdpr', enable_gdpr);
        data.append('show_customer_area', show_customer_area);
        data.append('show_customer_footer', show_customer_footer);
        data.append('top_information_block', description);
        data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
            
        });
        evt.preventDefault();
    }
    // Submit Portability Form
    const SubmitPortabilityForm = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('enable_export', enable_export);
        data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
        });
        evt.preventDefault();
    }
    // Submit Erasure Form
    const SubmiterasureForm = (evt) => {
        setLoading(true);
        const data = new FormData();
         data.append('data_removal', data_removal);
         data.append('lead_removal_public_form', lead_removal_public_form);
         data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
        });
        evt.preventDefault();
    }
    // Submit Condition Form
    const SubmitconditionForm = (evt) => {
        setLoading(true);
        const data = new FormData();
         data.append('terms_customer_footer', terms_customer_footer);
         data.append('terms', termandcondition);
         data.append('policy', privacypolicy);
         data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
        });
        evt.preventDefault();
    }
    // Submit Right Access Form
    const SubmitrightaccessForm = (evt) => {
        setLoading(true);
        const data = new FormData();
         data.append('public_lead_edit', public_lead_edit);
         data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
        });
        evt.preventDefault();
    }
    // Submit Consent Form
    const SubmitconsentForm = (evt) => {
        setLoading(true);
        const data = new FormData();
         data.append('consent_customer', consent_customer);
         data.append('consent_leads', consent_leads);
         data.append('consent_block', consentinfo);
         data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store', data).then((response) => {
            setLoading(false);
            toast.success("GDPR setting successfully updated!");
        });
        evt.preventDefault();
    }
    // Submit Purpose Form
    const SubmitPurposeForm = (evt) => {
        setLoading(true);
        const data = new FormData();
         data.append('name', purposename);
         data.append('description', purposedesc);
         data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/settings/gdpr/store-consent', data).then((response) => {
            setLoading(false);
            setModalShowAddPurpose(false);
            toast.success("New consent successfully added!");
        });
        evt.preventDefault();
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
                                <div className="card card-body">
                                    <TabList className="react-tabs__tab-list">
                                        <li className=""><NavLink to={`${process.env.PUBLIC_URL}/setting`} className="w-100 bodycolorbg d-flex align-items-center"><img className="img-fluid mr-2" src={backicon} alt="backicon" /> Back</NavLink></li>
                                        <Tab>General</Tab>
                                        <Tab>Right to Data Portability</Tab>
                                        <Tab>Right to erasure</Tab>
                                        <Tab>Right to be informed</Tab>
                                        <Tab>Right of access/Right to rectification</Tab>
                                        <Tab>Consent</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmitGeneralForm}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-3">
                                                <h4 className="">General GDPR Settings</h4>
                                                <p className="">Select the modules which you want to enable. Admin section.</p>
                                            </div>
                                            <div className="form-group m-0">
                                                <FormLabel className="mb-3">Enable GDPR</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="enable_gdpr" value="1" checked={enable_gdpr === "1"} onChange={(e) => setenable_gdpr(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="enable_gdpr" value="0" checked={enable_gdpr === "0"} onChange={(e) => setenable_gdpr(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group">
                                                <FormLabel className="mb-3">Show GDPR link in customers area navigation</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="show_customer_area" value="1" checked={show_customer_area === "1"} onChange={(e) => setshow_customer_area(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="show_customer_area" value="0" checked={show_customer_area === "0"} onChange={(e) => setshow_customer_area(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group">
                                                <FormLabel className="mb-3">Show GDPR link in customers area footer</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="show_customer_footer" value="1" checked={show_customer_footer === "1"} onChange={(e) => setshow_customer_footer(e.target.value)}  />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="show_customer_footer" value="0" checked={show_customer_footer === "0"} onChange={(e) => setshow_customer_footer(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-3">GDPR page top information block</FormLabel>
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
                                            <Button type="submit" variant="" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                        </div>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmitPortabilityForm}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3">
                                                <h4 className="mb-3">Right to Data Portability</h4>
                                            </div>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-3">Enable customers to export their data</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="enable_export" value="1" checked={enable_export === "1"} onChange={(e) => setenable_export(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="enable_export" value="0" checked={enable_export === "0"} onChange={(e) => setenable_export(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button type="submit" variant="" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                        </div>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmiterasureForm}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3">
                                                <h4 className="mb-3">Right to erasure</h4>
                                            </div>
                                            <div className="form-group">
                                                <FormLabel className="mb-3">Enable customers to request to remove data</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="data_removal" value="1" checked={data_removal === "1"} onChange={(e) => setdata_removal(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="data_removal" value="0" checked={data_removal === "0"} onChange={(e) => setdata_removal(e.target.value)}/>
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mb-4" />
                                            <div className="card-header mb-4">
                                                <h4 className="mb-3">Leads to erasure</h4>
                                            </div>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-3">Enable lead to request data removal (via public form)</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="lead_removal_public_form" value="1" checked={lead_removal_public_form === "1"} onChange={(e) => setlead_removal_public_form(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="lead_removal_public_form" value="0" checked={lead_removal_public_form === "0"} onChange={(e) => setlead_removal_public_form(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button type="submit" variant="" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                            <div className="card-header my-4">
                                                <h4 className="mb-3">Removal Requests</h4>
                                            </div>
                                        </div>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmitconditionForm}>
                                        <div className="card card_dashboard card-body">
                                            <h4 className="main_title fontsize18 mb-4">Right to be informed</h4>
                                            <div className="form-group m-0">
                                                <FormLabel className="mb-3">Enable Terms Conditions customers footer</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="terms_customer_footer" value="1" checked={terms_customer_footer === "1"} onChange={(e) => setterms_customer_footer(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="terms_customer_footer" value="0" checked={terms_customer_footer === "0"} onChange={(e) => setterms_customer_footer(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group">
                                                <FormLabel className="mb-2">Terms and condition</FormLabel>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={termandcondition}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        settermandcondition(data);
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-2">Privacy & Policy</FormLabel>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={privacypolicy}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setprivacypolicy(data);
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                            <Button variant="" type="submit" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                        </div>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmitrightaccessForm}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3">
                                                <h4 className="mb-3">Right of access</h4>
                                            </div>
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-3">Allow lead to update their data from public form</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="public_lead_edit" value="1" checked={public_lead_edit === "1"} onChange={(e) => setpublic_lead_edit(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="public_lead_edit" value="0" checked={public_lead_edit === "0"} onChange={(e) => setpublic_lead_edit(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button type="submit" variant="" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                        </div>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">GDPR</h4>
                                        <Form onSubmit={SubmitconsentForm}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3">
                                                <h4 className="mb-3">Consent</h4>
                                            </div>
                                            <div className="form-group">
                                                <FormLabel className="mb-3">Enable consent for customers</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="consent_customer" value="1" checked={consent_customer === "1"} onChange={(e) => setconsent_customer(e.target.value)} />
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="consent_customer" value="0" checked={consent_customer === "0"} onChange={(e) => setconsent_customer(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group">
                                                <FormLabel className="mb-3">Enable consent for Leads</FormLabel>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3 d-flex align-items-center">
                                                        <Form.Check type="radio" name="consent_leads" value="1" checked={consent_leads === "1"} onChange={(e) => setconsent_leads(e.target.value)}/>
                                                        <FormLabel className="">Yes</FormLabel>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Check type="radio" name="consent_leads" value="0" checked={consent_leads === "0"} onChange={(e) => setconsent_leads(e.target.value)} />
                                                        <FormLabel className="">No</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="form-group mb-3">
                                                <FormLabel className="mb-2">Public page consent information block</FormLabel>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={consentinfo}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setconsentinfo(data);
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                            <Button type="submit" variant="" className="w-100px h-40px lightbluecolorbg btn btn_blue">Submit</Button>
                                            <hr className="my-4" />
                                            <div className="card-header d-xl-flex d-block align-items-center mb-4 pb-3">
                                                <h4 className="mr-auto mb-3 mb-xl-0">Purpose of consent</h4>
                                                <NavLink onClick={() => setModalShowAddPurpose(true)} to="#" className="btn_blue btn">Purpose of consent</NavLink>
                                            </div>
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <label className="w-100px h-40px blackcolortext fontsize16 fontweightregular">Show</label>
                                                    <select className="form-control transparent_form">
                                                        <option>10</option>
                                                        <option>20</option>
                                                        <option>30</option>
                                                    </select>
                                                    <label className="w-100px h-40px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                                                </div>
                                                <div className="ml-auto">
                                                    <form className="transparent_form">
                                                        <InputGroup className="d-flex">
                                                            <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                                            <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                                        </InputGroup>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*  */}
                                            <div className="table-sm-responsive clent_data_table">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Notice</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {purposelist.purposelist_Array.map((val,index) => {
                                                            let number = index +1;
                                                            return (
                                                                <PurposeTableLoop
                                                                    key={index}
                                                                    countnumber={number}
                                                                    noticename={val.name}
                                                                    discription={val.description}
                                                                    date={val.created_at}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/*  */}
                                        </div>
                                        </Form>
                                    </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
            {/* task categor */}
            <Modal show={modalShowAddPurpose} onHide={() => setModalShowAddPurpose(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">New consent purpose</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitPurposeForm}>
                <Modal.Body className="p-0 mt-3">
                    <div className="form-group">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control type="text" className="h-45px transparent_form" required value={purposename} onChange={(e) => setpurposename(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Description</FormLabel>
                        <Form.Control as="textarea" className="transparent_form" rows={4} required value={purposedesc} onChange={(e) => setpurposedesc(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px h-40px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShowAddPurpose(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default CDPR;
