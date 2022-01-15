import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import {Button,Modal,FormControl } from "react-bootstrap";
import swal from 'sweetalert';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
import dateFormat from "dateformat";
// 
import ExpencesTableData from "../../Finance_Tab/Expences_Page_Content/ExpencesTableData";

// 
import PaymentTableData from "../../Finance_Tab/Payments_Page_Content/PaymentTableData";
import PaymentTableDataArray from "../../Finance_Tab/Payments_Page_Content/PaymentTableDataArray";

// 
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const Payments = () => {
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
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance/payments/' + companyid + '/' + userid)
            .then((response) => {
                setTableDataArray({ TableData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setGlobalData({ GlobalData_Array: response.data.data.global ? response.data.data.global : [], });
                setLoading(false);
            })
        .catch((error) => {
            setLoading(false);
            toast.error("something went wrong!");
        });
    }, [])  
    const headers = [
        { name: "Sr. No", field: "id", sortable: true },
        { name: "Invoice", field: "item_name", sortable: true },
        { name: "Project", field: "price", sortable: true },
        { name: "Amount", field: "purchase_from", sortable: true },
        { name: "Paid On", field: "name", sortable: true },
        { name: "Remark", field: "total", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableDataArray.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.project.project_name.toLowerCase().includes(search.toLowerCase())
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
    // Delete Expense
    const DeletePayment = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted payment data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/finance/payments/destroy/' + id)
                        .then(response => {
                            swal("Payment Delete Successfully!", {
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
    const ViewPayment = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/finance/payments/show/'+companyid+'/'+userid+'/'+ id)
        .then(response => {
            setEditTask(true);
            setLoading(false);
            setEdata({ Edata_Array: response.data.paymentshow ? response.data.paymentshow : [], });
        });
    }        
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Payments</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/add_payment`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Payment</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" onClick={() => exportTableToCSV('payments.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" onClick={() => exportTableToCSV('payments.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard px-3 py-4">
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
                                    <PaymentTableData
                                        key={val.key}
                                        paymentid={val.id}
                                        count_number={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                        invoicenumber={val.invoice_id == null ? "--" : val.invoice.invoice_number}
                                        projectname={val.project.project_name}
                                        amounttext={val.currency.currency_symbol+' '+val.amount}
                                        paidontext={dateFormat(val.paid_on, GlobalData.GlobalData_Array.date_format)}
                                        badgetext={val.status}
                                        badgebg={val.status == 'complete' ? 'badgegreenbg greencolortext' : 'badgeyellowbg yelowcolortext'}
                                        dashes={val.remarks}
                                        ViewPayment={ViewPayment}
                                        DeletePayment={DeletePayment}
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
            <Modal show={EditTask} onHide={() => setEditTask(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Payment details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="table-sm-responsive">
                        <table className="table mb-0 table-borderless">
                            <tbody>
                                <tr>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Invoice</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].invoice_id != null ? Edata.Edata_Array[0].invoice.original_invoice_number: '--'}</span></td>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Project</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].project.project_name}</span></td>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Status</h6><span className="badgegreenbg px-3 py-1 border-radius-100 greencolortext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].status}</span></td>
                                </tr>
                                <tr>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Amount</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].currency.currency_symbol}{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].amount}</span></td>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Gateway</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].gateway}</span></td>
                                    <td><h6 className="mb-2 blackcolortext fontsize14">Transaction Id</h6><span>{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].transaction_id}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="3"><h6 className="mb-2 blackcolortext fontsize14">Remark</h6><span className="fontsize14 d-inline-block paragraphcolor1yext">{Edata.Edata_Array.length>0 && Edata.Edata_Array[0].remarks}</span></td>
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

export default Payments;
