import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from "react-router-dom";
import { Form, Button, Accordion, FormLabel, Modal, FormControl, InputGroup,Nav } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import swal from 'sweetalert';
import { Editor, editorState } from "react-draft-wysiwyg";
import dateFormat from 'dateformat';
import searchicon from "../../../assets/images/searchiconseablue.svg";
import uploadicon from "../../../assets/images/uploadicon.svg";
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import UpdateTitle from "../../client/clientproject/UpdateTitle";
import MembersPanelLoop from "../../client/clientproject/MembersPanelLoop";
import MilestonesPanelLoop from "../../client/clientproject/MilestonesPanelLoop";
import TaskContent from "../../client/clientproject/Task_Content";
import OverviewTopDataLoop from "../../client/clientproject/OverviewTopDataLoop";
import DiscussionDataLoop from "../../client/clientproject/DiscussionDataLoop";
import TimeLogDataLoop from "../../client/clientproject/TimeLogDataLoop";
import DataTableLoopModal_3 from "../../client/clientproject/DataTableLoopModal_3";
import InvoiceTabDataLoop from "../../client/clientproject/InvoiceTabDataLoop";
import InnerTabDataLoop from "../../client/clientproject/InnerTabDataLoop";
import ActivityTimelineLoop from "../../client/clientproject/ActivityTimelineLoop";
import OverviewDesriptionLoop from "../../client/clientproject/OverviewDesriptionLoop";
import OnGoing_Content from "../../client/clientproject/OnGoing_Content";
import Inprogress_Content from "../../client/clientproject/Inprogress_Content";
import InReview_Content from "../../client/clientproject/InReview_Content";
import Completed_Content from "../../client/clientproject/Completed_Content";

// 
import plusicon from "../../../assets/images/plusicon.svg";
import plusblackicon from "../../../assets/images/plusblackicon.svg";
import arrowdown from "../../../assets/images/arrowdown.svg";
import exporticon from "../../../assets/images/edit_4_iconimg.svg";
import barsicon from "../../../assets/images/dotoption.svg";
import formtable_img from "../../../assets/images/formtable_img.svg";
import blackplusicon from "../../../assets/images/plusblackicon.svg";
import graphicon from "../../../assets/images/graph.svg";
import shoppingbasketicon from "../../../assets/images/shopping-basket.svg";
import creditcardicon from "../../../assets/images/credit-card.svg";
import granttcharticon from "../../../assets/images/granttchart.svg";
import starblackicon from "../../../assets/images/starblackiconimg.svg";
import checkicon from "../../../assets/images/checkicon.svg";
import crossicon from "../../../assets/images/crossiconimg.svg";
import addiconimg from "../../../assets/images/addicon.svg";
import edit_2_iconimg from "../../../assets/images/edit_2_iconimg.svg";
import fileicon from "../../../assets/images/attachfileicon.svg";
import icon_16img from "../../../assets/images/icon_16.svg";
import avataricon from "../../../assets/images/avatar_04.svg";
import thumbnail from "../../../assets/images/thumnail_1.jpg";
import avatarimg from "../../../assets/images/avatar_01.svg";
import editimgicon from "../../../assets/images/editimgicon.svg";
import deleteimgicon from "../../../assets/images/deleteimgicon.svg";
import avatar1 from "../../../assets/images/avatar_05.svg";
import avatariconimg_01 from "../../../assets/images/avatar_01.svg";
import avatariconimg_02 from "../../../assets/images/avatar_02.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import editiconimg from "../../../assets/images/editiconimg.svg";
import filepng from "../../../assets/images/file.png";


const ClientViewDetails = (props) => {
    const [dragTitleModal, setdragTitleModal] = React.useState(false);
    const history = useHistory();
    const [selectedImage1, setSelectedImage1] = useState('');
    const imageChange1 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage1(e.target.files[0]);
        }
    }
    const [selectedImage2, setSelectedImage2] = useState('');
    const imageChange2 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage2(e.target.files[0]);
        }
    }    
    const [selectedImage3, setSelectedImage3] = useState('');
    const imageChange3 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage3(e.target.files[0]);
        }
    }    
    const [selectedImage4, setSelectedImage4] = useState('');
    const imageChange4 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage4(e.target.files[0]);
        }
    }


    const [AddTask, setAddTask] = React.useState(false);
    const [EditTask, setEditTask] = React.useState(false);
    const [modalShowEditLog, setModalShowEditLog] = React.useState(false);
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    const [modalShowCreateTask, setModalShowCreateTask] = React.useState(false);
    const [modalShowTaskCategory, setModalShowTaskCategory] = React.useState(false);
    const [modalShowAddInvoice, setModalShowAddInvoice] = React.useState(false);
    const [modalShowAddLink, setModalShowAddLink] = React.useState(false);

    const [isLoading, setLoading] = useState(true);
    const [projectno, setprojectno] = useState(0);
    const [projectname, setprojectname] = useState('');
    const [projectstatus, setprojectstatus] = useState('');
    const [projectbudget, setprojectbudget] = useState('');
    const [pcurrency, setpcurrency] = useState('');
    const [hourlogged, sethourlogged] = useState(0);
    const [expenses, setexpenses] = useState(0);
    const [projectdesription, setprojectdesription] = useState('');
    const[Global,setGlobal] = useState({
        Global_Array:[]
    })
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/projects/show/'+props.match.params.id+'/'+ companyid + '/' + uid)
            .then((response) => {
                setprojectname(response.data.data.project.project_name)
                setprojectno(response.data.data.project.id)
                setprojectstatus(response.data.data.project.status)
                setprojectbudget(response.data.data.project.project_budget)
                setpcurrency(response.data.data.project.currency_id)
                sethourlogged(response.data.data.hoursLogged)
                setexpenses(response.data.data.expenses)
                setprojectdesription(response.data.data.project.feedback)
                setGlobal({ Global_Array: response.data.data.global ? response.data.data.global : [], });
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [companyid, uid])    
    // ActivityTimelineLoop_Array
    const ActivityTimelineLoop_Array = [
        {
            key: "0",
            title: "New task added to the project.",
            smalltext1: "You have an upcoming Task",
            smalltext2: "26 minutes ago",
        },
        {
            key: "1",
            title: "Follow-up with ISV on proposal-2",
            smalltext1: "You have an upcoming Task",
            smalltext2: "26 minutes ago",
        },
        {
            key: "2",
            title: "Follow-up with ISV on proposal-2",
            smalltext1: "You have an upcoming Task",
            smalltext2: "26 minutes ago",
        },
        {
            key: "3",
            title: "New task added to the project.",
            smalltext1: "You have an upcoming Task",
            smalltext2: "26 minutes ago",
        },
    ]
    // DiscussionDataLoop_Array
    const DiscussionDataLoop_Array = [
        {
            key: "0",
            avatarimg: avataricon,
            title: "Web Design",
            admintext: "Admin",
            description: "posted on 27-05-2021 04:46 PM",
            number: "1",
            name: "Design",
            badgebgcolor: "blusecolorbg",
            crossicon: crossicon,
        },
        {
            key: "1",
            avatarimg: avataricon,
            title: "Web Development",
            admintext: "Admin",
            description: "posted on 27-05-2021 04:46 PM",
            number: "1",
            name: "Design",
            badgebgcolor: "greencolorbg",
            crossicon: crossicon,
        },
    ]
    // InnerTabDataLoop_Array
    const InnerTabDataLoop_Array = [
        {
            key: "0",
            time: "51 seconds ago",
            thumbnailimg: thumbnail,
            title: "Skype_Picture.jpg",
        },
    ]


 
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const[TableData,setTableData] = useState({
        TableData_Array:[]
    })
    const MilestonesDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/milestones/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setTableData({ TableData_Array: response.data.data.milestones ? response.data.data.milestones : [], });
            setLoading(false);
        });        
    }

    const headers = [
        { name: "ID", field: "pid", sortable: false },
        { name: "Milestone Title", field: "milestone_title", sortable: true },
        { name: "Milestone Cost", field: "cost", sortable: true },
        { name: "Status", field: "status", sortable: true },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.milestone_title.toLowerCase().includes(search.toLowerCase()) ||
                    comment.status.toLowerCase().includes(search.toLowerCase()) 
                    
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);     
    //Invoices
    const[invoicesdata,setinvoicesdata] = useState({
        invoicesdata_Array:[]
    })
    const InvoicesDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/project-invoice/show/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setinvoicesdata({ invoicesdata_Array: response.data.data.invoice ? response.data.data.invoice : [], });
            setLoading(false);
        });        
    }
    // TimeLog  
    const [totalItems1, setTotalItems1] = useState(0);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [search1, setSearch1] = useState("");
    const [sorting1, setSorting1] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE1 = 10;
    const[TableData1,setTableData1] = useState({
        TableData1_Array1:[]
    })
    const TimeLogDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/project/time-log/data/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setTableData1({ TableData1_Array1: response.data.data.timeLogs ? response.data.data.timeLogs : [], });
            setLoading(false);
        });        
    }

    const headers1 = [
        { name: "ID", field: "pid", sortable: false },
        { name: "Who Loged", field: "name", sortable: true },
        { name: "Start Time", field: "start_time", sortable: true },
        { name: "End Time", field: "end_time", sortable: true },
        { name: "Total Hours", field: "hours", sortable: true },
        { name: "Memo", field: "memo", sortable: true },
        { name: "Last Updated By", field: "editor.name", sortable: true },
    ];
    const FinalTableData1 = useMemo(() => {
        let tabledata1 = TableData1.TableData1_Array1;
        // Searching
        if (search1) {
            tabledata1 = tabledata1.filter(
                comment =>
                    comment.user.name.toLowerCase().includes(search1.toLowerCase()) ||
                    comment.memo.toLowerCase().includes(search1.toLowerCase()) 
                    
            );
        }

        setTotalItems1(tabledata1.length);

        //Sorting comments
        if (sorting1.field) {
            const reversed = sorting1.order === "asc" ? 1 : -1;
            tabledata1 = tabledata1.sort(
                (a, b) =>
                    reversed * a[sorting1.field].localeCompare(b[sorting1.field])
            );
        }
        
        //Current Page slice
        return tabledata1.slice(
            (currentPage1 - 1) * ITEMS_PER_PAGE1,
            (currentPage1 - 1) * ITEMS_PER_PAGE1 + ITEMS_PER_PAGE1
        );

    }, [TableData1.TableData1_Array1, currentPage1, search1, sorting1]);   

    // Payments  
    const [totalItems2, setTotalItems2] = useState(0);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [search2, setSearch2] = useState("");
    const [sorting2, setSorting2] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE2 = 10;
    const[TableData2,setTableData2] = useState({
        TableData2_Array2:[]
    })
    const PaymentsDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/project-payments/show/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setTableData2({ TableData2_Array2: response.data.data.payments ? response.data.data.payments : [], });
            setLoading(false);
        });        
    }

    const headers2 = [
        { name: "#", field: "pid", sortable: false },
        { name: "AMOUNT", field: "name", sortable: true },
        { name: "PAID ON", field: "start_time", sortable: true },
        { name: "REMARK", field: "end_time", sortable: true },
        { name: "STATUS", field: "hours", sortable: true },
    ];
    const FinalTableData2 = useMemo(() => {
        let tabledata2 = TableData2.TableData2_Array2;
        // Searching
        if (search2) {
            tabledata2 = tabledata2.filter(
                comment =>
                    comment.user.name.toLowerCase().includes(search2.toLowerCase()) ||
                    comment.memo.toLowerCase().includes(search2.toLowerCase()) 
                    
            );
        }

        setTotalItems2(tabledata2.length);

        //Sorting comments
        if (sorting2.field) {
            const reversed = sorting2.order === "asc" ? 1 : -1;
            tabledata2 = tabledata2.sort(
                (a, b) =>
                    reversed * a[sorting2.field].localeCompare(b[sorting2.field])
            );
        }
        
        //Current Page slice
        return tabledata2.slice(
            (currentPage2 - 1) * ITEMS_PER_PAGE2,
            (currentPage2 - 1) * ITEMS_PER_PAGE2 + ITEMS_PER_PAGE2
        );

    }, [TableData2.TableData2_Array2, currentPage2, search2, sorting2]);     
    
    // Files
    const[FilesData,setFilesData] = useState({
        FilesData_Array:[]
    })
    const FileDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/project/files/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setFilesData({ FilesData_Array: response.data.data.project.files ? response.data.data.project.files : [], });
            setLoading(false);
        });        
    }    

    // Delete Files
    const DeleteFiles = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted file",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/client/files/deletefile/'+id+'/'+ companyid + '/' + uid)
                        .then(response => {
                            swal("File Delete Successfully!", {
                                icon: "success",
                            });
                        });
                        setFilesData({ FilesData_Array: FilesData.FilesData_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }    
    const submitfilesform = (e) => {
        setLoading(true);
        const data = new FormData();
        data.append('file', selectedImage1);
        data.append('file1', selectedImage2);
        data.append('file2', selectedImage3);
        data.append('file3', selectedImage4);
        data.append('project_id', props.match.params.id);
        data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/client/files/storefile/'+ companyid + '/' + uid, data).then((response) => {
            toast.success("Successfully Uploaded!");
            setLoading(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
            });
        e.preventDefault();
    }


    const[Milestonedetaildata,setMilestonedetaildata] = useState({
        Milestonedetaildata_Array:[]
    })    
    const milestonedetails = (mid) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/milestones/edit/'+mid+'/'+ companyid + '/' + uid).then((response) => {
            setLoading(false);
            setMilestonedetaildata({ Milestonedetaildata_Array: response.data.data.milestone ? response.data.data.milestone : [], });
            setdragTitleModal(true);
        });        
    }
    return (
        <>
        <ToastContainer/>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
           <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title d-flex px-0 mb-3 mb-xl-0">Project # {projectno} <p className="ml-2 mb-0 fontweightbold blusecolortext">{projectname}</p></h4>
                    <div className="btn-group ml-auto dropdown for_all">
                       <span class="badge bg-info">{projectstatus}</span>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="full_page_tabs">
                    <Tabs>
                        <TabList className="react-tabs__tab-list d-md-flex d-block justify-content-between">
                            <Tab>Over View</Tab>
                            <Tab onClick={() => MilestonesDetails()}>Milestones</Tab>
                            <Tab onClick={() => FileDetails()}>Files</Tab>
                            <Tab onClick={() => InvoicesDetails()}>Invoices</Tab>
                            <Tab onClick={() => TimeLogDetails()}>Time Logs</Tab>
                            <Tab onClick={() => PaymentsDetails()}>Payments</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="card card_dashboard cardbodycolorbg card-body mb-4">
                                <div className="whitecolorbg border-radius-15 p-3 mb-4">
                                    <ul className="list-unstyled d-md-flex d-block align-items-center justify-content-between">
                                        <li>{projectbudget == '' ? <span className="mr-2 greencolortext">--</span> : <span className="mr-2 greencolortext">{projectbudget}</span> }Project Budget</li>
                                        {/* <li><span className="mr-2 greencolortext">343</span>Earnings</li> */}
                                        <li><span className="mr-2 lightbluecolortext">{hourlogged}</span>Hours Logged</li>
                                        <li><span className="mr-2 yelowcolortext">{expenses}</span>Expenses</li>
                                    </ul>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-8 col-lg-12">
                                        <div className="card card_dashboard card-body border-radius-15">
                                            <h4 className="fontsize18 blackcolortext mb-3">{projectname}</h4>
                                            <p className="paragraphcolor1text">{projectdesription}</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12">
                                        <div className="card card_dashboard border-radius-15 overflow-hidden">
                                            <div className="card-header border-radius-0">
                                                <h4 className="fontsize18 blackcolortext">Activity Timeline</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyle panel-body activity_timeline">
                                                    {ActivityTimelineLoop_Array.map((val) => {
                                                        return (
                                                            <ActivityTimelineLoop
                                                                key={val.key}
                                                                title={val.title}
                                                                smalltext1={val.smalltext1}
                                                                smalltext2={val.smalltext2}
                                                            />
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card_dashboard card-body">
                                <div className="container-fluid p-0 mb-4">
                                    <div className="d-flex align-items-center">
                                        <h4 className="main_title">Milestones</h4>
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
                                <div className="table-sm-responsive clent_data_table">
                                    <table className="table m-0 table-hover">
                                    <TableHeader
                                                headers={headers}
                                                onSorting={(field, order) =>
                                                    setSorting({ field, order })
                                                }
                                    />
                                        <tbody>
                                            {FinalTableData.length > 0 ?  
                                                FinalTableData.map((val, index) => {
                                                    var currency = [];
                                                    currency.push(val.currency);
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>
                                                            <NavLink onClick={() => milestonedetails(val.id)} to="#" className="text_decoration_none d-flex align-items-center">
                                                                
                                                                <div>
                                                                    <h4 className="fontsize16 fontweightmeduim">{val.milestone_title}</h4>
                                                                    <p className="m-0 fontsize14 paragraphcolor1text">{val.smalltitle}</p>
                                                                </div>
                                                            </NavLink>
                                                        </td>
                                                        <td>{currency[0].currency_symbol+' '+val.cost}</td>
                                                        <td><span className={"px-3 py-1 badgegreenbg greencolortext border-radius-100 fontsize14 " + val.badgebgcolor}>{val.status}</span></td>
                                        
                                                    </tr>                                                    
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center">No Record Found</td>
                                            </tr>
                                        }    
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />   
                                {/* task categor */}
                                <MyVerticallyCenteredModalAddFllow
                                    show={modalShowAddFllow}
                                    onHide={() => setModalShowAddFllow(false)}
                                />
                                {/*  */}
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="card_dashboard card card-body">
                                <h4 className="main_title mr-3">Files</h4>
                                <Form onSubmit={submitfilesform}>
                                <div className="row mb-4">
                                    <div className="col-xl-3 col-lg-4 mb-3 mb-lg-0">
                                        <div className="border-radius-15 p-3 mt-3 bodycolorbg">
                                            <div className="file-drop-area m-0 h-200px">
                                                    {(() => {
                                                        if (selectedImage1) {
                                                            return (
                                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage1)} alt="" />
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="fake-btn">Choose files</span>
                                                            )
                                                        }
                                                    })()}
                                                
                                                <span className="file-msg"></span>
                                                <input className="file-input" name="file" onChange={imageChange1} type="file" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 mb-3 mb-lg-0">
                                        <div className="border-radius-15 p-3 mt-3 bodycolorbg">
                                            <div className="file-drop-area m-0 h-200px">
                                                    {(() => {
                                                        if (selectedImage2) {
                                                            return (
                                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage2)} alt="" />
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="fake-btn">Choose files</span>
                                                            )
                                                        }
                                                    })()}
                                                <span className="file-msg"></span>
                                                <input className="file-input" name="file" onChange={imageChange2} type="file" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 mb-3 mb-lg-0">
                                        <div className="border-radius-15 p-3 mt-3 bodycolorbg">
                                            <div className="file-drop-area m-0 h-200px">
                                                    {(() => {
                                                        if (selectedImage3) {
                                                            return (
                                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage3)} alt="" />
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="fake-btn">Choose files</span>
                                                            )
                                                        }
                                                    })()}
                                                <span className="file-msg"></span>
                                                <input className="file-input" name="file" onChange={imageChange3} type="file"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 mb-3 mb-lg-0">
                                        <div className="border-radius-15 p-3 mt-3 bodycolorbg">
                                            <div className="file-drop-area m-0 h-200px">
                                                    {(() => {
                                                        if (selectedImage4) {
                                                            return (
                                                                <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage4)} alt="" />
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="fake-btn">Choose files</span>
                                                            )
                                                        }
                                                    })()}
                                                <span className="file-msg"></span>
                                                <input className="file-input" name="file" onChange={imageChange4} type="file"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 mb-3 mt-2 mb-lg-0 text-end">
                                               <Button type="submit" className="fake-btn">Submit</Button>     
                                    </div>
                                </div>
                                </Form>
                                {/*  */}
                                <div className="innertabsfuction">
                                    <Tabs className="border_bodycolor_1">
                                        <Tab>List</Tab>
                                        <Tab>Thumbnail</Tab>
                                        <TabPanel>
                                            <div className="card_dashboard card card-body">
                                                <div className="table-sm-responsive border_bodycolor_0 clent_data_table">
                                                    <table className="table m-0 table-borderless">
                                                        <tbody>
                                                            {FilesData.FilesData_Array.length > 0 ?
                                                            FilesData.FilesData_Array.map((val,index) => {
                                                                var extension = val.file_url.split('.').pop(); 
                                                                return (
                                                                    <InnerTabDataLoop
                                                                        key={index}
                                                                        valid={val.id}
                                                                        time={val.time}
                                                                        title={val.filename}
                                                                        fileurl={val.file_url}
                                                                        DeleteFiles={DeleteFiles}
                                                                        extension={extension}
                                                                    />
                                                                )
                                                            })
                                                            :
                                                            <tr>
                                                                <td colSpan="5">You have not uploaded any file</td>
                                                            </tr>
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="card_dashboard card card-body">
                                            <div className="row mb-4"> 
                                                {FilesData.FilesData_Array.length > 0 ?
                                                    FilesData.FilesData_Array.map((val,index) => {
                                                        var extension = val.file_url.split('.').pop(); 
                                                        
                                                        return (                                                                                             
                                                                <div className="col-xl-3 col-lg-4 mb-3">
                                                                    <div className="border-radius-15 p-3 mt-3 bodycolorbg h-100">
                                                                        {extension === 'jpg' || extension === 'png' || extension === 'jpeg' ?
                                                                            <img class="img-fluid" src={val.file_url} />  
                                                                        :
                                                                            <img class="img-fluid" src={filepng} width="200" />  
                                                                        }
                                                                        <p>{val.filename}</p>
                                                                        <div className="d-flex align-items-center">
                                                                            <Nav.Link href={val.file_url} target="_blank" className="text_decoration_none border-radius-10  mr-2 btn badgelightbluebg"><img width="15" className="img-flud" src={searchicon} alt="" /></Nav.Link>
                                                                            <Nav.Link href={Globalsettings.url+"api/client/project/files/download/"+val.id+'/'+companyid+'/'+uid} target="_blank" className="text_decoration_none border-radius-10  btn mr-2 paragraphcolor3bg"><img width="15" className="img-flud" src={uploadicon} alt="" /></Nav.Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        )
                                                    })
                                                    :
                                                    <p>You have not uploaded any file</p>
                                                }   
                                            </div>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card_dashboard card card-body">
                                <div className="d-md-flex d-block align-items-center mb-4">
                                    <h4 className="main_title mb-3 mb-md-0">Invoice</h4>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive border_bodycolor_0 clent_data_table">
                                    <table className="table m-0 table-borderless">
                                        <tbody>
                                            {invoicesdata.invoicesdata_Array.map((val) => {
                                                return (
                                                    <InvoiceTabDataLoop
                                                        key={val.key}
                                                        invid={val.id}
                                                        invoicename={val.original_invoice_number}
                                                        amount={val.total}
                                                        badgetext={val.status}
                                                        badgebgcolor={val.badgebgcolor}
                                                        time={dateFormat(val.issue_date, Global.Global_Array.date_format)}
                                                    />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card_dashboard card card-body">
                                <div className="d-md-flex d-block align-items-center mb-4">
                                    <h4 className="main_title mb-3 mb-md-0">Time Logs</h4>
                                </div>
                                {/*  */}
                                <div className="d-xl-flex d-block align-items-center mb-4">
                                    <div className="ml-auto">
                                        <Search
                                            onSearch={value => {
                                                setSearch1(value);
                                                setCurrentPage1(1);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive clent_data_table">
                                    <table className="table m-0">
                                    <TableHeader
                                                headers={headers1}
                                                onSorting={(field, order) =>
                                                    setSorting({ field, order })
                                                }
                                    />
                                        <tbody>
                                        {FinalTableData1.length > 0 ?  
                                                FinalTableData1.map((val, index) => {
                                                return (
                                                    <TimeLogDataLoop
                                                        key={val.key}
                                                        countnumber={index+1}
                                                        titlename={val.user.name}
                                                        
                                                        starttime={dateFormat(val.start_time, Global.Global_Array.date_picker_format)} 
                                                        endtime={val.end_time != '' ? dateFormat(val.end_time, Global.Global_Array.date_format) : "Active"} 
                                                        hourtime={val.hours}
                                                        memoname={val.memo}
                                                        adminname={val.editor.name}
                                                    />
                                                )
                                            })
                                        :
                                            <tr>
                                                <td colSpan="12" className="text-center">No Record Found!</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    total={totalItems1}
                                    itemsPerPage={ITEMS_PER_PAGE1}
                                    currentPage={currentPage1}
                                    onPageChange={page => setCurrentPage1(page)}
                                />  
                            </div>
                        </TabPanel>
                        <TabPanel>
                        <div className="card_dashboard card card-body">
                                <div className="d-md-flex d-block align-items-center mb-4">
                                    <h4 className="main_title mb-3 mb-md-0">Payments</h4>
                                </div>
                                {/*  */}
                                <div className="d-xl-flex d-block align-items-center mb-4">
                                    <div className="ml-auto">
                                        <Search
                                            onSearch={value => {
                                                setSearch2(value);
                                                setCurrentPage2(1);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive clent_data_table">
                                    <table className="table m-0">
                                    <TableHeader
                                                headers={headers2}
                                                onSorting={(field, order) =>
                                                    setSorting2({ field, order })
                                                }
                                    />
                                        <tbody>
                                        {FinalTableData2.length > 0 ?  
                                                FinalTableData2.map((val, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>
                                                            {val.currency.currency_symbol} {val.amount} ({val.currency.currency_code})
                                                        </td>
                                                        <td>{dateFormat(val.paid_on,"dd-mm-yyyy HH:MM")}</td>
                                                        <td>{val.remarks}</td>
                                                        <td>
                                                            {val.status == 'complete' ?
                                                                <span className="px-2 py-1 border-radius-100 badgegreenbg badgegreencolor">{val.status}</span>
                                                            : 
                                                                <span className="px-2 py-1 border-radius-100 badgeyelowbg badgeyellowcolor">{val.status}</span>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            <tr>
                                                <td colSpan="12" className="text-center">No Record Found!</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    total={totalItems2}
                                    itemsPerPage={ITEMS_PER_PAGE2}
                                    currentPage={currentPage2}
                                    onPageChange={page => setCurrentPage2(page)}
                                />  
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

            <Modal  show={dragTitleModal} onHide={() => setdragTitleModal(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Milestones Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 mt-4">
                    <div className="mb-3">
                        <h4 className="fontsize16 mb-2 blackcolortext">Milestone Title</h4>
                        <p className="fontsize14 paragraphcolor1text">{Milestonedetaildata.Milestonedetaildata_Array.length > 0 && Milestonedetaildata.Milestonedetaildata_Array.milestone_title}</p>
                    </div>
                    <div className="mb-3">
                        <h4 className="fontsize16 mb-2 blackcolortext">Milestone Summary</h4>
                        <p className="fontsize14 paragraphcolor1text">{Milestonedetaildata.Milestonedetaildata_Array.length > 0 && Milestonedetaildata.Milestonedetaildata_Array.summary}</p>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-xl-6">
                            <h4 className="fontsize16 mb-2 blackcolortext">Milestone Cost</h4>
                            <p className="fontsize14 paragraphcolor1text">{Milestonedetaildata.Milestonedetaildata_Array.length > 0 && Milestonedetaildata.Milestonedetaildata_Array.currency.currency_symbol}{Milestonedetaildata.Milestonedetaildata_Array.length > 0 && Milestonedetaildata.Milestonedetaildata_Array.cost} <NavLink to={`${process.env.PUBLIC_URL}/viewdetail/`+Milestonedetaildata.Milestonedetaildata_Array.invoice_id} className="ml-2 border-radius-5 badge px-3 py-2 blusecolortext badgebluebg">View Invoice</NavLink></p>
                        </div>
                        <div className="col-xl-6">
                            <h4 className="fontsize16 mb-2 blackcolortext">Status</h4>
                            <p className="fontsize14 paragraphcolor1text"><span to="#" className=" border-radius-5 badge px-3 py-2 greencolortext badgegreenbg">{Milestonedetaildata.Milestonedetaildata_Array.length > 0 && Milestonedetaildata.Milestonedetaildata_Array.status}</span></p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setdragTitleModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>            
            {/* task categor */}
            <MyVerticallyCenteredModalEditLog
                show={modalShowEditLog}
                onHide={() => setModalShowEditLog(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalAddInvoice
                show={modalShowAddInvoice}
                onHide={() => setModalShowAddInvoice(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalShow
                show={AddTask}
                onHide={() => setAddTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalEdit
                show={EditTask}
                onHide={() => setEditTask(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalAddLink
                show={modalShowAddLink}
                onHide={() => setModalShowAddLink(false)}
            />
        </>
    )
}

export default ClientViewDetails;

// add fllow modal
function MyVerticallyCenteredModalAddFllow(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Create Milestone</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Title*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" name="" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Status*</FormLabel>
                        <Form.Control className="transparent_form h-45px" name="" as="select">
                            <option>Complete</option>
                            <option>Incomplete</option>
                        </Form.Control>
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Cost*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="number" name="" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Add Cost To Project Budget*</FormLabel>
                        <Form.Control className="transparent_form h-45px" name="" as="select">
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Summary*</FormLabel>
                        <Form.Control className="transparent_form" as="textarea" rows={4} />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// add fllow modal
function MyVerticallyCenteredModalCreateTask(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Create Milestone</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Title*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" name="" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Status*</FormLabel>
                        <Form.Control className="transparent_form h-45px" name="" as="select">
                            <option>Complete</option>
                            <option>Incomplete</option>
                        </Form.Control>
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Cost*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="number" name="" placeholder="" />
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Add Cost To Project Budget*</FormLabel>
                        <Form.Control className="transparent_form h-45px" name="" as="select">
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                    </div>
                    <div className="form-group">
                        <FormLabel className="mb-2">Milestone Summary*</FormLabel>
                        <Form.Control className="transparent_form" as="textarea" rows={4} />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// add fllow modal
function MyVerticallyCenteredModalTaskCategory(props) {
    const DataTableLoopModal_3_Array = [
        {
            key: "0",
            countnumber: "1",
            name: "DS",
            remove: "Remove",
        },
        {
            key: "1",
            countnumber: "2",
            name: "	Laravel",
            remove: "Remove",
        },
    ]
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Task Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="table-sm-responsive clent_data_table mb-4">
                        <table className="table m-0 table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataTableLoopModal_3_Array.map((val) => {
                                    return (
                                        <DataTableLoopModal_3
                                            key={val.key}
                                            countnumber={val.countnumber}
                                            name={val.name}
                                            remove={val.remove}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/*  */}
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Category Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" name="" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Save</Button>
            </Modal.Footer>
        </Modal>

        
    );
}
// Client Category modal
function MyVerticallyCenteredModalEditLog(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Update Time Logs</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Project*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Task*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Employee Name*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Start Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">End Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Start Time*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">End Time*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Total Hours*</FormLabel>
                                <p className="m-0">0 Hours 0 Minutes</p>
                            </Form.Group>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <Form.Group>
                                <FormLabel className="mb-2">Memo*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="" />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// Client Category modal
function MyVerticallyCenteredModalAddInvoice(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Add Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Currency*</FormLabel>
                                <InputGroup className="">
                                    <InputGroup.Text>xcvxvxcv#00</InputGroup.Text>
                                    <FormControl name="" type="text" value="5" className="transparent_form h-45px" />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Currency*</FormLabel>
                                <select className="form-control transparent_form h-45px">
                                    <option>$ (USD)</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Invoice Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <Form.Group>
                                <FormLabel className="mb-2">Due Date*</FormLabel>
                                <Form.Control className="transparent_form fontsize14 h-45px" type="time" placeholder="" />
                            </Form.Group>
                        </div>
                        <div className="col-lg-12">
                            <div className="table-sm-responsive clent_data_table border_bodycolor_0">
                                <div id="table" className="table-editable">
                                    <table className="table table-borderless m-0">
                                        <tr>
                                            <th>Item</th>
                                            <th>Qty/Hrs</th>
                                            <th>Unit Price</th>
                                            <th>Tax</th>
                                            <th>Amount</th>
                                            <th data-attr-ignore>Remove</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Form.Control name="" className="transparent_form fontsize14 h-40px" type="text" placeholder="" />
                                            </td>
                                            <td><Form.Control name="" className="transparent_form fontsize14 h-40px" type="number" placeholder="" /></td>
                                            <td ><Form.Control name="" className="transparent_form fontsize14 h-40px" type="text" placeholder="" /></td>
                                            <td>
                                                <select className="form-control transparent_form h-40px">
                                                    <option>$ (USD)</option>
                                                    <option>20</option>
                                                    <option>30</option>
                                                </select>
                                            </td>
                                            <td>0</td>
                                            <td>
                                                <NavLink to="#" className="border-radius-10 d-inline-block badgeredbg p-3" ><img width="10" className="img-fluid" src={crossicon} alt="" /></NavLink>
                                            </td>
                                        </tr>
                                    </table>
                                    <Button type="button" variant="" className="table-add w-100px btn btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Add Item</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// task category modal
function MyVerticallyCenteredModalShow(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-3 mb-lg-0">
                            <FormLabel className="mb-2">Project</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Title</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="email" placeholder="title" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Make Private" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Billable" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Set time estimate" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-6 mb-4">
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-0">
                                    <Form.Check className="fontsize14 fontweightregular" inline label="Task is dependent on another task" type={type} id={`inline-${type}-1`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <FormLabel className="mb-2">Start Date*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="date" placeholder="" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <FormLabel className="mb-2">Due Date*</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="" placeholder="" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <FormLabel className="mb-2">Assigned To</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" placeholder="Choose Assignee" />
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Status</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-3">
                            <FormLabel className="mb-2">Task Category</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-3">
                            <div className="p-3 border-radius-15 bodycolorbg">
                                <div className="file-drop-area">
                                    <span className="fake-btn">Choose files</span>
                                    <span className="file-msg">Drop files here OR click to upload</span>
                                    <input className="file-input" name="getFile[]" type="file" multiple="" required="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal >
    );
}
// Edit task modal
function MyVerticallyCenteredModalEdit(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Update Task Status</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="mb-3">
                        <FormLabel className="mb-2">Column Name</FormLabel>
                        <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="Completed" />
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-3 mb-lg-0">
                            <FormLabel className="mb-2">Label Color</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" type="text" name="" placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <FormLabel className="mb-2">Position</FormLabel>
                            <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// add fllow modal
function MyVerticallyCenteredModalAddLink(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Task Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group mb-4">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="text" name="" placeholder="" />
                    </div>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Add file link</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="text" name="" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Save</Button>
            </Modal.Footer>
        </Modal>
    );
}