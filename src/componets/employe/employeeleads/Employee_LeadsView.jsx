import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../node_modules/react-tabs/style/react-tabs.css";

import LoadingOverlay from 'react-loading-overlay';
const Employee_LeadsView = (props) => {
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/leads/show/' + companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);

            });
    }, []);    
    return (
        <>
                    <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title"> Leads # {TableData.TableData_Array.id} - {TableData.TableData_Array.company_name}</h4>
                </div>
            </div>
            {/*  */}
            <div className="full_page_tabs">
                <Tabs>
                    <TabList className="react-tabs__tab-list d-flex justify-content-between">
                        <Tab>Profile</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="card card-body">
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
                </Tabs>
            </div>
        </>
    )
}

export default Employee_LeadsView;