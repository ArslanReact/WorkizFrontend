import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
// 

import formtable_img from "../../../assets/images/formtable_img.svg";
import top_icon_2 from "../../../assets/images/top_icon_2.svg";
import top_icon_8 from "../../../assets/images/top_icon_8.svg";
import top_icon_7 from "../../../assets/images/top_icon_7.svg";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import arrowdown from "../../../assets/images/arrowdown.svg";
import iconimg from "../../../assets/images/dotoption.svg";
import editiconimg from "../../../assets/images/editiconimg.svg";
import viewiconimg from "../../../assets/images/viewiconimg.svg";
import deleteiconimg from "../../../assets/images/deleteiconimg.svg";
import userimgiconimg from "../../../assets/images/userimgiconimg.svg";
import thumbsimgiconimg from "../../../assets/images/thumbsimgiconimg.svg";
import dateFormat from 'dateformat';

// 
import EmployeeTopBoxesLoop from "../employeeleads/EmployeeTopBoxesLoop";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

const EmployeeLeads = () => {
    var counter1 = -1;
    const [modalShowAddFllow, setModalShowAddFllow] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [Global, setGlobal] = useState({
        Global_Array: []
    });
    const [leadstatus, setleadstatus] = useState({
        leadstatus_Array: []
    });
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
        // project dashboard
        {
            key: "0",
            iconimg: top_icon_2,
            altburger: "top_icon_2",
            toptitle: "Total Leads",
            classnth: "nth_1",
            topnumber: "0",
        },
        {
            key: "1",
            iconimg: top_icon_8,
            altburger: "top_icon_2",
            toptitle: "Total Client Convert",
            classnth: "nth_2",
            topnumber: "0",
        },
        {
            key: "2",
            iconimg: top_icon_7,
            altburger: "top_icon_2",
            toptitle: "Total Pending Follow Up",
            classnth: "nth_3",
            topnumber: "0",
        },
    ]});
    //
    let temp_state = { ...state };
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/leads/' + companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.data.totalLeads;
                temp_state.TopBoxesArray[1].topnumber = response.data.data.totalClientConverted;
                temp_state.TopBoxesArray[2].topnumber = response.data.data.pendingLeadFollowUps;
                setTopBoxArray(temp_state);
                setTableData({ TableData_Array: response.data.data.leadsdata ? response.data.data.leadsdata : [], });
                setGlobal({ Global_Array: response.data.data.globalarray ? response.data.data.globalarray : [], });
                setleadstatus({ leadstatus_Array: response.data.data.leadstatus ? response.data.data.leadstatus : [], });
                setLoading(false);

            });
    }, []);
    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Client Name", field: "client_name", sortable: true },
        { name: "Company Name", field: "company_name", sortable: true },
        { name: "Created", field: "amount", sortable: true },
        { name: "Next Follow Up", field: "start_date", sortable: true },
        { name: "Status", field: "end_date", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.client_name.toLowerCase().includes(search.toLowerCase()) ||
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);   
    // Update Lead Status
    const Updatestatus = (id, statusid) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/member/leads/change-status/'+ companyid+'/'+userid, {
            leadID: id,
            statusID: parseInt(statusid),
        })
        .then(response => {
            toast.success("Lead Status Successfully Update!");
            axios.get(Globalsettings.url + 'api/member/leads/' + companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.data.totalLeads;
                temp_state.TopBoxesArray[1].topnumber = response.data.data.totalClientConverted;
                temp_state.TopBoxesArray[2].topnumber = response.data.data.pendingLeadFollowUps;
                setTopBoxArray(temp_state);
                setTableData({ TableData_Array: response.data.data.leadsdata ? response.data.data.leadsdata : [], });
                setGlobal({ Global_Array: response.data.data.globalarray ? response.data.data.globalarray : [], });
                setleadstatus({ leadstatus_Array: response.data.data.leadstatus ? response.data.data.leadstatus : [], });
                setLoading(false);

            });
        });
    }    
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
        axios.post(Globalsettings.url + 'api/member/leads/follow-up-store/'+companyid+'/'+userid,{
            next_follow_up_date: dateFormat(nextfollow,'dd/mm/yyyy hh:mm'),
            type: 'datetime',
            remark: remarks,
            lead_id: leadid
        }).then((response) => {
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
                    {state.TopBoxesArray.map((val) => {
                        return (
                            <EmployeeTopBoxesLoop
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
            <div className="container-fluid mb-4">
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
                                    FinalTableData.map((val,index) => {
                                        counter1=counter1+1;
                                        return (
                                            <tr>
                                                <td>{(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}</td>
                                                <td><span>{val.client_name}</span><br /> <span>{val.client_id == '' || val.client_id == null ? <span className="border-radius-100 fontsize14 px-3 py-1 bluecolortext badgebluebg ">Lead</span> : <span className="border-radius-100 fontsize14 px-3 py-1 greencolortext badgegreenbg">Client</span>}</span></td>
                                                <td>{val.company_name}</td>
                                                <td>{val.created}</td>
                                                <td>{val.next_follow_up_date == '' || val.next_follow_up_date == null ? "--" : dateFormat(val.next_follow_up_date,Global.Global_Array.date_format) }</td>
                                                <td className="dropdown dropdown_table">
                                                    <select className="form-select" value={val.status_id} onChange={(e) => Updatestatus(val.id,e.target.value)}>
                                                        {leadstatus.leadstatus_Array.map((vals)=>{
                                                            return(
                                                                <option value={vals.id}>{vals.type}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                                <td className="dropdown dropdown_table" width="110">
                                                    <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <ul className="list-unstyled">
                                                            <li><NavLink to={`${process.env.PUBLIC_URL}/employee_leadsview/`+val.id} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                                                            <li><NavLink onClick={() => AddFllow(val.id)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={thumbsimgiconimg} alt="" /> Add Follow Up</NavLink></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>                                            
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No Record Found!</td>
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
            {/*  */}
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

export default EmployeeLeads;
