import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import swal from 'sweetalert';
// 
import plusicon from "../../../../../assets/images/plusicon.svg";

// 
import DesignationData from '../../Hr_Tab/Designation_Page_Content/DesignationData';


const Designation = (props) => {
    var counter1 = -1;
    const [modalShowAddDesignation, setModalShowAddDesignation] = React.useState(false);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const history = useHistory();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const [DesigName, setDesigName] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [Designationlist, setDesignationlist] = useState({
        Designationlist_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/designations')
            .then((response) => {
                setDesignationlist({ Designationlist_Array: response.data.group ? response.data.group : [], });
                setLoading(false);
            })
            .catch((error) => {
                toast.error("something went wrong")
            });
    }, [])
    // Insert Dept
    const handleSubmit = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/designations/store', {
            designation_name: DesigName,
            company_id: companyid
        }).then(response => {
            toast.success("Designation Successfully Inserted!");
            setDesignationlist({ Designationlist_Array: response.data.group ? response.data.group : [], });
            setDesigName('');
            setModalShowAddDesignation(false);
        });
        evt.preventDefault();
    }

    const DeleteDesig = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted designation",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/designations/destroy/' + id)
                        .then(response => {
                            toast.success("Designation Delete Successfully!");
                            setDesignationlist({ Designationlist_Array: Designationlist.Designationlist_Array.filter(item => item.id !== id) });
                        });
                } else {
                }
            });
    }
    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Designation", field: "name", sortable: true },
        { name: "Employees", field: "employee", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = Designationlist.Designationlist_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) 
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

    }, [Designationlist.Designationlist_Array, currentPage, search, sorting]);  
    return (
        <>
            <React.Fragment>
                <ToastContainer closeButton={false} position="top-right" />
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-block d-xl-flex align-items-center">
                        <h4 className="main_title mb-3 mb-xl-0"> Designation</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink onClick={() => setModalShowAddDesignation(true)} to="#" className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Designation</NavLink>
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
                                    let designumber = index + 1;
                                    counter1 = counter1+1;  
                                    const numRows = val.members.length;
                                    return (
                                        <DesignationData
                                            key={index}
                                            did={val.id}
                                            countnumber={(currentPage*10 - 10)+parseInt(counter1)+parseInt(1)}
                                            depart_title={val.name}
                                            totalmember={numRows}
                                            allmember={val.members}
                                            DeleteDesig={DeleteDesig}
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
                <Modal show={modalShowAddDesignation} onHide={() => setModalShowAddDesignation(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton className="d-flex align-items-center p-0">
                        <Modal.Title id="contained-modal-title-vcenter">Add Designation</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body className="p-0 my-4">
                            <FormLabel className="mb-2">Designation</FormLabel>
                            <Form.Control className="transparent_form h-55px" type="text" required value={DesigName} onChange={e => setDesigName(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer className="p-0">
                            <Button variant="" className="w-100px graycolorbg" onClick={() => setModalShowAddDesignation(false)}>Close</Button>
                            <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </React.Fragment>
        </>
    );
}

export default Designation;