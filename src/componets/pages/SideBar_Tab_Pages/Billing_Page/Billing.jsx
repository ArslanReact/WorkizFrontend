import React from 'react';
import { NavLink } from "react-router-dom";
import { InputGroup, Form, Button, FormControl } from "react-bootstrap";

// 
import formtable_img from "../../../../assets/images/formtable_img.svg";

const Billing = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Billing</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/pakages`} className="btn blusecolorbg whitecolortext fontsize14"> Change Plan </NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <h4 className="main_title fontsize16 mb-2">Your Current Plan (Default)</h4>
                <div className="card card-body">
                    <ul className="list-unstyled">
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Annual Price</p>
                            <p className="m-0">$0.00</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Monthly Price</p>
                            <p className="m-0">$0.00</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Max Employees</p>
                            <p className="m-0">20</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Active Employees</p>
                            <p className="m-0">18</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Max Storage Size</p>
                            <p className="m-0">Unlimited</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Storage Used</p>
                            <p className="m-0">Unlimited</p>
                        </li>
                        <li className="d-flex mb-2 align-items-center justify-content-between">
                            <p className="m-0">Next Payment Date</p>
                            <p className="m-0">Not used</p>
                        </li>
                        <li className="d-flex align-items-center justify-content-between">
                            <p className="m-0">Previous Payment Date</p>
                            <p className="m-0">--</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <h4 className="main_title mb-3 fontsize16">Invoices</h4>
                <div className="card card-body">
                    <div className="d-flex align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                            <select className="form-control transparent_form">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                            <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                        </div>
                        <div className="ml-auto">
                            <Form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                        <Button variant=""><img className="img-fluid" src={formtable_img} alt="" /></Button>
                                </InputGroup>
                            </Form>
                        </div>
                    </div>
                    {/*  */}
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Packges</th>
                                    <th scope="col">Amount ($)</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Next Payment Date</th>
                                    <th scope="col">Payment Gateway</th>
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
                    {/*  */}
                </div>
            </div>
        </>
    );
}

export default Billing;
