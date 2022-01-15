import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';
import { Doughnut } from 'react-chartjs-2';
//
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { Form,Col,Row } from "react-bootstrap";
// 
import TopBoxesLoop from '../../../SideBar_Tab_Pages/Project-Tab/Dashboard/TopBoxesLoop';
import TaskContent from '../../../SideBar_Tab_Pages/Project-Tab/Dashboard/TaskContent';
import TaskContentArray from '../../../SideBar_Tab_Pages/Project-Tab/Dashboard/TaskContentArray';
import dateFormat from "dateformat";
// 
import drop_icon from "../../../../../assets/images/drop_icon.svg";
import refresh_icon from "../../../../../assets/images/refresh_icon.svg";
import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";
import top_icon_5 from "../../../../../assets/images/top_icon_5.svg";
import top_icon_6 from "../../../../../assets/images/top_icon_6.svg";
const ProjectDashboard = () => {
    const [GraphDataSet, setGraphDataSet] = useState('');
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var userid = obj.id;
    // Doughnut
    const data1 = {
        labels: ['Complete', 'Incomplete'],
        datasets: [
            {
                label: '',
                data: [61, 42],
                backgroundColor: [
                    'rgb(53, 70, 171)',
                    'rgb(72, 238, 249)',
                ],
                borderWidth: 0,
            },
        ],
    };
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_1",
                toptitle: "Total Projects",
                classnth: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                iconimg: top_icon_5,
                altburger: "top_icon_5",
                toptitle: "Hours Logged",
                classnth: "nth_2",
                topnumber: "2 hrs",
            },
            {
                key: "2",
                iconimg: top_icon_6,
                altburger: "top_icon_6",
                toptitle: "Total Overdue Project",
                classnth: "nth_3",
                topnumber: "0",
            }
        ]
    });
    let temp_state = { ...state };
    useEffect(() => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/project-dashboard/'+companyid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalProject;
                temp_state.TopBoxesArray[1].topnumber = response.data.totalHoursLogged;
                temp_state.TopBoxesArray[2].topnumber = response.data.totalOverdueProject;
                // Client Wise Earning Chart
                // let clientwiseEarning = JSON.parse(response.data.clientwiseEarning);
                // clientwiseEarning.map(element => {
                //     cliet_wise_earning_chart_labels.push(element.client);
                //     cliet_wise_earning_chart_data.push(element.total);
                // });          
                setTopBoxArray(temp_state);
                //  setEmployeelist({EmployeData_Array: response.data.allemployees ? response.data.allemployees : [],}); 
                setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
                setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));
                setGraphDataSet(response.data.tasks_datasets);
                setLoading(false);
            });
    }, [])
    // Date Range Handle
    const onDateChange = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    }
    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/project-dashboard/'+companyid, {
            startDate: StartDate,
            endDate: EndDate
        }).then((response) => {
            temp_state.TopBoxesArray[0].topnumber = response.data.totalProject;
            temp_state.TopBoxesArray[1].topnumber = response.data.totalHoursLogged;
            temp_state.TopBoxesArray[2].topnumber = response.data.totalOverdueProject;
            // Client Wise Earning Chart
            // let clientwiseEarning = JSON.parse(response.data.clientwiseEarning);
            // clientwiseEarning.map(element => {
            //     cliet_wise_earning_chart_labels.push(element.client);
            //     cliet_wise_earning_chart_data.push(element.total);
            // });          
            setTopBoxArray(temp_state);
            setLoading(false);
            
        });
        evt.preventDefault();
    }
    return (
        <>
            <React.Fragment>
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xxl={4} xl={5} className="col-12">
                                <h4 className="main_title">Project Dashboard</h4>
                            </Col>
                            <Col xxl={8} xl={7} className="col-12">
                                <div className="input-group ms-auto date align-items-center">
                                    
                                    <Form.Control className='h-45px' type="date" value={StartDate} onChange={e => setStartDate(e.target.value)} />
                                    <div className="input-between-date h-45px">
                                        TO
                                    </div>
                                    <Form.Control className='h-45px' type="date" value={EndDate} onChange={e => setEndDate(e.target.value)} />
                                    <button type="submit" className="btn_calendar">Apply</button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
                {/*  */}
                <div className="container-fluid top-boxes mb-4">
                    <div className="row">
                        {state.TopBoxesArray.map((val) => {
                            return (
                                <TopBoxesLoop
                                    key={val.key}
                                    iconimg={val.iconimg}
                                    altburger={val.altburger}
                                    toptitle={val.toptitle}
                                    classnth={val.classnth}
                                    topnumber={val.topnumber}
                                />
                            )
                        })}
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                            <div className="card card_dashboard h-100">
                                <div className="card-header d-xl-flex d-block align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-3 mb-xl-0">Total Task</h5>
                                </div>
                                <div className="card-body whitecolorbg mb-3">
                                    <Doughnut className="data1" height={'40px'} width={'40px'} data={{
        labels: ['Complete', 'Incomplete'],
        datasets: [
            {
                label: '',
                data: GraphDataSet,
                backgroundColor: [
                    'rgb(53, 70, 171)',
                    'rgb(72, 238, 249)',
                    'rgb(252, 96, 152)',
                ],
                borderWidth: 0,
            },
        ],
    }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-12 mb-4 mb-lg-0">
                        <div className="card card_dashboard">
                            <div className="card-header d-xl-flex d-block align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-3 mb-xl-0">Tasks</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-3">
                                <p className="lightgraycolortext mb-4">A task is accomplished by a set deadline, and must contribute toward work-related objectives.</p>
                                <div className="table-sm-responsive data-table">
                                    <table className="table m-0 table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Tasks</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">Open task</th>
                                                <th scope="col">Properity</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TaskContentArray.map((val) => {
                                                return (
                                                    <TaskContent
                                                        key={val.key}
                                                        tdradiobtn={val.tdradiobtn}
                                                        td1={val.td1}
                                                        td2={val.td2}
                                                        td3={val.td3}
                                                        td4={val.td4}
                                                        td5={val.td5}
                                                        classNametdnth={val.classNametdnth}
                                                        classNametexttdnth={val.classNametexttdnth}
                                                    />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                
            </React.Fragment>
        </>
    );
}

export default ProjectDashboard;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted recurring invoice!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}