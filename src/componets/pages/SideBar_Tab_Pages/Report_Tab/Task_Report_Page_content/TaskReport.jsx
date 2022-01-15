import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { Form,Row,Col } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import dateFormat from "dateformat";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import TaskReportTableLoop from "../Task_Report_Page_content/TaskReportTableLoop";
import { Doughnut } from 'react-chartjs-2';
// 
import top_icon_2 from "../../../../../assets/images/top_icon_1.svg";
const TaskReport = () => {
    var counter1 = -1;
    const [isLoading, setLoading] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [totaltask, settotaltask] = useState(0);
    const [completetask, setcompletetask] = useState(0);
    const [pendingtask, setpendingtask] = useState(0);
    const [GraphLebels, setGraphLebels] = useState('');
    const [GraphDataset, setGraphDataset] = useState('');
    const [reportlist, setreportlist] = useState({
        reportlist_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/reports/task-report/' + companyid)
            .then((response) => {
                setreportlist({ reportlist_Array: response.data.tasks ? response.data.tasks : [], });
                settotaltask(response.data.totalTasks);
                setpendingtask(response.data.pendingTasks);
                setGraphLebels(response.data.graphlabels);
                setGraphDataset(response.data.graphdataset);
                setcompletetask(response.data.completedTasks);
                setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
                setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));
                setLoading(false);
            })
            .catch((error) => {
                
            });
    }, [])
    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/reports/task-report/'+companyid, {
            startDate: StartDate,
            endDate: EndDate
        }).then((response) => {
            setreportlist({ reportlist_Array: response.data.tasks ? response.data.tasks : [], });
            settotaltask(response.data.totalTasks);
            setpendingtask(response.data.pendingTasks);
            setGraphLebels(response.data.graphlabels);
            setGraphDataset(response.data.graphdataset);
            setcompletetask(response.data.completedTasks);
            setStartDate(dateFormat(response.data.fromDate, 'yyyy-mm-dd'));
            setEndDate(dateFormat(response.data.toDate, 'yyyy-mm-dd'));
            setLoading(false);
        });
        evt.preventDefault();
    }
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Project", field: "project_name", sortable: true },
        { name: "Task", field: "heading", sortable: true },
        { name: "Assigned", field: "title", sortable: true },
        { name: "Date", field: "date", sortable: true },
        { name: "Status", field: "status", sortable: true }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = reportlist.reportlist_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.project_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.heading.toLowerCase().includes(search.toLowerCase()) 
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

    }, [reportlist.reportlist_Array, currentPage, search, sorting]);     
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center">
                        <Col xxl={4} xl={5} className="col-12">
                            <h4 className="main_title">Task Report</h4>
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
                    <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_1"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Tasks</p>
                                    <h6 className="fontweightbold paragraphcolortext">{totaltask}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_3"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Completed Tasks</p>
                                    <h6 className="fontweightbold paragraphcolortext">{completetask}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_4"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Pending Tasks</p>
                                    <h6 className="fontweightbold paragraphcolortext">{pendingtask}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*  */}
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
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
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
                                let number = index + 1;
                                counter1=counter1+1;
                                return (
                                    <TaskReportTableLoop
                                        key={index}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                        projectid={val.project_id}
                                        projectname={val.project_name}
                                        invoicename={val.heading}
                                        avatarimg={val.avatarimg}
                                        title={val.title}
                                        date={val.due_on}
                                        badgetext={val.column_name}
                                        badgebgcolor={val.column_name === "Completed" ? "badgegreenbg greencolortext" : "badgeyellowbg  yelowcolortext"}
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="7" className="text-center">No Record Found</td>
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
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card_dashboard card-body">
                            <Doughnut
                                data={{
                                    labels: GraphLebels,
                                    datasets: [{
                                        label: 'My First Dataset',
                                        data: GraphDataset,
                                        backgroundColor: [
                                            '#FFBB54',
                                            '#3546AB',
                                            '#fc6098'
                                        ],
                                        hoverOffset: 4
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskReport;
