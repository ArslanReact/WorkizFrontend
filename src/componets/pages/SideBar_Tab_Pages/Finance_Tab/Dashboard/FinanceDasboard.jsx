import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer } from 'react-toastify';
//
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Bar } from 'react-chartjs-2';
//
import { InputGroup, Button, FormControl, Form,Row,Col,Table } from "react-bootstrap";
import dateFormat from "dateformat";
// 
import drop_icon from "../../../../../assets/images/drop_icon.svg";
import refresh_icon from "../../../../../assets/images/refresh_icon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
// 
import TopBoxesLoop from '../../../SideBar_Tab_Pages/Finance_Tab/Dashboard/TopBoxesLoop';
import F_Invoice_Overview from "../../../SideBar_Tab_Pages/Finance_Tab/Dashboard/F_Invoice_Overview";
import F_Estimate_Overview from "../../../SideBar_Tab_Pages/Finance_Tab/Dashboard/F_Estimate_Overview";
import F_Proposal_Overview from "../../../SideBar_Tab_Pages/Finance_Tab/Dashboard/F_Proposal_Overview";

import PaymentTableData from "../../Finance_Tab/Payments_Page_Content/PaymentTableData";

import InvoiveTableData from "../../Finance_Tab/Invoices_Page_Content/InvoiveTableData";
import InvoiveTableData_Array from "../../Finance_Tab/Invoices_Page_Content/InvoiveTableData_Array";

import ExpencesTableData from "../../Finance_Tab/Expences_Page_Content/ExpencesTableData";
import ExpencesTableData_Array from "../../Finance_Tab/Expences_Page_Content/ExpencesTableData_Array";

import top_icon_3 from "../../../../../assets/images/top_icon_3.svg";
import top_icon_11 from "../../../../../assets/images/top_icon_11.svg";
import top_icon_12 from "../../../../../assets/images/top_icon_12.svg";
import top_icon_13 from "../../../../../assets/images/top_icon_13.svg";

const FinanceDasboard = () => {
    const history = useHistory();
    var counter2 = -1;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [InvoiveTableDataArray, setInvoiveTableDataArray] = useState({
        InvoiveTableData_Array: []
    });


    const cliet_wise_earning_chart_labels = [];
    const cliet_wise_earning_chart_data = [];
    const [isLoading, setLoading] = useState(true);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            {
                key: "0",
                coltype: "col-xl-4",
                iconimg: top_icon_3,
                altburger: "top_icon_3",
                toptitle: "Paid Invoices",
                classnth: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                coltype: "col-xl-4",
                iconimg: top_icon_11,
                altburger: "top_icon_11",
                toptitle: "Total Expenses",
                classnth: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                coltype: "col-xl-4",
                iconimg: top_icon_12,
                altburger: "top_icon_12",
                toptitle: "Total Earnings",
                classnth: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                coltype: "col-xl-6",
                iconimg: top_icon_13,
                altburger: "top_icon_13",
                toptitle: "Total Profit",
                classnth: "nth_4",
                topnumber: "0",
            },
            {
                key: "4",
                coltype: "col-xl-6",
                iconimg: top_icon_13,
                altburger: "top_icon_13",
                toptitle: "Total Pending Amount",
                classnth: "nth_4",
                topnumber: "0",
            },
        ]
    });
    const [InvoiceOverview, setInvoiceOverview] = useState({ F_Invoice_Overview_Array: [] });
    const [EstimateOverview, setEstimateOverview] = useState({ F_Estimate_Overview_Array: [] });
    const [ProposalOverview, setProposalOverview] = useState({ F_Proposal_Overview_Array: [] });
    let temp_state = { ...state };
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var type = obj.user_other_role;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance-dashboard/' + companyid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalPaidInvoice;
                temp_state.TopBoxesArray[1].topnumber = response.data.totalExpenses;
                temp_state.TopBoxesArray[2].topnumber = response.data.totalEarnings;
                temp_state.TopBoxesArray[3].topnumber = response.data.totalProfit;
                temp_state.TopBoxesArray[4].topnumber = response.data.totalPendingAmount;
                setEstimateOverview({ F_Estimate_Overview_Array: response.data.estimateOverviews ? response.data.estimateOverviews : [], });
                setInvoiceOverview({ F_Invoice_Overview_Array: response.data.invoiceOverviews ? response.data.invoiceOverviews : [], });
                setProposalOverview({ F_Proposal_Overview_Array: response.data.proposalOverviews ? response.data.proposalOverviews : [], });
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
            });

            axios.get(Globalsettings.url + 'api/admin/finance/all-invoices/' + type + '/' + companyid)
            .then((response) => {
                setInvoiveTableDataArray({ InvoiveTableData_Array: response.data.data ? response.data.data : [], });
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
        axios.post(Globalsettings.url + 'api/admin/finance-dashboard/' + companyid, {
            startDate: StartDate,
            endDate: EndDate
        }).then((response) => {
            temp_state.TopBoxesArray[0].topnumber = response.data.totalPaidInvoice;
            temp_state.TopBoxesArray[1].topnumber = response.data.totalExpenses;
            temp_state.TopBoxesArray[2].topnumber = response.data.totalEarnings;
            temp_state.TopBoxesArray[3].topnumber = response.data.totalProfit;
            temp_state.TopBoxesArray[4].topnumber = response.data.totalPendingAmount;
            setEstimateOverview({ F_Estimate_Overview_Array: response.data.estimateOverviews ? response.data.estimateOverviews : [], });
            setInvoiceOverview({ F_Invoice_Overview_Array: response.data.invoiceOverviews ? response.data.invoiceOverviews : [], });
            setProposalOverview({ F_Proposal_Overview_Array: response.data.proposalOverviews ? response.data.proposalOverviews : [], });
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



    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Invoice", field: "invoice_number", sortable: true },
        { name: "Project", field: "project_name", sortable: true },
        { name: "Client", field: "name", sortable: true },
        { name: "Total", field: "total", sortable: true },
        { name: "Invoice Date", field: "issue_date", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = InvoiveTableDataArray.InvoiveTableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
                    comment.project_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.total.toLowerCase().includes(search.toLowerCase()) 
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

    }, [InvoiveTableDataArray.InvoiveTableData_Array, currentPage, search, sorting]);     






    return (
        <>
            <React.Fragment>
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xxl={4} xl={5} className="col-12">
                                <h4 className="main_title">Finance Dashboard</h4>
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
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Invoice Overview</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                        <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body px-0 py-2">
                                    <ul className="list-unstyled finance_progresbar_style">
                                        {InvoiceOverview.F_Invoice_Overview_Array.map((val) => {
                                            return (
                                                <F_Invoice_Overview
                                                    key={val.key}
                                                    btn_img={val.image}
                                                    btn_img_1={val.imagestyle}
                                                    btn_img_alt=""
                                                    color_progress="bodycolor"
                                                    variant={val.color}
                                                    now_update={val.percent}
                                                    progress_heading={val.progress_heading}
                                                    progress_update={val.percent + "%"}
                                                    draft_update={val.count + " " + val.progress_heading}
                                                />
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Estimate Overview</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                        <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body px-0 py-2">
                                    <ul className="list-unstyled finance_progresbar_style">
                                        {EstimateOverview.F_Estimate_Overview_Array.map((val) => {
                                            return (
                                                <F_Estimate_Overview
                                                    key={val.key}
                                                    btn_img={val.image}
                                                    btn_img_1={val.imagestyle}
                                                    btn_img_alt=""
                                                    color_progress="bodycolor"
                                                    variant={val.color}
                                                    now_update={val.percent}
                                                    progress_heading={val.progress_heading}
                                                    progress_update={val.percent + "%"}
                                                    draft_update={val.count + " " + val.progress_heading}
                                                />
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Proposal Overview</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                        <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    </div>
                                </div>
                                <div className="card-body px-0 py-2">
                                    <ul className="list-unstyled finance_progresbar_style">
                                        {ProposalOverview.F_Proposal_Overview_Array.map((val) => {
                                            return (
                                                <F_Proposal_Overview
                                                    key={val.key}
                                                    btn_img={val.image}
                                                    btn_img_1={val.imagestyle}
                                                    btn_img_alt=""
                                                    color_progress="bodycolor"
                                                    variant={val.color}
                                                    now_update={val.percent}
                                                    progress_heading={val.progress_heading}
                                                    progress_update={val.percent + "%"}
                                                    draft_update={val.count + " " + val.progress_heading}
                                                />
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                {/* <div className="container-fluid mb-4">
                    <div className="card card_dashboard">
                        <div className="card-body">
                            <Tabs>
                                <TabList>
                                    <Tab>Invoices</Tab>
                                    <Tab>Estimates</Tab>
                                    <Tab>Expenses</Tab>
                                    <Tab>Payments</Tab>
                                </TabList>
                                <TabPanel className="mt-4">
                                <div className="container-fluid mb-4">
                                    <div className="card card_dashboard card-body">
                                        <div className="d-xl-flex d-block align-items-center">
                                            <div className="ml-auto">
                                                    <Search
                                                        onSearch={value => {
                                                            setSearch(value);
                                                            setCurrentPage(1);
                                                        }}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                 
                                    <div className="table-responsive-sm data_table_profile mt-4">
                                        <Table className="table m-0 table-hover">
                                                <TableHeader
                                                    headers={headers}
                                                    onSorting={(field, order) =>
                                                        setSorting({ field, order })
                                                    }
                                                />
                                            <tbody>
                                            {FinalTableData.length > 0 ?  
                                                FinalTableData.map((val, index) => {
                                                    let number = index + 1;
                                                    counter2 = counter2+1;      
                                                    return (
                                                        <InvoiveTableData
                                                            key={index}
                                                            countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                                            invoicenumber={val.invoice_number}
                                                            projectname={val.project_name}
                                                            client_avatar={val.client_avatar}
                                                            client_name={val.name}
                                                            price={val.total}
                                                            invioce_date={val.issue_date}
                                                            status={val.status}
                                                            action={val.action}
                                                        />
                                                    );
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="8" className="text-center">No Record Found</td>
                                                </tr>
                                            }                                
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination
                                                total={totalItems}
                                                itemsPerPage={ITEMS_PER_PAGE}
                                                currentPage={currentPage}
                                                onPageChange={page => setCurrentPage(page)}
                                    />                    
                                </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="table-responsive-sm data-table">
                                        <Table className="table m-0 table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Estimate</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Valid Till</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="7"><p className="p-4 text-center fontsize16">No data available in table</p></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="table-responsive-sm data-table">
                                        <Table className="table m-0 table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Select Empolyee</th>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Purchase Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ExpencesTableData_Array.map((val) => {
                                                    return (
                                                        <ExpencesTableData
                                                            key={val.key}
                                                            countnumber={val.countnumber}
                                                            projectname={val.projectname}
                                                            itemname={val.itemname}
                                                            pricename={val.pricename}
                                                            purchasedfromname={val.purchasedfromname}
                                                            empolyeename={val.empolyeename}
                                                            purchaseddatename={val.purchaseddatename}
                                                            status_text={val.status_text}
                                                            status_color={val.status_color}
                                                            down_arrow={val.down_arrow}
                                                            iconimg={val.iconimg}
                                                            editiconimg={val.editiconimg}
                                                            viewiconimg={val.viewiconimg}
                                                            deleteiconimg={val.deleteiconimg}
                                                        />
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <div className="table-responsive-sm data-table">
                                        <Table className="table m-0 table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Project</th>
                                                    <th scope="col">Invoice</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Paid On</th>
                                                    <th scope="col">Status </th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ExpencesTableData_Array.map((val) => {
                                                    return (
                                                        <PaymentTableData
                                                            key={val.key}
                                                            count_number={val.count_number}
                                                            invoicenumber={val.invoicenumber}
                                                            projectname={val.projectname}
                                                            amounttext={val.amounttext}
                                                            paidontext={val.paidontext}
                                                            badgetext={val.badgetext}
                                                            dashes={val.dashes}
                                                            iconimg={val.iconimg}
                                                            editiconimg={val.editiconimg}
                                                            viewiconimg={val.viewiconimg}
                                                            deleteiconimg={val.deleteiconimg}
                                                        />
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-xl-6 col-lg-12">
                                            <p className="fontsize14 lightgraycolortext">Showing 1 to 10 of 20 entries</p>
                                        </div>
                                        <div className="col-xl-6 col-lg-12 text-lg-right">
                                            <nav className="text-lg-right">
                                                <ul className="pagination d-inline-flex">
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div> */}
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-4 mb-xl-0">
                            <div className="card card_dashboard">
                                <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Earnings by Client</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                        <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
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
                                    <h5 className="card-title fontsize20 blackcolortext mb-0">Earnings by Project</h5>
                                    <div className="ml-auto">
                                        <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                        <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
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
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}

export default FinanceDasboard;