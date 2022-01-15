import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import {Button,Modal } from "react-bootstrap";
import swal from 'sweetalert';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 

// 
import ExpencesRecurringDataTable from "../../Finance_Tab/Expences_Page_Content/ExpencesRecurringDataTable";
import ExpencesRecurringDataTable_Array from "../../Finance_Tab/Expences_Page_Content/ExpencesRecurringDataTable_Array";

// 
import plusblackicon from "../../../../../assets/images/plusblackicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";

const ExpencesRecurring = () => {
    const [EditTask, setEditTask] = React.useState(false);
    var counter2 = -1;
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableDataArray, setTableDataArray] = useState({
        TableData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/expenses-recurring/' + companyid + '/' + userid)
            .then((response) => {
                setTableDataArray({ TableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    const headers = [
        { name: "Sr. No", field: "id", sortable: true },
        { name: "Item Name", field: "item_name", sortable: true },
        { name: "Price", field: "price", sortable: true },
        { name: "Purchased From", field: "purchase_from", sortable: true },
        { name: "Employee", field: "name", sortable: true },
        { name: "Purchased Date", field: "total", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableDataArray.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.item_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.price.toLowerCase().includes(search.toLowerCase()) ||
                    comment.purchase_from.toLowerCase().includes(search.toLowerCase())
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
    // Update Lead Status
    const Updatestatus = (id, s) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/finance/expenses-recurring/change-status', {
            expenseId: id,
            status: s
        })
        .then(response => {

            axios.get(Globalsettings.url + 'api/admin/expenses-recurring/' + companyid + '/' + userid)
            .then((response) => {
                setTableDataArray({ TableData_Array: response.data.data ? response.data.data : [], });
                toast.success("Expense Recuring Status Successfully Update!");
                setLoading(false)
            })
        });
    }  
    // Delete Expense
    const DeleteExpense = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted expense recuring data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/finance/expenses-recurring/destroy/' + id)
                        .then(response => {
                            swal("Expense Recurring Delete Successfully!", {
                                icon: "success",
                            });
                            setTableDataArray({ TableData_Array: TableDataArray.TableData_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }     
    const [Edata, setEdata] = useState({
        Edata_Array: []
    });
    // View Expense
    const ViewExpense = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/expenses/show/'+companyid+'/'+userid+'/'+ id)
        .then(response => {
            setEditTask(true);
            setLoading(false);
            setEdata({ Edata_Array: response.data.expense ? response.data.expense : [], });
        });
    }         
    return (
        <>
                    <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Expences Recurring</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/add_recurring_expences`} className="btn btn_blue bg-white blackcolortext mr-2"><img className="img-fluid" src={plusblackicon} alt="" /> Add Recurring Expences </NavLink>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink to="#" onClick={() => exportTableToCSV('expensesrecuring.csv')}  className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink to="#" onClick={() => exportTableToCSV('expensesrecuring.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Employees</th>
                                <th scope="col">Cradit On</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {FinalTableData.length > 0 ?  
                                FinalTableData.map((val, index) => {
                                    let number = index + 1;
                                    counter2 = counter2+1;      
                                return (
                                    <ExpencesRecurringDataTable
                                        key={val.key}
                                        exid={val.id}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                        itemname={val.item_name}
                                        price={val.currency_symbol+''+val.price}
                                        employeesname={val.name}
                                        createdon={val.created_on}
                                        status_text={val.status}
                                        Updatestatus={Updatestatus}
                                        DeleteExpense = {DeleteExpense}
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

export default ExpencesRecurring;
