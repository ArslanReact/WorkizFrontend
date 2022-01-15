import React, { useState, useEffect,useMemo} from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import swal from 'sweetalert';
import { Doughnut } from 'react-chartjs-2';
// import images
import plusicon from "../../../assets/images/plusicon.svg";
import arrowdown from "../../../assets/images/arrowdown.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import viewiconimg from "../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../assets/images/deleteiconimg.svg";
import dateFormat from 'dateformat';
// impot cpmponent
import EmployeeLeavesTable from "../employeeleaves/EmployeeLeavesTable";
import LoadingOverlay from 'react-loading-overlay';
const EmployeeLeaves = () => {
    // Doughnut
    const data1 = {
        labels: ['Total Leave', 'Leave Taken'],
        datasets: [
            {
                label: '# of Votes',
                data: [61, 3],
                backgroundColor: [
                    'rgb(101, 131, 254)',
                    'rgb(72, 238, 249)',
                ],
                borderWidth: 0,
            },
        ],
    };
    const [isLoading, setLoading] = useState(true);
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    var counter1 = -1;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
 
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [leaveTypes, setleaveTypes] = useState({
        leaveTypes_Array: []
    });
    const [employeeLeavesQuota, setemployeeLeavesQuota] = useState({
        employeeLeavesQuota_Array: []
    });
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/leaves/' + companyid+'/'+userid)
            .then((response) => {
                setleaveTypes({ leaveTypes_Array: response.data.data.leaveTypes ? response.data.data.leaveTypes : [], });
                setTableData({ TableData_Array: response.data.data.leaves ? response.data.data.leaves : [], });
                setGlobalData({ GlobalData_Array: response.data.data.globalarray[0] ? response.data.data.globalarray[0] : [], });
                setLoading(false);
                
            });
    }, []);   
    
    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Leave Type", field: "type_name", sortable: true },
        { name: "Date", field: "company_name", sortable: true },
        { name: "Status", field: "amount", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.type.type_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.leave_date.toLowerCase().includes(search.toLowerCase()) 
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

    // Delete Notice Board
    const DeleteLeave = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted leave data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/member/leave/destroy/' + id)
                        .then(response => {
                            swal("Leave Delete Successfully!", {
                                icon: "success",
                            });
                        });
                    setTableData({ TableData_Array: TableData.TableData_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }    
    // View Leave Data
    const [LeaveViewData, setLeaveViewData] = useState({
        LeaveViewData_Array: []
    });
    const [username, setusername] = useState('');
    const [ltype, setltype] = useState('');
    const ViewLeaveData = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/member/leaves/show/'+ companyid+'/'+userid+'/'+ id)
        .then(response => {
            setLeaveViewData({ LeaveViewData_Array: response.data.data.leave ? response.data.data.leave : [], });
            setusername(response.data.data.name)
            setltype(response.data.data.type)
            setModalShowAddFllow(true);
            setLoading(false);
        });
        
    }    
    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title"> Leaves</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/Employee_applyleaves`} className="btn btn_blue mr-2"><img className="img-fluid" src={plusicon} alt="" /> Apply Leave</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                {Object.entries(leaveTypes.leaveTypes_Array).map(([key, val]) => {
                        var bgcolor = 'nth_5';
                        if(val.color == 'success'){
                                bgcolor = 'nth_5';
                        }else if(val.color == 'danger'){
                            bgcolor = 'nth_6';
                        }else if(val.color == 'info'){
                            bgcolor = 'nth_2';
                        }else if(val.color == 'warning'){
                            bgcolor = 'nth_4';
                        }
                        return (
                            <div className="col-xl-4 col-lg-6 mb-3">
                                <div className="card card_dashboard p-4">
                                    <div className="d-flex align-items-center h-100">
                                        <div className={"ellipse_circle " + bgcolor}><h4 className="fontsize22 m-0 white_text_color">{val.no_of_leaves}</h4></div>
                                        <div className="ml-3">
                                            <p className="m-0 lightgraycolortext fontweightmeduim">{val.type_name }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>            
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card card_dashboard card-body">
                            <Doughnut className="data1" height={'40px'} width={'40px'} data={data1} />
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div>
            <div className="container-fluid mb-4">
                
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
                <div className="data_table_radius">
                    <Table hover responsive={'sm'} className="m-0">
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
                                    <EmployeeLeavesTable
                                        key={val.key}
                                        lid={val.id}
                                        countnumber={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                        leavetype={val.type.type_name}
                                        date={dateFormat(val.leave_date, GlobalData.GlobalData_Array.date_format)}
                                        badgetext={val.status}
                                        ViewLeaveData={ViewLeaveData}
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
                                <td colSpan="5" className="text-center">No Record Found!</td>
                            </tr>
                        }
                        </tbody>
                    </Table>
                </div>
                <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    />
            </div>
            </div>
            <Modal show={modalShowAddFllow} onHide={() => setModalShowAddFllow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Leaves Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div className="mb-4">
                        <h5 className="fontsize14 fontweightbold">Applicant Name</h5>
                        <p className="m-0 paragraph_blue_text_color">{username}</p>
                    </div>
                    <div className="mb-4">
                        <h5 className="fontsize14 fontweightbold">Date</h5>
                        <p className="m-0 fontsize14 paragraph_blue_text_color">{dateFormat(LeaveViewData.LeaveViewData_Array.leave_date, GlobalData.GlobalData_Array.date_format)} <Badge className="ml-2 lightred_bg_color red_text_color">{ltype}</Badge></p>
                    </div>
                    <div className="mb-4">
                        <h5 className="fontsize14 fontweightbold">Reason for absence</h5>
                        <p className="m-0 fontsize14 paragraph_blue_text_color">{LeaveViewData.LeaveViewData_Array.reason}</p>
                    </div>
                    <div className="mb-4">
                        <h5 className="fontsize14 fontweightbold">Status</h5>
                        <p className="m-0 fontsize14 green_text_color">{LeaveViewData.LeaveViewData_Array.status}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAddFllow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeLeaves;
