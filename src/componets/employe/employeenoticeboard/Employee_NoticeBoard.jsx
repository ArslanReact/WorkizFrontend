import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
// 
import Employee_NoticeBoardTableData from "../employeenoticeboard/Employee_NoticeBoardTableData";
import ReactHtmlParser from 'react-html-parser';
const ClientNoticeBoard = () => {
    const [modalShowAddDepartment, setModalShowAddDepartment] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [NoticeData, setNoticeData] = useState({
        NoticeData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/notices/'+ companyid+'/'+userid)
            .then((response) => {
                setNoticeData({ NoticeData_Array: response.data.data.notices ? response.data.data.notices : [], });
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const headers = [
        { name: "Sr No", field: "id", sortable: true },
        { name: "Notice", field: "project_name", sortable: true },
        { name: "Date", field: "original_invoice_number", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = NoticeData.NoticeData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.heading.toLowerCase().includes(search.toLowerCase()) 
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

    }, [NoticeData.NoticeData_Array, currentPage, search, sorting]);
    const[noticetitle, setnoticetitle] = useState('');
    const[noticedescription, setnoticedescription] = useState('');
    const[file_url, setfile_url] = useState('');
    const EditNotice = (nid) => {
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
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard px-3 py-4">
                    <div className="d-flex align-items-center">
                        <h4 className="main_title m-0">Notice Board</h4>
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
            </div>
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
                                    return (
                                        <Employee_NoticeBoardTableData
                                            key={index}
                                            countnumber={index+1}
                                            nid={val.id}
                                            name={val.heading}
                                            date={val.notice_date}
                                            EditNotice={EditNotice}
                                        />
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="4" className="text-center">No Record Found!</td>
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

export default ClientNoticeBoard;
