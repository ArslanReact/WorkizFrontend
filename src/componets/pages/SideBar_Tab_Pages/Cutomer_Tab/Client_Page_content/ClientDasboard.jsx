import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { Form,Row,Col } from "react-bootstrap";
import dateFormat from "dateformat";
import { Bar } from 'react-chartjs-2';
// 
import refresh_icon from "../../../../../assets/images/refresh_icon.svg";

import TopBoxesLoop from '../../../SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/TopBoxesLoop';
import C_D_Latest_Client from "../../../SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/LatestClient";
import Recent_Login_Activities from "../../../SideBar_Tab_Pages/Cutomer_Tab/Client_Page_content/Recent_Login_Activities";

//
import top_icon_2 from "../../../../../assets/images/top_icon_2.svg";
import top_icon_8 from "../../../../../assets/images/top_icon_8.svg";
import top_icon_7 from "../../../../../assets/images/top_icon_7.svg";
// Chart
import Chart from "react-apexcharts";

const ClientDashboard = () => {
    const [GraphLebels, setGraphLebels] = useState('');
    const [GraphDataset, setGraphDataset] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const history = useHistory();
    const cliet_wise_earning_chart_labels = [];
    const cliet_wise_earning_chart_data = [];
    const [isLoading, setLoading] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            // project dashboard
            {
                key: "0",
                coltype: "col-xl-4",
                iconimg: top_icon_2,
                altburger: "top_icon_2",
                toptitle: "Total Clients",
                classnth: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                coltype: "col-xl-4",
                iconimg: top_icon_2,
                altburger: "top_icon_2",
                toptitle: "Total Leads",
                classnth: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                coltype: "col-xl-4",
                iconimg: top_icon_7,
                altburger: "top_icon_7",
                toptitle: "Total Lead Conversions",
                classnth: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                coltype: "col-xl-6",
                iconimg: top_icon_8,
                altburger: "top_icon_8",
                toptitle: "Total Contract Generated",
                classnth: "nth_4",
                topnumber: "0",
            },
        ]
    });
    const [LatestClient, setLatestClient] = useState({ C_D_Latest_Client_Array: [] });
    const [RecentActivity, setRecentActivity] = useState({ Recent_Login_Activities_Array: [] });
    let temp_state = { ...state };
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/client-dashboard/'+companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalClient;
                temp_state.TopBoxesArray[1].topnumber = response.data.totalLead;
                temp_state.TopBoxesArray[2].topnumber = response.data.totalLeadConversions;
                temp_state.TopBoxesArray[3].topnumber = response.data.totalContractsGenerated;
                //  temp_state.TopBoxesArray[4].topnumber = response.data.totalContractsSigned; 
                setLatestClient({ C_D_Latest_Client_Array: response.data.latestClient ? response.data.latestClient : [], });
                setRecentActivity({ Recent_Login_Activities_Array: response.data.recentLoginActivities ? response.data.recentLoginActivities : [], });
                // Client Wise Earning Chart
                let clientwiseEarning = JSON.parse(response.data.clientwiseEarning);
                clientwiseEarning.map(element => {
                    cliet_wise_earning_chart_labels.push(element.client);
                    cliet_wise_earning_chart_data.push(element.total);
                });
                setTopBoxArray(temp_state);
                setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
                setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));

                setGraphLebels(response.data.clientWiseTimelogLabel);
                setGraphDataset(response.data.clientWiseTimelogChartData);
                setLoading(false);
            });
    }, [])
    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/client-dashboard/'+companyid+'/'+userid, {
            startDate: StartDate,
            endDate: EndDate
        }).then((response) => {
            temp_state.TopBoxesArray[0].topnumber = response.data.totalClient;
            temp_state.TopBoxesArray[1].topnumber = response.data.totalLead;
            temp_state.TopBoxesArray[2].topnumber = response.data.totalLeadConversions;
            temp_state.TopBoxesArray[3].topnumber = response.data.totalContractsGenerated;
            setLatestClient({ C_D_Latest_Client_Array: response.data.latestClient ? response.data.latestClient : [], });
            setRecentActivity({ Recent_Login_Activities_Array: response.data.recentLoginActivities ? response.data.recentLoginActivities : [], });
            // Client Wise Earning Chart
            let clientwiseEarning = JSON.parse(response.data.clientwiseEarning);
            clientwiseEarning.map(element => {
                cliet_wise_earning_chart_labels.push(element.client);
                cliet_wise_earning_chart_data.push(element.total);
            });
            setTopBoxArray(temp_state);
            //  setEmployeelist({EmployeData_Array: response.data.allemployees ? response.data.allemployees : [],}); 
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
                            <h4 className="main_title">Client Dashboard</h4>
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
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Client Wise Earnings</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body px-4">
                                        <Bar
                                            data={{
                                                labels: ["2020"],
                                                datasets: [
                                                    {
                                                        label: 'Income',
                                                        data: [46],
                                                        borderColor: 'rgb(28, 166, 210)',
                                                        backgroundColor: 'rgb(28, 166, 210)',
                                                        fill: true
                                                    },
                                                    {
                                                        label: 'Expense',
                                                        data: [62],
                                                        borderColor: '#3546AB',
                                                        backgroundColor: '#3546AB',
                                                        fill: true
                                                    }
                                                ],
                                            }}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Client Wise Timelogs </h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body px-4">
                                        <Bar
                                            data={{
                                                labels: GraphLebels,
                                                datasets: [
                                                    {
                                                        label: 'Cleint',
                                                        data: [5],
                                                        borderColor: 'rgb(28, 166, 210)',
                                                        backgroundColor: 'rgb(28, 166, 210)',
                                                        fill: true
                                                    },
                                                    
                                                ],
                                            }}
                                        />
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
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Latest Clients</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        {LatestClient.C_D_Latest_Client_Array.length > 0 ?
                                            LatestClient.C_D_Latest_Client_Array.map((val) => {
                                                return (
                                                    <C_D_Latest_Client
                                                        key={val.key}
                                                        name={val.name}
                                                        company_name={val.company_name}
                                                        created_at={val.created_at}
                                                        avatar={val.image_url}
                                                    />
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="2">No Record Found</td>
                                            </tr>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 mb-4">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Recent Login Activities </h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        {RecentActivity.Recent_Login_Activities_Array.length > 0 ?
                                            RecentActivity.Recent_Login_Activities_Array.map((val) => {
                                                return (
                                                    <Recent_Login_Activities
                                                        key={val.key}
                                                        name={val.name}
                                                        company_name={val.company_name}
                                                        last_login={val.last_login}
                                                        avatar={val.image_url}
                                                    />
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="2">No Record Found</td>
                                            </tr>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}

export default ClientDashboard;