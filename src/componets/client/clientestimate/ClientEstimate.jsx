import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';
import { Form, FormLabel } from "react-bootstrap";
// import images
import formtable_img from "../../../assets/images/formtable_img.svg";

// import component
import ClientEstimateLoop from "../clientestimate/ClientEstimateLoop";

const ClientEstimate = () => {
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/estimates/'+ companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.invoices ? response.data.data.invoices : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Estimate", field: "original_estimate_number", sortable: true },
        { name: "Total", field: "total", sortable: true },
        { name: "Valid Till", field: "issue_date", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Remark", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.original_estimate_number.toLowerCase().includes(search.toLowerCase()) 
                    
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);    
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0">Estimates</h4>
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
                                    <ClientEstimateLoop
                                        key={val.key}
                                        eid={val.id}
                                        countnumber={index+1}
                                        estiname={val.original_estimate_number}
                                        totalamount={val.total_amount}
                                        vildtill={val.valid_date}
                                        badgebgcolor={val.badgebgcolor}
                                        badgetext={val.status}
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
                {/*  */}
                <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    /> 
            </div>
        </>
    )
}

export default ClientEstimate;
