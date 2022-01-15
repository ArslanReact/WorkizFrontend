import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
// Chart
import { Bar } from 'react-chartjs-2';
import { Form,Row,Col } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import dateFormat from "dateformat";
// 
import top_icon_2 from "../../../../../assets/images/top_icon_2.svg";
const IncomeExpenseReport = () => {
    const [TotalIncome, setTotalIncome] = useState(0);
    const [TotalExpense, setTotalExpense] = useState(0);
    const [currency, setcurrency] = useState('$');
    const [GraphLebels, setGraphLebels] = useState('');
    const [GraphDataset1, setGraphDataset1] = useState('');
    const [GraphDataset2, setGraphDataset2] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/income-expense-report/' + companyid)
            .then((response) => {
                setTotalIncome(response.data.totalIncomes);
                setTotalExpense(response.data.totalExpenses);
                setcurrency(response.data.currency);
                setGraphLebels(response.data.graphlabels);
                setGraphDataset1(response.data.graphdataset1);
                setGraphDataset2(response.data.graphdataset2);
                setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
                setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])

    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/reports/income-expense-report/'+companyid, {
            startDate: StartDate,
            endDate: EndDate
        }).then((response) => {
            setTotalIncome(response.data.totalIncomes);
            setTotalExpense(response.data.totalExpenses);
            setcurrency(response.data.currency);
            setGraphLebels(response.data.graphlabels);
            setGraphDataset1(response.data.graphdataset1);
            setGraphDataset2(response.data.graphdataset2);  
            setLoading(false);
        });
        evt.preventDefault();
    }
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center">
                        <Col xxl={4} xl={5} className="col-12">
                            <h4 className="main_title">Income Expense Report</h4>
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
                    <div className="col-xl-3 col-lg-12 mb-3 mb-xl-0">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_1"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Income</p>
                                    <h6 className="fontweightbold paragraphcolortext">{currency}{TotalIncome}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_1"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Expense</p>
                                    <h6 className="fontweightbold paragraphcolortext">{currency}{TotalExpense}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <h4 className="main_title">Bar Chart</h4>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="card card_dashboard card-body">
                    <Bar
                        data={{
                            labels: GraphLebels,
                            datasets: [
                                {
                                    label: 'Income',
                                    data: GraphDataset1,
                                    borderColor: 'rgb(28, 166, 210)',
                                    backgroundColor: 'rgb(28, 166, 210)',
                                    fill: true
                                },
                                {
                                    label: 'Expense',
                                    data: GraphDataset2,
                                    borderColor: '#3546AB',
                                    backgroundColor: '#3546AB',
                                    fill: true
                                }
                            ],
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default IncomeExpenseReport;
