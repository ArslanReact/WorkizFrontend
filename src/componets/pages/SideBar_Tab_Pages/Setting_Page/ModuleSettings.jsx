import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { Form,FormLabel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Toggle from 'react-toggle';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import backicon from "../../../../assets/images/arrowleft.svg";

const ModuleSettings = () => {
    const [isLoading, setLoading] = useState(false);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [AdminModulesData, setAdminModulesData] = useState({
        AdminModulesData_Array: []
    });
    const [EmpModulesData, setEmpModulesData] = useState({
        EmpModulesData_Array: []
    });
    const [ClientModulesData, setClientModulesData] = useState({
        ClientModulesData_Array: []
    });
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/module-settings/' + companyid)
            .then((response) => {
                setAdminModulesData({ AdminModulesData_Array: response.data.modulesdata ? response.data.modulesdata : [], });
                setLoading(false);
            });
    }, []);

    const AdminModuleSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/module-settings/' + companyid)
            .then((response) => {
                setAdminModulesData({ AdminModulesData_Array: response.data.modulesdata ? response.data.modulesdata : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }
    const EmpModuleSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/module-settings/' + companyid+'?type=employee')
            .then((response) => {
                setEmpModulesData({ EmpModulesData_Array: response.data.modulesdata ? response.data.modulesdata : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }
    const ClientModuleSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/module-settings/' + companyid+'?type=client')
            .then((response) => {
                setClientModulesData({ ClientModulesData_Array: response.data.modulesdata ? response.data.modulesdata : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
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
                                        <Tab onClick={() => AdminModuleSettingsDetails()}>Admin Module Settings</Tab>
                                        <Tab onClick={() => EmpModuleSettingsDetails()}>Employee Module Settings</Tab>
                                        <Tab onClick={() => ClientModuleSettingsDetails()}>Client Module Settings</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <Form>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Module Settings</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-2">
                                                <h4 className="fontsize18 mb-2">Admin Module Settings</h4>
                                                <p className="m-0 paragraphcolor1text">Select the modules which you want to enable. Admin section.</p>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="row">
                                                {AdminModulesData.AdminModulesData_Array.map((val,index) => {;
                                                        return (
                                                            <div className="col-xl-4 col-lg-3"  key={index}>
                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <FormLabel className="mr-2">{val.module_name}</FormLabel>
                                                                <Toggle
                                                                        defaultChecked={val.status == 'active' ? true : false}
                                                                        icons={false}
                                                                        name='a'
                                                                        onChange={(e) => {
                                                                            setLoading(true);
                                                                            var msg;
                                                                            if (e.target.value == "on") {
                                                                                msg = "deactive";
                                                                            } else {
                                                                                msg = "active";
                                                                            }
                                                                            axios.post(Globalsettings.url + 'api/admin/settings/module-settings/update', {
                                                                                comapanyid: companyid,
                                                                                id: val.id,
                                                                                status: msg
                                                                            })
                                                                                .then((response) => {
                                                                                    setLoading(false);
                                                                                    toast.success("Module Settings Successfully Updated!");
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Module Settings</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-2">
                                                <h4 className="fontsize18 mb-2">Employee Module Settings</h4>
                                                <p className="m-0 paragraphcolor1text">Select the modules which you want to enable. Employee section.</p>
                                            </div>
                                            <div className="col-lg-10 mx-auto">
                                                <div className="row">
                                                    {EmpModulesData.EmpModulesData_Array.map((val,index) => {;
                                                        return (
                                                            <div className="col-xl-4 col-lg-3"  key={index}>
                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <FormLabel className="mr-2">{val.module_name}</FormLabel>
                                                                <Toggle
                                                                        defaultChecked={val.status == 'active' ? true : false}
                                                                        icons={false}
                                                                        name='a'
                                                                        onChange={(e) => {
                                                                            setLoading(true);
                                                                            var msg;
                                                                            if (e.target.value == "on") {
                                                                                msg = "deactive";
                                                                            } else {
                                                                                msg = "active";
                                                                            }
                                                                            axios.post(Globalsettings.url + 'api/admin/settings/module-settings/update', {
                                                                                comapanyid: companyid,
                                                                                id: val.id,
                                                                                status: msg
                                                                            })
                                                                                .then((response) => {
                                                                                    setLoading(false);
                                                                                    toast.success("Module Settings Successfully Updated!");
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Module Settings</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-3 pb-2">
                                                <h4 className="fontsize18 mb-2">Client Module Settings</h4>
                                                <p className="m-0 paragraphcolor1text">Select the modules which you want to enable. Admin section.</p>
                                            </div>
                                            <div className="col-lg-10 mx-auto">
                                                <div className="row">
                                                {ClientModulesData.ClientModulesData_Array.map((val,index) => {;
                                                        return (
                                                            <div className="col-xl-4 col-lg-3"  key={index}>
                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <FormLabel className="mr-2">{val.module_name}</FormLabel>
                                                                <Toggle
                                                                        defaultChecked={val.status == 'active' ? true : false}
                                                                        icons={false}
                                                                        name='a'
                                                                        onChange={(e) => {
                                                                            setLoading(true);
                                                                            var msg;
                                                                            if (e.target.value == "on") {
                                                                                msg = "deactive";
                                                                            } else {
                                                                                msg = "active";
                                                                            }
                                                                            axios.post(Globalsettings.url + 'api/admin/settings/module-settings/update', {
                                                                                comapanyid: companyid,
                                                                                id: val.id,
                                                                                status: msg
                                                                            })
                                                                                .then((response) => {
                                                                                    setLoading(false);
                                                                                    toast.success("Module Settings Successfully Updated!");
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Form>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default ModuleSettings;
