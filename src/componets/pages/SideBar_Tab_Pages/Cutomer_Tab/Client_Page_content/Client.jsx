import React, { useState, useEffect, useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
// 
import ClientData from "../../Cutomer_Tab/Client_Page_content/ClientData";

const Client = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [ClientDataArray, setClientDataArray] = useState({
        ClientDataArray_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/clients/'+companyid)
            .then((response) => {
                setClientDataArray({ ClientDataArray_Array: response.data.clientdata ? response.data.clientdata : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    // Delete Client
    const DeleteClient = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted client data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/clients/destroy/' + id)
                        .then(response => {
                            swal("Client Delete Successfully!", {
                                icon: "success",
                            });
                            setClientDataArray({ ClientDataArray_Array: ClientDataArray.ClientDataArray_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Company", field: "company_name", sortable: true },
        { name: "Email", field: "email", sortable: false },
        { name: "Created", field: "created_at", sortable: false },
        { name: "Action", field: "action", sortable: false }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = ClientDataArray.ClientDataArray_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.created_at.toLowerCase().includes(search.toLowerCase())|| 
                    comment.company_name.toLowerCase().includes(search.toLowerCase()) 
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

    }, [ClientDataArray.ClientDataArray_Array, currentPage, search, sorting]);
    return (
        <>
            <React.Fragment>
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-flex align-items-center">
                        <h4 className="main_title">Clients</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to={`${process.env.PUBLIC_URL}/add_new_client`} className="btn btn_blue mr-3"><img className="img-fluid mr-2" src={plusicon} alt="" />Add New Client</NavLink>
                            <NavLink to="#" className="btn lightbluecolorbg whitecolortext fontsize14" data-bs-toggle="dropdown"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export Client </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink to="#" onClick={() => exportTableToCSV('client.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink to="#" onClick={() => exportTableToCSV('client.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard card-body">
                        <div className="d-flex align-items-center mb-4">
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
                        <div className="table-sm-responsive clent_data_table">
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
                                            <ClientData
                                                key={index}
                                                countnumber={number}
                                                cid={val.id}
                                                userid={val.user_id}
                                                name={val.name}
                                                company={val.company_name}
                                                email={val.email}
                                                date={val.created_at}
                                                DeleteClient={DeleteClient}
                                            />
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6" className="text-center">No Record Found</td>
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
                </div>
            </React.Fragment>
        </>
    );
}

export default Client;
