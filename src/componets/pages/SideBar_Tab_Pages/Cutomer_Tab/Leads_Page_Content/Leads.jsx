import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
import swal from 'sweetalert';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import dateFormat from 'dateformat';
// 

import editicon from "../../../../../assets/images/edit_5_iconimg.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";

// 


import LeadTable from "../../../SideBar_Tab_Pages/Cutomer_Tab/Leads_Page_Content/LeadTable";

import top_icon_2 from "../../../../../assets/images/top_icon_2.svg";
import top_icon_8 from "../../../../../assets/images/top_icon_8.svg";
import top_icon_7 from "../../../../../assets/images/top_icon_7.svg";

const Leads = (props) => {
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const [totallead, settotallead] = useState(0);
    const [totalclientconvert, settotalclientconvert] = useState(0);
    const [totalfollowup, settotalfollowup] = useState(0);
    const [LeadDataArray, setLeadDataArray] = useState({
        LeadDataArray_Array: []
    });
    const [LeadStatus, setLeadStatus] = useState({
        LeadStatus_Array: []
    });
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(async () => {
        axios.all([
            axios.get(Globalsettings.url + 'api/admin/leads'),
            axios.get(Globalsettings.url + 'api/admin/leadsummary/' + companyid)
        ])
            .then(axios.spread((response1, response2) => {
                // Both requests are now complete
                settotallead(response2.data.totalLeads);
                settotalclientconvert(response2.data.totalClientConverted);
                settotalfollowup(response2.data.pendingLeadFollowUps);
                setLeadDataArray({ LeadDataArray_Array: response1.data.data ? response1.data.data : [], });
                setLeadStatus({ LeadStatus_Array: response2.data.Leadsstatus ? response2.data.Leadsstatus : [], });
                setLoading(false);
            }));
    }, [])
    // Delete Lead
    const DeleteLead = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted Lead data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/leads/destroy/' + id)
                        .then(response => {
                            swal("Lead Delete Successfully!", {
                                icon: "success",
                            });
                            setLeadDataArray({ LeadDataArray_Array: LeadDataArray.LeadDataArray_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }
    // Update Lead Status
    const Updatestatus = (id, statusid) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/leads/change-status', {
            leadID: id,
            statusID: statusid
        })
            .then(response => {
                toast.success("Lead Status Successfully Update!");
                axios.all([
                    axios.get(Globalsettings.url + 'api/admin/leads'),
                    axios.get(Globalsettings.url + 'api/admin/leadsummary/' + companyid)
                ])
                    .then(axios.spread((response1, response2) => {
                        // Both requests are now complete
                        settotallead(response2.data.totalLeads);
                        settotalclientconvert(response2.data.totalClientConverted);
                        settotalfollowup(response2.data.pendingLeadFollowUps);
                        setLeadDataArray({ LeadDataArray_Array: response1.data.data ? response1.data.data : [], });
                        setLeadStatus({ LeadStatus_Array: response2.data.Leadsstatus ? response2.data.Leadsstatus : [], });
                        setLoading(false);
                    }));
            });
    }
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "client_name", sortable: true },
        { name: "Company", field: "company_name", sortable: true },
        { name: "Lead Value", field: "value", sortable: false },
        { name: "Created", field: "created_at", sortable: false },
        { name: "Next Follow Up", field: "next_follow_up_date", sortable: false },
        { name: "Lead Agent", field: "agent_name", sortable: false },
        { name: "Status", field: "status", sortable: false },
        { name: "Action", field: "action", sortable: false }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = LeadDataArray.LeadDataArray_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.client_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.agent_name.toLowerCase().includes(search.toLowerCase()) ||
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

    }, [LeadDataArray.LeadDataArray_Array, currentPage, search, sorting]);

    // 
    const [nextfollow, setnextfollow] = useState('');
    const [remarks, setremarks] = useState('');
    const [leadid, setleadid] = useState('');
    const AddFllow = (leadid) =>{
        setModalShowAddFllow(true);
        setleadid(leadid);
    }
    const followsubmit = (evt) => {
        setLoading(true);     
        axios.post(Globalsettings.url + 'api/admin/leads/follow-up-store/'+companyid+'/'+userid,{
            next_follow_up_date: dateFormat(nextfollow,'dd/mm/yyyy hh:mm'),
            type: 'datetime',
            remark: remarks,
            lead_id: leadid
        }).then((response) => {
            setnextfollow('');
            setremarks('');
            toast.success("Follow Up Save Successfully!");
            setModalShowAddFllow(false);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    }   
    
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Leads</h4>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 mb-xl-0 mb-3">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_1"><img className="img-fluid" width="24" src={top_icon_2} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Leads</p>
                                    <h6 className="fontweightbold paragraphcolortext">{totallead}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 mb-xl-0 mb-3">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_2"><img className="img-fluid" width="24" src={top_icon_8} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Client Convert</p>
                                    <h6 className="fontweightbold paragraphcolortext">{totalclientconvert}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 mb-xl-0 mb-3">
                        <div className="card card_dashboard p-4">
                            <div className="d-flex align-items-center h-100">
                                <div className="ellipse_circle mr-5 nth_3"><img className="img-fluid" width="24" src={top_icon_7} alt="" /></div>
                                <div className="">
                                    <p className="m-0 lightgraycolortext">Total Pending Follow Up</p>
                                    <h6 className="fontweightbold paragraphcolortext">{totalfollowup}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="btn-group dropdown for_all mb-4">
                    <NavLink to={`${process.env.PUBLIC_URL}/add_new_lead`} className="btn btn_blue mr-3"><img className="img-fluid mr-2" src={plusicon} alt="" />Add Lead</NavLink>
                    <NavLink to="#" className="btn lightbluecolorbg whitecolortext fontsize14" data-bs-toggle="dropdown"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export Lead </NavLink>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <NavLink to="#" onClick={() => exportTableToCSV('leads.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                        <NavLink to="#" onClick={() => exportTableToCSV('leads.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                    </ul>
                </div>
                <div className="card card_dashboard px-3 py-4">
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
                                    return (
                                        <LeadTable
                                            key={val.key}
                                            leadid={val.id}
                                            countnumber={number}
                                            name={val.client_name}
                                            client_type={val.client_type}
                                            company={val.company_name}
                                            created_at={val.created_at}
                                            value={val.value}
                                            next_follow_up_date={val.next_follow_up_date}
                                            agent_name={val.agent_name}
                                            null_2={val.null_2}
                                            status={val.status}
                                            linktext={val.linktext}
                                            leadstatuslist={LeadStatus.LeadStatus_Array}
                                            Updatestatus={Updatestatus}
                                            DeleteLead={DeleteLead}
                                            AddFllow={AddFllow}
                                        />
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="9" className="text-center">No Record Found</td>
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

            <Modal show={modalShowAddFllow} onHide={() => setModalShowAddFllow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Follow Up Next</Modal.Title>
                </Modal.Header>
                <Form onSubmit={followsubmit}>
                <Modal.Body className="p-0 my-4">
                        <FormLabel className="mb-2">Follow Up Next*</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="date" value={nextfollow} onChange={(e) => setnextfollow(e.target.value)} required placeholder="" />
                        <div className="mt-4">
                            <FormLabel className="mb-2">Remark*</FormLabel>
                            <Form.Control className="transparent_form" as="textarea" value={remarks} onChange={(e) => setremarks(e.target.value)} required rows={3} />
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAddFllow(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue"> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Leads;
