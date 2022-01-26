import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import Chart from "react-apexcharts";
import { Form,Row,Col } from 'react-bootstrap';
import dateFormat from "dateformat";
import { Doughnut } from 'react-chartjs-2';
// 
import drop_icon from "../../../../../assets/images/drop_icon.svg";
import refresh_icon from "../../../../../assets/images/refresh_icon.svg";
import download_icon from "../../../../../assets/images/download_icon.svg";


// 
import TopBoxesLoop from '../../../SideBar_Tab_Pages/Hr_Tab/Dashboard/TopBoxesLoop';
import HrDLeaveTaken from '../../../SideBar_Tab_Pages/Hr_Tab/Dashboard/HrDLeaveTaken';
import HrDLateAttendance from '../../../SideBar_Tab_Pages/Hr_Tab/Dashboard/HrDLateAttendance';

import top_icon_9 from "../../../../../assets/images/top_icon_9.svg";
import top_icon_10 from "../../../../../assets/images/top_icon_10.svg";
import top_icon_chart from "../../../../../assets/images/top_icon_chart.svg";
const HrDasboard = () => {
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var uid = obj.id;
        var companyid = obj.company_id;
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [GraphDepartmentLebels, setGraphDepartmentLebels] = useState('');
    const [GraphDesignationLebels, setGraphDesignationLebels] = useState('');
    const [GraphGenderLebels, setGraphGenderLebels] = useState('');
    const [GraphRoleLebels, setGraphRoleLebels] = useState('');
    const [GraphDepartmentDataset, setGraphDepartmentDataset] = useState('');
    const [GraphDesignationDataset, setGraphDesignationDataset] = useState('');
    const [GraphGenderDataset, setGraphGenderDataset] = useState('');
    const [GraphRoleDataset, setGraphRoleDataset] = useState('');
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            // HR dashboard
            {
                key: "0",
                iconimg: top_icon_9,
                altburger: "top_icon_9",
                toptitle: "Total Leaves Approved",
                classnth: "nth_1",
                topnumber: "08",
            },
            {
                key: "1",
                iconimg: top_icon_10,
                altburger: "top_icon_10",
                toptitle: "Total New Employee",
                classnth: "nth_2",
                topnumber: "10",
            },
            {
                key: "2",
                iconimg: top_icon_10,
                altburger: "top_icon_10",
                toptitle: "Total Employee Exits",
                classnth: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                iconimg: top_icon_10,
                altburger: "top_icon_10",
                toptitle: "Average Attendance",
                classnth: "nth_4",
                topnumber: "43.99%",
            },
        ]
    });
    const [LeaveTaken, setLeaveTaken] = useState({ LeaveTaken_array: [] });
    const [LATEATTENDANCEMARK, setLATEATTENDANCEMARK] = useState({ LATEATTENDANCEMARK_Array: [] });
    let temp_state = { ...state };
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/hr-dashboard/'+companyid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalLeavesApproved;
                temp_state.TopBoxesArray[1].topnumber = response.data.totalNewEmployee;
                temp_state.TopBoxesArray[2].topnumber = response.data.totalEmployeeExits;
                temp_state.TopBoxesArray[3].topnumber = response.data.averageAttendance;
                setLeaveTaken({ LeaveTaken_array: response.data.leavesTakens ? response.data.leavesTakens : [], });
                setLATEATTENDANCEMARK({ LATEATTENDANCEMARK_Array: response.data.lateAttendanceMarks ? response.data.lateAttendanceMarks : [], });
                // Department Chart
                setGraphDepartmentLebels(response.data.department_labels);
                setGraphDepartmentDataset(response.data.department_dataset);
                // Designation Chart
                setGraphDesignationLebels(response.data.designation_labels);
                setGraphDesignationDataset(response.data.designation_datasets);
                // Gender Chart
                setGraphGenderLebels(response.data.gender_labels);
                setGraphGenderDataset(response.data.gender_datasets);
                // Role Chart
                setGraphRoleLebels(response.data.role_labels);
                setGraphRoleDataset(response.data.role_datasets);
                setTopBoxArray(temp_state);
                setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
                setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));
            });
    }, [])
    
    // Custom Date Range
    const handleSubmit = (evt) => {
        axios.get(Globalsettings.url + 'api/admin/hr-dashboard/'+companyid+'?startDate=' + StartDate + '&endDate=' + EndDate)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalLeavesApproved;
                temp_state.TopBoxesArray[1].topnumber = response.data.totalNewEmployee;
                temp_state.TopBoxesArray[2].topnumber = response.data.totalEmployeeExits;
                temp_state.TopBoxesArray[3].topnumber = response.data.averageAttendance;
                setLeaveTaken({ LeaveTaken_array: response.data.leavesTakens ? response.data.leavesTakens : [], });
                setLATEATTENDANCEMARK({ LATEATTENDANCEMARK_Array: response.data.lateAttendanceMarks ? response.data.lateAttendanceMarks : [], });
                // Department Chart
                setGraphDepartmentLebels(response.data.department_labels);
                setGraphDepartmentDataset(response.data.department_dataset);
                // Designation Chart
                setGraphDesignationLebels(response.data.designation_labels);
                setGraphDesignationDataset(response.data.designation_datasets);
                // Gender Chart
                setGraphGenderLebels(response.data.gender_labels);
                setGraphGenderDataset(response.data.gender_datasets);
                // Role Chart
                setGraphRoleLebels(response.data.role_labels);
                setGraphRoleDataset(response.data.role_datasets);
                setTopBoxArray(temp_state);

            });
        evt.preventDefault();
    }
    return (
        <>
                <div className="container-fluid mb-4">
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xxl={4} xl={5} className="col-12">
                                <h4 className="main_title">HR Dashboard</h4>
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
                                coltype={val.coltype}
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Department Wise Employee </h5>
                            
                            </div>
                            <div className="card-body px-4">
                                <div className="chart-height h-100">
                                    {GraphDepartmentDataset === '' ?
                                        <div>
                                            <img className="img-fluid" alt="top_icon_chart" width="100" src={top_icon_chart} />
                                            <p>No Department Wise Employee</p>
                                        </div>
                                        :
                                        <Chart
                                            options={{
                                                dataLabels: {
                                                    enabled: false,
                                                },
                                                colors: ['#00A389', '#FC6098', '#58D7FF', '#3546AB', '#FFBB54', '#959AC5'],
                                                labels: GraphDepartmentLebels,
                                                legend: {
                                                    position: 'right',
                                                    offsetY: 50
                                                }
                                            }}
                                            series={GraphDepartmentDataset} type="donut" width={435}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Designation Wise Employee </h5>
                         
                            </div>
                            <div className="card-body px-4">
                                <div className="chart-height h-100">
                                    {GraphDesignationDataset === '' ?
                                        <div>
                                            <img className="img-fluid" alt="top_icon_chart" width="100" src={top_icon_chart} />
                                            <p>No Department Wise Employee</p>
                                        </div>
                                        :
                                        <Chart
                                            options={{
                                                dataLabels: {
                                                    enabled: false,
                                                },
                                                colors: ['#F16D75', '#A9A1FF', '#959AC4', '#FFBB54', '#6583FE'],
                                                labels: GraphDesignationLebels,
                                                legend: {
                                                    position: 'right',
                                                    offsetY: 50
                                                }
                                            }}
                                            series={GraphDesignationDataset} type="donut" width={380}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Gender Wise Employee  </h5>
                          
                            </div>
                            <div className="card-body px-4">
                                <div className="chart-height h-100">
                                    {GraphGenderDataset === '' ?
                                        <div>
                                            <img className="img-fluid" alt="top_icon_chart" width="100" src={top_icon_chart} />
                                            <p>No Gender Wise Employee</p>
                                        </div>
                                        :
                                        <Chart
                                            options={{
                                                dataLabels: {
                                                    enabled: false,
                                                },
                                                colors: ['#76F273', '#00A389'],
                                                labels: GraphGenderLebels,
                                                legend: {
                                                    position: 'right',
                                                    offsetY: 50
                                                }
                                            }}
                                            series={GraphGenderDataset} type="donut" width={380}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Role Wise Employee </h5>
                           
                            </div>
                            <div className="card-body px-4">
                                <div className="chart-height h-100">
                                    {GraphRoleDataset === '' ?
                                        <div>
                                            <img className="img-fluid" alt="top_icon_chart" width="100" src={top_icon_chart} />
                                            <p>No Role Wise Employee</p>
                                        </div>
                                        :

                                        <Doughnut className="data1 mx-auto" style={{ maxHeight: "250px", minHeight: "250px", maxWidth: "250px", minWidth: "250px" }} 
                                                data={{        
                                                labels: GraphRoleLebels,
                                                datasets: [
                                                    {
                                                        label: '',
                                                        data: GraphRoleDataset,
                                                        backgroundColor: [
                                                            '#6583FE', '#48EEF9'
                                                        ],
                                                        borderWidth: 0,
                                                    },
                                                ],}} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Leaves Taken</h5>
                          
                            </div>
                            <div className="card-body px-3">
                                <div className="table-sm-responsive">
                                    <table className="table m-0 table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Employee</th>
                                                <th scope="col">Leaves Taken</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {LeaveTaken.LeaveTaken_array.length > 0
                                                ?
                                                LeaveTaken.LeaveTaken_array.map((val, index) => {
                                                    let number = index + 1;
                                                    return (
                                                        <HrDLeaveTaken
                                                            key={index}
                                                            text={val.name}
                                                            number_text={val.employeeLeaveCount}
                                                        />
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="2">No Record Found!</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Late Attendance Mark </h5>
                            
                            </div>
                            <div className="card-body px-4">
                                <div className="table-sm-responsive">
                                    <table className="table m-0 table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Employee</th>
                                                <th scope="col">Late Mark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {LATEATTENDANCEMARK.LATEATTENDANCEMARK_Array > 0 ?
                                                LATEATTENDANCEMARK.LATEATTENDANCEMARK_Array.map((val, index) => {
                                                    return (
                                                        <HrDLateAttendance
                                                            key={index}
                                                            text={val.name}
                                                            number_text={val.count}
                                                        />
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="2">No Record Found!</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HrDasboard;