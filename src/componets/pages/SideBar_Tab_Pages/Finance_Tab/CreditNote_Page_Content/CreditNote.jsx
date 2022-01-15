import React from 'react';
import { NavLink } from 'react-router-dom';
import { InputGroup, Button, FormControl } from "react-bootstrap";
// 
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import exporticon from "../../../../../assets/images/icon_16.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const CreditNote = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Credit Note</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-xl-0">
                            <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                            <select className="form-control transparent_form">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                            <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                        </div>
                        <div className="ml-auto">
                            <form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                    <Button variant=""><img className="img-fluid" src={formtable_img} alt="formtable_img" /></Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0 table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Credit Note</th>
                                <th scope="col">Project</th>
                                <th scope="col">Invoice</th>
                                <th scope="col">Total</th>
                                <th scope="col">Credit Note Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="8" className="text-center">No data available in table</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CreditNote;
