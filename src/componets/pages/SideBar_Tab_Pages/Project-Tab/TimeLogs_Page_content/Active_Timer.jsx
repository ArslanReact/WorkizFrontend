import React from 'react';
import { NavLink } from 'react-router-dom';
import { InputGroup, Button, FormControl } from "react-bootstrap";
// 
import watchicon from "../../../../../assets/images/watchicon.svg";
import exporticon from "../../../../../assets/images/exporticon.svg";
import csv_file from "../../../../../assets/images/csv_file.svg";
import excel_file from "../../../../../assets/images/excel_file.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";

const Active_Timer = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                {/*  */}
                <div className="d-block d-xl-flex align-items-center mb-4">
                    <h4 className="main_title mb-3 mb-xl-0">Active Timers</h4>
                    <div className="ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/time-logs`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={watchicon} alt="" /> Log Time</NavLink>
                        <NavLink to="#" data-bs-toggle="dropdown" className="btn btn_blue lightbluecolorbg fontsize14"><img className="img-fluid mr-2" src={exporticon} alt="" /> Export </NavLink>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                            <NavLink to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                        </ul>
                    </div>
                </div>
                {/*  */}
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
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
                                    <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0 table-borderless">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Action</th>
                                <th scope="col">Client</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="7">No data available in table</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Active_Timer;
