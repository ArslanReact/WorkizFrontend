import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { InputGroup, Button, Modal, FormLabel, Form, Accordion, FormControl } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";

// 
import edit_4_iconimg from "../../../../../assets/images/edit_4_iconimg.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import icon_16img from "../../../../../assets/images/icon_16.svg";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";


const Leads_View = (props) => {
    const [modalShowLeadAgent, setModalShowLeadAgent] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/leads/show/' + companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);

            });
    }, []);   

    const [LeadDataArray, setLeadDataArray] = useState({
        LeadDataArray_Array: []
    });
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Lead", field: "client_name", sortable: true },
        { name: "Total", field: "company_name", sortable: true },
        { name: "Valid Till", field: "value", sortable: false },
        { name: "Status", field: "status", sortable: false },
        { name: "Action", field: "action", sortable: false }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = LeadDataArray.LeadDataArray_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.client_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.agent_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.created_at.toLowerCase().includes(search.toLowerCase())|| 
                    comment.company_name.toLowerCase().includes(search.toLowerCase()) 
            );
        }

        setTotalItems(tabledata.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            tabledata = tabledata.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        
        //Current Page slice
        return tabledata.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [LeadDataArray.LeadDataArray_Array, currentPage, search, sorting]);
    return (
        <>

            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title"> Leads #{TableData.TableData_Array.id} - {TableData.TableData_Array.company_name}</h4>
                </div>
            </div>
            {/*  */}
            <div className="full_page_tabs">
                <Tabs>
                    <TabList className="react-tabs__tab-list d-flex justify-content-between">
                        <Tab>Profile</Tab>
                        <Tab>Proposal</Tab>
                        <Tab>Files</Tab>
                        <Tab>Follow Up</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="card card_dashboard card-body">
                            <h4 className="main_title fontsize20"> Lead Detail</h4>
                            <div className="row mt-3">
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Company Name</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.company_name}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Website</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.website}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Mobile</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.mobile}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Office Phone Number</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.office_phone}</p>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Address</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.address}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Client Name</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.client_name}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Client Email</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.client_email}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Source</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.source}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Status</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.statusName}</p>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 mb-4">
                                    <div className="bodycolorbg border_lightparagraphcolor_1 border-radius-10 p-4">
                                        <h4 className="mb-3 fontsize16 blackcolortext">Note</h4>
                                        <p className="m-0 paragraphcolor1text">{TableData.TableData_Array.note}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card card_dashboard card-body">
                            <div className="d-flex align-items-center">
                                <h4 className="main_title"> Lead Proposal</h4>
                                <div className="btn-group ml-auto dropdown for_all">
                                    <NavLink to={`${process.env.PUBLIC_URL}/add_proposal`} className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add Proposal Info</NavLink>
                                </div>
                            </div>
                            {/*  */}
                            <div className="d-flex align-items-center mb-4">
                                <div className="ml-auto">
                                        <Search
                                            onSearch={value => {
                                                setSearch(value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                </div>
                            </div>
                            {/*  */}
                            <div className="table-sm-responsive">
                                <table className="table mb-0">
                                    <thead>
                                        <td>ID</td>
                                        <td>Lead</td>
                                        <td>Total</td>
                                        <td>Valid Till</td>
                                        <td>Status</td>
                                        <td>Action</td>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td colspan="6">No data available in table</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card card_dashboard card-body">
                            <h4 className="main_title mb-3">Files</h4>
                            <div className="w-100">
                                    <div className="p-3 border-radius-15 mt-3 bodycolorbg">
                                        <div class="file-drop-area">
                                            <span class="fake-btn">Choose files</span>
                                            <span class="file-msg">Drop files here OR click to upload</span>
                                            <input class="file-input" name="getFile[]" type="file" multiple="" required="" />
                                        </div>
                                    </div>
                            </div>
                            {/*  */}
                            <Tabs>
                                <TabList className="react-tabs__tab-list d-flex justify-content-between">
                                    <Tab>Profile</Tab>
                                    <Tab>Proposal</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="card card-body">
                                        <p>You have not uploaded any file.</p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card-body">
                                        <p>You have not uploaded any file in page.</p>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card card_dashboard card-body">
                            <div className="d-flex align-items-center">
                                <h4 className="main_title"> Follow Up</h4>
                                <div className="btn-group ml-auto dropdown for_all">
                                    <Form>
                                        <Form.Control as="select" className="transparent_form fontsize14">
                                            <option>Last Created</option>
                                            <option>Due Soon</option>
                                        </Form.Control>
                                    </Form>
                                    <NavLink onClick={() => setModalShowLeadAgent(true)} to="#" className="btn btn_blue ml-3"><img className="img-fluid" src={plusicon} alt="" /> Add New Folow Up</NavLink>
                                </div>
                            </div>
                            {/*  */}
                            <div className="table-sm-responsive">
                                <div className="table table-borderless m-0">
                                    <thead>
                                        <th scope="col">No follow up found</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="1">Note: The add and edit follow up functionality will work when the next follow up is YES .</td>
                                        </tr>
                                    </tbody>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalLeadAgent
                show={modalShowLeadAgent}
                onHide={() => setModalShowLeadAgent(false)}
            />
        </>
    )
}

export default Leads_View;

// Lead Agent modal
function MyVerticallyCenteredModalLeadAgent(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">New Follow Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Next Follow Up*</FormLabel>
                        <Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Description*</FormLabel>
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