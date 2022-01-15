import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Modal, Button } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
// 
import NoticeBoardTableData from "../NoticeBoard_Page/NoticeBoardTableData";
import { TableHeader, Pagination, Search } from "../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../datatable/Exportcsv'; 
// 
import csv_file from "../../../../assets/images/csv_file.svg";
import excel_file from "../../../../assets/images/excel_file.svg";
import exporticon from "../../../../assets/images/icon_16.svg";
import plusicon from "../../../../assets/images/plusicon.svg";
// 
const NoticeBoard = () => {
    const [modalShowAddDepartment, setModalShowAddDepartment] = React.useState(false);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    var counter2 = -1;
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [NoticeBoardTableDataArray, setNoticeBoardTableDataArray] = useState({
        NoticeBoardTableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/notices')
            .then((response) => {
                setNoticeBoardTableDataArray({ NoticeBoardTableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);
            })
            
    }, [])

    // Delete Notice Board
    const DeleteNoticeBoard = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted client data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/notices/destroy/' + id)
                        .then(response => {
                            swal("Notice Delete Successfully!", {
                                icon: "success",
                            });
                        });
                    setNoticeBoardTableDataArray({ NoticeBoardTableData_Array: NoticeBoardTableDataArray.NoticeBoardTableData_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }
    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Notice Board", field: "heading", sortable: true },
        { name: "Date", field: "created_at", sortable: true },
        { name: "To", field: "to", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = NoticeBoardTableDataArray.NoticeBoardTableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.heading.toLowerCase().includes(search.toLowerCase()) ||
                    comment.created_at.toLowerCase().includes(search.toLowerCase()) ||
                    comment.to.toLowerCase().includes(search.toLowerCase())
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

    }, [NoticeBoardTableDataArray.NoticeBoardTableData_Array, currentPage, search, sorting]);

    const[noticetitle, setnoticetitle] = useState('');
    const[noticedescription, setnoticedescription] = useState('');
    const[file_url, setfile_url] = useState('');
    const ShowNotice = (nid) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/member/notices/show/'+nid+'/'+ companyid+'/'+userid)
        .then((response) => {
            setnoticetitle(response.data.data.notice.heading);
            setnoticedescription(response.data.data.notice.description);
            setfile_url(response.data.data.notice.file_url);
            setLoading(false);
            setModalShowAddDepartment(true);
        })
        
    }
    return (
        <>
            <React.Fragment>
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title mb-3 mb-xl-0">Notice Board</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to={`${process.env.PUBLIC_URL}/add_new_notice`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add New Notice</NavLink>
                            <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink onClick={() => exportTableToCSV('notices.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink onClick={() => exportTableToCSV('notices.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard px-3 py-4">
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
                    </div>
                    {/*  */}
                    <div className="table-sm-responsive data_table_profile mt-4">
                        <table id="example" className="table m-0 table-hover">
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                            <tbody>
                            {FinalTableData.length > 0 ?  
                                FinalTableData.map((val, index) => {
                                    counter2 = counter2+1;      
                                    return (
                                        <NoticeBoardTableData
                                            key={index}
                                            nid={val.id}
                                            countnumber={(currentPage*10 - 10)+parseInt(counter2)+parseInt(1)}
                                            name={val.heading}
                                            date={val.created_at}
                                            to={val.to}
                                            DeleteNoticeBoard={DeleteNoticeBoard}
                                            ShowNotice={ShowNotice}
                                        />
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="5" className="text-center">No Record Found</td>
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
            </React.Fragment>
            <Modal show={modalShowAddDepartment} onHide={() => setModalShowAddDepartment(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">{noticetitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 my-4">
                    <div>
                        { ReactHtmlParser(noticedescription) }
                    </div>
                    
                    <a href={file_url} className="btn btn_blue border-radius-100 fontweightbold px-4" target="_blank">View Acttachment</a>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg" onClick={() => setModalShowAddDepartment(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NoticeBoard;
