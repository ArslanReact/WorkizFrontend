import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 

// 
import InvoiveTableData from "../../Finance_Tab/Invoices_Page_Content/InvoiveTableData";

// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const Invoice = () => {
    var counter2 = -1;
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [InvoiveTableDataArray, setInvoiveTableDataArray] = useState({
        InvoiveTableData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var type = obj.user_other_role;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance/all-invoices/' + type + '/' + companyid)
            .then((response) => {
                setInvoiveTableDataArray({ InvoiveTableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])

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
                <ToastContainer closeButton={true} position="top-right" />
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title mb-3 mb-xl-0">Invoice</h4>
                        <div className="btn-group ml-auto">
                            <NavLink to={`${process.env.PUBLIC_URL}/recurring_invoice`} className="btn btn_blue bg-white blackcolortext mr-2"> Recurring Invoice</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/add_invoice`} className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Add Invoice</NavLink>
                            <div className="btn-group ml-auto dropdown for_all">
                                <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <NavLink to="#" onClick={() => exportTableToCSV('invoices.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                    <NavLink to="#" onClick={() => exportTableToCSV('invoices.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                                </ul>
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
                        <table className="table m-0">
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
                        </table>
                    </div>
                    <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    />                    
                </div>
            </React.Fragment>
        </>
    )
}

export default Invoice;
