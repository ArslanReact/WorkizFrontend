import React, { useEffect,useMemo, useState } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { Bar } from 'react-chartjs-2';
import { NavLink } from "react-router-dom";
// 
import TimeReportTableLoop from "../Time_Report_Page_content/TimeReportTableLoop";
import TimeReportTableLoop_Array from "../Time_Report_Page_content/TimeReportTableLoop_Array";

// 


const TimeLogReport = () => {
    var counter2 = -1;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [isLoading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 10;
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableDataArray, setTableDataArray] = useState({
        TableData_Array: []
    });
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/time-log-report/' + companyid + '/' + userid)
        .then((response) => {
            setTableDataArray({ TableData_Array: response.data.data.reportdata ? response.data.data.reportdata : [], });
            setGlobalData({ GlobalData_Array: response.data.data.global ? response.data.data.global : [], });
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            toast.error("something went wrong!");
        });
    }, []);
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Project", field: "projectname", sortable: true },
        { name: "Empoloyee", field: "invoicename", sortable: true },
        { name: "Start Time", field: "title", sortable: true },
        { name: "End Time", field: "date", sortable: true },
        { name: "Total Hours", field: "status", sortable: true },
        { name: "Earning", field: "status", sortable: true }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableDataArray.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.projectname.toLowerCase().includes(search.toLowerCase()) ||
                    comment.invoicename.toLowerCase().includes(search.toLowerCase()) 
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

    }, [TableDataArray.TableData_Array, currentPage, search, sorting]); 
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            {/* */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0">Time Log Report</h4>
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
                                    counter2 = counter2+1;      
                                return (
                                    <tr>
                                        <td>{(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}</td>
                                        <td><NavLink to={`${process.env.PUBLIC_URL}/view_details/`+val.project_id} className="">{val.project.project_name}</NavLink>{val.peojectname}</td>
                                        <td>{val.name}</td>
                                        <td>{val.start_time}</td>
                                        <td>{val.end_time}</td>
                                        <td>{val.hours}</td>
                                        <td>{val.earnings}</td>
                                    </tr>
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
            <div className="container-fluid">
                <div className="card card_dashboard card-body">
                    <Bar
                        data={{
                            animationEnabled: false,
                            duration: false,
                            labels: ['test','test','test','test'],
                            datasets: [
                                {
                                    label: 'Earning',
                                    data: [23,23,56,87],
                                    borderColor: 'rgb(28, 166, 210)',
                                    backgroundColor: 'rgb(28, 166, 210)',
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

export default TimeLogReport;
