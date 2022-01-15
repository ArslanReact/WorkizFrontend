import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";

// 
import AttendanceReportLoop from "../../Report_Tab/AttendanceReport_Page_content/AttendanceReportLoop";
import top_icon_2 from "../../../../../assets/images/top_icon_2.svg";
// 

const AttendanceReport = () => {
    const [totalworkingdays, settotalworkingdays] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [reportlist, setreportlist] = useState({
        reportlist_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/attendance-report/'+companyid)
            .then((response) => {
                setreportlist({ reportlist_Array: response.data.summaryData ? response.data.summaryData : [], });
                settotalworkingdays(response.data.totalDays);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Employee", field: "name", sortable: true },
        { name: "Present", field: "present_days", sortable: true },
        { name: "Absent", field: "absent_days", sortable: true },
        { name: "Hours Clocked", field: "hours_clocked", sortable: true },
        { name: "Days Late", field: "late_day_count", sortable: true },
        { name: "Half Day", field: "half_day_count", sortable: true }
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
            {/*  */}
            <div className="conatiner-fluid ">
                <div className="card card_dashboard px-3 py-4 mb-4">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0">Attendance Report</h4>
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
                <div className="container-fluid top-boxes mb-4">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card card_dashboard p-4">
                                <div className="d-flex align-items-center h-100">
                                    <div className="ellipse_circle mr-5 nth_1"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                    <div className="">
                                        <p className="m-0 lightgraycolortext">Total Working Days</p>
                                        <h6 className="fontweightbold paragraphcolortext">{totalworkingdays}</h6>
                                    </div>
                                </div>
                            </div>
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
                                        <AttendanceReportLoop
                                            key={index}
                                            countnumber={number}
                                            employeename={val.name}
                                            presenttext={val.present_days}
                                            absenttext={val.absent_days}
                                            hourtime={val.hours_clocked}
                                            days={val.late_day_count}
                                            halfdays={val.half_day_count}
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

export default AttendanceReport;
