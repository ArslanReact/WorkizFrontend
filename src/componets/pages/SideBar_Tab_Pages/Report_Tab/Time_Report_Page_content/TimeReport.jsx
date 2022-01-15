import React, { useEffect,useMemo, useState } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { Bar } from 'react-chartjs-2';
// 
import TimeReportTableLoop from "../Time_Report_Page_content/TimeReportTableLoop";
import TimeReportTableLoop_Array from "../Time_Report_Page_content/TimeReportTableLoop_Array";

// 


const TimeLogReport = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/time-log-report/' + companyid + '?startDate=16-01-2020&endDate=15-09-2021&employee=all')
            .then((response) => { })
            .catch((error) => {
                //  history.push('/signin');
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
        let tabledata = TimeReportTableLoop_Array;
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

    }, [TimeReportTableLoop_Array, currentPage, search, sorting]); 
    return (
        <>
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
                                return (
                                    <TimeReportTableLoop
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        projectname={val.projectname}
                                        invoicename={val.invoicename}
                                        amount={val.amount}
                                        paidon={val.paidon}
                                        badgetext={val.badgetext}
                                        badgebgcolor={val.badgebgcolor}
                                        remark={val.remark}
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
