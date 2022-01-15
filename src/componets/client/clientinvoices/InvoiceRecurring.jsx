import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';


const InvoiceRecurring = () => {
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
        axios.get(Globalsettings.url + 'api/client/invoice-recurring/'+ companyid+'/'+userid)
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
        { name: "Currency", field: "name", sortable: true },
        { name: "Amount", field: "total", sortable: true },
        { name: "Invoice Date", field: "issue_date", sortable: true },
        { name: "Status", field: "status", sortable: true }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = InvoiceData.InvoiceData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.project_name.toLowerCase().includes(search.toLowerCase()) 
                    
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
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title">Recurring Invoices</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/client_invoice`} className="btn btn_blue border_blue_2"> Invoice</NavLink>
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
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.project_name}</td>
                                        
                                        <td>{val.currency_symbol} ({val.currency_code})</td>
                                        <td>{val.total_amount}</td>
                                        <td>{val.issue_on}</td>
                                        <td>{val.status}</td>
                                        {/* <td>
                                            <NavLink to={`${process.env.PUBLIC_URL}/viewdetail/`+val.id} className="btn btn_blue border_blue_2 text-white">View</NavLink>
                                        </td> */}
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

export default InvoiceRecurring;
