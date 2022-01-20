import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";

// Website Component Importing

// Css Pages Attached
import Home from "./componets/website/homepage/Home";

// Css Component Attached
import Webheader from "./componets/Webheader";
import Webfooter from "./componets/Webfooter";

// website Attached
import Pricing from "./componets/website/pricing/Pricing";
import Demo from "./componets/website/Demo";
import Reviews from "./componets/website/review/Reviews";
import Blog from "./componets/website/blog/Blog";
import BlogDetail from "./componets/website/blog/BlogDetail";
import Investors from "./componets/website/investors/Investors";
import AboutUs from "./componets/website/AboutUs";
import Faq from "./componets/website/faq/Faq";
import Careers from "./componets/website/careers/Careers";
import Support from "./componets/website/support/Support"; 
import Industries from "./componets/website/Industries";
import ContactUs from "./componets/website/ContactUs";
// Header Links
import JobManagement from "./componets/website/JobManagement";
import WebJobScheduling from "./componets/website/WebJobScheduling";
import Invoicing from "./componets/website/Invoicing";
import Estimate from "./componets/website/Estimate";
import ClientManagement from "./componets/website/ClientManagement";
import InventoryManagement from "./componets/website/InventoryManagement";
import ExpensesManagement from "./componets/website/ExpensesManagement";
import Tasks from "./componets/website/Tasks";
import Chatbot from "./componets/website/Chatbot";
import Employees from "./componets/website/Employees";
import WebLeaves from "./componets/website/WebLeaves";
import WebAttendance from "./componets/website/WebAttendance";
import WebTimeLogs from "./componets/website/WebTimeLogs";

import Academies from "./componets/website/Academies";



// Dashbaord Component Importing

// componets
import SideBar from "./componets/NavBar";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import Error from "./componets/Error";
import AProfile from "./componets/AProfile";
import AViewAllNotification from "./componets/AViewAllNotification";
// ==========Dashboard dromdown pages==========
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import Forgot from "./componets/Forgot";


import Dashboard from "./componets/pages/SideBar_Tab_Pages/Main_Dashboard_Tab/Main_D_Page_content/Main_Dashboard";
// ==========cutomer dromdown pages==========
import ClientDasboard from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/ClientDasboard";
import Client from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Client";
import Client_Detail from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Client_Detail";
import Add_New_Client from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Add_New_Client";
import Add_New_ClientFromLead from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Add_New_ClientFromLead";
import Edit_Client from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Edit_Client";
import Profile from "./componets/client/Profile";
import ViewAllNotification from "./componets/client/ViewAllNotification";


import Leads from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Leads";
import Leads_View from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Leads_View";
import Leads_Edit from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Leads_Edit";
import Lead_Form from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Lead_Form";
import Add_New_Lead from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Add_New_Lead";
import Add_Proposal from "./componets/pages/SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/Add_Proposal";

// ==========Job dromdown pages==========
import ProjectDashboard from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Dashboard/ProjectDashboard";
import Contract from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Contract_Page_content/Contract";
import Create_Contract from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Contract_Page_content/Create_Contract";
import Contract_View from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Contract_Page_content/Contract_View";
import Contract_Edit from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Contract_Page_content/Contract_Edit";

import ManageJob from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/ManageJob";
import Add_Project from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Add_Project";
import View_Archive from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/View_Archive";
import Project_Template from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Project_Template";
import Project_Edit from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Project_Edit";
import Project_View from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Project_View";
import Edit from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Edit";
import View_Details from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/View_Details";
import View_Sub_Detail from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/View_Sub_Detail";
import Grantt_Chart from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Grantt_Chart";
import BurnDown_Chart from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/BurnDown_Chart";
import Rating from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Rating";
import Public_Grantt_Chart from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Public_Grantt_Chart";
import Add_Job_Member from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Add_Job_Member";
import Add_New_Template from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Add_New_Template";
import Task_Edit_page from "./componets/pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/Task_Edit_page";

import Task from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Task";
import Add_New_Task from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Add_New_Task";
import Task_Label from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Task_Label";
import Create_Label from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Create_Label";
import Edit_Label from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Edit_Label";
import Task_Edit from "./componets/pages/SideBar_Tab_Pages/Project-Tab/Task_Page_content/Task_Edit";



import TaskBoard from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TaskBoard_Page_content/TaskBoard";
import JobScheduling from "./componets/pages/SideBar_Tab_Pages/Project-Tab/JobSchediling_Page_content/JobScheduling";

import TimeLogs from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TimeLogs_Page_content/TimeLogs";
import Employe_Time_Log from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TimeLogs_Page_content/Employe_Time_Log";
import Active_Timer from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TimeLogs_Page_content/Active_Timer";
import Create_Invoice from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TimeLogs_Page_content/Create_Invoice";
import Log_Time from "./componets/pages/SideBar_Tab_Pages/Project-Tab/TimeLogs_Page_content/Log_Time";


// ==========HR dromdown pages==========
import HrDasboard from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Dashboard/HrDashboard";
import EmployeeList from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/EmployeeList";
import Add_Employe from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/Add_Employe";
import Edit_Employe from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/Edit_Employe";
import EmployeeDetail from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/EmployeeDetail";


import Deparment from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Deparment_Page_Content/Deparment";
import Manage_Department from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Deparment_Page_Content/Manage_Department";


import Designation from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Designation_Page_Content/Designation";
import Manage_Designation from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Designation_Page_Content/Manage_Designation";


import Attendance from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Attendance_Page_Content/Attendance";
import CreateAttendance from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Attendance_Page_Content/CreateAttendance";

import Holiyday from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Holiday_Page_Content/Holiyday";

import Leaves from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Leaves_Page_Content/Leaves";
import All_Leaves from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Leaves_Page_Content/All_Leaves";
import Assign_Leaves from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Leaves_Page_Content/Assign_Leaves";
import Calendar_Leaves from "./componets/pages/SideBar_Tab_Pages/Hr_Tab/Leaves_Page_Content/Calendar_Leaves";

// ==========Finance dromdown pages==========
import FinanceDasboard from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Dashboard/FinanceDasboard";
import Estimates from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Estimate_Page_Content/Estimates";
import Create_Estimate from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Estimate_Page_Content/Create_Estimate";
import Estimate_Invoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Estimate_Page_Content/Estimate_Invoice";


import Invoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/Invoice";
import RecurringInvoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/RecurringInvoice";
import CreateLogTimeInvoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/CreateLogTimeInvoice";
import AddInvoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/AddInvoice";
import AddRecuringInvoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/AddRecuringInvoice";
import InvoicePage from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/InvoicePage";
import EditInvoice from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/EditInvoice";
import AddPayment from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/AddPayment";
import PaymentLink from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/PaymentLink";
import AddCreditNote from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Invoices_Page_Content/AddCreditNote";


import Payments from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Payments_Page_Content/Payments";
import Edit_Payment from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Payments_Page_Content/Edit_Payment";


import Expences from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/Expences";
import ExpencesRecurring from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/ExpencesRecurring";
import AddExpences from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/AddExpences";
import EditExpences from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/EditExpences";
import AddRecurringExpences from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/AddRecurringExpences";
import EditRecurringExpences from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/Expences_Page_Content/EditRecurringExpences";


import CreditNote from "./componets/pages/SideBar_Tab_Pages/Finance_Tab/CreditNote_Page_Content/CreditNote";

// ==========Inventory dromdown pages==========
import Inventory from "./componets/pages/SideBar_Tab_Pages/Inventory_Page/Inventory";
import AddNewInventory from "./componets/pages/SideBar_Tab_Pages/Inventory_Page/AddNewInventory";
import EditInventory from "./componets/pages/SideBar_Tab_Pages/Inventory_Page/EditInventory";

// ==========Chabot dromdown pages==========
import Chabot from "./componets/pages/SideBar_Tab_Pages/Chabot_Page/Chabot";

// ==========Events dromdown pages==========
import Events from "./componets/pages/SideBar_Tab_Pages/Events_Page/Events";

// ==========NoticeBoard dromdown pages==========
import NoticeBoard from "./componets/pages/SideBar_Tab_Pages/NoticeBoard_Page/NoticeBoard";
import AddNewNotice from "./componets/pages/SideBar_Tab_Pages/NoticeBoard_Page/AddNewNotice";
import EditNotice from "./componets/pages/SideBar_Tab_Pages/NoticeBoard_Page/EditNotice";

// ==========Report dromdown pages==========
import TaskReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/Task_Report_Page_content/TaskReport";
import TimeReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/Time_Report_Page_content/TimeReport";
import FinanceReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/FinanceReport_Page_content/FinanceReport";
import IncomeExpenseReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/In_Ex__Report_Page_content/IncomeExpenseReport";
import LeaveReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/Leave_Report_Page_content/LeaveReport";
import AttendanceReport from "./componets/pages/SideBar_Tab_Pages/Report_Tab/AttendanceReport_Page_content/AttendanceReport";

// ==========Billing dromdown pages==========
import Billing from "./componets/pages/SideBar_Tab_Pages/Billing_Page/Billing";
import Pakages from "./componets/pages/SideBar_Tab_Pages/Billing_Page/Pakages";


// ==========Map dromdown pages==========
import Map from "./componets/pages/SideBar_Tab_Pages/Map_Page/Map";

// ==========Setting dromdown pages==========
import Setting from "./componets/pages/SideBar_Tab_Pages/Setting_Page/Setting";
import Notification_Setting from "./componets/pages/SideBar_Tab_Pages/Setting_Page/Notification_Setting";
import PaymentCredentials from "./componets/pages/SideBar_Tab_Pages/Setting_Page/PaymentCredentials";
// import TicketSettings from "./componets/pages/SideBar_Tab_Pages/Setting_Page/TicketSettings";
import ModuleSettings from "./componets/pages/SideBar_Tab_Pages/Setting_Page/ModuleSettings";
import LeadSettings from "./componets/pages/SideBar_Tab_Pages/Setting_Page/LeadSettings";
import CDPR from "./componets/pages/SideBar_Tab_Pages/Setting_Page/CDPR";
import CreateCurrency from "./componets/pages/SideBar_Tab_Pages/Setting_Page/CreateCurrency";
import EditCurrency from "./componets/pages/SideBar_Tab_Pages/Setting_Page/EditCurrency";
import FaqAdmin from "./componets/pages/SideBar_Tab_Pages/faqa_dmin/FaqAdmin";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
 


// ==========Client Dashboard pages==========
import ClientHeader from "./componets/client/ClientHeader";
import ClientSideBar from "./componets/client/ClientSideBar";
import ClientDashboard from "./componets/client/ClientDashboardTab/ClientDashboard";
import ClientProject from "./componets/client/clientproject/ClientProject";
import ClientInventory from "./componets/client/clientinventory/ClientInventory";
import CartDetail from "./componets/client/clientinventory/CartDetail";
import ClientInvoice from "./componets/client/clientinvoices/ClientInvoice";
import InvoiceRecurring from "./componets/client/clientinvoices/InvoiceRecurring";
import ClientCreditNote from "./componets/client/clientcreditnote/ClientCreditNote";
import ClientEstimate from "./componets/client/clientestimate/ClientEstimate";
import ViewEstimate from "./componets/client/clientestimate/ViewEstimate";
import ClientPayment from "./componets/client/clientpayment/ClientPayment";
import ClientEvents from "./componets/client/ClientEvents";
import ClientContract from "./componets/client/clientcontract/ClientContract";
import ViewContract from "./componets/client/clientcontract/ViewContract";
import ClientNoticeBoard from "./componets/client/clientnoticeboard/ClientNoticeBoard";
import ClientAddNewNotice from "./componets/client/clientnoticeboard/ClientAddNewNotice";
import ClientEdit from "./componets/client/clientproject/ClientEdit";
import ClientViewDetails from "./componets/client/clientproject/ClientViewDetails";
import ClientGranttChart from "./componets/client/clientproject/ClientGranttChart";
import ClientPublicGranttChart from "./componets/client/clientproject/ClientPublicGranttChart";
import ClientChabot from "./componets/client/Chabot_Page/Chabot";
import ViewDetail from "./componets/client/clientinvoices/ViewDetail";

import EmployeeHeader from "./componets/employe/EmployeeHeader";
import EmployeSideBar from "./componets/employe/EmployeSideBar";
import EmployeeDashboard from "./componets/employe/employeedashboardtab/EmployeeDashboard";
import EmployeeProject from "./componets/employe/employeeproject/EmployeeProject";
import View_Projectdetails from "./componets/employe/employeeproject/View_Projectdetails";
import View_projectsubdetails from "./componets/employe/employeeproject/View_projectsubdetails";
import EmployeeTask from "./componets/employe/employetask/EmployeeTask";
import Employee_AddNewTask from "./componets/employe/employetask/Employee_AddNewTask";
import Employee_TaskEdit from "./componets/employe/employetask/Employee_TaskEdit";
import EmployeeLeads from "./componets/employe/employeeleads/EmployeeLeads";
import Employee_LeadsEdit from "./componets/employe/employeeleads/Employee_LeadsEdit";
import Employee_LeadsView from "./componets/employe/employeeleads/Employee_LeadsView";
import Employee_TimeLogs from "./componets/employe/employeetimelog/Employee_TimeLogs";
import Employee_LogsTime from "./componets/employe/employeetimelog/Employee_LogsTime";
import Employee_Attendance from "./componets/employe/employeeattendance/Employee_Attendance";
import FinanceExpenses from "./componets/employe/employeefinanceexpence/FinanceExpenses";
import Employee_AddExpenses from "./componets/employe/employeefinanceexpence/Employee_AddExpenses";
import EmployeeMessage from "./componets/employe/employeemessage/EmployeeMessage";
import EmployeeEvents from "./componets/employe/employeeevent/EmployeeEvents";
import EmployeeLeaves from "./componets/employe/employeeleaves/EmployeeLeaves";
import EmployeeApplyLeaves from "./componets/employe/employeeleaves/EmployeeApplyLeaves";
import Employee_NoticeBoard from "./componets/employe/employeenoticeboard/Employee_NoticeBoard";
import Employee_AddNewNotice from "./componets/employe/employeenoticeboard/Employee_AddNewNotice";
import Employee_EditNotice from "./componets/employe/employeenoticeboard/Employee_EditNotice";
import EmployeeChabot from "./componets/employe/Chabot_Page/EmployeeChabot";
import EProfile from "./componets/employe/EProfile";
import EViewAllNotification from "./componets/employe/EViewAllNotification";
//
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/css/App.scss";
import "./assets/css/Nav.less";

import "../node_modules/react-circular-progressbar/dist/styles.css";
// 
import "../node_modules/jquery/dist/jquery";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import "./assets/js/main";
import "./assets/js/main2";
import "../node_modules/react-toggle/style.css";
import "../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "../node_modules/owl.carousel/dist/assets/owl.theme.default.css";
//
import '../node_modules/react-toastify/dist/ReactToastify.css';
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../node_modules/@pathofdev/react-tag-input/src/styles/index.scss";
import '../node_modules/react-dates/lib/css/_datepicker.css';
import '../node_modules/react-image-picker/dist/index.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

TimeAgo.addDefaultLocale(en);
function App() {
  const history = useHistory();
  // if (localStorage.getItem("data") === null) {
  //   history.push(`${process.env.PUBLIC_URL}/signin`);
  // }
  return (
    <>
      <Router>
            <Switch>
              {/* Website Route */}
                <WebLayout exact path={`${process.env.PUBLIC_URL}/`} component={Home}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/pricing`} component={Pricing}></WebLayout>
                
                <WebLayout path={`${process.env.PUBLIC_URL}/demo`} component={Demo}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/reviews`} component={Reviews}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/blog`} component={Blog}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/blog_detail`} component={BlogDetail}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/investors`} component={Investors}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/about_us`} component={AboutUs}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/faq`} component={Faq}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/careers`} component={Careers}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/support`} component={Support}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/industries`} component={Industries}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/contact_us`} component={ContactUs}></WebLayout>
                {/* header Links */}
                <WebLayout path={`${process.env.PUBLIC_URL}/job_management`} component={JobManagement}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/webjob_scheduling`} component={WebJobScheduling}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/invoicing`} component={Invoicing}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/estimate`} component={Estimate}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/client_management`} component={ClientManagement}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/inventory_management`} component={InventoryManagement}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/expenses_management`} component={ExpensesManagement}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/tasks`} component={Tasks}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/chatbot`} component={Chatbot}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/employees`} component={Employees}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/webleaves`} component={WebLeaves}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/webattendance`} component={WebAttendance}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/webtime_logs`} component={WebTimeLogs}></WebLayout>
                <WebLayout path={`${process.env.PUBLIC_URL}/academies`} component={Academies}></WebLayout>

              <DashLayout exact path={`${process.env.PUBLIC_URL}/signin`} component={Signin} />
              <DashLayout exact path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
              <DashLayout exact path={`${process.env.PUBLIC_URL}/forgot`} component={Forgot} />
              <DashLayout path={`${process.env.PUBLIC_URL}/aviewallnotification`} component={AViewAllNotification}></DashLayout>
              <DashLayout exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/finance-dashboard`} component={FinanceDasboard} />
              {/* ==========cutomer dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/client-dashboard`} component={ClientDasboard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/client`} component={Client} />
              <DashLayout path={`${process.env.PUBLIC_URL}/client_detail/:id/:cid`} component={Client_Detail} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_client`} component={Add_New_Client} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_clientfromlead/:id`} component={Add_New_ClientFromLead} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_client/:id`} component={Edit_Client} />
              <DashLayout path={`${process.env.PUBLIC_URL}/leads`} component={Leads} />
              <DashLayout path={`${process.env.PUBLIC_URL}/leads_view/:id`} component={Leads_View} />
              <DashLayout path={`${process.env.PUBLIC_URL}/leads_edit/:id`} component={Leads_Edit} />
              <DashLayout path={`${process.env.PUBLIC_URL}/lead_form`} component={Lead_Form} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_lead`} component={Add_New_Lead} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_proposal`} component={Add_Proposal} />
              {/* ==========Project dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/project-dashboard`} component={ProjectDashboard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/contract`} component={Contract} />
              <DashLayout path={`${process.env.PUBLIC_URL}/manage-job`} component={ManageJob} />
              <DashLayout path={`${process.env.PUBLIC_URL}/contract_view/:id`} component={Contract_View} />
              <DashLayout path={`${process.env.PUBLIC_URL}/contract_edit/:id`} component={Contract_Edit} />
              {/* task tab pages */}
              <DashLayout path={`${process.env.PUBLIC_URL}/task`} component={Task} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_task`} component={Add_New_Task} />
              <DashLayout path={`${process.env.PUBLIC_URL}/task_label`} component={Task_Label} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_label`} component={Create_Label} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_label/:id`} component={Edit_Label} />
              <DashLayout path={`${process.env.PUBLIC_URL}/task_edit/:id`} component={Task_Edit} />
              <DashLayout path={`${process.env.PUBLIC_URL}/task_edit_page`} component={Task_Edit_page} />

              {/*  */}
              <DashLayout path={`${process.env.PUBLIC_URL}/task-board`} component={TaskBoard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/job-scheduling`} component={JobScheduling} />

              <DashLayout path={`${process.env.PUBLIC_URL}/time-logs`} component={TimeLogs} />
              <DashLayout path={`${process.env.PUBLIC_URL}/employe_time_log`} component={Employe_Time_Log} />
              <DashLayout path={`${process.env.PUBLIC_URL}/active_timer`} component={Active_Timer} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_invoice`} component={Create_Invoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/log_time`} component={Log_Time} />

              <DashLayout path={`${process.env.PUBLIC_URL}/create_contract`} component={Create_Contract} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_project`} component={Add_Project} />
              <DashLayout path={`${process.env.PUBLIC_URL}/view_archive`} component={View_Archive} />
              <DashLayout path={`${process.env.PUBLIC_URL}/project_template`} component={Project_Template} />
              <DashLayout path={`${process.env.PUBLIC_URL}/project_edit`} component={Project_Edit} />
              <DashLayout path={`${process.env.PUBLIC_URL}/project_view`} component={Project_View} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit/:id`} component={Edit} />
              <DashLayout path={`${process.env.PUBLIC_URL}/view_details/:id`} component={View_Details} />
              <DashLayout path={`${process.env.PUBLIC_URL}/view_sub_detail`} component={View_Sub_Detail} />
              <DashLayout path={`${process.env.PUBLIC_URL}/grantt_chart`} component={Grantt_Chart} />
              <DashLayout path={`${process.env.PUBLIC_URL}/burndown_chart`} component={BurnDown_Chart} />
              <DashLayout path={`${process.env.PUBLIC_URL}/rating`} component={Rating} />
              <DashLayout path={`${process.env.PUBLIC_URL}/public_grantt_chart`} component={Public_Grantt_Chart} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_job_member`} component={Add_Job_Member} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_template`} component={Add_New_Template} />
              {/* ==========HR dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/hr-dashboard`} component={HrDasboard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/employee-list`} component={EmployeeList} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_employe`} component={Add_Employe} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_employe/:id`} component={Edit_Employe} />
              <DashLayout path={`${process.env.PUBLIC_URL}/employee_detail/:id`} component={EmployeeDetail} />

              <DashLayout path={`${process.env.PUBLIC_URL}/deparment`} component={Deparment} />
              <DashLayout path={`${process.env.PUBLIC_URL}/manage_department/:id`} component={Manage_Department} />


              <DashLayout path={`${process.env.PUBLIC_URL}/designation`} component={Designation} />
              <DashLayout path={`${process.env.PUBLIC_URL}/manage_designation/:id`} component={Manage_Designation} />


              <DashLayout path={`${process.env.PUBLIC_URL}/attendance`} component={Attendance} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_attendance`} component={CreateAttendance} />
              
              <DashLayout path={`${process.env.PUBLIC_URL}/holiyday`} component={Holiyday} />

              <DashLayout path={`${process.env.PUBLIC_URL}/leaves`} component={Leaves} />
              <DashLayout path={`${process.env.PUBLIC_URL}/all_leaves`} component={All_Leaves} />
              <DashLayout path={`${process.env.PUBLIC_URL}/assign_leaves`} component={Assign_Leaves} />
              <DashLayout path={`${process.env.PUBLIC_URL}/calendar_leaves`} component={Calendar_Leaves} />

              {/* ==========Job dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/estimates`} component={Estimates} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_estimate`} component={Create_Estimate} />
              <DashLayout path={`${process.env.PUBLIC_URL}/estimate_invoice/:id`} component={Estimate_Invoice} />


              <DashLayout path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/recurring_invoice`} component={RecurringInvoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_log_time_invoice`} component={CreateLogTimeInvoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_invoice`} component={AddInvoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_recuringinvoice`} component={AddRecuringInvoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/invoice_page`} component={InvoicePage} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_invoice`} component={EditInvoice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_payment`} component={AddPayment} />
              <DashLayout path={`${process.env.PUBLIC_URL}/payment_link`} component={PaymentLink} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_credit_note`} component={AddCreditNote} />

              <DashLayout path={`${process.env.PUBLIC_URL}/payments`} component={Payments} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_payment/:id`} component={Edit_Payment} />

              <DashLayout path={`${process.env.PUBLIC_URL}/expences`} component={Expences} />
              <DashLayout path={`${process.env.PUBLIC_URL}/expences_recurring`} component={ExpencesRecurring} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_expences`} component={AddExpences} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_expences/:id`} component={EditExpences} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_recurring_expences`} component={AddRecurringExpences} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_recurring_expences/:id`} component={EditRecurringExpences} />


              <DashLayout path={`${process.env.PUBLIC_URL}/credit-note`} component={CreditNote} />
              {/* ==========Inventory dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/inventory`} component={Inventory} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_inventory`} component={AddNewInventory} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_inventory/:id`} component={EditInventory} />
              {/* ==========Chabot dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/chabot`} component={Chabot} />
              {/* ==========Events dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/events`} component={Events} />
              {/* ==========NoticeBoard dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/notice_board`} component={NoticeBoard} />
              <DashLayout path={`${process.env.PUBLIC_URL}/add_new_notice`} component={AddNewNotice} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_notice/:id`} component={EditNotice} />
              {/* ==========Report dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/task-report`} component={TaskReport} />
              <DashLayout path={`${process.env.PUBLIC_URL}/time-log-report`} component={TimeReport} />
              <DashLayout path={`${process.env.PUBLIC_URL}/finance-report`} component={FinanceReport} />
              <DashLayout path={`${process.env.PUBLIC_URL}/income-expense-report`} component={IncomeExpenseReport} />
              <DashLayout path={`${process.env.PUBLIC_URL}/leave-report`} component={LeaveReport} />
              <DashLayout path={`${process.env.PUBLIC_URL}/attendance-report`} component={AttendanceReport} />
              {/* ==========Billing dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/billing`} component={Billing} />
              <DashLayout path={`${process.env.PUBLIC_URL}/pakages`} component={Pakages} />
              {/* ==========Map dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/map`} component={Map} />
              {/* ==========Setting dromdown pages========== */}
              <DashLayout path={`${process.env.PUBLIC_URL}/setting`} component={Setting} />
              <DashLayout path={`${process.env.PUBLIC_URL}/notification_setting`} component={Notification_Setting} />
              <DashLayout path={`${process.env.PUBLIC_URL}/payment_credentials`} component={PaymentCredentials} />
              {/* <DashLayout path={`${process.env.PUBLIC_URL}/ticket_settings`} component={TicketSettings} /> */}
              <DashLayout path={`${process.env.PUBLIC_URL}/module_settings`} component={ModuleSettings} />
              <DashLayout path={`${process.env.PUBLIC_URL}/lead_settings`} component={LeadSettings} />
              <DashLayout path={`${process.env.PUBLIC_URL}/cdpr`} component={CDPR} />
              <DashLayout path={`${process.env.PUBLIC_URL}/create_currency`} component={CreateCurrency} />
              <DashLayout path={`${process.env.PUBLIC_URL}/edit_currency/:id`} component={EditCurrency} />
              <DashLayout path={`${process.env.PUBLIC_URL}/error`} component={Error} />
              <DashLayout path={`${process.env.PUBLIC_URL}/faq_admin`} component={FaqAdmin} />
              <DashLayout path={`${process.env.PUBLIC_URL}/aprofile/:id`} component={AProfile} />

              {/* ==========Client Dashboard pages========== */}
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/clientdashboard`} component={ClientDashboard}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/clientproject`} component={ClientProject}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_inventory`} component={ClientInventory}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/cart_detail`} component={CartDetail}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_invoice`} component={ClientInvoice}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_recurring`} component={InvoiceRecurring}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_credit_note`} component={ClientCreditNote}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_estimate`} component={ClientEstimate}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/viewestimate/:id`} component={ViewEstimate}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_payment`} component={ClientPayment}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_events`} component={ClientEvents}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_contract`} component={ClientContract}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/viewcontract/:id`} component={ViewContract}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_noticeboard`} component={ClientNoticeBoard}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_addnewnotice`} component={ClientAddNewNotice}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_edit`} component={ClientEdit}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/profile/:id`} component={Profile} />
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/viewallnotification`} component={ViewAllNotification} />
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_viewdetails/:id`} component={ClientViewDetails}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_granttchart`} component={ClientGranttChart}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_publicgranttchart`} component={ClientPublicGranttChart}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/client_chabot`} component={ClientChabot}/>
              <ClientDashLayout path={`${process.env.PUBLIC_URL}/viewdetail/:id`} component={ViewDetail}/>
              {/* ==========Employee Dashboard pages========== */}
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employeedashboard`} component={EmployeeDashboard}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employeeproject`} component={EmployeeProject}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/view_projectdetails/:id`} component={View_Projectdetails} />
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/view_projectsubdetails/:id/:idd`} component={View_projectsubdetails} />
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_task`} component={EmployeeTask}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_add_new_task`} component={Employee_AddNewTask}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_taskedit`} component={Employee_TaskEdit}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_leads`} component={EmployeeLeads}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_leadsedit`} component={Employee_LeadsEdit}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_leadsview/:id`} component={Employee_LeadsView}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_timelog`} component={Employee_TimeLogs}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employe_logtime`} component={Employee_LogsTime}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_attendance`} component={Employee_Attendance}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/finance_expanses`} component={FinanceExpenses}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_addexpenses`} component={Employee_AddExpenses}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_message`} component={EmployeeMessage}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_event`} component={EmployeeEvents}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_leaves`} component={EmployeeLeaves}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/Employee_applyleaves`} component={EmployeeApplyLeaves}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_noticeboard`} component={Employee_NoticeBoard}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_addnewnotice`} component={Employee_AddNewNotice}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_editnotice`} component={Employee_EditNotice}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/employee_chabot`} component={EmployeeChabot}/>
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/eprofile/:id`} component={EProfile} />
              <EmployeeDashLayout path={`${process.env.PUBLIC_URL}/eviewallnotification`} component={EViewAllNotification} />

              <Redirect to="/" />
            </Switch>
      </Router>
    </>
  );
}

export default App;


const WebLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="webbody">
          <Webheader/>
          <Component {...matchProps} />
          <Webfooter/>
        </div>
      )}
    />
  );
};

const DashLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div id="root-dashboard" className="bashboardbody">
        <SideBar />
        <div className="content main ml-lg-4 ml-0">
            <Header />
              <Component {...matchProps} />
            <Footer/>
        </div>
        </div>
      )}
    />
  );
};

// 
const ClientDashLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div id="root-dashboard" className="bashboardbody">
        <ClientSideBar />
        <div className="content main ml-lg-4 ml-0">
            <ClientHeader />
              <Component {...matchProps} />
            <Footer/>
        </div>
        </div>
      )}
    />
  );
};
// 
const EmployeeDashLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div id="root-dashboard" className="bashboardbody">
        <EmployeSideBar />
        <div className="content main ml-lg-4 ml-0">
            <EmployeeHeader />
              <Component {...matchProps} />
            <Footer/>
        </div>
        </div>
      )}
    />
  );
};