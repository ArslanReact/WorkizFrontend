import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';

// import images
import formtable_img from "../../../assets/images/formtable_img.svg";

// import component

import Button from '@restart/ui/esm/Button';

const ClientCreditNote = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [ContractData, setContractData] = useState({
        ContractData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/contracts/data/'+ companyid+'/'+userid)
            .then((response) => {
                setContractData({ ContractData_Array: response.data.data.contract ? response.data.data.contract : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Subject", field: "subject", sortable: true },
        { name: "Contract Type", field: "name", sortable: true },
        { name: "Amount", field: "amount", sortable: true },
        { name: "Start Date", field: "start_date", sortable: true },
        { name: "End Date", field: "end_date", sortable: true },
        { name: "Signature", field: "signature", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = ContractData.ContractData_Array;
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

    }, [ContractData.ContractData_Array, currentPage, search, sorting]);
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0">Contracts</h4>
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
                                FinalTableData.map((val,index) => {
                                  var  object = val.contract_type;
                                return (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>{val.subject}</td>
                                        <td>{object.name}</td>
                                        <td>{val.original_amount}</td>
                                        <td>{val.start_date}</td>
                                        <td>{val.end_date}</td>
                                        <td>{val.signature == '' ? 'Not Signed' : 'Signed'}</td>
                                        <td><NavLink to={`${process.env.PUBLIC_URL}/viewcontract/`+val.id} className="btn btn_blue text-white">View</NavLink></td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="8" className="text-center">No Record Found!</td>
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

export default ClientCreditNote;
