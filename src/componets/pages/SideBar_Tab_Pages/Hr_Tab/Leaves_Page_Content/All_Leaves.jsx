import React, { useState, useEffect,useMemo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import UpdtaeNumber from "../../Hr_Tab/Leaves_Page_Content/UpdtaeNumber";
import UpdtaeNumber_Array from "../../Hr_Tab/Leaves_Page_Content/UpdtaeNumber_Array";
import AllLeavesData from "../../Hr_Tab/Leaves_Page_Content/AllLeavesData";
import swal from 'sweetalert';
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";


const All_Leaves = () => {
    const history = useHistory();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [AllLeave, setAllLeave] = useState({
        AllLeave_Array: []
    });
    const [date_format, setdate_format] = useState('');
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/leave/all-leaves/' + companyid)
            .then((response) => {
                setAllLeave({ AllLeave_Array: response.data.leavesList ? response.data.leavesList : [], });
                setdate_format(response.data.companydata.date_format);
            })
            .catch(function (error) {
                history.push('/all_leaves')
            });
    }, []);

    const leaveAccept = (id) => {
        axios.post(Globalsettings.url + 'api/admin/leaves/leaveAction', {
            leaveId: id,
            action: "approved",
        })
            .then((response) => {
                toast.success("Leave Successfully Accepted Mark!");
                axios.get(Globalsettings.url + 'api/admin/leave/all-leaves/' + companyid)
                    .then((response) => {
                        setAllLeave({ AllLeave_Array: response.data.leavesList ? response.data.leavesList : [], });
                        setdate_format(response.data.companydata.date_format);
                    });
            })
            .catch((error) => {
            });
    }
    const leaveReject = (id, leavereason) => {
        axios.post(Globalsettings.url + 'api/admin/leaves/leaveAction', {
            leaveId: id,
            action: "rejected",
            reason: leavereason
        })
            .then((response) => {
                toast.success("Leave Successfully Rejected Mark!");
                axios.get(Globalsettings.url + 'api/admin/leave/all-leaves/' + companyid)
                    .then((response) => {
                        setAllLeave({ AllLeave_Array: response.data.leavesList ? response.data.leavesList : [], });
                        setdate_format(response.data.companydata.date_format);
                    });
            })
            .catch((error) => {
            });
    }
    const leaveDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted leave data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/leaves/destroy/' + id)
                        .then((response) => {
                            toast.success("Leave Successfully Delete!");
                            setAllLeave({ AllLeave_Array: AllLeave.AllLeave_Array.filter(item => item.id !== id) });
                        })
                        .catch((error) => {
                        });
                } else {
                }
            });
    }
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Employee", field: "name", sortable: true },
        { name: "Leaves Date", field: "leave_date", sortable: true },
        { name: "Leave Status", field: "status", sortable: true },
        { name: "Leave Type", field: "type_name", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = AllLeave.AllLeave_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase())||
                    comment.leave_date.toLowerCase().includes(search.toLowerCase())||
                    comment.status.toLowerCase().includes(search.toLowerCase())||
                    comment.type_name.toLowerCase().includes(search.toLowerCase())
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

    }, [AllLeave.AllLeave_Array, currentPage, search, sorting]); 
    return (
        <>
            <ToastContainer />
            <div className="container-fluid top-boxes mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title d-flex mb-3 mb-xl-0">All Leaves {UpdtaeNumber_Array.map((val) => { return (<UpdtaeNumber key={val.key} count_number={val.count_number} />) })}</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/calendar_leaves`} className="btn bg-white mr-3 blackcolortext btn_blue"><img className="img-fluid mr-2" src={calendaricon} alt="" /> Calendar View </NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/assign_leaves`} className="btn btn_blue"><img className="img-fluid" src={plusicon} alt="" /> Assign Leave</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
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
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0">
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                        <tbody>
                            {FinalTableData.length > 0
                                ?
                                FinalTableData.map((val, index) => {
                                    let number = index + 1;
                                    return (
                                        <AllLeavesData
                                            key={index}
                                            countnumber={number}
                                            title={val.name}
                                            lid={val.id}
                                            leavedate={val.leave_date}
                                            date_format={date_format}
                                            leavestatus_badgebg={val.status === 'pending' ? "badgeyellowbg badgeyellowcolor" : "badgegreenbg badgegreencolor"}
                                            leavestatus_badgetext={val.status}
                                            leavestype_badgebg={val.color === 'Sick' ? "badgegreenbg badgegreencolor" : "badgeyellowbg badgeyellowcolor"}
                                            leavestype_badgetext={val.type_name}
                                            leaveAccept={leaveAccept}
                                            leaveReject={leaveReject}
                                            leaveDelete={leaveDelete}
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
            {/*  */}
        </>
    )
}

export default All_Leaves;
