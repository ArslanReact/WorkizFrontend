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
import ExpencesTableData from "../../Finance_Tab/Expences_Page_Content/ExpencesTableData";

// 
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import avatarimg from "../../../../../assets/images/avatar_01.svg";

const Expences = () => {
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
        axios.get(Globalsettings.url + 'api/admin/expenses/' + companyid + '/' + userid)
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
        axios.post(Globalsettings.url + 'api/admin/finance/expenses/change-status', {
            expenseId: id,
            status: s
        })
        .then(response => {

            axios.get(Globalsettings.url + 'api/admin/expenses/' + companyid + '/' + userid)
            .then((response) => {
                setTableDataArray({ TableData_Array: response.data.data ? response.data.data : [], });
                toast.success("Expense Status Successfully Update!");
                setLoading(false)
            })
        });
    }  
    // Delete Expense
    const DeleteExpense = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted expense data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/finance/expenses/destroy/' + id)
                        .then(response => {
                            swal("Expense Delete Successfully!", {
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
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Expense</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/expences_recurring`} className="bg-white blackcolortext btn btn_blue mr-3"> Expence Recurring</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_expences`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Expence</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" onClick={() => exportTableToCSV('expenses.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" onClick={() => exportTableToCSV('expenses.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-flex align-items-center">
                        <div className="ml-auto">
                                <Search
                                    onSearch={value => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                />
                        </div>
                    </div>
                    {/*  */}
                </div>
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
                                    <ExpencesTableData
                                        key={index}
                                        exid={val.id}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                        itemname={val.item_name}
                                        pricename={val.currency_symbol+''+val.price}
                                        purchasedfromname={val.purchase_from}
                                        empolyeename={val.name}
                                        purchaseddatename={val.purchase_date}
                                        status_text={val.status}
                                        status_color={val.status_color}
                                        Updatestatus = {Updatestatus}
                                        DeleteExpense = {DeleteExpense}
                                        ViewExpense = {ViewExpense}
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
            <Modal show={EditTask} onHide={() => setEditTask(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Expenses Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="table-sm-responsive">
                        <table className="table mb-0 table-border">
                            <tbody>
                                <tr>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Item Name</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.item_name}</span></td>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Price</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.total_amount}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Employee</h6><span className="fontsize14 d-inline-block paragraphcolor1yext d-flex align-items-center">{Edata.Edata_Array.user ? <><img className="img-fluid mr-2 avatar"  width="45" src={Edata.Edata_Array.user.image_url} alt="" /><p>{Edata.Edata_Array.user.name}</p> </>: "N/A"}</span></td>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Purchase Date</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.purchase_on}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Purchased From</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.purchase_from}</span></td>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Status</h6><span className="badgegreenbg px-3 py-1 border-radius-100 greencolortext">{Edata.Edata_Array.status}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setEditTask(false)}>Close</Button>
                </Modal.Footer>
            </Modal>            
        </>
    );
}

export default Expences;
