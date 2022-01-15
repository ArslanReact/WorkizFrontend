import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
import { exportTableToCSV } from '../../../../datatable/Exportcsv'; 
// 
import TopBoxesLoop from '../../../SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/TopBoxesLoop';
import EmployeData from '../../../SideBar_Tab_Pages/Hr_Tab/EmployeeList_Page_Content/EmployeData';

// 
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
// 

const EmployeeList = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Total Employees",
                classNamenth: "nth_1",
                topnumber: "",
            },
            {
                key: "1",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Not working on project",
                classNamenth: "nth_2",
                topnumber: "",
            },
        ]
    });
    const [Employeelist, setEmployeelist] = useState({
        EmployeData_Array: []
    });
    const [roles, setroles] = useState({
        roles_Array: []
    });
    let temp_state = { ...state };
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/employees/'+companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalEmployees;
                temp_state.TopBoxesArray[1].topnumber = response.data.freeEmployees;
                setTopBoxArray(temp_state);
                setEmployeelist({ EmployeData_Array: response.data.allemployees ? response.data.allemployees : [], });
                setroles({ roles_Array: response.data.roles ? response.data.roles : [], });
                setLoading(false);
            });
    }, [])
    // Delete Notice Board
    const DeleteEmployee = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted client data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/employees/destroy/' + id)
                        .then(response => {
                            toast.success('Employee Delete Successfully!');
                            setEmployeelist({ EmployeData_Array: Employeelist.EmployeData_Array.filter(item => item.id !== id) });
                        });

                } else {
                }
            });
    }

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "User Role", field: "user_other_role", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = Employeelist.EmployeData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) 
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

    }, [Employeelist.EmployeData_Array, currentPage, search, sorting]);    
    // Update Employee Status
    const UpdateStatusEmployee = (id, role) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/emp/assignRole/'+companyid+'/'+userid, {
            role: role,
            userId: id
        })
        .then(response => {
            setLoading(false);
            toast.success("Roles assigned successfully!");
            axios.get(Globalsettings.url + 'api/admin/employees/employees/'+companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalEmployees;
                temp_state.TopBoxesArray[1].topnumber = response.data.freeEmployees;
                setTopBoxArray(temp_state);
                setEmployeelist({ EmployeData_Array: response.data.allemployees ? response.data.allemployees : [], });
                setroles({ roles_Array: response.data.roles ? response.data.roles : [], });
                setLoading(false);
            });
        })
        .catch(error => {
            setLoading(false);
            toast.error("Something Went Wrong");
        });
    }
    return (
        <>
            <React.Fragment>
                <ToastContainer />
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid top-boxes mb-4">
                    <div className="d-block d-xl-flex align-items-center">
                        <h4 className="main_title mb-3 mb-xl-0"> Employees</h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to={`${process.env.PUBLIC_URL}/add_employe`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add Employee</NavLink>
                            <NavLink to="#" className="btn lightbluecolorbg whitecolortext fontsize14" data-bs-toggle="dropdown" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink to="#" onClick={() => exportTableToCSV('emplist.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink to="#" onClick={() => exportTableToCSV('emplist.csv')} className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid top-boxes mb-4">
                    <div className="row">
                        {state.TopBoxesArray.map((val) => {

                            return (
                                <TopBoxesLoop
                                    key={val.key}
                                    iconimg={val.iconimg}
                                    altburger={val.altburger}
                                    toptitle={val.toptitle}
                                    classNamenth={val.classNamenth}
                                    topnumber={val.topnumber}
                                />
                            )
                        })}
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid top-boxes mb-4">
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
                                FinalTableData.map((val, index) => {
                                    let number = index + 1;
                                    return (
                                        <EmployeData
                                            key={index}
                                            eid={val.id}
                                            curuserid={userid}
                                            countnumber={number}
                                            avatarimg={val.image_url}
                                            online_offline_color="greencolorbg"
                                            title={val.name}
                                            badgetext={val.designation_name}
                                            email={val.email}
                                            statusbadge={val.status === 'active' ? 'Active' : 'Inactive'}
                                            statusbadgecolor={val.status === 'active' ? "badgegreenbg greencolortext" : "badgeredbg redcolortext"}
                                            canchangethis={val.status === 'active' ? 'yes' : 'no'}
                                            currentroleid={val.current_role}
                                            roleslist={roles.roles_Array}
                                            UpdateStatusEmployee={UpdateStatusEmployee}
                                            DeleteEmployee={DeleteEmployee}
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
        </>
    );
}

export default EmployeeList;