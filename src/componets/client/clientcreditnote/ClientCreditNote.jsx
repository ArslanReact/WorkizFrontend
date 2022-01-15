import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';


// import component
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
const ClientCreditNote = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 4;
    const [modalShow, setModalShow] = useState(false);
    const [dateformat, setdateformat] = useState('');
    const [projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/credit-notes/' + companyid + '/' + uid)
            .then((response) => {
                setprojectsdata({ projectsdata_Array: response.data.data.invoices ? response.data.data.invoices : [], });
                setdateformat(response.data.data.global.date_format)
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [companyid, uid])

    const headers = [
        { name: "ID", field: "id", sortable: false },
        { name: "Credit Note", field: "name", sortable: true },
        { name: "Invoice", field: "price", sortable: true },
        { name: "Currency", field: "action", sortable: false },
        { name: "Amount", field: "action", sortable: false },
        { name: "Invoice Date", field: "action", sortable: false },
        { name: "Status", field: "action", sortable: false },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = projectsdata.projectsdata_Array;
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

    }, [projectsdata.projectsdata_Array, currentPage, search, sorting]);    
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex bg-white py-3 px-3 border-radius-10 align-items-center mb-4">
                    <h4 className="main_title m-0">Credit Note</h4>
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
            <div className="container-fluid mb-4">
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
                                        <td>{index+1}</td>
                                        <td>{val.s}</td>
                                        <td>{val.starttime}</td>
                                        <td>{val.endtime}</td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="8" className="text-center"> No Record Found</td>
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
                {/*  */}

            </div>
        </>
    )
}

export default ClientCreditNote;
