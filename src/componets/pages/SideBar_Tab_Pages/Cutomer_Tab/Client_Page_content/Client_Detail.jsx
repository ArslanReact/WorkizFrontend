import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { InputGroup, Button, Modal, FormLabel, Form, FormControl } from "react-bootstrap";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// 
import ContactTabTable from "../../Cutomer_Tab/Client_Page_content/ContactTabTable";
import ContactTabTableArray from "../../Cutomer_Tab/Client_Page_content/ContactTabTableArray";

// 
import editicon from "../../../../../assets/images/edit_4_iconimg.svg";
import avatar_01 from "../../../../../assets/images/avatar_01.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";


const Client_Detail = (props) => {
    const [modalShowAddContact, setModalShowAddContact] = React.useState(false);
    const [modalShowAddNote, setModalShowAddNote] = React.useState(false);
    const [modalShowAddDocoument, setModalShowAddDocoument] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [ClientDataArray, setClientDataArray] = useState({
        ClientData_Array: []
    });
    const [clientDetailArray, setclientDetailArray] = useState({
        clientDetail_Array: []
    });
    const [ClientStatsArray, setClientStatsArray] = useState({
        ClientStats_Array: []
    });
    const [ClientProjectsArray, setClientProjectsArray] = useState({
        ClientProjects_Array: []
    });
    const [ClientInvoiceArray, setClientInvoiceArray] = useState({
        ClientInvoice_Array: []
    });
    const [ClientContactsArray, setClientContactsArray] = useState({
        ClientContacts_Array: []
    });
    const [ClientPaymentsArray, setClientPaymentsArray] = useState({
        ClientPayments_Array: []
    });
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/clients/client_details/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setClientDataArray({ ClientData_Array: response.data.client ? response.data.client : [], });
                setClientStatsArray({ ClientStats_Array: response.data.clientStats ? response.data.clientStats : [], });
                setclientDetailArray({ clientDetail_Array: response.data.clientDetail ? response.data.clientDetail : [], });
            });
    }, [])
    const ManageProject = () => {
        axios.get(Globalsettings.url + 'api/admin/clients/projects/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setClientProjectsArray({ ClientProjects_Array: response.data.projects ? response.data.client.projects : [], });
            });
    }
    const ManageInvoice = () => {
        axios.get(Globalsettings.url + 'api/admin/clients/invoices/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setClientInvoiceArray({ ClientInvoice_Array: response.data.invoices ? response.data.invoices : [], });
            });
    }
    const ManageContacts = () => {
        axios.get(Globalsettings.url + 'api/admin/clients/projects/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setClientProjectsArray({ ClientProjects_Array: response.data.projects ? response.data.client.projects : [], });
            });
    }
    const ManagePayments = () => {
        axios.get(Globalsettings.url + 'api/admin/clients/payments/' + props.match.params.id + '/' + companyid)
            .then((response) => {
                setClientPaymentsArray({ ClientPayments_Array: response.data.payments ? response.data.payments : [], });
            });
    }
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Clients</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/edit_client/`+props.match.params.cid} className="btn btn_blue"><img className="img-fluid mr-2" src={editicon} alt="" /> Edit </NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                        <div className="card card_dashboard card-body">
                            <div className="text-center mb-3">
                                <NavLink to="#" className="mx-auto w-100px border-radius-100 h-100px paragraphcolor1bg d-block"><img className="img-fluid object_fit w-100" src={ClientDataArray.ClientData_Array.image_url} alt="" /></NavLink>
                                <h5 className="fontsize20 mb-2 mt-3 blackcolortext">{ClientDataArray.ClientData_Array.name}</h5>
                                <p className="paragraphcolor1text">{clientDetailArray.clientDetail_Array.company_name}</p>
                            </div>
                            <div className="bodycolorbg mb-3 border_lightparagraphcolor_1 border-radius-10 p-3">
                                <h4 className="mb-2 fontsize22 blackcolortext">Total Projects</h4>
                                <p className="m-0 blusecolortext">{ClientStatsArray.ClientStats_Array.totalProjects} Projects</p>
                            </div>
                            <div className="bodycolorbg mb-3 border_lightparagraphcolor_1 border-radius-10 p-3">
                                <h4 className="mb-2 fontsize22 blackcolortext">Unpaid Invoices</h4>
                                <p className="m-0 blusecolortext">{ClientStatsArray.ClientStats_Array.totalUnpaidInvoices} Unpaid Invoices</p>
                            </div>
                            <div className="bodycolorbg mb-3 border_lightparagraphcolor_1 border-radius-10 p-3">
                                <h4 className="mb-2 fontsize22 blackcolortext">Earnings</h4>
                                <p className="m-0 blusecolortext">$3265,00</p>
                            </div>
                            <div className="bodycolorbg mb-3 border_lightparagraphcolor_1 border-radius-10 p-3">
                                <h4 className="mb-2 fontsize22 blackcolortext">Total Contracts</h4>
                                <p className="m-0 blusecolortext">{ClientStatsArray.ClientStats_Array.totalContracts} Contracts</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-12 mb-4 mb-lg-0">
                        <div className="full_page_tabs">
                            <Tabs>
                                <TabList className="react-tabs__tab-list d-flex justify-content-between">
                                    <Tab>Profile</Tab>
                                    <Tab onClick={() => ManageProject()}>Manage Projects</Tab>
                                    <Tab onClick={() => ManageInvoice()}>Invoices</Tab>
                                    {/* <Tab onClick={() => ManageContacts()}>Contacts</Tab> */}
                                    {/* <Tab onClick={() => ManagePayments()}>Payments</Tab> */}
                                </TabList>
                                <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Full Name</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.name}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Email</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.email}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Mobile</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.mobile ? clientDetailArray.clientDetail_Array.mobile : '--'}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Company Name</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.company_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Website</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.website}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">GST Number</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.gst_number ? clientDetailArray.clientDetail_Array.gst_number : '--'}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Address</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.address}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Shipping Address</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.shipping_address ? clientDetailArray.clientDetail_Array.shipping_address : '--'}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-3">
                                                    <h4 className="mb-2 fontsize16 blackcolortext">Note</h4>
                                                    <p className="m-0 paragraphcolor1text">{clientDetailArray.clientDetail_Array.note ? clientDetailArray.clientDetail_Array.note : '--'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="table-sm-responsive">
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    <td>ID</td>
                                                    <td>Project Name</td>
                                                    <td>Started On</td>
                                                    <td>Deadline</td>
                                                </thead>
                                                <tbody>
                                                    {ClientProjectsArray.ClientProjects_Array.map((val, index) => {
                                                        let number = index + 1;
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{number}</td>
                                                                    <td>{val.project_name}</td>
                                                                    <td>{val.start_date}</td>
                                                                    <td>{val.deadline}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                    {/* <tr className="text-center">
                                                        <td colSpan="4">No data available in table</td>
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="table-sm-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Invoice#</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Action</th>
                                                        <th scope="col">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ClientInvoiceArray.ClientInvoice_Array.map((val, index) => {
                                                        let number = index + 1;
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{number}</td>
                                                                    <td>{"Invoice#" + val.invoice_number}</td>
                                                                    <td>{val.currency_symbol}{val.total}</td>

                                                                    <td><a href={Globalsettings.url + "api/admin/projects/invoices/download/" + val.id}>Download</a></td>
                                                                    <td>{val.issue_date}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                {/* <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="d-flex align-items-center mb-4">
                                            <h4 className="main_title"> Contacts</h4>
                                            <div className="btn-group ml-auto dropdown for_all">
                                                <NavLink onClick={() => setModalShowAddContact(true)} to="#" className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add Contacts</NavLink>
                                            </div>
                                        </div>
                                      
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="ml-auto">

                                            </div>
                                        </div>
                                      
                                        <div className="table-sm-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ContactTabTableArray.map((val) => {
                                                        return (
                                                            <ContactTabTable
                                                                key={val.key}
                                                                countnumber={val.countnumber}
                                                                name={val.name}
                                                                phone={val.phone}
                                                                email={val.email}
                                                                iconimg={val.iconimg}
                                                                editiconimg={val.editiconimg}
                                                                viewiconimg={val.viewiconimg}
                                                                deleteiconimg={val.deleteiconimg}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel> */}
                                {/* <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="table-sm-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Project</th>
                                                        <th scope="col">Invoice#</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Paid On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ClientPaymentsArray.ClientPayments_Array.map((val, index) => {
                                                        let number = index + 1;
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{number}</td>
                                                                    <td>{number}</td>

                                                                    <td>{val.amount}</td>
                                                                    <td>{val.paid_on}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="d-flex align-items-center mb-4">
                                            <h4 className="main_title"> Note</h4>
                                            <div className="btn-group ml-auto dropdown for_all">
                                                <NavLink onClick={() => setModalShowAddNote(true)} to="#" className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add Note</NavLink>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="ml-auto">
         
                                            </div>
                                        </div>
                                       
                                        <div className="table-sm-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Notes Title#</th>
                                                        <th scope="col">Notes Type </th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colspan="4">No payment found</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel> */}
                                <TabPanel>
                                    <div className="card card_dashboard card-body vh-100">
                                        <div className="d-flex align-items-center mb-4">
                                            <h4 className="main_title"> Docoument</h4>
                                            <div className="btn-group ml-auto dropdown for_all">
                                                <NavLink onClick={() => setModalShowAddDocoument(true)} to="#" className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add Docoument</NavLink>
                                            </div>
                                        </div>
                                        <div className="table-sm-responsive data_table_profile">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Notes Title#</th>
                                                        <th scope="col">Notes Type </th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colspan="4">No payment found</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            {/* AddContact */}
            <MyVerticallyCenteredModalAddContact
                show={modalShowAddContact}
                onHide={() => setModalShowAddContact(false)}
            />
            {/* AddNote */}
            <MyVerticallyCenteredModalAddNote
                show={modalShowAddNote}
                onHide={() => setModalShowAddNote(false)}
            />
            {/* AddDocoument */}
            <MyVerticallyCenteredModalAddDocoument
                show={modalShowAddDocoument}
                onHide={() => setModalShowAddDocoument(false)}
            />
        </>
    )
}

export default Client_Detail;

// AddContact modal
function MyVerticallyCenteredModalAddContact(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">New Follow Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Contact Name*</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Phone*</FormLabel>
                        <Form.Control type="number" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Email*</FormLabel>
                        <Form.Control type="email" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// AddNote modal
function MyVerticallyCenteredModalAddNote(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Notes Title*</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Notes Details*</FormLabel>
                        <Form.Control className="transparent_form fontsize14" as="textarea" rows={5} />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// AddDocoument modal
function MyVerticallyCenteredModalAddDocoument(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Docoument</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Name*</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <Form.Control type="file" name="img[]" className="input-file transparent_form fontsize14 h-45px" />
                        <div className="input-group col-xs-12">
                            <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="Name" />
                            <span className="input-group-btn">
                                <Button variant="" className="upload-field btn h-45px bodycolorbg ml-2" type="button"> Select Files</Button>
                            </span>
                        </div>
                    </div>
                    <Button variant="" className="w-100px btn_blue">Add More</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}