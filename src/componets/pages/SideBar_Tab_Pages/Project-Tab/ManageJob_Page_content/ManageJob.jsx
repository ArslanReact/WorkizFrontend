import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { InputGroup, Button, FormControl, Modal, Form } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import JobLoop from "../../Project-Tab/ManageJob_Page_content/JobLoop";
import swal from 'sweetalert';
import RightBoxesLoop from "../../Project-Tab/ManageJob_Page_content/RightBoxesLoop";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";

const ManageJob = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 4;
    const [modalShow, setModalShow] = React.useState(false);
    const [CompanyArray, setCompanyArray] = useState({
        Company_Array: []
    });
    const [state] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Total Projects",
                classnth: "nth_2",
                topnumber: "0",
            },
            {
                key: "1",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Overdue Projects",
                classnth: "nth_1",
                topnumber: "0",
            },
            {
                key: "2",
                iconimg: top_icon_1,
                altburger: "top_icon_7",
                toptitle: "Not Started Projects",
                classnth: "nth_3",
                topnumber: "0",
            },
        ]
    });
    let temp_state = { ...state };
    const [projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/projects/' + companyid + '/' + uid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalProjects;
                temp_state.TopBoxesArray[1].topnumber = response.data.overdueProjects;
                temp_state.TopBoxesArray[2].topnumber = response.data.notStartedProjects;
                setprojectsdata({ projectsdata_Array: response.data.projects ? response.data.projects : [], });
                setCompanyArray({ Company_Array: response.data.companydata[0] ? response.data.companydata[0] : [], });
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [companyid, uid])

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

    // Delete Job 
    const DeleteJob = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted job data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/projects/destroy/'+companyid+'/'+ uid+'/'+id)
                        .then(response => {
                            swal("Project Delete Successfully!", {
                                icon: "success",
                            });
                        });
                        setprojectsdata({ projectsdata_Array: projectsdata.projectsdata_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }
    // Delete Archive 
    const DeleteArchive = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted archive data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/projects/archive-delete/'+companyid+'/'+ uid+'/'+id)
                        .then(response => {
                            swal("Project Archive Successfully!", {
                                icon: "success",
                            });
                        });
                        setprojectsdata({ projectsdata_Array: projectsdata.projectsdata_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0 px-0">Manage Job</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/view_archive`} className="btn btn_white mr-3">View Archive</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/add_project`} className="btn btn_blue mr-3"><img className="img-fluid mr-2" src={plusicon} alt="" />Add Project</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn btn_white lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink onClick={() => exportTableToCSV('projects.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink onClick={() => exportTableToCSV('projects.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex bg-white py-3 px-3 border-radius-10 align-items-center mb-4">
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
                <div className="row">
                    <div className="col-xxl-9 col-lg-12 mb-4 mb-lg-0">
                        <div className="row">
                        {FinalTableData.length > 0 ?  
                            FinalTableData.map((val, index) => {
                                var clientarray = [];
                                clientarray.push(val.client);
                                return (
                                    <JobLoop
                                        key={index}
                                        pid={val.id}
                                        deadline_date={val.deadline}
                                        date_format={CompanyArray.Company_Array.date_format}
                                        project_name={val.project_name}
                                        clientdata={clientarray}
                                        status={val.status}
                                        completion_percent={val.completion_percent}

                                        members={val.members}
                                        bg_color={val.bg_color}
                                        weekly_text={val.weekly_text}
                                        DeleteJob={DeleteJob}
                                        DeleteArchive={DeleteArchive}
                                    />
                                )
                            })
                            :
                            <div className="text-center">
                                    No Project Found
                            </div>
                        }
                        </div>
                        <Pagination
                                className="mb-4"
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                    <div className="col-xxl-3 col-lg-12">
                        <ul className="list-unstyled top-boxes row">
                            {state.TopBoxesArray.map((val) => {
                                return (
                                    <RightBoxesLoop
                                        key={val.key}
                                        iconimg={val.iconimg}
                                        altburger={val.altburger}
                                        toptitle={val.toptitle}
                                        classnth={val.classnth}
                                        topnumber={val.topnumber}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ManageJob;
// task category modal
function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Pinned Project</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div class="table-sm-responsive">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">No task category found.</td>
                            </tr>
                        </tbody>
                    </table>
                    <Form>
                        <Form.Control className="transparent_form h-45px" type="email" placeholder="Enter email" />
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}