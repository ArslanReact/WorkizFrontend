import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';


const ClientInvoice = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [InvoiceData, setInvoiceData] = useState({
        InvoiceData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/invoices/'+ companyid+'/'+userid)
            .then((response) => {
                setInvoiceData({ InvoiceData_Array: response.data.invoices ? response.data.invoices : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Project Name", field: "project_name", sortable: true },
        { name: "Invoice", field: "original_invoice_number", sortable: true },
        { name: "Currency", field: "name", sortable: true },
        { name: "Amount", field: "total", sortable: true },
        { name: "Invoice Date", field: "issue_date", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = InvoiceData.InvoiceData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.project_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.original_invoice_number.toLowerCase().includes(search.toLowerCase()) 
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

    }, [InvoiceData.InvoiceData_Array, currentPage, search, sorting]);
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
        <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-xl-0">
                            <h4 className="main_title m-0">Invoice</h4>
                        </div>
                        <div className="ml-auto d-md-flex d-block">
                            <div className="btn-group ml-auto mb-3 mb-md-0">
                                <NavLink to={`${process.env.PUBLIC_URL}/client_recurring`} className="btn btn_blue border_blue_2 w-170px d-flex align-items-center justify-content-center mr-2"> Recurring Invoice</NavLink>
                            </div>
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
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.project_name}</td>
                                        <td><NavLink to={`${process.env.PUBLIC_URL}/viewdetail/`+val.id} className="text_decoration_none">{val.original_invoice_number}</NavLink></td>
                                        <td>{val.currency_symbol} ({val.currency_code})</td>
                                        <td>{val.total}</td>
                                        <td>{val.issue_on}</td>
                                        <td>{val.status}</td>
                                        <td>
                                            <a href={Globalsettings.url+"api/client/invoices/download/"+companyid+'/'+userid+'/'+val.id} className="btn btn_blue border_blue_2 text-white">Download</a>
                                        </td>
                                    </tr>
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
                {/*  */}
                <div className="row align-items-center mt-4">
                    <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    /> 
                </div>
            </div>
            {/*  */}
        </>
    )
}

export default ClientInvoice;
