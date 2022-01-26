import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import TopBoxesLoop from '../../../SideBar_Tab_Pages/Project-Tab/Contract_Page_content/TopBoxesLoop';
import TableContent from "../../../SideBar_Tab_Pages/Project-Tab/Contract_Page_content/TableContent";


// 
import exporticon from "../../../../../assets/images/icon_16.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";

// 
const Contract = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [CompanyArray, setCompanyArray] = useState({
        Company_Array: []
    });
    const [state] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Total Contracts",
                classnth: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "About To Expire",
                classnth: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                iconimg: top_icon_1,
                altburger: "top_icon_7",
                toptitle: "Expired",
                classnth: "nth_3",
                topnumber: "0",
            }
        ]
    });
    let temp_state = { ...state };
    const [contractdata, setcontractdata] = useState({ contractdata_Array: [] });
    const [amountcurreny, setamountcurreny] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/contracts/' + companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.contractCounts;
                temp_state.TopBoxesArray[1].topnumber = response.data.aboutToExpireCounts;
                temp_state.TopBoxesArray[2].topnumber = response.data.expiredCounts;
                setcontractdata({ contractdata_Array: response.data.tabledata ? response.data.tabledata : [], });
                setCompanyArray({ Company_Array: response.data.companydata[0] ? response.data.companydata[0] : [], });
                setamountcurreny(response.data.currency[0].currency_symbol);
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [])

    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Subject", field: "subject", sortable: true },
        { name: "Client", field: "client", sortable: true },
        { name: "Amount", field: "amount", sortable: true },
        { name: "Start Date", field: "start_date", sortable: false },
        { name: "End Date", field: "end_date", sortable: false },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = contractdata.contractdata_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.subject.toLowerCase().includes(search.toLowerCase())
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

    }, [contractdata.contractdata_Array, currentPage, search, sorting]); 
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title px-0 mb-3 mb-xl-0">Contracts</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/create_contract`} className="btn btn_blue mr-3"><img className="img-fluid mr-2" src={plusicon} alt="" />Create Contract</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn btn_white lightbluecolorbg whitecolortext fontsize14"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                    {state.TopBoxesArray.map((val) => {
                        return (
                            <TopBoxesLoop
                                key={val.key}
                                iconimg={val.iconimg}
                                altburger={val.altburger}
                                toptitle={val.toptitle}
                                classnth={val.classnth}
                                topnumber={val.topnumber}
                            />
                        )
                    })}
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-xl-0">
                            <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                            <select className="form-control transparent_form">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                            <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                        </div>
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
                <div className="table-sm-responsive data_table_profile my-4">
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
                                return (
                                    <TableContent
                                        key={index}
                                        id={val.id}
                                        cid={val.client.id}
                                        userid={val.client.role[0].user_id}
                                        count_number={number}
                                        subject={val.subject}
                                        clientdata={val.client}
                                        clientname={val.client.name}
                                        image_url={val.client.image_url}
                                        amount={val.amount}
                                        start_date={val.start_date}
                                        end_date={val.end_date}
                                        date_format={CompanyArray.Company_Array.date_format}
                                        currency={amountcurreny}
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="7" className="text-center">No Record Found</td>
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
        </>
    );
}

export default Contract;
