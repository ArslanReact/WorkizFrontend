import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert';
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
import { ToastContainer, toast } from 'react-toastify';
// 
import EstimatesTableData from "../../Finance_Tab/Estimate_Page_Content/EstimatesTableData";
const Estimates = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var id = obj.id;
    const [estimatedata, setestimatedata] = useState({
        estimatedata_array: []
    });
    const [festimatedata, setfestimatedata] = useState({
        festimatedata_array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance/estimates')
            .then((response) => {
                setestimatedata({ estimatedata_array: response.data.data ? response.data.data : [], });
                setfestimatedata({ festimatedata_array: response.data.firstEstimate ? response.data.firstEstimate : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    const headers = [
        { name: "#", field: "id", sortable: false },
        { name: "Estimates", field: "name", sortable: true },
        { name: "Client", field: "d", sortable: true },
        { name: "Total", field: "de", sortable: false },
        { name: "Valid Till", field: "dd3", sortable: false },
        { name: "Status", field: "er", sortable: false },
        { name: "Action", field: "action", sortable: false }
    ];

    const FinalTableData = useMemo(() => {
        let tabledata = estimatedata.estimatedata_array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
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

    }, [estimatedata.estimatedata_array, currentPage, search, sorting]);


        // Delete Estimate
        const DeleteEstimate = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the deleted estimate data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/finance/estimates/destroy/' + id)
                            .then(response => {
                                swal("Estimate Delete Successfully!", {
                                    icon: "success",
                                });
                                setestimatedata({ estimatedata_array: estimatedata.estimatedata_array.filter(item => item.id !== id) });
                            });
    
                    } else {
                    }
                });
        }
        // Send Estimate
        const SendEstimate = (id) => {
            setLoading(true);
            axios.get(Globalsettings.url + 'api/admin/finance/estimates/send-estimate/' + id)
            .then(response => {
                toast.success("Estimate Send Successfully!");
                setLoading(false);
                setTimeout(() => { 
                    window.location.reload();
                }, 3000)
            });
        }
        // Cancel Estimate
        const CancelEstimate = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the canceled estimate data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/finance/estimates/change-status/' + id)
                            .then(response => {
                                swal("Estimate Cancel Successfully!", {
                                    icon: "success",
                                });
                                setTimeout(() => { 
                                    window.location.reload();
                                }, 3000)
                            });
    
                    } else {
                    }
                });
        }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Estimates</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/create_estimate`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Create Estimate</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" onClick={() => exportTableToCSV('estimate.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" onClick={() => exportTableToCSV('estimate.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
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
                    {/*  */}
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
                                let number = index +1;
                                return (
                                    <EstimatesTableData
                                        key={index}
                                        count_number={number}
                                        festimateid={festimatedata.festimatedata_array.id}
                                        estimateid={val.id}
                                        estimateno={val.original_estimate_number}
                                        clientname={val.name}
                                        price={val.total_amount}
                                        validtil={val.valid_date}
                                        status={val.status}
                                        send_status={val.send_status}
                                        DeleteEstimate={DeleteEstimate}
                                        CancelEstimate={CancelEstimate}
                                        SendEstimate={SendEstimate}
                                        statusbg={
                                            (() => {
                                                if (val.status == 'waiting')
                                                   return "yelowcolortext badgeyellowbg"
                                                if (val.status == 'draft')
                                                   return "bluecolortext badgebluebg"
                                                if (val.status == 'canceled')
                                                   return "bluecolortext badgebluebg"
                                                if (val.status == 'declined')
                                                   return "redcolortext badgeredbg"
                                                else 
                                                    return "greencolortext badgegreenbg"
                                            })()
                                         }
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

export default Estimates;
