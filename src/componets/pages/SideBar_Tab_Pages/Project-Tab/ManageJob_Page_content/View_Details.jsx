import React,{useState,useEffect,useMemo} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { Editor, editorState } from "react-draft-wysiwyg";
import { Form, Button, Row, Table, Col, FormLabel, Modal, FormControl, InputGroup, Card,Badge,Nav } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import dateFormat from 'dateformat';
import { Pie, Bar } from 'react-chartjs-2';
import { FrappeGantt } from 'frappe-gantt-react';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 

import MembersPanelLoop from "../../Project-Tab/ManageJob_Page_content/MembersPanelLoop";
import MembersPanelLoop_Array from "../../Project-Tab/ManageJob_Page_content/MembersPanelLoop_Array";
import MilestonesPanelLoop from "../../Project-Tab/ManageJob_Page_content/MilestonesPanelLoop";
import MilestonesPanelLoop_Array from "../../Project-Tab/ManageJob_Page_content/MilestonesPanelLoop_Array";
import Task_Content from "../../Project-Tab/ManageJob_Page_content/TaskContent";
import Task_Content_Array from "../../Project-Tab/ManageJob_Page_content/TaskContentArray";

import DiscussionDataLoop from "../../Project-Tab/ManageJob_Page_content/DiscussionDataLoop";
import DiscussionDataLoop_Array from "../../Project-Tab/ManageJob_Page_content/DiscussionDataLoop_Array";
import TimeLogDataLoop from "../../Project-Tab/ManageJob_Page_content/TimeLogDataLoop";
import TimeLogDataLoop_Array from "../../Project-Tab/ManageJob_Page_content/TimeLogDataLoop_Array";

import InvoiceTabDataLoop from "../../Project-Tab/ManageJob_Page_content/InvoiceTabDataLoop";
import InvoiceTabDataLoop_Array from "../../Project-Tab/ManageJob_Page_content/InvoiceTabDataLoop_Array";
import InnerTabDataLoop from "../../Project-Tab/ManageJob_Page_content/InnerTabDataLoop";
import InnerTabDataLoop_Array from "../../Project-Tab/ManageJob_Page_content/InnerTabDataLoop_Array";
import ActivityTimelineLoop from "../../Project-Tab/ManageJob_Page_content/ActivityTimelineLoop";
import ActivityTimelineLoop_Array from "../../Project-Tab/ManageJob_Page_content/ActivityTimelineLoop_Array";
import OverviewDesriptionLoop from "../../Project-Tab/ManageJob_Page_content/OverviewDesriptionLoop";
import OverviewDesriptionLoop_Array from "../../Project-Tab/ManageJob_Page_content/OverviewDesriptionLoop_Array";
import OnGoing_Content from "../../Project-Tab/TaskBoard_Page_content/OnGoingContent";
import OnGoing_Content_Array from "../../Project-Tab/TaskBoard_Page_content/OnGoingContentArray";
import Inprogress_Content from "../../Project-Tab/TaskBoard_Page_content/InprogressContent";
import Inprogress_Content_Array from "../../Project-Tab/TaskBoard_Page_content/InprogressContentArray";
import InReview_Content from "../../Project-Tab/TaskBoard_Page_content/InReviewContent";
import InReview_Content_Array from "../../Project-Tab/TaskBoard_Page_content/InReviewContentArray";
import Completed_Content from "../../Project-Tab/TaskBoard_Page_content/CompletedContent";
import Completed_Content_Array from "../../Project-Tab/TaskBoard_Page_content/CompletedContentArray";

// 
import searchicon from "../../../../../assets/images/searchiconseablue.svg";
import uploadicon from "../../../../../assets/images/uploadicon.svg";
import filepng from "../../../../../assets/images/file.png";
import chaticon from "../../../../../assets/images/chaticon.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import arrowdown from "../../../../../assets/images/arrowdown.svg";
import exporticon from "../../../../../assets/images/edit_4_iconimg.svg";
import barsicon from "../../../../../assets/images/dotoption.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import blackplusicon from "../../../../../assets/images/plusblackicon.svg";
import graphicon from "../../../../../assets/images/graph.svg";
import shoppingbasketicon from "../../../../../assets/images/shopping-basket.svg";
import creditcardicon from "../../../../../assets/images/credit-card.svg";
import granttcharticon from "../../../../../assets/images/granttchart.svg";
import starblackicon from "../../../../../assets/images/starblackiconimg.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";
import crossicon from "../../../../../assets/images/crossiconimg.svg";
import addiconimg from "../../../../../assets/images/addicon.svg";
import edit_2_iconimg from "../../../../../assets/images/edit_2_iconimg.svg";
import fileicon from "../../../../../assets/images/attachfileicon.svg";
import icon_16img from "../../../../../assets/images/icon_16.svg";
import editimgicon from "../../../../../assets/images/editimgicon.svg";
import deleteimgicon from "../../../../../assets/images/deleteimgicon.svg";
const View_Details = (props) => {
    // MilestonesTSCLoopArray
    const MilestonesTSCLoopArray = [
        {
            key: "0",
            title: "loop",
            badgebg: "green_bg_color",
            statustext: "Active",
            cost: "20$",
        },
    ];
    // Doughnut
    const piedata = {
        labels: ['Won'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19],
                backgroundColor: [
                    'rgb(0, 163, 137)',
                ],
                borderWidth: 0,
            },
        ],
    };
    // bardata
    const bardata = {
        labels: ['JAN', 'FED', 'Mar'],
        datasets: [
            {
                label: 'Won',
                data: [15, 5, 20],
                backgroundColor: 'rgb(88, 215, 255)',
            },
        ],
    };
    // bardata1
    const bardata1 = {
        labels: ['JAN', 'FED', ''],
        datasets: [
            {
                label: 'Won',
                data: [12, 5, 20, 25],
                backgroundColor: 'rgb(53, 70, 171)',
            },
        ],
    };
    var counter1 = -1;
    var counter4 = -1;
    const [memberforassign, setmemberforassign] = useState('');
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

    const [tabIndex, setTabIndex] = useState(0);


    const history = useHistory();
    const[Global,setGlobal] = useState({
        Global_Array:[]
    })
    var projectid = props.match.params.id;
    const [AddTask, setAddTask] = React.useState(false);
    const [EditTask, setEditTask] = React.useState(false);
    const [modalShowDiscussion, setmodalShowDiscussion] = React.useState(false);
    const [modalShowEditLog, setModalShowEditLog] = React.useState(false);
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    const [modalShowCreateTask, setModalShowCreateTask] = React.useState(false);
    const [modalShowTaskCategory, setModalShowTaskCategory] = React.useState(false);
    const [modalShowAddMileStone, setmodalShowAddMileStone] = React.useState(false);
    const [modalShowAddMileStoneEdit, setmodalShowAddMileStoneEdit] = React.useState(false);
    const [modalShowAddLink, setModalShowAddLink] = React.useState(false);

    const [isLoading, setLoading] = useState(true);
    const [projectno, setprojectno] = useState(0);
    const [pcurrency_id, setpcurrency_id] = useState('');
    const [projectname, setprojectname] = useState('');
    const [pstartdate, setpstartdate] = useState('');
    const [penddate, setpenddate] = useState('');
    const [projectstatus, setprojectstatus] = useState('');
    const [projectbudget, setprojectbudget] = useState('');
    const [clientname, setclientname] = useState('');
    const [clientemail, setclientemail] = useState('');
    const [pcurrency, setpcurrency] = useState('');
    const [hourlogged, sethourlogged] = useState(0);
    const [expenses, setexpenses] = useState(0);
    const [projectdesription, setprojectdesription] = useState('');
    const [projectnote, setprojectnote] = useState('');
    
    const [activities, setactivities] = useState({
        activities_Array: []
    });
    const [members, setmembers] = useState({
        members_Array: []
    });
    const [availmembers, setavailmembers] = useState({
        availmembers_Array: []
    });
    const [userdata, setuserdata] = useState({
        userdata_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/projects/show/'+ companyid + '/' + uid+'/'+props.match.params.id)
            .then((response) => {
                setprojectname(response.data.data.project.project_name)
                setprojectno(response.data.data.project.id)
                setpcurrency_id(response.data.data.project.currency_id)
                setprojectstatus(response.data.data.project.status)
                setprojectbudget(response.data.data.project.project_budget)
                setpcurrency(response.data.data.project.currency_id)
                sethourlogged(response.data.data.hoursLogged)
                setexpenses(response.data.data.expenses)
                setprojectdesription(response.data.data.project.project_summary)
                setprojectnote(response.data.data.project.notes)
                setpstartdate(response.data.data.project.start_date)
                setpenddate(response.data.data.project.deadline)
                setclientemail(response.data.data.project.deadline)
                setclientname(response.data.data.project.deadline)
                setactivities({ activities_Array: response.data.data.activities ? response.data.data.activities : [], });
                setmembers({ members_Array: response.data.data.projectmember ? response.data.data.projectmember : [], });
                setavailmembers({ availmembers_Array: response.data.data.employees ? response.data.data.employees : [], });
                setLoading(false);
                if(props.location.pathname === '/projects/reactworkiz/view_details/'+props.match.params.id+'/gantt'){
                    setTabIndex(8);
                }
                if(props.location.pathname === '/projects/reactworkiz/view_details/'+props.match.params.id+'/member'){
                    setTabIndex(1);
                }
            }) 
            .catch((error) => {
                //history.push('/signin');
            });
    }, []);  
    const updatestatus = (status) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/projects/updateStatus/'+props.match.params.id,{
            status : status
        })
        .then((response) => {
            setLoading(false);
            toast.success("Project Status Successfully Updated");
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
        }) 
        .catch((error) => {
            setLoading(false);
            toast.error("went wrong!")
        });        
    }  
  // Files
  const[FilesData,setFilesData] = useState({
    FilesData_Array:[]
})
const FileDetails = () => {
    setLoading(true);
    axios.get(Globalsettings.url + 'api/admin/files/'+ companyid + '/' + uid+'/'+props.match.params.id)
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
                axios.get(Globalsettings.url + 'api/member/files/deletefile/'+id+'/'+ companyid + '/' + uid)
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
    axios.post(Globalsettings.url + 'api/admin/files/storefile/'+ companyid + '/' + uid, data).then((response) => {
        toast.success("Successfully Uploaded!");
        setLoading(false);
        setTimeout(() => { 
            window.location.reload();
        }, 3000);

        });
    e.preventDefault();
}    

//
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
        axios.get(Globalsettings.url + 'api/member/project/time-log/data/'+props.match.params.id+'/'+ companyid + '/' + uid)
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

    // Discussion  
    const [totalItems2, setTotalItems2] = useState(0);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [search2, setSearch2] = useState("");
    const [sorting2, setSorting2] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE2 = 10;
    const[TableData2,setTableData2] = useState({
        TableData2_Array2:[]
    })
    const[discussionCategories,setdiscussionCategories] = useState({
        discussionCategories_Array:[]
    })
    const DiscussionDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/member/projects/discussion/'+props.match.params.id+'/'+ companyid + '/' + uid)
        .then((response) => {
            setTableData2({ TableData2_Array2: response.data.data.discussion ? response.data.data.discussion : [], });
            setdiscussionCategories({ discussionCategories_Array: response.data.data.discussionCategories ? response.data.data.discussionCategories : [], });
            setLoading(false);
        });        
    }


    const FinalTableData2 = useMemo(() => {
        let tabledata2 = TableData2.TableData2_Array2;
        // Searching
        if (search2) {
            tabledata2 = tabledata2.filter(
                comment =>
                    comment.title.toLowerCase().includes(search2.toLowerCase())
                    
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
    const[discussioncat, setdiscussioncat] = useState('');
    const[titlediscuss, settitlediscuss] = useState('');
    const[descdiscuss, setdescdiscuss] = useState('');
    const MakeNewDiscussion = () => {
        setmodalShowDiscussion(true);
    }
    const newdiscussionsubmit = (evt) =>{
        setLoading(true);
        setmodalShowDiscussion(false);
        axios.post(Globalsettings.url + 'api/member/discussion/create/'+ companyid+'/'+uid, {
            companyid_id: companyid,
            userid: uid,
            project_id: props.match.params.id,
            discussion_category_id: discussioncat,
            title: titlediscuss,
            description: descdiscuss
        }).then((response) => {
            toast.success("New Dicussion successfully created.");
            setdiscussioncat('');
            settitlediscuss('');
            setdescdiscuss('');
            axios.get(Globalsettings.url + 'api/member/projects/discussion/'+props.match.params.id+'/'+ companyid + '/' + uid)
            .then((response) => {
                setTableData2({ TableData2_Array2: response.data.data.discussion ? response.data.data.discussion : [], });
                setdiscussionCategories({ discussionCategories_Array: response.data.data.discussionCategories ? response.data.data.discussionCategories : [], });
                setLoading(false);
            });  
        })
        .catch((error) => {
            setLoading(true);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    } 

    // Gantt Chart
    const [mode, setmode] = useState('Month');
    const[tasks,settasks] = useState({
        tasks_Array:[{"id":"2","name":"Octagon","start":"2021-04-24","end":"2021-04-30","duration":6,"progress":0,"dependencies":""}]
    })
    const GanttChartDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/projects/gantt/'+ companyid + '/' + uid+'/'+props.match.params.id)
        .then((response) => {
            settasks({ tasks_Array: response.data.data ? response.data.data : [], });
            setLoading(false);
        });   
           
    }  

    //Task
    const [totalItems3, setTotalItems3] = useState(0);
    const [currentPage3, setCurrentPage3] = useState(1);
    const [search3, setSearch3] = useState("");
    const [sorting3, setSorting3] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE3 = 10;
    const[TableData3,setTableData3] = useState({
        TableData3_Array3:[]
    })
    const TaskDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/member/task/all-tasks/data/1/'+props.match.params.id+'/' + companyid+'/'+uid)
        .then((response) => {
            setTableData3({ TableData3_Array3: response.data.data.tasks ? response.data.data.tasks : [], });
            setLoading(false);
        });     
    }

    const headers3 = [
        { name: "Sr No", field: "id", sortable: false },
        { name: "Task", field: "heading", sortable: true },
        { name: "Project", field: "project_name", sortable: true },
        { name: "Assign to", field: "amount", sortable: false },
        { name: "Due Date", field: "start_date", sortable: false },
    ];
    const FinalTableData3 = useMemo(() => {
        let tabledata3 = TableData3.TableData3_Array3;
        // Searching
        if (search3) {
            tabledata3 = tabledata3.filter(
                comment =>
                    comment.project_name.toLowerCase().includes(search3.toLowerCase()) ||
                    comment.heading.toLowerCase().includes(search3.toLowerCase()) 
                    
            );
        }

        setTotalItems3(tabledata3.length);

        //Sorting comments
        if (sorting3.field) {
            const reversed = sorting3.order === "asc" ? 1 : -1;
            tabledata3 = tabledata3.sort(
                (a, b) =>
                    reversed * a[sorting3.field].localeCompare(b[sorting3.field])
            );
        }
        
        //Current Page slice
        return tabledata3.slice(
            (currentPage3 - 1) * ITEMS_PER_PAGE3,
            (currentPage3 - 1) * ITEMS_PER_PAGE3 + ITEMS_PER_PAGE3
        );

    }, [TableData3.TableData3_Array3, currentPage3, search3, sorting3]); 


    const SubmitMember = (evt) => {
        evt.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('user_id', memberforassign);
        data.append('project_id', props.match.params.id);
        axios.post(Globalsettings.url + 'api/admin/projects/project-members/store', data).then((response) => {
            toast.success("Member Added Successfully!");
            setLoading(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000);
    
            });
        
    } 


    // MileStones
    const [totalItems4, setTotalItems4] = useState(0);
    const [currentPage4, setCurrentPage4] = useState(1);
    const [search4, setSearch4] = useState("");
    const [sorting4, setSorting4] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE4 = 10;
    const[TableData4,setTableData4] = useState({
        TableData4_Array4:[]
    })
    const MileStoneDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/projects/milestones/'+props.match.params.id+'/' + companyid+'/'+uid)
        .then((response) => {
            setTableData4({ TableData4_Array4: response.data.data.milestones ? response.data.data.milestones : [], });
            setLoading(false);
        });     
    }

    const headers4 = [
        { name: "Sr No", field: "sr", sortable: false },
        { name: "Milestone Title", field: "milestone_title", sortable: true },
        { name: "Milestone Cost", field: "cost", sortable: true },
        { name: "Status", field: "status", sortable: false },
        { name: "Action", field: "start_date", sortable: false },
    ];
    const FinalTableData4 = useMemo(() => {
        let tabledata4 = TableData4.TableData4_Array4;
        // Searching
        if (search4) {
            tabledata4 = tabledata4.filter(
                comment =>
                    comment.milestone_title.toLowerCase().includes(search4.toLowerCase()) ||
                    comment.cost.toLowerCase().includes(search4.toLowerCase()) ||
                    comment.status.toLowerCase().includes(search4.toLowerCase()) 
                    
            );
        }

        setTotalItems4(tabledata4.length);

        //Sorting comments
        if (sorting4.field) {
            const reversed = sorting4.order === "asc" ? 1 : -1;
            tabledata4 = tabledata4.sort(
                (a, b) =>
                    reversed * a[sorting4.field].localeCompare(b[sorting4.field])
            );
        }
        
        //Current Page slice
        return tabledata4.slice(
            (currentPage4 - 1) * ITEMS_PER_PAGE4,
            (currentPage4 - 1) * ITEMS_PER_PAGE4 + ITEMS_PER_PAGE4
        );

    }, [TableData4.TableData4_Array4, currentPage4, search4, sorting4]); 


    const modalShowAddMileStoneopen = () => {
        setmodalShowAddMileStone(true);
    }
    const[milestone_title, setmilestone_title] = useState('');
    const[cost, setcost] = useState('');
    const[add_to_budget, setadd_to_budget] = useState('');
    const[summary, setsummary] = useState('');
    const[status, setstatus] = useState('');
    const submitmilestone = (evt) => {
        evt.preventDefault();
        setLoading(true);
        setmodalShowAddMileStone(false);
        const data = new FormData();
        data.append('milestone_title', milestone_title);
        data.append('cost', cost);
        data.append('summary', summary);
        data.append('currency_id', pcurrency_id);
        data.append('project_id', props.match.params.id);
        data.append('add_to_budget', add_to_budget);
        data.append('status', status);
        axios.post(Globalsettings.url + 'api/admin/projects/milestones/store/'+props.match.params.id+'/' + companyid+'/'+uid, data).then((response) => {
            toast.success("Project MileStone Added Successfully!");
            axios.get(Globalsettings.url + 'api/admin/projects/milestones/'+props.match.params.id+'/' + companyid+'/'+uid)
                .then((response) => {
                    setTableData4({ TableData4_Array4: response.data.data.milestones ? response.data.data.milestones : [], });
                    setLoading(false);
                });  
            });
        
    } 

    const[milestone_id, setmilestone_id] = useState('');
    const[milestone_titleu, setmilestone_titleu] = useState('');
    const[costu, setcostu] = useState('');
    const[summaryu, setsummaryu] = useState('');
    const[statusu, setstatusu] = useState('');
    const EditMileStone = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/projects/milestones/edit/'+id+'/' + companyid+'/'+uid)
        .then((response) => {
            
            setmilestone_id(response.data.data.milestone.id);
            setmilestone_titleu(response.data.data.milestone.milestone_title);
            setstatusu(response.data.data.milestone.status);
            setsummaryu(response.data.data.milestone.summary);
            setcostu(response.data.data.milestone.cost);
            setLoading(false);
            setmodalShowAddMileStoneEdit(true);
        });  
    }

    const submitmilestoneupdate = (evt) => {
        evt.preventDefault();
        setLoading(true);
        setmodalShowAddMileStoneEdit(false);
        const data = new FormData();
        data.append('milestone_title', milestone_titleu);
        data.append('cost', costu);
        data.append('summary', summaryu);
        data.append('currency_id', pcurrency_id);
        data.append('project_id', props.match.params.id);
        data.append('status', statusu);
        axios.post(Globalsettings.url + 'api/admin/projects/milestones/update/'+milestone_id+'/' + companyid+'/'+uid, data).then((response) => {
            toast.success("Project MileStone Updated Successfully!");
            axios.get(Globalsettings.url + 'api/admin/projects/milestones/'+props.match.params.id+'/' + companyid+'/'+uid)
                .then((response) => {
                    setTableData4({ TableData4_Array4: response.data.data.milestones ? response.data.data.milestones : [], });
                    setLoading(false);
                });  
            });
        
    } 


    
// Delete Milestone
const DeleteMilestone = (id) => {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted milestone",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios.get(Globalsettings.url + 'api/admin/projects/milestones/destroy/'+id)
                    .then(response => {
                        swal("Milestone Delete Successfully!", {
                            icon: "success",
                        });
                    });
                    setTableData4({ TableData4_Array4: TableData4.TableData4_Array4.filter(item => item.id !== id) });
            } else {
            }
        });
}  
    return (
        <>
            <ToastContainer/>
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                <h4 className="main_title d-flex px-0 mb-3 mb-xl-0">Project # {projectno} <p className="ml-2 mb-0 fontweightbold blusecolortext">{projectname}</p></h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to="/add_payment" className="btn btn_blue mr-3"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Payment</NavLink>
                        <NavLink to="#" className="btn mr-3 bg-white blackcolortext btn_white fontsize14" data-bs-toggle="dropdown">{projectstatus} <img width="15" className="img-fluid ml-2" src={arrowdown} alt="" /> </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" onClick={(e) => updatestatus('in progress')} className="dropdown-item">In Progress <span className="px-2 ml-2 blusecolorbg border-radius-5">&nbsp;</span></NavLink>
                            <NavLink to="#" onClick={(e) => updatestatus('on hold')} className="dropdown-item">On Hold <span className="px-2 ml-2 yelowcolorbg border-radius-5">&nbsp;</span></NavLink>
                            <NavLink to="#" onClick={(e) => updatestatus('not started')} className="dropdown-item">Not Started <span className="px-2 ml-2 yelowcolorbg border-radius-5">&nbsp;</span></NavLink>
                            <NavLink to="#" onClick={(e) => updatestatus('canceled')} className="dropdown-item">Cenceled <span className="px-2 ml-2 redcolorbg border-radius-5">&nbsp;</span></NavLink>
                            <NavLink to="#" onClick={(e) => updatestatus('finished')} className="dropdown-item">Finished <span className="px-2 ml-2 greencolorbg border-radius-5">&nbsp;</span></NavLink>
                        </ul>
                        <NavLink to={`${process.env.PUBLIC_URL}/edit/`+projectid} className="btn lightbluecolorbg whitecolortext fontsize14"><img className="img-fluid mr-1" src={exporticon} alt="" /> Edit </NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="full_page_tabs">
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <TabList className="react-tabs__tab-list d-flex justify-content-between">
                            <Tab>Over View</Tab>
                            <Tab>Members</Tab>
                            <Tab onClick={() => MileStoneDetails()}>Milestones</Tab>
                            <Tab  onClick={() => TaskDetails()}>Tasks</Tab>
                            <Tab onClick={() => FileDetails()}>Files</Tab>
                            <Tab onClick={() => TimeLogDetails()}>Time Logs</Tab>
                            <Tab>Invoices</Tab>
                            <Tab onClick={() => DiscussionDetails()}>Discussion</Tab>
                            <Tab onClick={() => GanttChartDetails()}>Gantt Chart</Tab>
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
                                        <div className="card card_dashboard card-body border-radius-15 mb-4">
                                            <h4 className="fontsize18 blackcolortext mb-3">{projectname}</h4>
                                            <p className="paragraphcolor1text">{projectdesription}</p>
                                        </div>
                                        <Row>
                                            <Col xxl={6} xl={6} className="col-12 mb-3 mb-lg-0">
                                                <Card className='border-radius-15 h-100'>
                                                    <Card.Body>
                                                        <div className='d-lg-flex align-items-center justify-content-between'>
                                                            <div>
                                                                <h4 className='fontsize14 blackcolortext fontweightbold'>Start Date</h4>
                                                                <p className='m-0'>{pstartdate}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className='fontsize14 blackcolortext fontweightbold'>End Date</h4>
                                                                <p className='m-0'>{penddate}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <h4 className='fontsize18 blackcolortext fontweightbold'>Client Details</h4>
                                                        <div className='d-lg-flex align-items-center justify-content-between'>
                                                            <div>
                                                                <h4 className='fontsize14 blackcolortext fontweightbold'>Client Name</h4>
                                                                <p className='m-0'>{clientname}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className='fontsize14 blackcolortext fontweightbold'>Client Email</h4>
                                                                <p classname='m-0'>{clientemail}</p>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xxl={6} xl={6} className="col-12">
                                                <Card className='border-radius-15 h-100'>
                                                    <Card.Header className='blackcolortext fontweightbold'>Milestones</Card.Header>
                                                    <Card.Body>
                                                        {MilestonesTSCLoopArray.length > 0 ?
                                                            <Table responsive={'sm'}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Title </th>
                                                                        <th>Status </th>
                                                                        <th>Cost </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {MilestonesTSCLoopArray.map((val) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{val.title}</td>
                                                                                <td><Badge bg={''} className={"px-2 py-1 " + val.badgebg}>{val.statustext}</Badge></td>
                                                                                <td>{val.cost}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </Table> :
                                                            <p className='m-0 text-center paragraph_blue_text_color'>No record found.</p>}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>                                        
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
                                <Row className="">
                                    <div className="col-xl-4 col-lg-12">
                                        <Card className="whitecolorbg border-radius-15 overflow-hidden h-100">
                                            <Card.Header className="border-radius-0">Task</Card.Header>
                                            <Card.Body className="text-center">
                                                <Pie className="data1 mx-auto" style={{ maxHeight: "250px", minHeight: "250px", maxWidth: "250px", minWidth: "250px" }} data={piedata} />
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col-xl-4 col-lg-12">
                                        <Card className="whitecolorbg border-radius-15 overflow-hidden h-100">
                                            <Card.Header className="border-radius-0">Earnings</Card.Header>
                                            <Card.Body className="">
                                                {/* style={{ minHeight: "100%", height: "100%", objectFit: "cover", }} */}
                                                <Bar data={bardata} />
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col-xl-4 col-lg-12">
                                        <Card className="whitecolorbg border-radius-15 overflow-hidden h-100">
                                            <Card.Header className="border-radius-0">Time Logs</Card.Header>
                                            <Card.Body className="">
                                                <Bar data={bardata1} />
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Row>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card-body">
                                <Form onSubmit={SubmitMember} className="mb-4">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-12">
                                            <div className="form-group">
                                                <FormLabel className="mb-2">Add Project Members</FormLabel>
                                                <Form.Control className="transparent_form h-45px" as="select" required value={memberforassign} onChange={(e) => setmemberforassign(e.target.value)}>
                                                    <option value="">Choose Members</option>
                                                    {availmembers.availmembers_Array.length > 0 &&
                                                        availmembers.availmembers_Array.map((val) =>{
                                                            return(
                                                                 <option value={val.id}>{val.name}</option>   
                                                            );
                                                        })
                                                    }
                                                </Form.Control>
                                                <div className="btn-group mt-4">
                                                    <Button variant="" type="submit" className="w-100px btn btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                {/*  */}
                                <div className="table-sm-responsive clent_data_table">
                                        <table className="table m-0 table-hover">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Member Image</th>
                                                    <th scope="col">Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {members.members_Array.length > 0 ?
                                                members.members_Array.map((val,index) => {
                                                    
                                                    // axios.get(Globalsettings.url + 'api/member/project-members/userdetails/'+companyid+'/'+val.id)
                                                    // .then((response) => {
                                                        
                                                    //     setuserdata({ userdata_Array: response.data.data ? response.data.data : [], }); 
                                                    // }); 
                                                    return(
                                                        <tr>
                                                            <td>
                                                                <NavLink to="#" className="text_decoration_none d-flex align-items-center">
                                                                    <img src={val.user.image_url} className="img-fluid mr-3 avatar" alt="" />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <h4 className="fontsize16 fontweightmeduim">{val.user.name}</h4>
                                                                    <p className="m-0 fontsize14 paragraphcolor1text">{val.user.user_other_role}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="2" className='text-center'>No Member Yet!</td>
                                                </tr> 
                                            }                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card-body">
                                <div className="container-fluid p-0 mb-4">
                                    <div className="d-flex align-items-center">
                                        <h4 className="main_title">Milestones</h4>
                                        <div className="btn-group ml-auto dropdown for_all">
                                            <NavLink onClick={() => modalShowAddMileStoneopen()} to="#" className="btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" />Create Milestones</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="d-flex align-items-center mb-4">
                                    <div className="ml-auto">
                                        <Search
                                            onSearch={value => {
                                                setSearch4(value);
                                                setCurrentPage4(1);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive clent_data_table">
                                    <table className="table m-0 table-hover">
                                        <TableHeader
                                            headers={headers4}
                                            onSorting={(field, order) =>
                                                setSorting4({ field, order })
                                            }
                                        />
                                        <tbody>
                                        {FinalTableData4.length > 0 ?
                                            FinalTableData4.map((val,index) => {
                                                counter4=counter4+1;
                                                let bgclasss = val.status == 'complete' ? "badgegreenbg greencolortext" : "badgeredbg redcolortext";
                                                return (
                                                    <tr key={index}>
                                                        <td>{(currentPage4*10 - 10)+parseInt(counter4)+parseInt(1)}</td>
                                                        <td>{val.milestone_title}</td>
                                                        <td>{val.currency.currency_symbol+''+val.cost}</td>
                                                        <td><span className={"px-3 py-1 border-radius-100 fontsize14 " + bgclasss}>{val.status}</span></td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <Button onClick={() => EditMileStone(val.id)} variant="" type="button" className={"badgelightbluebg w-40px h-40px border-radius-5 mr-2 " + props.buttonbg1}><img src={editimgicon} className="img-fluid" alt="" /></Button>
                                                                <Button onClick={() => DeleteMilestone(val.id)} variant="" type="button" className={"badgeredbg w-40px h-40px border-radius-5 " + props.buttonbg2}><img src={deleteimgicon} className="img-fluid" alt="" /></Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6" className="text-center">No Record Found!</td>
                                            </tr>
                                        }    
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    total={totalItems4}
                                    itemsPerPage={ITEMS_PER_PAGE4}
                                    currentPage={currentPage4}
                                    onPageChange={page => setCurrentPage4(page)}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card-body">
                                <div className="container-fluid p-0 mb-4">
                                    <div className="d-flex align-items-center">
                                        <h4 className="main_title">Task</h4>
                                        <div className="btn-group ml-auto dropdown for_all">
                                            <NavLink to={`${process.env.PUBLIC_URL}/add_new_task`} className="btn btn_blue mr-2"><img className="img-fluid mr-2" src={plusicon} alt="" />New Task</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="d-flex align-items-center mb-4">
                                    <div className="ml-auto">
                                        <Search
                                            onSearch={value => {
                                                setSearch3(value);
                                                setCurrentPage3(1);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0">
                        <TableHeader
                                        headers={headers3}
                                        onSorting={(field, order) =>
                                            setSorting3({ field, order })
                                        }
                        />
                        <tbody>
                        {FinalTableData3.length > 0 ?
                                    FinalTableData3.map((val,index) => {
                                        counter1=counter1+1;
                                                return (
                                                    <tr className="mb-2">
                                                        <td>{(currentPage3*10 - 10)+parseInt(counter1)+parseInt(1)}</td>
                                                        <td>
                                                            {val.heading}
                                                            {val.is_private == 1 && 
                                                                <span style={{color:"#ea4c89"}}> (Private)</span>
                                                            }
                                                        </td>
                                                        <td><NavLink to={`${process.env.PUBLIC_URL}/view_projectdetails/`+val.project_id}>{val.project_name}</NavLink></td>
                                                        <td>
                                                            {val.users.map((vals)=>{
                                                                return(
                                                                    <NavLink to="#" className="d-flex align-items-center">
                                                                        <div className="avatar mr-2"><img className="img-fluid" src={vals.image_url} alt="" /></div>
                                                                        <span>{vals.name}</span>
                                                                    </NavLink>
                                                                )
                                                            })}
                                                        </td>
                                                        <td>{dateFormat(val.due_date,Global.Global_Array.date_format)}</td>
                                                    </tr>   
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="7" className="text-center">No Record Found!</td>
                                            </tr>
                                        }                            
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                                total={totalItems3}
                                                itemsPerPage={ITEMS_PER_PAGE3}
                                                currentPage={currentPage3}
                                                onPageChange={page => setCurrentPage3(page)}
                                />
                                {/* task categor */}
                                <MyVerticallyCenteredModalCreateTask
                                    show={modalShowCreateTask}
                                    onHide={() => setModalShowCreateTask(false)}
                                />
                                {/* task categor */}
                                <MyVerticallyCenteredModalTaskCategory
                                    show={modalShowTaskCategory}
                                    onHide={() => setModalShowTaskCategory(false)}
                                />
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
                                                                            <Nav.Link href={val.file_url} target="_blank" className="text_decoration_none border-radius-10 d-flex align-items-center justify-content-center mr-2 btn badgelightbluebg"><img width="15" className="img-flud" src={searchicon} alt="" /></Nav.Link>
                                                                            <Nav.Link href={Globalsettings.url+"api/member/project/files/download/"+val.id+'/'+companyid+'/'+uid} target="_blank" className="text_decoration_none border-radius-10  btn mr-2 paragraphcolor3bg"><img width="15" className="img-flud" src={uploadicon} alt="" /></Nav.Link>
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
                                                    setSorting1({ field, order })
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
                                                <td colSpan="7" className="text-center">No Record Found!</td>
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
                            <div className="card card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="main_title">Invoice</h4>
                                    <div className="btn-group ml-auto dropdown for_all">
                                        <NavLink  to="#" className="btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" />Add Invoice</NavLink>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="table-sm-responsive border_bodycolor_0 clent_data_table">
                                    <table className="table m-0 table-borderless">
                                        <tbody>
                                            {InvoiceTabDataLoop_Array.map((val) => {
                                                return (
                                                    <InvoiceTabDataLoop
                                                        key={val.key}
                                                        invoicename={val.invoicename}
                                                        amount={val.amount}
                                                        badgetext={val.badgetext}
                                                        badgebgcolor={val.badgebgcolor}
                                                        time={val.time}
                                                    />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-12">
                                        <NavLink to="#" onClick={MakeNewDiscussion} className="btn btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> New Discussion</NavLink>

                                        <ul className="list-unstyled mt-3">
                                            <li class="active">
                                                <a href="javascript:;" className="text-dark nav-link" data-category-id="">
                                                    All Discussion
                                                </a>
                                            </li>
                                            {discussionCategories.discussionCategories_Array.map((val)=>{
                                                return(
                                                    <li>
                                                        <a href="javascript:;" className="nav-link" data-category-id={val.id} style={{color: val.color }}> 
                                                           {val.name}
                                                        </a>
                                                    </li>                                                    
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="col-xl-9 col-lg-12">
                                        <div className="d-flex align-items-center mb-4">
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
                                            <table className="table m-0 table-borderless">
                                                <tbody>
                                                {FinalTableData2.length > 0 ?  
                                                FinalTableData2.map((val, index) => {
                                                        return (
                                                            <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0 mr-3"><img className="img-fluid avatar" src={val.user.image_url} alt="" /></p>
                                                                    <div className="">
                                                                        <h4 className="mb-1">
                                                                            {val.project_id != null ?
                                                                                <NavLink to={`${process.env.PUBLIC_URL}/view_projectsubdetails/`+val.project_id+"/"+val.id} class="text-dark">{val.title.toUpperCase()}</NavLink>
                                                                            :
                                                                                <NavLink to={`${process.env.PUBLIC_URL}/view_projectsubdetails/00/`+val.id} class="text-dark">{val.title.toUpperCase()}</NavLink>
                                                                            }
                                                                        </h4>
                                                                        <p className="m-0 paragraphcolor1text fontsize14"><span className="text_decoration_none badge blusecolortext mr-2 badgebluebg">{val.last_reply_by_id != null ? val.last_reply_by.name.toUpperCase()+" replied at" : "Last replied at "} {dateFormat(val.last_reply_at,'dd-mm-yyyy hh:mm')}</span></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><img className="img-fluid" src={chaticon} alt="" /> {val.replies.length}</td>
                                                            <td>
                                                                <div className='d-flex align-items-center'>
                                                                <span className="mr-1 d-inline-block border-radius-100 w-15px h-15px" style={{background:val.category.color}}>&nbsp;</span><span style={{color:val.category.color}}>{val.category.name}</span>
                                                                </div>
                                                                </td>
                                                        </tr>                                                            
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan="7" className="text-center">No Record Found!</td>
                                                    </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="card card-body">
                                <div class="ms-lg-auto mt-3 mb-3 btn-group" role="group">
                                    <button type="button" class="btn btn-sm me-2 mb-lg-0 mb-3 btn_blue" onClick={() => setmode('Quarter Day')}>Quarter Day</button>
                                    <button type="button" class="btn btn-sm me-2 mb-lg-0 mb-3 btn_blue" onClick={() => setmode('Half Day')}>Half Day</button>
                                    <button type="button" class="btn btn-sm me-2 mb-lg-0 mb-3  btn_blue" onClick={() => setmode('Day')}>Day</button>
                                    <button type="button" class="btn btn-sm me-2 mb-lg-0 mb-3 btn_blue" onClick={() => setmode('Week')}>Week</button>
                                    <button type="button" class="btn btn-sm btn_blue" onClick={() => setmode('Month')}>Month</button>
                                </div>
                                <div>
                                    {tasks.tasks_Array.length > 0 ?
                                    <FrappeGantt
                                        tasks={tasks.tasks_Array}
                                        viewMode={mode}
                                        onClick={task => console.log(task)}
                                        onDateChange={(task, start, end) => console.log(task, start, end)}
                                        onProgressChange={(task, progress) => console.log(task, progress)}
                                        onTasksChange={tasks => console.log(tasks)}
                                    />
                                    :
                                        <div>No data available for gantt chart</div>
                                    }
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            {/* task categor */}
            {/* New Discussion Form */}
            <Modal show={modalShowDiscussion} onHide={() => setmodalShowDiscussion(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">New Discussion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={newdiscussionsubmit}>
                <Modal.Body className="p-0 my-4">
                        <div className="form-group mb-2">
                            <FormLabel className="mb-2">Select Category</FormLabel>
                            <Form.Select className="transparent_form h-40px" type="text" required value={discussioncat} onChange={(e)=> setdiscussioncat(e.target.value)}>
                                <option value="">Select</option>
                                {discussionCategories.discussionCategories_Array.map((val)=>{
                                    return(
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </div>
                        <div className="form-group mb-2">
                            <FormLabel className="mb-2">Title</FormLabel>
                            <Form.Control className="transparent_form h-40px" type="text" required value={titlediscuss} onChange={(e)=> settitlediscuss(e.target.value)} />
                        </div>
                        <div className="form-group m-0">
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Form.Control
                                as="textarea"
                                placeholder=""
                                style={{ height: '100px' }} required value={descdiscuss} onChange={(e)=> setdescdiscuss(e.target.value)}
                            />
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setmodalShowDiscussion(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>     
             {/*  */}
            <Modal show={modalShowAddMileStone} onHide={() => setmodalShowAddMileStone(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Create Milestone</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitmilestone}>
                <Modal.Body className="p-0 my-4">

                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Title*</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={milestone_title} onChange={(e) => setmilestone_title(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Status*</FormLabel>
                            <Form.Control className="transparent_form h-45px" name="" as="select" value={status} onChange={(e) => setstatus(e.target.value)} required>
                                <option value="">Select Status</option>
                                <option value="complete">Complete</option>
                                <option value="incomplete">Incomplete</option>
                            </Form.Control>
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Cost*</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="number" value={cost} onChange={(e) => setcost(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Add Cost To Project Budget*</FormLabel>
                            <Form.Control className="transparent_form h-45px" name="" as="select" value={add_to_budget} onChange={(e) => setadd_to_budget(e.target.value)} required>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Control>
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Summary*</FormLabel>
                            <Form.Control className="transparent_form" as="textarea" rows={4} value={summary} onChange={(e) => setsummary(e.target.value)} required />
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setmodalShowAddMileStone(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>
            {/*  */}
            <Modal show={modalShowAddMileStoneEdit} onHide={() => setmodalShowAddMileStoneEdit(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Milestone</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitmilestoneupdate}>
                <Modal.Body className="p-0 my-4">

                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Title*</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={milestone_titleu} onChange={(e) => setmilestone_titleu(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Status*</FormLabel>
                            <Form.Control className="transparent_form h-45px" name="" as="select" value={statusu} onChange={(e) => setstatusu(e.target.value)} required>
                                <option value="">Select Status</option>
                                <option value="complete">Complete</option>
                                <option value="incomplete">Incomplete</option>
                            </Form.Control>
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Cost*</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="number" value={costu} onChange={(e) => setcostu(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Milestone Summary*</FormLabel>
                            <Form.Control className="transparent_form" as="textarea" rows={4} value={summaryu} onChange={(e) => setsummaryu(e.target.value)} required />
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setmodalShowAddMileStoneEdit(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" /> Update</Button>
                </Modal.Footer>
                </Form>
            </Modal>

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

export default View_Details;

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