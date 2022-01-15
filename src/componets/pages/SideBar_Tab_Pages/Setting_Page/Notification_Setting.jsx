import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button, FormLabel } from "react-bootstrap";
import Toggle from 'react-toggle';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
// 
import { ToastContainer, toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";
import LoadingOverlay from 'react-loading-overlay';

// 
import SlackSettingToggleLoop from "../Setting_Page/SlackSettingToggleLoop";
import SlackSettingToggleLoop_Array from "../Setting_Page/SlackSettingToggleLoop_Array";
import NotificationsSettingToggleLoop from "../Setting_Page/NotificationsSettingToggleLoop";
import NotificationsSettingToggleLoop_Array from "../Setting_Page/NotificationsSettingToggleLoop_Array";

// 
import backicon from "../../../../assets/images/arrowleft.svg";
import avatarprofile from "../../../../assets/images/avatar_dummy.svg";
import checkiconimg from "../../../../assets/images/checkicon.svg";

const Notification_Setting = () => {
    const [isLoading, setLoading] = useState(false);
    const [addedbyadmin, setaddedbyadmin] = useState(false);
    const [EmployeeAssigntoJob, setEmployeeAssigntoJob] = useState(false);
    const [NewNoticePublished, setNewNoticePublished] = useState(false);
    const [UserAssigntoTask, setUserAssigntoTask] = useState(false);
    const [NewExpenseAddedbyAdmin, setNewExpenseAddedbyAdmin] = useState(false);
    const [NewExpenseAddedbyMember, setNewExpenseAddedbyMember] = useState(false);
    const [ExpenseStatusChanged, setExpenseStatusChanged] = useState(false);
    const [NewSupportTicketRequest, setNewSupportTicketRequest] = useState(false);
    const [LeaveRequestReceived, setLeaveRequestReceived] = useState(false);
    const [Taskcompleted, setTaskcompleted] = useState(false);
    const [InvoiceNotification, setInvoiceNotification] = useState(false);

    const [addedbyadminid, setaddedbyadminid] = useState('');
    const [EmployeeAssigntoJobid, setEmployeeAssigntoJobid] = useState('');
    const [NewNoticePublishedid, setNewNoticePublishedid] = useState('');
    const [UserAssigntoTaskid, setUserAssigntoTaskid] = useState('');
    const [NewExpenseAddedbyAdminid, setNewExpenseAddedbyAdminid] = useState('');
    const [NewExpenseAddedbyMemberid, setNewExpenseAddedbyMemberid] = useState('');
    const [ExpenseStatusChangedid, setExpenseStatusChangedid] = useState('');
    const [NewSupportTicketRequestid, setNewSupportTicketRequestid] = useState('');
    const [LeaveRequestReceivedid, setLeaveRequestReceivedid] = useState('');
    const [Taskcompletedid, setTaskcompletedid] = useState('');
    const [InvoiceNotificationid, setInvoiceNotificationid] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/email-settings/' + companyid)
            .then((response) => {
                if (response.data.settings[4].send_email === 'yes') {
                    setaddedbyadmin(true);
                } if (response.data.settings[5].send_email === 'yes') {
                    setEmployeeAssigntoJob(true);
                } if (response.data.settings[0].send_email === 'yes') {
                    setNewNoticePublished(true);
                } if (response.data.settings[1].send_email === 'yes') {
                    setUserAssigntoTask(true);
                } if (response.data.settings[2].send_email === 'yes') {
                    setNewExpenseAddedbyAdmin(true);
                } if (response.data.settings[3].send_email === 'yes') {
                    setNewExpenseAddedbyMember(true);
                } if (response.data.settings[6].send_email === 'yes') {
                    setExpenseStatusChanged(true);
                } if (response.data.settings[7].send_email === 'yes') {
                    setNewSupportTicketRequest(true);
                } if (response.data.settings[8].send_email === 'yes') {
                    setLeaveRequestReceived(true);
                } if (response.data.settings[9].send_email === 'yes') {
                    setTaskcompleted(true);
                } if (response.data.settings[10].send_email === 'yes') {
                    setInvoiceNotification(true);
                }

                setaddedbyadminid(response.data.settings[4].id);
                setEmployeeAssigntoJobid(response.data.settings[5].id);
                setNewNoticePublishedid(response.data.settings[0].id);
                setUserAssigntoTaskid(response.data.settings[1].id);
                setNewExpenseAddedbyAdminid(response.data.settings[2].id);
                setNewExpenseAddedbyMemberid(response.data.settings[3].id);
                setExpenseStatusChangedid(response.data.settings[6].id);
                setNewSupportTicketRequestid(response.data.settings[7].id);
                setLeaveRequestReceivedid(response.data.settings[8].id);
                setTaskcompletedid(response.data.settings[9].id);
                setInvoiceNotificationid(response.data.settings[10].id);
                setLoading(false);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])



    const GettingEmailSettings = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/email-settings/' + companyid)
            .then((response) => {
                if (response.data.settings[4].send_email === 'yes') {
                    setaddedbyadmin(true);
                } if (response.data.settings[5].send_email === 'yes') {
                    setEmployeeAssigntoJob(true);
                } if (response.data.settings[0].send_email === 'yes') {
                    setNewNoticePublished(true);
                } if (response.data.settings[1].send_email === 'yes') {
                    setUserAssigntoTask(true);
                } if (response.data.settings[2].send_email === 'yes') {
                    setNewExpenseAddedbyAdmin(true);
                } if (response.data.settings[3].send_email === 'yes') {
                    setNewExpenseAddedbyMember(true);
                } if (response.data.settings[6].send_email === 'yes') {
                    setExpenseStatusChanged(true);
                } if (response.data.settings[7].send_email === 'yes') {
                    setNewSupportTicketRequest(true);
                } if (response.data.settings[8].send_email === 'yes') {
                    setLeaveRequestReceived(true);
                } if (response.data.settings[9].send_email === 'yes') {
                    setTaskcompleted(true);
                } if (response.data.settings[10].send_email === 'yes') {
                    setInvoiceNotification(true);
                }

                setaddedbyadminid(response.data.settings[4].id);
                setEmployeeAssigntoJobid(response.data.settings[5].id);
                setNewNoticePublishedid(response.data.settings[0].id);
                setUserAssigntoTaskid(response.data.settings[1].id);
                setNewExpenseAddedbyAdminid(response.data.settings[2].id);
                setNewExpenseAddedbyMemberid(response.data.settings[3].id);
                setExpenseStatusChangedid(response.data.settings[6].id);
                setNewSupportTicketRequestid(response.data.settings[7].id);
                setLeaveRequestReceivedid(response.data.settings[8].id);
                setTaskcompletedid(response.data.settings[9].id);
                setInvoiceNotificationid(response.data.settings[10].id);
                setLoading(false);
            });
    }


        const [saddedbyadmin, setsaddedbyadmin] = useState(false);
        const [sEmployeeAssigntoJob, setsEmployeeAssigntoJob] = useState(false);
        const [sNewNoticePublished, setsNewNoticePublished] = useState(false);
        const [sUserAssigntoTask, setsUserAssigntoTask] = useState(false);
        const [sNewExpenseAddedbyAdmin, setsNewExpenseAddedbyAdmin] = useState(false);
        const [sNewExpenseAddedbyMember, setsNewExpenseAddedbyMember] = useState(false);
        const [sExpenseStatusChanged, setsExpenseStatusChanged] = useState(false);
        const [sNewSupportTicketRequest, setsNewSupportTicketRequest] = useState(false);
        const [sLeaveRequestReceived, setsLeaveRequestReceived] = useState(false);
        const [sTaskcompleted, setsTaskcompleted] = useState(false);
        const [sInvoiceNotification, setsInvoiceNotification] = useState(false);
        const [selectedImage, setSelectedImage] = useState('');
        const imageChange = (e) => {
            if (e.target.files && e.target.files.length > 0) {
                setSelectedImage(e.target.files[0]);
            }
        }
        const[logo_url, setlogo_url] = useState('');
        const[slack_webhook, setslack_webhook] = useState('');
    const GettingSlackSettings = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/slack-settings/' + companyid)
            .then((response) => {
                if (response.data.settings[4].send_slack === 'yes') {
                    setsaddedbyadmin(true);
                } if (response.data.settings[5].send_slack === 'yes') {
                    setsEmployeeAssigntoJob(true);
                } if (response.data.settings[0].send_slack === 'yes') {
                    setsNewNoticePublished(true);
                } if (response.data.settings[1].send_slack === 'yes') {
                    setsUserAssigntoTask(true);
                } if (response.data.settings[2].send_slack === 'yes') {
                    setsNewExpenseAddedbyAdmin(true);
                } if (response.data.settings[3].send_slack === 'yes') {
                    setsNewExpenseAddedbyMember(true);
                } if (response.data.settings[6].send_slack === 'yes') {
                    setsExpenseStatusChanged(true);
                } if (response.data.settings[7].send_slack === 'yes') {
                    setsNewSupportTicketRequest(true);
                } if (response.data.settings[8].send_slack === 'yes') {
                    setsLeaveRequestReceived(true);
                } if (response.data.settings[9].send_slack === 'yes') {
                    setsTaskcompleted(true);
                } if (response.data.settings[10].send_slack === 'yes') {
                    setsInvoiceNotification(true);
                }   
                setlogo_url(response.data.slackSettings.slack_logo);   
                setslack_webhook(response.data.slackSettings.slack_webhook);         
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    const HandleSlackFormSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('slack_webhook', slack_webhook);
        data.append('slack_logo', selectedImage);
        axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/update', data).then((response) => {
            toast.success("Slack Settings Successfully Updated!");
            setlogo_url(response.data.slackSettings.slack_logo);         
            setslack_webhook(response.data.slackSettings.slack_webhook);   
            setLoading(false);
        });
        evt.preventDefault();        
    }


    const [paddedbyadmin, setpaddedbyadmin] = useState(false);
    const [pEmployeeAssigntoJob, setpEmployeeAssigntoJob] = useState(false);
    const [pNewNoticePublished, setpNewNoticePublished] = useState(false);
    const [pUserAssigntoTask, setpUserAssigntoTask] = useState(false);
    const [pNewExpenseAddedbyAdmin, setpNewExpenseAddedbyAdmin] = useState(false);
    const [pNewExpenseAddedbyMember, setpNewExpenseAddedbyMember] = useState(false);
    const [pExpenseStatusChanged, setpExpenseStatusChanged] = useState(false);
    const [pNewSupportTicketRequest, setpNewSupportTicketRequest] = useState(false);
    const [pLeaveRequestReceived, setpLeaveRequestReceived] = useState(false);
    const [pTaskcompleted, setpTaskcompleted] = useState(false);
    const [pInvoiceNotification, setpInvoiceNotification] = useState(false);

    const GettingPushSettings = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/push-notification-settings/' + companyid)
            .then((response) => {
                if (response.data.settings[4].send_push === 'yes') {
                    setpaddedbyadmin(true);
                } if (response.data.settings[5].send_push === 'yes') {
                    setpEmployeeAssigntoJob(true);
                } if (response.data.settings[0].send_push === 'yes') {
                    setpNewNoticePublished(true);
                } if (response.data.settings[1].send_push === 'yes') {
                    setpUserAssigntoTask(true);
                } if (response.data.settings[2].send_push === 'yes') {
                    setpNewExpenseAddedbyAdmin(true);
                } if (response.data.settings[3].send_push === 'yes') {
                    setpNewExpenseAddedbyMember(true);
                } if (response.data.settings[6].send_push === 'yes') {
                    setpExpenseStatusChanged(true);
                } if (response.data.settings[7].send_push === 'yes') {
                    setpNewSupportTicketRequest(true);
                } if (response.data.settings[8].send_push === 'yes') {
                    setpLeaveRequestReceived(true);
                } if (response.data.settings[9].send_push === 'yes') {
                    setpTaskcompleted(true);
                } if (response.data.settings[10].send_push === 'yes') {
                    setpInvoiceNotification(true);
                }                    
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
                                        <Tab onClick={() => GettingEmailSettings()}>Email Settings</Tab>
                                        <Tab onClick={() => GettingSlackSettings()}>Slack Settings</Tab>
                                        <Tab onClick={() => GettingPushSettings()}>Push Notifications</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Email Settings</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header pb-3 mb-4">
                                                <h4 className="main_title fontsize18">Email Settings</h4>
                                                <p className="m-0 paragraphcolor1text">Select the events for which an email should be sent to user.</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">User Registration/Added by Admin</FormLabel>
                                                        <Toggle
                                                            checked={addedbyadmin}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setaddedbyadmin(!addedbyadmin);
                                                                var msg;
                                                                if (addedbyadmin) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: addedbyadminid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">Employee Assign to Job</FormLabel>
                                                        <Toggle
                                                            checked={EmployeeAssigntoJob}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setEmployeeAssigntoJob(!EmployeeAssigntoJob);
                                                                var msg;
                                                                if (EmployeeAssigntoJob) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: EmployeeAssigntoJobid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">New Notice Published</FormLabel>
                                                        <Toggle
                                                            checked={NewNoticePublished}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setNewNoticePublished(!NewNoticePublished);
                                                                var msg;
                                                                if (NewNoticePublished) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: NewNoticePublishedid,
                                                                    send_email: msg
                                                                })
                                                                .then((response) => {
                                                                    toast.success("Email Settings Successfully Updated!");
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">User Assign to Task</FormLabel>
                                                        <Toggle
                                                            checked={UserAssigntoTask}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setUserAssigntoTask(!UserAssigntoTask);
                                                                var msg;
                                                                if (UserAssigntoTask) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: UserAssigntoTaskid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">New Expense (Added by Admin)</FormLabel>
                                                        <Toggle
                                                            checked={NewExpenseAddedbyAdmin}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setNewExpenseAddedbyAdmin(!NewExpenseAddedbyAdmin);
                                                                var msg;
                                                                if (NewExpenseAddedbyAdmin) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: NewExpenseAddedbyAdminid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">New Expense (Added by Member)</FormLabel>
                                                        <Toggle
                                                            checked={NewExpenseAddedbyMember}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setNewExpenseAddedbyMember(!NewExpenseAddedbyMember);
                                                                var msg;
                                                                if (NewExpenseAddedbyMember) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: NewExpenseAddedbyMemberid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">Expense Status Changed</FormLabel>
                                                        <Toggle
                                                            checked={ExpenseStatusChanged}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setExpenseStatusChanged(!ExpenseStatusChanged);
                                                                var msg;
                                                                if (ExpenseStatusChanged) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: ExpenseStatusChangedid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">New Support Ticket Request</FormLabel>
                                                        <Toggle
                                                            checked={NewSupportTicketRequest}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setNewSupportTicketRequest(!NewSupportTicketRequest);
                                                                var msg;
                                                                if (NewSupportTicketRequest) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: NewSupportTicketRequestid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">Leave Request Received</FormLabel>
                                                        <Toggle
                                                            checked={LeaveRequestReceived}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setLeaveRequestReceived(!LeaveRequestReceived);
                                                                var msg;
                                                                if (LeaveRequestReceived) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: LeaveRequestReceivedid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">Task completed</FormLabel>
                                                        <Toggle
                                                            checked={Taskcompleted}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setTaskcompleted(!Taskcompleted);
                                                                var msg;
                                                                if (Taskcompleted) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: Taskcompletedid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <FormLabel className="mr-3">Invoice Notification</FormLabel>
                                                        <Toggle
                                                            checked={InvoiceNotification}
                                                            name='burritoIsReady'
                                                            onChange={(e) => {
                                                                setInvoiceNotification(!InvoiceNotification);
                                                                var msg;
                                                                if (InvoiceNotification) {
                                                                    msg = "no";
                                                                } else {
                                                                    msg = "yes";
                                                                }
                                                                axios.post(Globalsettings.url + 'api/admin/settings/email-settings/update', {
                                                                    id: InvoiceNotificationid,
                                                                    send_email: msg
                                                                })
                                                                    .then((response) => {
                                                                        toast.success("Email Settings Successfully Updated!");
                                                                    })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Slack Settings</h4>
                                        <div className="card card_dashboard">
                                            <div className="card-header align-items-center py-3 px-2 d-flex">
                                                <div className="col-xl-6 col-lg-12">
                                                    <h4 className="main_title fontsize18">Update Slack Settings</h4>
                                                    <p className="m-0 paragraphcolor1text">Select the events for which an notification should be sent to user.</p>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">User Registration/Added by Admin</FormLabel>
                                                            <Toggle
                                                                checked={saddedbyadmin}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsaddedbyadmin(!saddedbyadmin);
                                                                    var msg;
                                                                    if (saddedbyadmin) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: addedbyadminid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Employee Assign to Job</FormLabel>
                                                            <Toggle
                                                                checked={sEmployeeAssigntoJob}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsEmployeeAssigntoJob(!sEmployeeAssigntoJob);
                                                                    var msg;
                                                                    if (sEmployeeAssigntoJob) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: EmployeeAssigntoJobid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Notice Published</FormLabel>
                                                            <Toggle
                                                                checked={sNewNoticePublished}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsNewNoticePublished(!sNewNoticePublished);
                                                                    var msg;
                                                                    if (sNewNoticePublished) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: NewNoticePublishedid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">User Assign to Task</FormLabel>
                                                            <Toggle
                                                                checked={sUserAssigntoTask}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsUserAssigntoTask(!sUserAssigntoTask);
                                                                    var msg;
                                                                    if (sUserAssigntoTask) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: UserAssigntoTaskid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Expense (Added by Admin)</FormLabel>
                                                            <Toggle
                                                                checked={sNewExpenseAddedbyAdmin}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsNewExpenseAddedbyAdmin(!sNewExpenseAddedbyAdmin);
                                                                    var msg;
                                                                    if (sNewExpenseAddedbyAdmin) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: NewExpenseAddedbyAdminid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Expense (Added by Member)</FormLabel>
                                                            <Toggle
                                                                checked={sNewExpenseAddedbyMember}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsNewExpenseAddedbyMember(!sNewExpenseAddedbyMember);
                                                                    var msg;
                                                                    if (sNewExpenseAddedbyMember) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: NewExpenseAddedbyMemberid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Expense Status Changed</FormLabel>
                                                            <Toggle
                                                                checked={sExpenseStatusChanged}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsExpenseStatusChanged(!sExpenseStatusChanged);
                                                                    var msg;
                                                                    if (sExpenseStatusChanged) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: ExpenseStatusChangedid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Support Ticket Request</FormLabel>
                                                            <Toggle
                                                                checked={sNewSupportTicketRequest}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsNewSupportTicketRequest(!sNewSupportTicketRequest);
                                                                    var msg;
                                                                    if (sNewSupportTicketRequest) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: NewSupportTicketRequestid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Leave Request Received</FormLabel>
                                                            <Toggle
                                                                checked={sLeaveRequestReceived}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsLeaveRequestReceived(!sLeaveRequestReceived);
                                                                    var msg;
                                                                    if (sLeaveRequestReceived) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: LeaveRequestReceivedid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Task completed</FormLabel>
                                                            <Toggle
                                                                checked={sTaskcompleted}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsTaskcompleted(!sTaskcompleted);
                                                                    var msg;
                                                                    if (sTaskcompleted) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: Taskcompletedid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Invoice Notification</FormLabel>
                                                            <Toggle
                                                                checked={sInvoiceNotification}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setsInvoiceNotification(!sInvoiceNotification);
                                                                    var msg;
                                                                    if (sInvoiceNotification) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/slack-settings/updateSlackNotification', {
                                                                        id: InvoiceNotificationid,
                                                                        send_slack: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Slack Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Form onSubmit={HandleSlackFormSubmit}>
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-12">
                                                        <FormLabel className="mb-2">Slack Webhook</FormLabel>
                                                        <Form.Control type="text" className="transparent_form h-40px" required value={slack_webhook} onChange={(e) => setslack_webhook(e.target.value)} />
                                                    </div>
                                                    <div className="col-xl-3 mb-4">
                                                        <div className="p-3 border-radius-15 bodycolorbg">
                                                            <div className="mb-3 p-2 bg-white text-center">
                                                                {(() => {
                                                                    if (selectedImage) {
                                                                        return (
                                                                            <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage)} alt="" />
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <img width="160" className="img-thumnail" src={"slack-logo/"+logo_url} alt="" />
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                            <Form.Control
                                                                className="w-100px "
                                                                type="file"
                                                                id="inputGroupFile01"
                                                                label="Upload Boundary File"
                                                                custom
                                                                onChange={imageChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-12">
                                                        <Button variant="" type="submit" className="w-100px btn btn_blue mr-2"><img className="img-fluid mr-1" src={checkiconimg} alt="checkicon" /> Update</Button>
                                                    </div>
                                                </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Push Notifications</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header pb-3 mb-4">
                                                <h4 className="main_title fontsize18">Update Push Notifications Settings</h4>
                                                <p className="m-0 paragraphcolor1text">Select the events for which an notification should be sent to user.</p>
                                            </div>
                                            <div className="row">
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">User Registration/Added by Admin</FormLabel>
                                                            <Toggle
                                                                checked={paddedbyadmin}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpaddedbyadmin(!paddedbyadmin);
                                                                    var msg;
                                                                    if (paddedbyadmin) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: addedbyadminid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Employee Assign to Job</FormLabel>
                                                            <Toggle
                                                                checked={pEmployeeAssigntoJob}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpEmployeeAssigntoJob(!pEmployeeAssigntoJob);
                                                                    var msg;
                                                                    if (pEmployeeAssigntoJob) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: EmployeeAssigntoJobid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Notice Published</FormLabel>
                                                            <Toggle
                                                                checked={pNewNoticePublished}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpNewNoticePublished(!pNewNoticePublished);
                                                                    var msg;
                                                                    if (pNewNoticePublished) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: NewNoticePublishedid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">User Assign to Task</FormLabel>
                                                            <Toggle
                                                                checked={pUserAssigntoTask}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpUserAssigntoTask(!pUserAssigntoTask);
                                                                    var msg;
                                                                    if (pUserAssigntoTask) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: UserAssigntoTaskid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Expense (Added by Admin)</FormLabel>
                                                            <Toggle
                                                                checked={pNewExpenseAddedbyAdmin}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpNewExpenseAddedbyAdmin(!pNewExpenseAddedbyAdmin);
                                                                    var msg;
                                                                    if (pNewExpenseAddedbyAdmin) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: NewExpenseAddedbyAdminid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Expense (Added by Member)</FormLabel>
                                                            <Toggle
                                                                checked={pNewExpenseAddedbyMember}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpNewExpenseAddedbyMember(!pNewExpenseAddedbyMember);
                                                                    var msg;
                                                                    if (pNewExpenseAddedbyMember) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: NewExpenseAddedbyMemberid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Expense Status Changed</FormLabel>
                                                            <Toggle
                                                                checked={pExpenseStatusChanged}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpExpenseStatusChanged(!pExpenseStatusChanged);
                                                                    var msg;
                                                                    if (pExpenseStatusChanged) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: ExpenseStatusChangedid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">New Support Ticket Request</FormLabel>
                                                            <Toggle
                                                                checked={pNewSupportTicketRequest}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpNewSupportTicketRequest(!pNewSupportTicketRequest);
                                                                    var msg;
                                                                    if (pNewSupportTicketRequest) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: NewSupportTicketRequestid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Leave Request Received</FormLabel>
                                                            <Toggle
                                                                checked={pLeaveRequestReceived}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpLeaveRequestReceived(!pLeaveRequestReceived);
                                                                    var msg;
                                                                    if (pLeaveRequestReceived) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: LeaveRequestReceivedid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Task completed</FormLabel>
                                                            <Toggle
                                                                checked={pTaskcompleted}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpTaskcompleted(!pTaskcompleted);
                                                                    var msg;
                                                                    if (pTaskcompleted) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: Taskcompletedid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 mb-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <FormLabel className="mr-3">Invoice Notification</FormLabel>
                                                            <Toggle
                                                                checked={pInvoiceNotification}
                                                                name='burritoIsReady'
                                                                onChange={(e) => {
                                                                    setpInvoiceNotification(!pInvoiceNotification);
                                                                    var msg;
                                                                    if (pInvoiceNotification) {
                                                                        msg = "no";
                                                                    } else {
                                                                        msg = "yes";
                                                                    }
                                                                    axios.post(Globalsettings.url + 'api/admin/settings/push-notification-settings/updatePushNotification', {
                                                                        id: InvoiceNotificationid,
                                                                        send_push: msg
                                                                    })
                                                                        .then((response) => {
                                                                            toast.success("Push Notification Settings Successfully Updated!");
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default Notification_Setting;
