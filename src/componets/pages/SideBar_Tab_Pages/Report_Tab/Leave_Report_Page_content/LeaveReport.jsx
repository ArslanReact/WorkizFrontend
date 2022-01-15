import React, { useState, useEffect, useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 

// 
import LeaveReportLoop from "../Leave_Report_Page_content/LeaveReportLoop";

const LeaveReport = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [fromDate, setfromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const [reportlist, setreportlist] = useState({
        reportlist_Array: []
    });
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/leave-report/'+companyid)
            .then((response) => {
                setreportlist({ reportlist_Array: response.data.leaves ? response.data.leaves : [], });
                setfromDate(response.data.fromDate);
                settoDate(response.data.toDate);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    //
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Employee", field: "name", sortable: true },
        { name: "Leaves Approved", field: "count_approved_leaves", sortable: true },
        { name: "Pending Leaves", field: "count_approved_leaves", sortable: true },
        { name: "Upcoming Leaves", field: "count_approved_leaves", sortable: true }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = reportlist.reportlist_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) 
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
            <div className="conatiner-fluid">
                <div className="card card_dashboard px-3 py-4">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0">Leave Report</h4>
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
                                return (
                                    <LeaveReportLoop
                                        key={index}
                                        id={val.id}
                                        countnumber={number}
                                        employeename={val.name}
                                        approvedLeave={(Number(val.count_approved_leaves) + Number((val.count_approved_half_leaves)) / 2)}
                                        pendingLeave={(Number(val.count_pending_leaves) + Number((val.count_pending_half_leaves)) / 2)}
                                        upcomingLeave={(Number(val.count_upcoming_leaves) + Number((val.count_upcoming_half_leaves)) / 2)}
                                        fromDate={fromDate}
                                        toDate={toDate}
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
        </>
    );
}

export default LeaveReport;
