import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import swal from 'sweetalert';
// 
import DepartmentData from '../../Hr_Tab/Deparment_Page_Content/DepartmentData';

const Deparment = () => {
    var counter1 = -1;
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const history = useHistory();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const [DeptName, setDeptName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setLoading] = useState(true);
    const [Departmentlist, setDepartmentlist] = useState({
        DepartmentData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/teams')
            .then((response) => {
                setDepartmentlist({ DepartmentData_Array: response.data.depts ? response.data.depts : [], });
                setShow(false);
                setLoading(false);
            })
            .catch((error) => {
                history.push('/signin');
            });
    }, [])
    // Insert Dept
    const handleSubmit = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/teams/store', {
            team_name: DeptName,
            company_id: companyid
        }).then(response => {
            toast.success("Department Successfully Updated!");
            setDepartmentlist({ DepartmentData_Array: response.data.depts ? response.data.depts : [], });
            setLoading(false);
            setDeptName('');
        });
        evt.preventDefault();
    }

    const DeleteDept = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted department",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/employees/teams/destroy/' + id)
                        .then(response => {
                            toast.success("Department Delete Successfully!");
                            setDepartmentlist({ DepartmentData_Array: Departmentlist.DepartmentData_Array.filter(item => item.id !== id) });
                        });
                } else {
                }
            });
    }
    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Department", field: "team_name", sortable: true },
        { name: "Employees", field: "employee", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = Departmentlist.DepartmentData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.team_name.toLowerCase().includes(search.toLowerCase()) 
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

    }, [Departmentlist.DepartmentData_Array, currentPage, search, sorting]);    
    return (
        <>
            <React.Fragment>
                <ToastContainer closeButton={true} position="top-right" />
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-block d-xl-flex align-items-center">
                        <h4 className="main_title mb-3 mb-xl-0"> Department</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink onClick={handleShow} to="#" className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Department</NavLink>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
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
                    <div className="table-sm-responsive data_table_profile">
                        <table className="table m-0" id="tableSample">
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                            <tbody>
                            {FinalTableData.length > 0 ?
                                FinalTableData.map((val, index) => {
                                    let deptnumber = index + 1;
                                    counter1 = counter1+1;  
                                    const numRows = val.member.length;
                                    return (
                                        <DepartmentData
                                            key={index}
                                            did={val.id}
                                            countnumber={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                            depart_title={val.team_name}
                                            totalmember={numRows}
                                            allmemberdata={val.member}
                                            DeleteDept={DeleteDept}
                                        />
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="4" className="text-center">No Record Found</td>
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
                {/* task categor */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Department</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body className="p-0 my-4">
                            <FormLabel className="mb-2">Department</FormLabel>
                            <Form.Control className="transparent_form h-55px" type="text" placeholder="Enter Department Name..." value={DeptName} onChange={e => setDeptName(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer className="p-0">
                            <Button variant="" className="w-100px graycolorbg" onClick={handleClose}>Close</Button>
                            <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </React.Fragment>
        </>
    );
}

export default Deparment;
