import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';
import { Form, FormLabel } from "react-bootstrap";


const ClientPayment = () => {
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [ProjectID, setProjectID] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [projects, setprojects] = useState({
        projects_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/payments/data/'+ companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.payments ? response.data.data.payments : [], });
                setprojects({ projects_Array: response.data.data.projects ? response.data.data.projects : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Product", field: "project_name", sortable: true },
        { name: "Amount", field: "total", sortable: true },
        { name: "Transaction ID", field: "issue_date", sortable: true },
        { name: "Paid On", field: "status", sortable: true },
        { name: "Remark", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);  
    // Insert Client
    const submitfilter = (evt) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/payments/data/'+ companyid+'/'+userid+'?startDate='+StartDate+'&endDate='+EndDate+'&project='+ProjectID).then((response) => {
            setTableData({ TableData_Array: response.data.data.payments ? response.data.data.payments : [], });
            setLoading(false);
        });
        evt.preventDefault();
    }
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            {/*  */}
            <div className="container-fluid mb-4">
                {/*  */}
                <div className="card card_dashboard card-body mb-4">
                    <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title m-0">Payments</h4>
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
                <div className="card card_dashboard card-body mb-4">
                    <h4 className="main_title mb-4">Filter by</h4>
                    <Form onSubmit={submitfilter}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-4 mb-xl-0">
                            <FormLabel className="mb-2 lightgraycolortext fontweightregular">Select Date Range</FormLabel>
                            <div className="all_calendar">
                                    <div class="input-group date">
                                        <Form.Control className="border_lightbluecolor_1" type="date" value={StartDate} onChange={e => setStartDate(e.target.value)} />
                                        <div className="input-between-date">
                                            TO
                                        </div>
                                        <Form.Control className="border_lightbluecolor_1" type="date" value={EndDate} onChange={e => setEndDate(e.target.value)} />
                                        
                                    </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12">
                            <FormLabel className="mb-2 lightgraycolortext fontweightregular">Project</FormLabel>
                            <Form.Select aria-label="Default select example" value={ProjectID} onChange={(e) => setProjectID(e.target.value)}>
                                <option value="all">All</option>
                                {projects.projects_Array.map((val) => {
                                    return(
                                        <option value={val.id}>{val.project_name}</option>
                                    );
                                })}
                            </Form.Select>
                        </div>
                        <div className="col-xl-2 col-lg-2" style={{'margin-top':'28px'}}>
                            <button type="submit" className="btn_calendar">Apply</button>
                        </div>
                    </div>
                    </Form>
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
                                        <td>{val.project_id}</td>
                                        <td><NavLink to={`${process.env.PUBLIC_URL}/client_viewdetails/`+val.project_id}>{val.project_name}</NavLink></td>
                                        <td>{val.currency_symbol} {val.total_amount} ({val.currency_code})</td>
                                    
                                        <td>{val.transaction_id}</td>
                                        <td>{val.paid_date}</td>
                                        <td>{val.remarks}</td>
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
        </>
    )
}

export default ClientPayment;
