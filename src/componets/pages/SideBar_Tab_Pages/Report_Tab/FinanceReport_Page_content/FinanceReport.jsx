import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Bar } from 'react-chartjs-2';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import FinanceReportTableLoop from "../FinanceReport_Page_content/FinanceReportTableLoop";
import FinanceReportTableLoop_Array from "../FinanceReport_Page_content/FinanceReportTableLoop_Array";

// 

const FinanceReport = () => {
    var counter2 = -1;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [isLoading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 10;
    const [TableDataArray, setTableDataArray] = useState({
        TableData_Array: []
    });
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/reports/finance-report/' + companyid + '/' + userid)
            .then((response) => {
                setTableDataArray({ TableData_Array: response.data.data.reportdata ? response.data.data.reportdata : [], });
                setGlobalData({ GlobalData_Array: response.data.data.global ? response.data.data.global : [], });
                setLoading(false);
            })
        .catch((error) => {
            setLoading(false);
            toast.error("something went wrong!");
        });
    }, []) 
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Project", field: "projectname", sortable: true },
        { name: "invoices", field: "invoicename", sortable: true },
        { name: "Amount", field: "amount", sortable: true },
        { name: "Paid On", field: "paidon", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Remark", field: "remark", sortable: true }
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
                        <h4 className="main_title m-0"> Finance Report</h4>
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
                                    <FinanceReportTableLoop
                                        key={val.key}
                                        project_id = {val.project_id}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                        projectname={val.project.project_name}
                                        invoicename={val.invoice_id == null ? "--" : val.invoice.invoice_number}
                                        amount={val.currency.currency_symbol+""+val.amount}
                                        paidon={val.paid_date}
                                        badgetext={val.status}
                                        badgebgcolor={val.badgebgcolor}
                                        remark={val.remarks}
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="8" className="text-center">No Record Found</td>
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
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
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
        </>
    );
}

export default FinanceReport;
