import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 

// 
import RecuringDataTableLoop from "../../Finance_Tab/Invoices_Page_Content/RecuringDataTableLoop";
import RecuringDataTableLoop_Array from "../../Finance_Tab/Invoices_Page_Content/RecuringDataTableLoop_Array";

// 
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";

const RecurringInvoice = () => {
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
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance/invoice-recurring/' + companyid + '/' + userid)
            .then((response) => {
                setInvoiveTableDataArray({ InvoiveTableData_Array: response.data.data.RecurringInvoice ? response.data.data.RecurringInvoice : [], });
                setLoading(false);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Client", field: "invoice_number", sortable: true },
        { name: "Project", field: "project_name", sortable: true },
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
                    
                    comment.project.project_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.project.client.name.toLowerCase().includes(search.toLowerCase()) ||
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
       // Update Change Status
       const Updatestatus = (id, s) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/finance/invoice-recurring/change-status', {
            invoiceId: id,
            status: s
        })
        .then(response => {

            axios.get(Globalsettings.url + 'api/admin/finance/invoice-recurring/' + companyid + '/' + userid)
            .then((response) => {
                setInvoiveTableDataArray({ InvoiveTableData_Array: response.data.data.RecurringInvoice ? response.data.data.RecurringInvoice : [], });
                toast.success("Expense Status Successfully Update!");
                setLoading(false)
            })
        });
    }      
       // Update Lead Status
       const DeleteInv = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted recuring invoice data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/invoice-recurring/destroy/' + id)
                        .then(response => {
                            swal("Recuring Invoice Delete Successfully!", {
                                icon: "success",
                            });
                            setInvoiveTableDataArray({ InvoiveTableData_Array: InvoiveTableDataArray.InvoiveTableData_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }      
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Recurring Invoices</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/add_recuringinvoice`} className="btn btn_blue bg-white blackcolortext mr-2"><img className="img-fluid" src={plusblackicon} alt="" /> Create Add Recurring Invoice </NavLink>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink to="#" onClick={() => exportTableToCSV('recuring-invoices.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink to="#" onClick={() => exportTableToCSV('recuring-invoices.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
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
                <div className="table-sm-responsive data_table_profile">
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
                                    <RecuringDataTableLoop
                                        key={val.key}
                                        invid={val.id}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                        projectname={val.project.project_name}
                                        totaltext={val.currency.currency_symbol+""+val.total}
                                        clientname={val.project.client.name}
                                        invoicedate={val.issue_date}
                                        status_color={val.status_color}
                                        status={val.status}

                                        Updatestatus={Updatestatus}
                                        DeleteInv={DeleteInv}
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
            </div>
        </>
    )
}

export default RecurringInvoice;
