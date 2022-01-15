import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import { NavLink } from "react-router-dom";

// import images
import plusicon from "../../../assets/images/plusicon.svg";
import formtable_img from "../../../assets/images/formtable_img.svg";
import dateFormat from 'dateformat';
import LoadingOverlay from 'react-loading-overlay';
// import component
import ExpensesTableLoop from "../employeefinanceexpence/ExpensesTableLoop";

const FinanceExpenses = () => {
    var counter1 = -1;
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
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
        axios.get(Globalsettings.url + 'api/member/finance/data/' + companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.payments ? response.data.data.payments : [], });
                setGlobalData({ GlobalData_Array: response.data.data.globalarray[0] ? response.data.data.globalarray[0] : [], });
                setLoading(false);

            });
    }, []);

    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Item Name", field: "item_name", sortable: true },
        { name: "Price", field: "total_amount", sortable: true },
        { name: "Purchace Date", field: "purchase_date", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.item_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.total_amount.toLowerCase().includes(search.toLowerCase()) ||
                    comment.purchase_date.toLowerCase().includes(search.toLowerCase()) ||
                    comment.status.toLowerCase().includes(search.toLowerCase()) 
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
                    <div className="d-flex align-items-center">
                        <h4 className="main_title mb-0">Finance Expenses</h4>
                        <div className="ml-auto d-md-flex d-block">
                        <NavLink to={`${process.env.PUBLIC_URL}/employee_addexpenses`} className="btn btn_blue w-100 mr-2 d-flex align-items-center justify-content-center"><img className="img-fluid mr-2" src={plusicon} alt="plusicon" />Add Expenses</NavLink>
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
                <div className="table-sm-responsive data_table_radius mt-4">
                    <table className="table m-0 table-borderless table-hover">
                    <TableHeader
                                            headers={headers}
                                            onSorting={(field, order) =>
                                                setSorting({ field, order })
                                            }
                                />
                        <tbody>
                        {FinalTableData.length > 0 ?
                                    FinalTableData.map((val,index) => {
                                        counter1=counter1+1;
                                return (
                                    <ExpensesTableLoop
                                        key={val.key}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                        itemname={val.item_name}
                                        price={val.total_amount}
                                        purchacedate={dateFormat(val.purchase_date, GlobalData.GlobalData_Array.date_format)}
                                        badgetext={val.status}
                                        badgebgcolor={
                                            (() => {
                                                if (val.status == 'approved')
                                                   return "greencolortext badgegreen3bg"
                                                if (val.status == 'pending')
                                                    return "yelowcolortext badgeyellowbg"
                                                else
                                                    return "redcolortext badgeredbg"
                                            })()
                                         }
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="6" className="text-center">No Record Found!</td>
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
        </>
    )
}

export default FinanceExpenses;
