import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import swal from 'sweetalert';
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { GithubPicker } from 'react-color';
// import { NavLink } from "react-router-dom";
import { Form, Alert, Button, Modal, Row, Col, FormControl, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import $ from "jquery";
import ImagePicker from 'react-image-picker';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";
import Toggle from 'react-toggle';
// 
import RolePermissionLoop from "../Setting_Page/RolePermissionLoop";
import RolePermissionLoop_Array from "../Setting_Page/RolePermissionLoop_Array";
import TicketChannelTableLoop from "../Setting_Page/TicketChannelTableLoop";
import CurrencySettingLoop from "../Setting_Page/CurrencySettingLoop";

// 
import checkicon from "../../../../assets/images/checkicon.svg";
import plusicon from "../../../../assets/images/plusicon.svg";
import alerticon from "../../../../assets/images/alerticon.svg";
import refreshicon from "../../../../assets/images/refresh-button.svg";
import tootipicon from "../../../../assets/images/tootipicon.svg";
import eyeicon from "../../../../assets/images/eye.svg";
import LoadingOverlay from 'react-loading-overlay';

//import images from local
import img1 from '../../../../assets/images/invoice-templete/1.png';
import img2 from '../../../../assets/images/invoice-templete/2.png';
import img3 from '../../../../assets/images/invoice-templete/3.png';
import img4 from '../../../../assets/images/invoice-templete/4.png';
import eye from "../../../../assets/images/eye.svg";
import hideeye from "../../../../assets/images/eye_half.svg";
const imageList = [img1, img2, img3, img4];
const colorlabel = ['#ed4040', '#00c292','#f1c411','#5475ed'];
const Setting = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState('');
    const [selectedFinanceImage, setselectedFinanceImage] = useState('');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    const ProfileimageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedProfileImage(e.target.files[0]);
        }
    }
    const FinanceimageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setselectedFinanceImage(e.target.files[0]);
        }
    }
    // Company Input  
    const [CompanyName, setCompanyName] = useState('');
    const [CompanyEmail, setCompanyEmail] = useState('');
    const [CompanyPhone, setCompanyPhone] = useState('');
    const [Companyweb, setCompanyweb] = useState('');
    const [Companyaddress, setCompanyaddress] = useState('');
    const [currencycode, setcurrencycode] = useState('');
    const [timezone, settimezone] = useState('');
    const [dateformat, setdateformat] = useState('');
    const [timeformat, settimeformat] = useState('');
    const [weekstart, setweekstart] = useState('');
    const [language, setlanguage] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    //Profile Input
    const [profilename, setprofilename] = useState('');
    const [profileemail, setprofileemail] = useState('');
    const [profilepass, setprofilepass] = useState('');
    const [profileadrress, setprofileadrress] = useState('');
    const [emailnotification, setemailnotification] = useState('');
    const [profileimage, setprofileimage] = useState('');
    const handleChangeEmailNotification = e => {
        const value = e.target.value;
        setemailnotification(value);
    };
    //
    const [CurrencyData, setCurrencyData] = useState({
        CurrencyData_Array: []
    });
    const [TimeZoneData, setTimeZoneData] = useState({
        TimeZoneData_Array: []
    });
    const [CompanyData, setCompanyData] = useState({
        CompanyData_Array: []
    });
    const [LanguageData, setLanguageData] = useState({
        LanguageData_Array: []
    });
    const [CurrencyList, setCurrencyList] = useState({
        CurrencyList_Array: []
    });
    const [companydefaultcurrency, setcompanydefaultcurrency] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/companysettings/' + companyid)
            .then((response) => {
                setCompanyData({ CompanyData_Array: response.data.company ? response.data.company : [], });
                setCompanyName(response.data.company.company_name);
                setCompanyEmail(response.data.company.company_email);
                setCompanyPhone(response.data.company.company_phone);
                setCompanyweb(response.data.company.website);
                setCompanyaddress(response.data.company.address);
                setcurrencycode(response.data.company.currency_id);
                settimezone(response.data.company.timezone);
                setdateformat(response.data.company.date_format);
                settimeformat(response.data.company.time_format);
                setweekstart(response.data.company.week_start);
                setlanguage(response.data.company.locale);
                setlatitude(response.data.company.latitude);
                setlongitude(response.data.company.longitude);
                setCurrencyData({ CurrencyData_Array: response.data.currencies ? response.data.currencies : [], });
                setTimeZoneData({ TimeZoneData_Array: response.data.timezones ? response.data.timezones : [], });
                setLanguageData({ LanguageData_Array: response.data.languages ? response.data.languages : [], });
                if(props.location.pathname === '/projects/reactworkiz/setting/profile'){
                    axios.get(Globalsettings.url + 'api/admin/profile-settings/' + userid)
                    .then((response) => {
                        setprofilename(response.data.userDetail.name);
                        setprofileemail(response.data.userDetail.email);
                        setprofilepass('');
                        setprofileadrress(response.data.employeeDetail.address);
                        setemailnotification(response.data.userDetail.email_notifications);
                        setprofileimage(response.data.userDetail.image_url);
                    });
                    setTabIndex(1);
                }
            })
            .catch((error) => {
               toast.error("went wrong")
            });
    }, [])
    // Get Profile Data
    const ProfileSettingsDetails = () => {
        axios.get(Globalsettings.url + 'api/admin/profile-settings/' + userid)
            .then((response) => {
                setprofilename(response.data.userDetail.name);
                setprofileemail(response.data.userDetail.email);
                setprofilepass('');
                setprofileadrress(response.data.employeeDetail.address);
                setemailnotification(response.data.userDetail.email_notifications);
                setprofileimage(response.data.userDetail.image_url);
            });
    }
    // Update Company Settings
    const SubmitCompanySettings = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('company_name', CompanyName);
        data.append('company_email', CompanyEmail);
        data.append('company_phone', CompanyPhone);
        data.append('website', Companyweb);
        data.append('address', Companyaddress);
        data.append('logo', selectedImage);
        data.append('currency_id', currencycode);
        data.append('timezone', timezone);
        data.append('date_format', dateformat);
        data.append('time_format', timeformat);
        data.append('week_start', weekstart);
        data.append('locale', language);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        axios.post(Globalsettings.url + 'api/admin/companysettings/update/' + companyid, data).then((response) => {
            toast.success("Company Settings Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
        });
        evt.preventDefault();
    }

    const onPasswordClickShow= (e) => {
        var x=document.getElementById("pass");
        var y=document.getElementById("imgpass");
        if(x.type==="password")
        {
            x.type="text";
            y.src=eye;
        }else{
            x.type="password";
            y.src=hideeye;
        }
     }

    // Update Profile Settings
    const SubmitProfileSettings = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('name', profilename);
        data.append('email', profileemail);
        data.append('email_notifications', emailnotification);
        data.append('password', profilepass);
        data.append('address', profileadrress);
        data.append('image', selectedProfileImage);
        axios.post(Globalsettings.url + 'api/member/profile/'+companyid+'/'+ userid, data).then((response) => {
            
            localStorage.setItem("data", JSON.stringify(response.data.data.userDetail));
            toast.success("Profile Settings Successfully Updated!");
            setLoading(false);
            history.push(`${process.env.PUBLIC_URL}/setting`);
        });
        evt.preventDefault();
    }

    const[self_task, setself_task] = useState(false);
    const[default_task_status, setdefault_task_status] = useState('');
    const [TaskSettingStatus, setTaskSettingStatus] = useState({
        TaskSettingStatus_Array: []
    });
    // Get Task Setting Data
    const TaskSettingsDetails = () => {
        axios.get(Globalsettings.url + 'api/admin/settings/task-settings/'+companyid)
            .then((response) => {
                setTaskSettingStatus({ TaskSettingStatus_Array: response.data.taskboardColumns ? response.data.taskboardColumns : [], });
                setself_task(response.data.companyData.task_self == 'no' ? false : true);
                setdefault_task_status(response.data.companyData.default_task_status);
            });
    }
    // Store Task Setting Data
    const TaskSettingSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/settings/task-settings/store',{
            self_task :self_task,
            default_task_status: default_task_status,
            company_id: companyid
        })
        .then((response) => {
            setLoading(false);
            toast.success("Task setting updated successfully.");
        });
        evt.preventDefault();
    }
    // Get Currency Settings Details Data
    const CurrencySettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/currency/'+companyid)
            .then((response) => {
                setLoading(false);
                setCurrencyList({ CurrencyList_Array: response.data.currencies ? response.data.currencies : [], });
                setcompanydefaultcurrency(response.data.currencyid);
            });
    }
    const updateExchangeRate = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/currency/update/exchange-rates/'+companyid)
            .then((response) => {
                setLoading(false);
                toast.success("Exchange rate updated successfully.");
            });
    }

    //ThemeSettingsDetails  
    const [default_theme, setdefault_theme] = useState('');
    const [rounded_theme, setrounded_theme] = useState(0);
    const [header_color, setheader_color] = useState('');
    const [sidebar_color, setsidebar_color] = useState('');
    const [sidebar_text_color, setsidebar_text_color] = useState('');
    const [link_color, setlink_color] = useState('');
    const [client_header_color, setclient_header_color] = useState('');
    const [client_sidebar_color, setclient_sidebar_color] = useState('');
    const [client_sidebar_text_color, setclient_sidebar_text_color] = useState('');
    const [client_link_color, setclient_link_color] = useState('');
    const [emp_header_color, setemp_header_color] = useState('');
    const [emp_sidebar_color, setemp_sidebar_color] = useState('');
    const [emp_sidebar_text_color, setemp_sidebar_text_color] = useState('');
    const [emp_link_color, setemp_link_color] = useState('');
    const ThemeSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/theme-settings/'+companyid)
            .then((response) => {
                setdefault_theme(response.data.themename);
                setrounded_theme(response.data.rounded_theme);
                setheader_color(response.data.admintheme.header_color);
                setsidebar_color(response.data.admintheme.sidebar_color);
                setsidebar_text_color(response.data.admintheme.sidebar_text_color);
                setlink_color(response.data.admintheme.link_color);
                setemp_header_color(response.data.employeeTheme.header_color);
                setemp_sidebar_color(response.data.employeeTheme.sidebar_color);
                setemp_sidebar_text_color(response.data.employeeTheme.sidebar_text_color);
                setemp_link_color(response.data.employeeTheme.link_color);
                setclient_header_color(response.data.clientTheme.header_color);
                setclient_sidebar_color(response.data.clientTheme.sidebar_color);
                setclient_sidebar_text_color(response.data.clientTheme.sidebar_text_color);
                setclient_link_color(response.data.clientTheme.link_color);
                setLoading(false);
            });
    }    
    
    // Store Theme Setting Data
    const handleThemeSettingForm = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/theme-settings/store',{
            header_color :header_color,
            sidebar_color :sidebar_color,
            sidebar_text_color :sidebar_text_color,
            link_color :link_color,
            emp_header_color :emp_header_color,
            emp_sidebar_color :emp_sidebar_color,
            emp_sidebar_text_color :emp_sidebar_text_color,
            emp_link_color :emp_link_color,
            client_header_color :client_header_color,
            client_sidebar_color :client_sidebar_color,
            client_sidebar_text_color :client_sidebar_text_color,
            client_link_color :client_link_color,
            default_task_status: default_task_status,
            company_id: companyid
        })
        .then((response) => {
            setLoading(false);
            toast.success("Theme color setting updated successfully.");
        });
        evt.preventDefault();
    }

    // Finance Settings
    const [invoice_prefix, setinvoice_prefix] = useState('');
    const [invoice_digit, setinvoice_digit] = useState('');
    const [invoice_look_like, setinvoice_look_like] = useState('');
    const [estimate_prefix, setestimate_prefix] = useState('');
    const [estimate_digit, setestimate_digit] = useState('');
    const [estimate_look_like, setestimate_look_like] = useState('');
    const [credit_note_prefix, setcredit_note_prefix] = useState('');
    const [credit_note_digit, setcredit_note_digit] = useState('');
    const [credit_note_look_like, setcredit_note_look_like] = useState('');
    const [template, settemplate] = useState('');
    const [due_after, setdue_after] = useState('');
    const [gst_number, setgst_number] = useState('');
    const [show_gst, setshow_gst] = useState(false);
    const [invoice_terms, setinvoice_terms] = useState('');
    const [estimate_terms, setestimate_terms] = useState('');
    const [prefinanceImage, setprefinanceImage] = useState('');
    // Pre Finance Settings Details
    const FinanceSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/invoice-settings/'+companyid)
            .then((response) => {
                setinvoice_prefix(response.data.invoiceSetting.invoice_prefix);
                setinvoice_digit(response.data.invoiceSetting.invoice_digit);
                setestimate_prefix(response.data.invoiceSetting.estimate_prefix);
                setestimate_digit(response.data.invoiceSetting.estimate_digit);
                setcredit_note_prefix(response.data.invoiceSetting.credit_note_prefix);
                setcredit_note_digit(response.data.invoiceSetting.credit_note_digit);
                setdue_after(response.data.invoiceSetting.due_after);
                setgst_number(response.data.invoiceSetting.gst_number);
                if(response.data.invoiceSetting.show_gst == 'yes'){
                    setshow_gst(true);
                }
                setestimate_terms(response.data.invoiceSetting.estimate_terms);
                setinvoice_terms(response.data.invoiceSetting.invoice_terms);
                setprefinanceImage(response.data.invoiceSetting.logo_url);
                genrateInvoiceNumber();
                setLoading(false);
            });
    }
    $('#invoice_prefix, #invoice_digit, #estimate_prefix, #estimate_digit, #credit_note_prefix, #credit_note_digit').on({
        keyup: function(){
            genrateInvoiceNumber();
        },

        change: function(){
            genrateInvoiceNumber();
        },
    });

    function genrateInvoiceNumber() {
        var invoicePrefix = $('#invoice_prefix').val();
        var invoiceDigit = $('#invoice_digit').val();
        var invoiceZero = '';
        for (var i=0; i<invoiceDigit-1; i++){
            invoiceZero = invoiceZero+'0';
        }
        invoiceZero = invoiceZero+'1';
        var invoice_no = invoicePrefix+'#'+invoiceZero;
        setinvoice_look_like(invoice_no);

        var estimatePrefix = $('#estimate_prefix').val();
        var estimateDigit = $('#estimate_digit').val();
        var estimateZero = '';
        for (var i=0; i<estimateDigit-1; i++){
            estimateZero = estimateZero+'0';
        }
        estimateZero = estimateZero+'1';
        var estimate_no = estimatePrefix+'#'+estimateZero;
        setestimate_look_like(estimate_no);

        var creditNotePrefix = $('#credit_note_prefix').val();
        var creditNoteDigit = $('#credit_note_digit').val();
        var creditNoteZero = '';
        for (var i=0; i<creditNoteDigit-1; i++){
            creditNoteZero = creditNoteZero+'0';
        }
        creditNoteZero = creditNoteZero+'1';
        var creditNote_no = creditNotePrefix+'#'+creditNoteZero;
        setcredit_note_look_like(creditNote_no);
    }
    //
    const onPickCalled = (i) => {
        if(i.value == 0){
            settemplate("invoice-1");
        }else if(i.value == 1){
            settemplate("invoice-2");
        }else if(i.value == 2){
            settemplate("invoice-3");
        }else if(i.value == 3){
            settemplate("invoice-4");
        }
    }  
    // Update Finance Settings
    const financesettingsubmit = (evt) => {
        setLoading(true);
        if(template == ""){
            setLoading(false);
            toast.error("The template field is required.");
        }else{
            const data = new FormData();
            data.append('companyid', companyid);
            data.append('invoice_prefix', invoice_prefix);
            data.append('invoice_digit', invoice_digit);
            data.append('estimate_prefix', estimate_prefix);
            data.append('estimate_digit', estimate_digit);
            data.append('credit_note_prefix', credit_note_prefix);
            data.append('credit_note_digit', credit_note_digit);
            data.append('template', template);
            data.append('due_after', due_after);
            data.append('gst_number', gst_number);
            data.append('show_gst', show_gst);
            data.append('invoice_terms', invoice_terms);
            data.append('estimate_terms', estimate_terms);
            data.append('logo', selectedFinanceImage);
            axios.post(Globalsettings.url + 'api/admin/settings/invoice-settings/update', data).then((response) => {
                toast.success("Finance Settings Successfully Updated!");
                setLoading(false);
                history.push(`${process.env.PUBLIC_URL}/setting`);
            });
        }
        evt.preventDefault();
    }

    // Project Settings
    const [send_reminder, setsend_reminder] = useState(false);
    const [project_id, setproject_id] = useState('');
    const [remind_time, setremind_time] = useState('');
    const [remind_type, setremind_type] = useState('days');
    const [remind_to, setremind_to] = useState([]);
    const categoryCheckboxFilterHandler = e => {
        if (e.target.checked == true){
            setremind_to([...remind_to, e.target.value]);
        }else{
            let check_list = [];
            remind_to.map(check => {
                if (check != e.target.value){
                    check_list.push(check);
                }
            });
            setremind_to(check_list);
        }
    };
    // Pre Finance Settings Details
    const ProjectSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/project-settings/'+companyid)
            .then((response) => {
                if(response.data.projectSetting.send_reminder == 'yes'){
                    setsend_reminder(true);
                }
                setproject_id(response.data.projectSetting.id);
                setremind_time(response.data.projectSetting.remind_time);
                setremind_type(response.data.projectSetting.remind_type);
                setremind_to(response.data.projectSetting.remind_to);
                setLoading(false);
            });
    }
    // Update Project Settings
    const projectsettingsubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('send_reminder', send_reminder);
        data.append('remind_to', remind_to);
        data.append('remind_time', remind_time);
        data.append('remind_type', remind_type);
        axios.post(Globalsettings.url + 'api/admin/settings/project-settings/update/'+project_id, data).then((response) => {
            toast.success("Project Settings Successfully Updated!");
            setLoading(false);
        });
        evt.preventDefault();
    }
    // Time Log Settings
    const [auto_timer_stop, setauto_timer_stop] = useState(false);
    const [approval_required, setapproval_required] = useState(false);
    
    // Pre Log Time Settings Details
    const LogTimeSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/log-time-settings/'+companyid)
            .then((response) => {
                if (response.data.logTime.auto_timer_stop === 'yes') {
                    setauto_timer_stop(true);
                }
                if (response.data.logTime.approval_required === 1) {
                    setapproval_required(true);
                }
                
                setLoading(false);
            });
    }

    // Pre Message Settings Details
    const[allow_client_admin, setallow_client_admin] = useState(false);
    const[allow_client_employee, setallow_client_employee] = useState(false);
    const MessageSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/message-settings/'+companyid)
            .then((response) => {
                if (response.data.messageSettings.allow_client_admin == 'yes') {
                    setallow_client_admin(true);
                }
                if (response.data.messageSettings.allow_client_employee == 'yes') {
                    setallow_client_employee(true);
                }
                setLoading(false);
            });
    }

    // Attendance
    const[office_start_time, setoffice_start_time] = useState('');
    const[office_end_time, setoffice_end_time] = useState('');
    const[halfday_mark_time, sethalfday_mark_time] = useState('');
    const[late_mark_duration, setlate_mark_duration] = useState('');
    const[clockin_in_day, setclockin_in_day] = useState('');
    const[employee_clock_in_out, setemployee_clock_in_out] = useState(false);
    const[radius_check, setradius_check] = useState(false);
    const[radius, setradius] = useState('');
    const[ip_check, setip_check] = useState(false);
    const [office_open_days, setoffice_open_days] = useState([]);
    const OfficeOpenDaysFilterHandler = e => {
        if (e.target.checked == true){
            setoffice_open_days([...office_open_days, e.target.value]);
        }else{
            let check_list = [];
            office_open_days.map(check => {
                if (check != e.target.value){
                    check_list.push(check);
                }
            });
            setoffice_open_days(check_list);
        }
    };
    // Pre Attendance Settings Details
    const AttendanceSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/attendance-settings/'+companyid)
            .then((response) => {
                setoffice_start_time(response.data.attendanceSetting.office_start_time);
                setoffice_end_time(response.data.attendanceSetting.office_end_time);
                sethalfday_mark_time(response.data.attendanceSetting.halfday_mark_time);
                setlate_mark_duration(response.data.attendanceSetting.late_mark_duration);
                setclockin_in_day(response.data.attendanceSetting.clockin_in_day);
                setradius(response.data.attendanceSetting.radius);
                if(response.data.attendanceSetting.employee_clock_in_out === 'yes'){
                    setemployee_clock_in_out(true);
                }
                if(response.data.attendanceSetting.radius_check === 'yes'){
                    setradius_check(true);
                }
                if(response.data.attendanceSetting.ip_check === 'yes'){
                    setip_check(true);
                }
                setoffice_open_days(response.data.openDays);
                setLoading(false);
            });
    }
    // Update Attendance Settings
    const AttendanceSettingsFormSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('office_start_time', office_start_time);
        data.append('office_end_time', office_end_time);
        data.append('halfday_mark_time', halfday_mark_time);
        data.append('late_mark_duration', late_mark_duration);
        data.append('clockin_in_day', clockin_in_day);
        if(employee_clock_in_out === true){
            data.append('employee_clock_in_out', 'yes');
        }else{
            data.append('employee_clock_in_out', 'no');
        }
        if(radius_check === true){
            data.append('radius_check', 'yes');
        }else{
            data.append('radius_check', 'no');
        }
        if(ip_check === true){
            data.append('ip_check', 'yes');
        }else{
            data.append('ip_check', 'no');
        }
        data.append('radius', radius);
        data.append('office_open_days', office_open_days);
        axios.post(Globalsettings.url + 'api/admin/settings/attendance-settings/update', data).then((response) => {
            toast.success("Attendance Settings Successfully Updated!");
            setLoading(false);
        });
        evt.preventDefault();
    }
    // Leaves
    const[leaves_start_from, setleaves_start_from] = useState('');
    const leaves_start_fromFilterHandler = (e) => {
        setLoading(true);
        setleaves_start_from(e.target.value);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('leaveCountFrom', e.target.value);
        axios.post(Globalsettings.url + 'api/admin/settings/leaves-settings/store',data)
        .then((response) => {
                toast.success("Settings Successfully Updated!");
                setleaves_start_from(response.data.leaves_start_from);
                setLoading(false);
        });
    }
    // Pre Leaves Settings Details
    const [LeaveTypeList, setLeaveTypeList] = useState({
        LeaveTypeList_Array: []
    });
    const LeavesSettingsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/leaves-settings/'+companyid)
        .then((response) => {
                setleaves_start_from(response.data.leaves_start_from);
                setLeaveTypeList({ LeaveTypeList_Array: response.data.leaveTypes ? response.data.leaveTypes : [], })
                setLoading(false);
        });
    }  
     
    // Insert New Leave Type
    const[UpdateLeaveTypeName, setUpdateLeaveTypeName] = useState('');
    const[UpdateLeaveTypeNo, setUpdateLeaveTypeNo] = useState('');
    const[UpdateLeaveTypeId, setUpdateLeaveTypeId] = useState('');
    const[type_name, settype_name] = useState('');
    const[leave_number, setleave_number] = useState('');
    const[color, setcolor] = useState('');
    const handleColorChangeComplete = (color, event) => {
        if(color.hex == "#00c292"){
            setcolor('success');
        }else if(color.hex == "#ed4040"){
            setcolor('danger');
        }else if(color.hex == "#f1c411"){
            setcolor('warning');
        }else if(color.hex == "#5475ed"){
            setcolor('info');
        }
    }
    const[all_employees, setall_employees] = useState(false);
    const SubmitNewLeaveForm = (evt) => {
            setLoading(true);
            const data = new FormData();
            data.append('company_id', companyid);
            data.append('type_name', type_name);
            data.append('leave_number', leave_number);
            data.append('color', color);
            if(all_employees === true){
                data.append('all_employees', "on");
            }else{
                data.append('all_employees', "off");
            }
            
            axios.post(Globalsettings.url + 'api/admin/leaveType/store', data).then((response) => {
                toast.success("Leave Type Successfully Inserted!");
                axios.get(Globalsettings.url + 'api/admin/settings/leaves-settings/'+companyid)
                .then((response) => {
                        setleaves_start_from(response.data.leaves_start_from);
                        setLeaveTypeList({ LeaveTypeList_Array: response.data.leaveTypes ? response.data.leaveTypes : [], });
                        settype_name('');
                        setleave_number('');
                        setcolor('')
                        setall_employees(false)
                        setLoading(false);
                });
            });
            evt.preventDefault();
    } 
    // Delete Leave Type
    const DeleteLeaveType = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted leave type data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/leaveType/destroy/' + id)
                        .then(response => {
                            swal("Leave Type Delete Successfully!", {
                                icon: "success",
                            });
                        });
                        setLeaveTypeList({ LeaveTypeList_Array: LeaveTypeList.LeaveTypeList_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }

    // Edit Leave Type
    const EditLeaveType = (id) => {
        setModalShowAgent(true);
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/leaveType/edit/'+id)
        .then((response) => {
                setUpdateLeaveTypeName(response.data.leaveTypes.type_name);
                setUpdateLeaveTypeNo(response.data.leaveTypes.no_of_leaves);
                setUpdateLeaveTypeId(response.data.leaveTypes.id);
                setLoading(false);
        });
    }
    // Update Leaves Type
    const handleLeaveTypeUpdateSubmit = (evt) => {
        setLoading(true);
        setModalShowAgent(false);
        const data = new FormData();
        data.append('companyid', companyid);
        data.append('leaves', UpdateLeaveTypeNo);
        data.append('type_name', UpdateLeaveTypeName);
        axios.post(Globalsettings.url + 'api/admin/leaveType/update/'+UpdateLeaveTypeId, data).then((response) => {
            toast.success("Leave Type Settings Successfully Updated!");
            setLeaveTypeList({ LeaveTypeList_Array: response.data.leaveTypes ? response.data.leaveTypes : [], });
            setLoading(false);
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="react_tabs_block">
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="card card_dashboard card-body">
                                    <TabList className="react-tabs__tab-list list-unstyled">
                                        <Tab >Company Settings</Tab>
                                        <Tab onClick={() => ProfileSettingsDetails()}>Profile Settings</Tab>
                                        <li><NavLink to={`${process.env.PUBLIC_URL}/notification_setting`} className="">Notification Settings</NavLink></li>
                                        <Tab onClick={() => CurrencySettingsDetails()}>Currency Settings</Tab>
                                        <Tab onClick={() => ThemeSettingsDetails()}>Theme Settings</Tab>
                                        <li><NavLink to={`${process.env.PUBLIC_URL}/payment_credentials`} className="">Payment Credentials</NavLink></li>
                                        <Tab onClick={() => FinanceSettingsDetails()}>Finance Settings</Tab>
                                        {/* <li><NavLink to={`${process.env.PUBLIC_URL}/ticket_settings`} className="">Ticket Settings</NavLink></li> */}
                                        <Tab onClick={() => ProjectSettingsDetails()}>Project Settings</Tab>
                                        <Tab onClick={() => AttendanceSettingsDetails()}>Attendance Settings</Tab>
                                        <Tab onClick={() => LeavesSettingsDetails()}>Leaves Settings</Tab>
                                        {/* <Tab>Custom Fields</Tab> */}
                                        <li><NavLink to={`${process.env.PUBLIC_URL}/module_settings`} className="">Module Settings</NavLink></li>
                                        <Tab>Roles Permissions</Tab>
                                        <Tab onClick={() => MessageSettingsDetails()} >Message Settings</Tab>
                                        <li><NavLink to={`${process.env.PUBLIC_URL}/lead_settings`} className="">Lead Settings</NavLink></li>
                                        <Tab onClick={() => LogTimeSettingsDetails()}>Time Log Settings</Tab>
                                        <Tab onClick={() => TaskSettingsDetails()}>Task Settings</Tab>
                                        <li><NavLink to={`${process.env.PUBLIC_URL}/cdpr`} className="">CDPR</NavLink></li>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">

                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Company Settings</h4>
                                    <Form onSubmit={SubmitCompanySettings}>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Update Organization Settings</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Company Name*</FormLabel>
                                                        <Form.Control type="text" className="transparent_form h-40px" value={CompanyName} onChange={e => setCompanyName(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-4 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Company Email*</FormLabel>
                                                        <Form.Control type="email" className="transparent_form h-40px" value={CompanyEmail} onChange={e => setCompanyEmail(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-4 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Company Phone*</FormLabel>
                                                        <Form.Control type="text" className="transparent_form h-40px" value={CompanyPhone} onChange={e => setCompanyPhone(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-12 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Company Website</FormLabel>
                                                        <Form.Control type="text" className="transparent_form h-40px" value={Companyweb} onChange={e => setCompanyweb(e.target.value)} />
                                                    </FormGroup>
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
                                                                        <img width="160" className="img-thumnail" src={CompanyData.CompanyData_Array.logo_url} alt="" />
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
                                                <div className="col-xl-12 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Company Address</FormLabel>
                                                        <Form.Control className="transparent_form" as="textarea" rows={3} value={Companyaddress} onChange={e => setCompanyaddress(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Default Currency</FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={currencycode} onChange={e => setcurrencycode(e.target.value)}>
                                                            {CurrencyData.CurrencyData_Array.map((val) => {
                                                                return (
                                                                    <option value={val.id} selected={currencycode === val.id}>{val.currency_symbol} ({val.currency_code})</option>
                                                                )
                                                            })}
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Default Timezone</FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={timezone} onChange={e => settimezone(e.target.value)}>
                                                            {TimeZoneData.TimeZoneData_Array.map((val) => {
                                                                return (
                                                                    <option value={val} selected={timezone === val}>{val}</option>
                                                                )
                                                            })}
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Date Format</FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={dateformat} onChange={e => setdateformat(e.target.value)}>
                                                            <option value="d-m-yyyy">d-m-Y</option>
                                                            <option value="m-d-yyyy">m-d-Y </option>
                                                            <option value="yyyy-m-d">Y-m-d</option>
                                                            <option value="d.m.yyyy">d.m.Y </option>
                                                            <option value="m.d.yyyy">m.d.Y </option>
                                                            <option value="yyyy.m.d">Y.m.d</option>
                                                            <option value="d/m/yyyy">d/m/Y </option>
                                                            <option value="m/d/yyyy">m/d/Y </option>
                                                            <option value="yyyy/m/d">Y/m/d</option>
                                                            <option value="d-M-yyyy">d-M-Y </option>
                                                            <option value="d/M/yyyy">d/M/Y </option>
                                                            <option value="d.M.yyyy">d.M.Y </option>
                                                            <option value="d-M-yyyy">d-M-Y </option>
                                                            <option value="d M yyyy">d M Y </option>
                                                            <option value="d F, yyyy">d F, Y </option>
                                                            <option value="D/M/yyyy">D/M/Y </option>
                                                            <option value="D.M.yyyy">D.M.Y </option>
                                                            <option value="D-M-yyyy">D-M-Y </option>
                                                            <option value="D M yyyy">D M Y </option>
                                                            <option value="d D M yyyy">d D M Y </option>
                                                            <option value="D d M yyyy">D d M Y </option>
                                                            <option value="dS M yyyy">dS M Y </option>
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Time Format</FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={timeformat} onChange={e => settimeformat(e.target.value)}>
                                                            <option value="h:i A">12 Hour  (with Cap PM/AM) </option>
                                                            <option value="h:i a">12 Hour  (with small pm/am) </option>
                                                            <option value="H:i">24 Hour</option>
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Week start from</FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={weekstart} onChange={e => setweekstart(e.target.value)}>
                                                            <option value="0">Sunday</option>
                                                            <option value="1">Monday</option>
                                                            <option value="2">Tuesday</option>
                                                            <option value="3">Wednesday</option>
                                                            <option value="4">Thursday</option>
                                                            <option value="5">Friday</option>
                                                            <option value="6">Saturday</option>
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Change Language </FormLabel>
                                                        <Form.Control className="transparent_form h-40px" as="select" value={language} onChange={e => setlanguage(e.target.value)}>
                                                            <option value="en">English</option>
                                                            {LanguageData.LanguageData_Array.map((val) => {
                                                                return (
                                                                    <option value={val.language_code}>{val.language_name}</option>
                                                                )
                                                            })}
                                                        </Form.Control>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Latitude </FormLabel>
                                                        <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" value={latitude} onChange={e => setlatitude(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-xl-3 col-lg-12 mb-4">
                                                    <FormGroup>
                                                        <FormLabel className="mb-2">Longitude </FormLabel>
                                                        <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" value={longitude} onChange={e => setlongitude(e.target.value)} />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-1" src={checkicon} alt="" /> Update</Button>
                                        </div>
                                    </Form>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Profile Settings</h4>
                                    <Form onSubmit={SubmitProfileSettings}>
                                        <div className="card card_dashboard">
                                            <div className="card-body">
                                                <div className="card-header mb-4 pb-3">
                                                    <h4 className="fontsize18">Update Profile Info</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-12">
                                                        <FormGroup>
                                                            <FormLabel className="mb-2">Your Name*</FormLabel>
                                                            <Form.Control type="text" name="" className="transparent_form h-40px" value={profilename} onChange={e => setprofilename(e.target.value)} />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-12">
                                                        <FormGroup>
                                                            <FormLabel className="mb-2">Your Email*</FormLabel>
                                                            <Form.Control type="email" name="" className="transparent_form h-40px" value={profileemail} onChange={e => setprofileemail(e.target.value)} />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-12">
                                                        <FormLabel className="mb-2">Your Password*</FormLabel>
                                                        <InputGroup>
                                                            <FormControl type="password" id="pass" name="" className="transparent_form h-40px" value={profilepass} onChange={e => setprofilepass(e.target.value)} />
                                                            <InputGroup.Text id="inputGroup-sizing-default" onClick={onPasswordClickShow}><img id="imgpass" className="img-fluid"  width="23" src={hideeye} alt="" /></InputGroup.Text>
                                                        </InputGroup>
                                                    </div>
                                                    <div className="col-xl-12 col-lg-12">
                                                        <FormGroup>
                                                            <FormLabel className="mb-2">Your Address</FormLabel>
                                                            <Form.Control className="transparent_form" as="textarea" rows={3} value={profileadrress} onChange={e => setprofileadrress(e.target.value)} />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <FormLabel className="mb-4">Email Notifications</FormLabel>
                                                    <div className="d-flex align-items-center">
                                                        <div className="mb-2 mr-4">
                                                            <Form.Check type="radio" name="radio" aria-label="radio 1" label=" Enable" value="1" onChange={handleChangeEmailNotification} checked={emailnotification === "1"} />
                                                        </div>
                                                        <div className="mb-2">
                                                            <Form.Check type="radio" name="radio" aria-label="radio 1" label=" Disable" value="0" onChange={handleChangeEmailNotification} checked={emailnotification === "0"} />
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-xl-3">
                                                        <div className="p-3 border-radius-15 bodycolorbg">
                                                            <div className="mb-3 p-2 bg-white text-center">
                                                                {(() => {
                                                                    if (selectedProfileImage) {
                                                                        return (
                                                                            <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedProfileImage)} alt="" />
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <img width="160" className="img-thumnail" src={profileimage} alt="" />
                                                                        )
                                                                    }
                                                                })()}
                                                                <Form.Control
                                                                    className="w-100px btn btn_blue"
                                                                    type="file"
                                                                    id="inputGroupFile01"
                                                                    label="Upload Boundary File"
                                                                    custom
                                                                    onChange={ProfileimageChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-1" src={checkicon} alt="" /> Update</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Currency Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header d-xl-flex d-block align-items-center mb-4 pb-3">
                                            <h4 className="fontsize18 mb-3 mb-xl-0">Currencies</h4>
                                            <div className="btn-group ml-auto">
                                                <NavLink to={`${process.env.PUBLIC_URL}/create_currency`} className="btn_blue btn mr-2"><img className="img-fluid mr-1" src={plusicon} alt="" /> Add New Currency</NavLink>
                                                <Button variant="" type="button" className="btn_blue btn lightbluecolorbg mr-2" onClick={updateExchangeRate} ><img width="15" className="img-fluid mr-1" src={refreshicon} alt=""/> Update Exchange Rate</Button>
                                            </div>
                                        </div>
                                        {/*  */}
                                        <Alert variant="" className="badgegreenbg greencolortext fontsize14"><img className="img-fluid mr-1" src={alerticon} alt="" /> Exchange rate is calculated from your default currency. Change default currency in company settings.</Alert>
                                        {/*  */}
                                        <div className="table-sm-responsive clent_data_table mb-4">
                                            <table className="table m-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Currency Name</th>
                                                        <th scope="col">Currency Symbol</th>
                                                        <th scope="col">Currency Position</th>
                                                        <th scope="col">Currency Code</th>
                                                        <th scope="col">Exchange Rate </th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrencyList.CurrencyList_Array.map((val,index) => {
                                                        return (
                                                            <CurrencySettingLoop
                                                                key={index}
                                                                currencyname={val.currency_name}
                                                                currencyid={val.id}
                                                                companydefaultcurrency = {companydefaultcurrency}
                                                                symbol={val.currency_symbol}
                                                                position={val.currency_position}
                                                                code={val.currency_code}
                                                                rate={val.exchange_rate}
                                                                status={val.status}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Theme Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Theme Settings</h4>
                                        </div>
                                        {/*  */}
                                        <div className="d-flex align-items-center mb-4 col-10">
                                            <div className="mb-2 mr-4">
                                                <Form.Check type="radio" name="default_theme" aria-label="radio 1" label=" Use Default Theme" value="default" checked={default_theme === "default"} 
                                                onChange={(e) => { 
                                                    setdefault_theme(e.target.value)
                                                    setLoading(true);
                                                    axios.post(Globalsettings.url + 'api/admin/theme-settings/activeTheme',{
                                                        companyid :companyid,
                                                        active_theme: e.target.value
                                                    })
                                                    .then((response) => {
                                                        setLoading(false);
                                                        toast.success("Theme Settings updated successfully.");
                                                    });   
                                                }} />
                                                
                                            </div>
                                            <div className="mb-2">
                                                <Form.Check type="radio" name="default_theme" aria-label="radio 1" label=" Use Custom Theme" value="custom" checked={default_theme === "custom"}
                                                    onChange={(e) => { 
                                                    setdefault_theme(e.target.value)
                                                    setLoading(true);
                                                    axios.post(Globalsettings.url + 'api/admin/theme-settings/activeTheme',{
                                                        companyid :companyid,
                                                        active_theme: e.target.value
                                                    })
                                                    .then((response) => {
                                                        setLoading(false);
                                                        toast.success("Theme Settings updated  successfully.");
                                                    });   
                                                }} />                                                
                                                
                                            </div>
                                        </div>
                                        {/*  */}
                                        {default_theme == 'custom' &&
                                        <>
                                        <FormLabel className="mb-2">Enable rounded theme?</FormLabel>
                                        <div className="d-flex align-items-center mb-4 col-10">
                                            <div className="mb-2 mr-4">
                                                <Form.Check type="radio" name="rounded_theme" aria-label="radio 1" label=" Yes" value="1" checked={rounded_theme === "1"} 
                                                onChange={(e) => { 
                                                    setrounded_theme(e.target.value)
                                                    setLoading(true);
                                                    axios.post(Globalsettings.url + 'api/admin/theme-settings/roundedTheme',{
                                                        companyid :companyid,
                                                        rounded_theme: e.target.value
                                                    })
                                                    .then((response) => {
                                                        setLoading(false);
                                                        toast.success("Enable rounded theme successfully.");
                                                    });   
                                                }} />
                                                
                                            </div>
                                            <div className="mb-2">
                                                <Form.Check type="radio" name="rounded_theme" aria-label="radio 1" label=" No" value="0" checked={rounded_theme === "0"} 
                                                onChange={(e) => { 
                                                    setrounded_theme(e.target.value)
                                                    setLoading(true);
                                                    axios.post(Globalsettings.url + 'api/admin/theme-settings/roundedTheme',{
                                                        companyid :companyid,
                                                        rounded_theme: e.target.value
                                                    })
                                                    .then((response) => {
                                                        setLoading(false);
                                                        toast.success("Disable rounded theme successfully.");
                                                    });   
                                                }} />
                                            </div>
                                        </div>
                                        <Form onSubmit={handleThemeSettingForm}>
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Admin Panel Theme</h4>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={header_color} onChange={(e) => setheader_color(e.target.value)} id="header_color_secondary_color">{header_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={header_color} onChange={(e) => setheader_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 header_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={sidebar_color} onChange={(e) => setsidebar_color(e.target.value)} id="sidebar_color_span">{sidebar_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={sidebar_color} onChange={(e) => {
                                                                 $('#sidebar_color_span').text('');
                                                                 $('#sidebar_color_span').text($('.sidebar_color').val());
                                                                 $("#sidebar_dashboard").css("background",$('.sidebar_color').val());
                                                                 $(".accordion-button").attr("style", "background: "+$('.sidebar_color').val()+" !important");
                                                                 $(".accordion-item").css("background",$('.sidebar_color').val());
                                                                 $(".accordion-body").css("background",$('.sidebar_color').val());
                                                                 $(".sidebar_dashboard .navbar.navbar_dashboard .accordion .show > .accordion-button:not(.collapsed), .sidebar_dashboard .navbar.navbar_dashboard .accordion .accordion-button:not(.collapsed)").css("background",$('.sidebar_color').val()+"!important");
                                                                setsidebar_color(e.target.value)}} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={sidebar_text_color} onChange={(e) => setsidebar_text_color(e.target.value)} id="sidebar_text_color_span">{sidebar_text_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={sidebar_text_color} onChange={(e) => {
                                                            $('#sidebar_text_color_span').text('');
                                                            $('#sidebar_text_color_span').text($('.sidebar_text_color').val());
                                                            $(".text-hidee").css("color",$('.sidebar_text_color').val());
                                                            setsidebar_text_color(e.target.value)
                                                        }} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_text_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={link_color} onChange={(e) => setlink_color(e.target.value)} id="ranachumi">{link_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={link_color} onChange={(e) => setlink_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 link_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        {/* Employee */}
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Employee Panel Theme</h4>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={emp_header_color} onChange={(e) => setemp_header_color(e.target.value)} >{emp_header_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={emp_header_color} onChange={(e) => setemp_header_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 header_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={emp_sidebar_color} onChange={(e) => setemp_sidebar_color(e.target.value)} id="sidebar_color_span">{emp_sidebar_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={emp_sidebar_color} onChange={(e) => setemp_sidebar_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={emp_sidebar_text_color} onChange={(e) => setemp_sidebar_text_color(e.target.value)}>{emp_sidebar_text_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={emp_sidebar_text_color} onChange={(e) => setsidebar_text_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_text_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={emp_link_color} onChange={(e) => setemp_link_color(e.target.value)} id="ranachumi">{emp_link_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={emp_link_color} onChange={(e) => setemp_link_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 link_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        {/* Client */}
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Client Panel Theme</h4>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={client_header_color} onChange={(e) => setclient_header_color(e.target.value)} >{client_header_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={client_header_color} onChange={(e) => setclient_header_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 header_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={client_sidebar_color} onChange={(e) => setclient_sidebar_color(e.target.value)} id="sidebar_color_span">{client_sidebar_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={client_sidebar_color} onChange={(e) => setclient_sidebar_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={client_sidebar_text_color} onChange={(e) => setclient_sidebar_text_color(e.target.value)}>{client_sidebar_text_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={client_sidebar_text_color} onChange={(e) => setsidebar_text_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 sidebar_text_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-3 col-lg-12">
                                                <InputGroup className="transparent_form d-flex">
                                                    <InputGroup.Text className="py-0 h-40px transparent_bg border_bodycolor_0" value={client_link_color} onChange={(e) => setclient_link_color(e.target.value)} id="ranachumi">{client_link_color}</InputGroup.Text>
                                                    <div className="position-absolute right-0">
                                                        <FormControl name="" type="color" value={client_link_color} onChange={(e) => setclient_link_color(e.target.value)} className="transparent_form h-45px fontsize24 p-0 border_bodycolor_0 link_color" />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                                        </Form>
                                        </>
                                    }            
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Finance Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Update Finance Settings</h4>
                                        </div>
                                        <Form onSubmit={financesettingsubmit} >
                                        <div className="row ">
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Prefix</FormLabel>
                                                    <Form.Control type="text" id="invoice_prefix" className="transparent_form h-40px" value={invoice_prefix} onChange={(e) => setinvoice_prefix(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Digits</FormLabel>
                                                    <Form.Control type="number" id="invoice_digit" className="transparent_form h-40px" value={invoice_digit} onChange={(e) => setinvoice_digit(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Sample</FormLabel>
                                                    <Form.Control type="text" readOnly className="transparent_form h-40px" value={invoice_look_like} onChange={(e) => setinvoice_look_like(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Prefix</FormLabel>
                                                    <Form.Control type="text" id="estimate_prefix" className="transparent_form h-40px" value={estimate_prefix} onChange={(e) => setestimate_prefix(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Digits</FormLabel>
                                                    <Form.Control type="number" id="estimate_digit" className="transparent_form h-40px" value={estimate_digit} onChange={(e) => setestimate_digit(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Sample</FormLabel>
                                                    <Form.Control type="text" name="" readOnly className="transparent_form h-40px"  value={estimate_look_like} onChange={(e) => setestimate_look_like(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Prefix</FormLabel>
                                                    <Form.Control type="text" id="credit_note_prefix" className="transparent_form h-40px" value={credit_note_prefix} onChange={(e) => setcredit_note_prefix(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Digits</FormLabel>
                                                    <Form.Control type="number" id="credit_note_digit" className="transparent_form h-40px" value={credit_note_digit} onChange={(e) => setcredit_note_digit(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Number Sample</FormLabel>
                                                    <Form.Control type="text" name="" readOnly className="transparent_form h-40px" value={credit_note_look_like} onChange={(e) => setcredit_note_look_like(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-12 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice Template</FormLabel>
                                                    <ImagePicker 
                                                        images={imageList.map((image, i) => ({src: image, value: i}))}
                                                        onPick={onPickCalled}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-5 col-lg-12">
                                                <FormLabel className="mb-2">Due after</FormLabel>
                                                <InputGroup className="d-flex transparent_form">
                                                    <FormControl type="number" className="transparent_form h-40px" value={due_after} onChange={(e) => setdue_after(e.target.value)} />
                                                    <InputGroup.Text id="inputGroup-sizing-sm">Days</InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                            <div className="col-xl-5 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">GST Number</FormLabel>
                                                    <Form.Control type="text" name="" className="transparent_form h-40px" value={gst_number} onChange={(e) => setgst_number(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-2 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Show GST Number</FormLabel>
                                                    <div>
                                                        <Toggle checked={show_gst} onChange={(e) => setshow_gst(!show_gst) } />
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-12 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Invoice terms</FormLabel>
                                                    <Form.Control className="transparent_form" as="textarea" rows={4} value={invoice_terms} onChange={(e) => setinvoice_terms(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-12 col-lg-12">
                                                <FormGroup>
                                                    <FormLabel className="mb-2">Estimate Terms</FormLabel>
                                                    <Form.Control className="transparent_form" as="textarea" rows={4} value={estimate_terms} onChange={(e) => setestimate_terms(e.target.value)} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-xl-3 mb-4">
                                                    <div className="p-3 border-radius-15 bodycolorbg">
                                                        <div className="mb-3 p-2 bg-white text-center">
                                                            {(() => {
                                                                if (selectedFinanceImage) {
                                                                    return (
                                                                        <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedFinanceImage)} alt="" />
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <img width="160" className="img-thumnail" src={prefinanceImage} alt="" />
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
                                                            onChange={FinanceimageChange}
                                                        />
                                                    </div>
                                                </div>
                                        </div>
                                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                                        </Form>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Project Settings</h4>
                                    <Form onSubmit={projectsettingsubmit}> 
                                    <div className="card card_dashboard card-body">
                                        <div className="p-4">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Update Project Settings</h4>
                                            </div>
                                            <FormGroup className="d-flex">
                                                <FormLabel>Send Reminder</FormLabel>send_reminder
                                                <div className="mytooltip">
                                                    <span className="ml-2"><img className="img-fluid" src={tootipicon} alt="" /></span>
                                                    <span className="tooltip-content5">
                                                        <p className="fontsize12 m-0">Remind job members about due date of jobs.</p>
                                                    </span>
                                                </div>
                                            </FormGroup>
                                            <div>
                                                <Toggle checked={send_reminder} onChange={(e) => setsend_reminder(!send_reminder) } />
                                            </div>
                                            {send_reminder && 
                                            <div class="row" id="send_reminder_div">
                                                <div class="col-xs-12">
                                                    <label>Send Reminder To</label>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <Form.Check type="checkbox" name="remind_to"  className="d-flex m-0 align-items-center" checked={remind_to.find((ch) => ch === "admins")} onChange={e => categoryCheckboxFilterHandler(e)} label="Administrators" value="admins"/>
                                                        </div>
                                                        <div className="ml-2">
                                                            <Form.Check type="checkbox" name="remind_to"  className="d-flex align-items-center" checked={remind_to.find((ch) => ch === "members")} onChange={e => categoryCheckboxFilterHandler(e)} label="Job Members" value="members"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3 mb-2">
                                                    <div class="form-group">
                                                        <label>Remind before</label>
                                                        <Form.Control type="number" className="transparent_form h-40px" min="1" value={remind_time} onChange={(e) => setremind_time(e.target.value)} name="remind_time"/>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-md-3">
                                                    <div class="form-group">
                                                        <label>&nbsp;</label>
                                                        <Form.Control type="text" className="transparent_form h-40px" readonly="" value="days" value={remind_type} onChange={(e) => setremind_type(e.target.value)}  name="remind_type"/>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                                        </div>
                                    </div>
                                    </Form>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Attendance Settings</h4>
                                    <Form onSubmit={AttendanceSettingsFormSubmit}>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Update Attendance Settings</h4>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-xl-3 col-lg-12 mb-3">
                                                <FormLabel className="mb-2">Office Start Time</FormLabel>
                                                <Form.Control type="time" name="" className="transparent_form h-40px" value={office_start_time} onChange={(e) => setoffice_start_time(e.target.value)} />
                                            </div>
                                            <div className="col-xl-3 col-lg-12 mb-3">
                                                <FormLabel className="mb-2">Office End Time</FormLabel>
                                                <Form.Control type="time" name="" className="transparent_form h-40px" value={office_end_time} onChange={(e) => setoffice_end_time(e.target.value)} />
                                            </div>
                                            <div className="col-xl-3 col-lg-12 mb-3">
                                                <FormLabel className="mb-2">HalfDay Mark Time</FormLabel>
                                                <Form.Control type="time" name="" className="transparent_form h-40px" value={halfday_mark_time} onChange={(e) => sethalfday_mark_time(e.target.value)} />
                                            </div>
                                            <div className="col-xl-3 col-lg-12 mb-3">
                                                <FormLabel className="mb-2">Late mark after (minutes)</FormLabel>
                                                <Form.Control type="number" name="" className="transparent_form h-40px" value={late_mark_duration} onChange={(e) => setlate_mark_duration(e.target.value)} />
                                            </div>
                                            <div className="col-xl-6 col-lg-12">
                                                <FormLabel className="mb-2">Maximum check-in allowed in a day?</FormLabel>
                                                <Form.Control type="number" name="" className="transparent_form h-40px" value={clockin_in_day} onChange={(e) => setclockin_in_day(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="d-flex mb-4">
                                            <Form.Check aria-label="option 1" value={employee_clock_in_out} checked={employee_clock_in_out} onChange={(e) => setemployee_clock_in_out(!employee_clock_in_out)} />
                                            <FormLabel className="">Allowed Employee self Clock-In/Clock-Out</FormLabel>
                                        </div>
                                        <div className="d-flex mb-4">
                                            <Form.Check aria-label="option 1" value={radius_check} checked={radius_check} onChange={(e) => setradius_check(!radius_check)} />
                                            <FormLabel className="">Clock-in check with added location Radius</FormLabel>
                                        </div>
                                        {radius_check === true &&
                                        <div className="col-xl-12 col-lg-12 mb-3">
                                                <FormLabel className="mb-2">Radius</FormLabel>
                                                <Form.Control type="text" name="" className="transparent_form h-40px" value={radius} onChange={(e) => setradius(e.target.value)} />
                                        </div>}
                                        <div className="d-flex">
                                            <Form.Check aria-label="option 1" value={ip_check} checked={ip_check} onChange={(e) => setip_check(!ip_check)} />
                                            <FormLabel className="">Clock-in check with added IP address</FormLabel>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="row mb-4">
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="1" checked={office_open_days.find((ch) => ch === 1)} />
                                                    <FormLabel className="">Monday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="2" checked={office_open_days.find((ch) => ch === 2)}  />
                                                    <FormLabel className="">Tuesday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="3" checked={office_open_days.find((ch) => ch === 3)} />
                                                    <FormLabel className="">Wednesday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="4" checked={office_open_days.find((ch) => ch === 4)} />
                                                    <FormLabel className="">Thursday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="5" checked={office_open_days.find((ch) => ch === 5)} />
                                                    <FormLabel className="">Friday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="6" checked={office_open_days.find((ch) => ch === 6)} />
                                                    <FormLabel className="">Saturday</FormLabel>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="d-flex">
                                                    <Form.Check aria-label="option 1" onChange={e => OfficeOpenDaysFilterHandler(e)} value="7" checked={office_open_days.find((ch) => ch === 7)} />
                                                    <FormLabel className="">Sunday</FormLabel>
                                                </div>
                                            </Col>
                                        </div>
                                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                                    </div>
                                    </Form>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Leaves Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Update Leaves Settings</h4>
                                        </div>
                                        <div className="d-flex mb-4 col-10 mx-auto justify-content-between">
                                            <div className="d-flex mb-2">
                                                <Form.Check type="radio" name="radio" aria-label="radio 1" checked={leaves_start_from === "joining_date"} value="joining_date" onChange={e => leaves_start_fromFilterHandler(e)} />
                                                <FormLabel>Count leaves from the date of joining</FormLabel>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <Form.Check type="radio" name="radio" aria-label="radio 1" checked={leaves_start_from === "year_start"} value="year_start" onChange={e => leaves_start_fromFilterHandler(e)} />
                                                <FormLabel>Count leaves from the start of the year</FormLabel>
                                            </div>
                                        </div>
                                        {/*  */}
                                        <div className="card-header mb-4 pb-3">
                                            <h4 className="fontsize18">Ticket Channel</h4>
                                        </div>
                                        <div className="table-sm-responsive clent_data_table mb-4">
                                            <table className="table m-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Leave Type</th>
                                                        <th scope="col">No Of Leaves</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {LeaveTypeList.LeaveTypeList_Array.map((val,index) => {
                                                        return (
                                                            <TicketChannelTableLoop
                                                                key={index}
                                                                badgetext={val.type_name}
                                                                leavetypeid={val.id}
                                                                noofleave={val.no_of_leaves}
                                                                badgebgcolor=
                                                                {
                                                                    (() => {
                                                                        if (val.color === "success")
                                                                           return "greencolortext badgegreenbg"
                                                                        if (val.color === "danger")
                                                                           return "redcolortext badgeredbg"
                                                                        if (val.color === "info")
                                                                           return "lightbluecolortext badgelightbluebg"
                                                                        if (val.color === "warning")
                                                                           return "yelowcolortext badgeyellowbg"
                                                                    })()
                                                                }
                                                                DeleteLeaveType={DeleteLeaveType}
                                                                EditLeaveType={EditLeaveType}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/*  */}
                                        <Form onSubmit={SubmitNewLeaveForm}>
                                        <FormGroup>
                                            <FormLabel className="mb-2">Add Leave Type</FormLabel>
                                            <Form.Control className="transparent_form h-35px" type="text" required value={type_name} onChange={(e) => settype_name(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel className="mt-2 mb-2">Color Label</FormLabel>
                                            <GithubPicker colors={colorlabel} onChangeComplete={handleColorChangeComplete} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel className="mt-2 mb-2">No of Leaves</FormLabel>
                                            <Form.Control className="transparent_form h-35px" type="text" required value={leave_number} onChange={(e) => setleave_number(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="d-flex">
                                                <Form.Check aria-label="option 1" value={setall_employees} checked={all_employees} onChange={(e) => setall_employees(!all_employees)} />
                                                <FormLabel className="">Assign To All Employees</FormLabel>
                                            </div>
                                        </FormGroup>
                                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                                        </Form>
                                    </div>
                                </TabPanel>
                                {/* <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Custom Fields</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header d-flex align-items-center mb-3 pb-3">
                                            <h4 className="fontsize18">Update Custom Fields</h4>
                                            <NavLink onClick={() => setModalShowAgent(true)} to="#" className="ml-auto btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Field</NavLink>
                                        </div>
                                        
                                        <div className="d-xl-flex d-block align-items-center mb-4">
                                            <div className="d-flex align-items-center mb-3 mb-xl-0">
                                                <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                                                <select className="form-control transparent_form">
                                                    <option>10</option>
                                                    <option>20</option>
                                                    <option>30</option>
                                                </select>
                                                <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                                            </div>
                                            <div className="ml-auto">
                                                <form className="transparent_form">
                                                    <InputGroup>
                                                        <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                                        <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                                    </InputGroup>
                                                </form>
                                            </div>
                                        </div>
                                        
                                        <div className="table-sm-responsive clent_data_table">
                                            <table className="table m-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Module</th>
                                                        <th scope="col">Lable</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Value</th>
                                                        <th scope="col">Required</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CustomFieldsTableLoop_Array.map((val) => {
                                                        return (
                                                            <CustomFieldsTableLoop
                                                                key={val.key}
                                                                projectname={val.projectname}
                                                                label={val.label}
                                                                name={val.name}
                                                                type={val.type}
                                                                value={val.value}
                                                                requiredtext={val.requiredtext}
                                                                badgebgcolor={val.badgebgcolor}
                                                                crossimg={val.crossimg}
                                                                editiconimg={val.editiconimg}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabPanel> */}
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Roles Permissions</h4>
                                    <div className="card card_dashboard card-body">
                                        {RolePermissionLoop_Array.map((val) => {
                                            return (
                                                <RolePermissionLoop
                                                    key={val.key}
                                                    managebtn={val.managebtn}
                                                />
                                            )
                                        })}
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Message Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-3 pb-3">
                                            <h4 className="fontsize18">Message Settings</h4>
                                        </div>
                                        <div className="d-flex align-items-center mb-4">
                                            <Toggle
                                                checked={allow_client_admin}
                                                name='burritoIsReady'
                                                icons={false}
                                                onChange={(e) => {
                                                    setLoading(true);
                                                    setallow_client_admin(!allow_client_admin);
                                                    var msg;
                                                    if (allow_client_admin) {
                                                        msg = "no";
                                                    } else {
                                                        msg = "yes";
                                                    }
                                                    axios.post(Globalsettings.url + 'api/admin/settings/message-settings/update/'+companyid, {
                                                        allow_client_employee: msg
                                                    })
                                                        .then((response) => {
                                                            setLoading(false);
                                                            toast.success("Message Settings Successfully Updated!");
                                                        })
                                                }}
                                            />
                                            <FormLabel> Allow chat between client and admin?</FormLabel>
                                        </div>
                                        <div className="d-flex align-items-center mb-4">
                                            <Toggle
                                                checked={allow_client_employee}
                                                name='burritoIsReady'
                                                icons={false}
                                                onChange={(e) => {
                                                    setLoading(true);
                                                    setallow_client_employee(!allow_client_employee);
                                                    var msg;
                                                    if (allow_client_employee) {
                                                        msg = "no";
                                                    } else {
                                                        msg = "yes";
                                                    }
                                                    axios.post(Globalsettings.url + 'api/admin/settings/message-settings/update/'+companyid, {
                                                        allow_client_employee: msg
                                                    })
                                                    .then((response) => {
                                                        setLoading(false);
                                                        toast.success("Message Settings Successfully Updated!");
                                                    })
                                                }}
                                            />
                                            <FormLabel> Allow chat between client and employees?</FormLabel>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Time Log Settings</h4>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-3 pb-3">
                                            <h4 className="fontsize18">Time Log Settings</h4>
                                        </div>
                                        <Alert variant="" className="badgegreenbg greencolortext fontsize14">Self task setting will update on select.</Alert>
                                        <div className="d-flex align-items-center mb-3">
                                            <Form.Check type="checkbox" 
                                                checked={auto_timer_stop}
                                                onChange={(e) => {
                                                    setLoading(true);
                                                setauto_timer_stop(!auto_timer_stop);
                                                var msg;
                                                if (auto_timer_stop) {
                                                    msg = "no";
                                                } else {
                                                    msg = "yes";
                                                }
                                                axios.post(Globalsettings.url + 'api/admin/settings/log-time-settings/store', {
                                                    companyid: companyid,
                                                    auto_timer_stop: msg
                                                })
                                                    .then((response) => {
                                                        toast.success("Time Log Settings Successfully Updated!");
                                                        setLoading(false);
                                                    })
                                            }}/>
                                            <FormLabel className="mb-2">Employee can create task for self.</FormLabel>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Form.Check type="checkbox" 
                                                checked={approval_required}
                                                onChange={(e) => {
                                                    setLoading(true);
                                                    setapproval_required(!approval_required);
                                                    var msg;
                                                    if (approval_required) {
                                                        msg = "0";
                                                    } else {
                                                        msg = "1";
                                                    }
                                                    axios.post(Globalsettings.url + 'api/admin/settings/log-time-settings/store', {
                                                        companyid: companyid,
                                                        approval_required: msg
                                                    })
                                                        .then((response) => {
                                                            toast.success("Time Log Settings Successfully Updated!");
                                                            setLoading(false);
                                                        })
                                            }}/>
                                            <FormLabel className="mb-2">Timelog will require approval</FormLabel>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <h4 className="main_title fontsize18 mb-3">Task Settings</h4>
                                    <Form onSubmit={TaskSettingSubmit}>
                                    <div className="card card_dashboard card-body">
                                        <div className="card-header mb-3 pb-3">
                                            <h4 className="fontsize18">Setting</h4>
                                        </div>
                                        <Alert variant="" className="badgegreenbg greencolortext fontsize14">Self task setting will update on select.</Alert>
                                        <div className="d-flex align-items-center">
                                            <Form.Check type="checkbox" checked={self_task} onChange={() => setself_task(!self_task) } />
                                            <FormLabel className="mb-2">Employee can create task for self.</FormLabel>
                                        </div>
                                        <div className="from-group my-3">
                                            <FormLabel className="mb-2">Default Task Status</FormLabel>
                                            <Form.Control className="transparent_form h-45px" as="select" value={default_task_status} onChange={(e) => setdefault_task_status(e.target.value)} >
                                                {TaskSettingStatus.TaskSettingStatus_Array.map((val,index)=>{
                                                    return(
                                                        <option value={val.id} key={index}>{val.column_name}</option>
                                                    )
                                                })}
                                                
                                            </Form.Control>
                                        </div>
                                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                                    </div>
                                    </Form>
                                </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div >
            {/* task categor */}
            <Modal show={modalShowAgent} onHide={() => setModalShowAgent(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Leave Type Form</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleLeaveTypeUpdateSubmit}>
                        <Modal.Body className="p-0 my-4">
                            <FormLabel className="mb-2">Leave Type Name</FormLabel>
                            <input type="hidden" value={UpdateLeaveTypeId} onChange={(e) => setUpdateLeaveTypeId(e.target.value)} />
                            <Form.Control className="transparent_form h-55px" type="text" placeholder="Enter Leave Type Name..." required value={UpdateLeaveTypeName} onChange={e => setUpdateLeaveTypeName(e.target.value)} />
                            <FormLabel className="mb-2">No. of Leave</FormLabel>
                            <Form.Control className="transparent_form h-55px" type="number" placeholder="Enter Leave Type No..." required value={UpdateLeaveTypeNo} onChange={e => setUpdateLeaveTypeNo(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer className="p-0">
                            <Button variant="" className="w-100px graycolorbg" onClick={() => setModalShowAgent(false)}>Close</Button>
                            <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                        </Modal.Footer>
                    </Form>
            </Modal>
        </>
    );
}

export default Setting;