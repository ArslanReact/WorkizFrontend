import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import { InputGroup, Button, FormControl } from "react-bootstrap";

// 

// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import iconimg from "../../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import deleteiconimg from "../../../../../assets/images/deleteiconimg.svg";

const Task_Label = () => {
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/task-label/'+companyid+'/'+obj.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.tasklabels ? response.data.tasklabels : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something Went wrong!");
            });
    }, []); 
    const DeleteLabel = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/tasklabel/deletelabel/'+id)
        .then((response) => {
            setTableData({ TableData_Array: TableData.TableData_Array.filter(item => item.id !== id) });
            toast.success("Task Label Successfully Deleted!");
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            toast.error("Something Went wrong!");
        });
    }   
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center mb-4">
                    <h4 className="main_title mb-4 mb-xl-0">Task Label</h4>
                    <div className="ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/create_label`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Create Label</NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/task`} className="btn btn_blue bg-white blackcolortext"> Back to Task</NavLink>
                    </div>
                </div>
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Name Label</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {TableData.TableData_Array.length > 0  ?
                                TableData.TableData_Array.map((val, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><span className="fontsize14 px-3 py-1 border-radius-100 badgebluebg blusecolortext">{val.label_name}</span></td>
                                            <td>{val.description}</td>
                                            <td className="dropdown dropdown_table" width="110">
                                                <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <ul className="list-unstyled">
                                                        <li><NavLink to={`${process.env.PUBLIC_URL}/edit_label/`+val.id} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                                                        <li><NavLink onClick={() => DeleteLabel(val.id)} to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>                                        
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="4">No Record Found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Task_Label;
